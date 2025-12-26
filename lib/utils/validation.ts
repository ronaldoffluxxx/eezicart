// Email validation
export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Phone validation (Nigerian format)
export const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 11 && cleaned.startsWith('0');
};

// Password validation
export const validatePassword = (password: string): boolean => {
    return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password)
    );
};

// Bank account number validation
export const validateAccountNumber = (account: string): boolean => {
    return /^\d{10}$/.test(account);
};

// BVN validation
export const validateBVN = (bvn: string): boolean => {
    return /^\d{11}$/.test(bvn);
};

// Get password strength
export const getPasswordStrength = (password: string): {
    strength: 'weak' | 'medium' | 'strong';
    score: number;
} => {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return { strength: 'weak', score };
    if (score <= 4) return { strength: 'medium', score };
    return { strength: 'strong', score };
};
