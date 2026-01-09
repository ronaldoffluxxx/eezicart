-- =============================================
-- INSTALLMENTS SCHEMA
-- =============================================

-- Installments table
CREATE TABLE IF NOT EXISTS installments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  order_id UUID REFERENCES orders(id),
  
  product_name TEXT NOT NULL,
  product_image TEXT,
  product_price DECIMAL(10,2) NOT NULL,
  down_payment DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  monthly_payment DECIMAL(10,2) NOT NULL,
  
  plan TEXT NOT NULL CHECK (plan IN ('3-months', '6-months', '12-months')),
  duration INTEGER NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL,
  
  paid_installments INTEGER DEFAULT 0,
  remaining_installments INTEGER NOT NULL,
  next_payment_date TIMESTAMPTZ NOT NULL,
  
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'defaulted', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Installment payments table
CREATE TABLE IF NOT EXISTS installment_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  installment_id UUID REFERENCES installments(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  due_date TIMESTAMPTZ NOT NULL,
  paid_date TIMESTAMPTZ,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  payment_method TEXT,
  transaction_ref TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE installments ENABLE ROW LEVEL SECURITY;
ALTER TABLE installment_payments ENABLE ROW LEVEL SECURITY;

-- Policies for installments
CREATE POLICY "Users can view own installments" ON installments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own installments" ON installments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own installments" ON installments
  FOR UPDATE USING (auth.uid() = user_id);

-- Policies for installment_payments
CREATE POLICY "Users can view own installment payments" ON installment_payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM installments
      WHERE installments.id = installment_payments.installment_id
      AND installments.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own installment payments" ON installment_payments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM installments
      WHERE installments.id = installment_payments.installment_id
      AND installments.user_id = auth.uid()
    )
  );

-- Admin policies
CREATE POLICY "Admins can view all installments" ON installments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  );

CREATE POLICY "Admins can view all installment payments" ON installment_payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  );

-- Indexes for better performance
CREATE INDEX idx_installments_user ON installments(user_id);
CREATE INDEX idx_installments_status ON installments(status);
CREATE INDEX idx_installments_next_payment ON installments(next_payment_date);
CREATE INDEX idx_installment_payments_installment ON installment_payments(installment_id);
CREATE INDEX idx_installment_payments_status ON installment_payments(status);
CREATE INDEX idx_installment_payments_due_date ON installment_payments(due_date);

-- Function to update overdue payments
CREATE OR REPLACE FUNCTION update_overdue_payments()
RETURNS void AS $$
BEGIN
  UPDATE installment_payments
  SET status = 'overdue'
  WHERE status = 'pending'
  AND due_date < NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to update installment status when all payments are made
CREATE OR REPLACE FUNCTION check_installment_completion()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'paid' AND OLD.status != 'paid' THEN
    -- Update paid installments count
    UPDATE installments
    SET 
      paid_installments = paid_installments + 1,
      remaining_installments = remaining_installments - 1
    WHERE id = NEW.installment_id;
    
    -- Check if all payments are completed
    UPDATE installments
    SET 
      status = 'completed',
      completed_at = NOW()
    WHERE id = NEW.installment_id
    AND remaining_installments = 0;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update installment status
CREATE TRIGGER trigger_installment_completion
AFTER UPDATE ON installment_payments
FOR EACH ROW
EXECUTE FUNCTION check_installment_completion();
