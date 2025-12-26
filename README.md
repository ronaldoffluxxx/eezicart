# EeziCart Virtual Market

A comprehensive multi-vendor marketplace web application built with Next.js 14, featuring product sales and property rentals with flexible payment options.

## Features

- 🛍️ **Multi-vendor Marketplace** - Browse and purchase products from multiple vendors
- 🏠 **Property Rentals** - Find and rent properties with monthly/yearly payment options
- 💰 **Monthly Own Program** - Rent-to-own properties with gradual ownership
- 💳 **Multiple Payment Methods** - Wallet, Paystack, Flutterwave, eNaira
- 👥 **User Roles** - Shoppers, Vendors, Landlords, and Admin
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Storage**: LocalStorage (mock data)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd eezicart
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Test Accounts

The app comes with pre-populated test accounts:

### Admin
- **Email**: admin@eezicart.com
- **Password**: Admin123

### Tenant/Shopper
- **Email**: john@example.com
- **Password**: User123

### Vendor
- **Email**: vendor@fashion.com
- **Password**: Vendor123

### Landlord
- **Email**: landlord@homes.com
- **Password**: Land123

## Project Structure

```
eezicart/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main app pages
│   └── admin/             # Admin panel
├── components/            # Reusable components
├── lib/                   # Utilities and helpers
│   ├── constants/         # App constants
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
└── public/                # Static assets
```

## Features Roadmap

- [x] Authentication (Login/Register)
- [x] Onboarding flow
- [x] Mock data system
- [ ] Home page with product/property listings
- [ ] Product browsing and details
- [ ] Shopping cart and checkout
- [ ] Property browsing and rental flow
- [ ] Wallet system
- [ ] Vendor dashboard
- [ ] Landlord dashboard
- [ ] Admin panel
- [ ] Order management
- [ ] Reviews and ratings

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

Or use the Vercel CLI:
```bash
npm install -g vercel
vercel
```

## License

This project is licensed under the MIT License.

## Support

For support, email support@eezicart.com or open an issue in the repository.
