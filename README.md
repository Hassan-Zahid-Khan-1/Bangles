# BangleBelle - Exquisite Bangles for Every Occasion

A modern Next.js e-commerce website for selling handcrafted bangles with beautiful UI, responsive design, and EmailJS integration for order confirmations.

## Features

✨ **Modern Design**
- Beautiful gradient backgrounds and smooth animations
- Responsive grid layouts for all devices
- Framer Motion animations

🛍️ **E-Commerce Functionality**
- Product catalog with filtering and sorting
- Shopping cart with local storage
- Wishlist feature
- Product detail modal

📧 **Email Integration**
- EmailJS integration for order confirmations
- Automated order emails to customers
- Customizable email templates

🎨 **UI Components**
- Product cards with ratings and discounts
- Navigation with active states
- Footer with newsletter signup
- Toast notifications

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: CSS with CSS-in-JS
- **Animations**: Framer Motion
- **Email Service**: EmailJS
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ (recommended)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Hassan-Zahid-Khan-1/Bangles.git
cd Bangles
cd bangles-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env.local` file in the `bangles-website` directory:
```bash
cp .env.example .env.local
```

Update the values with your EmailJS credentials:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_public_key
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## EmailJS Setup

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Create a new service (e.g., Gmail)
3. Create an email template with these variables:
   - `to_email`
   - `from_name`
   - `phone`
   - `address`
   - `items`
   - `total`
   - `notes`
   - `message`
4. Copy your Service ID, Template ID, and Public Key
5. Add them to `.env.local`

## Deployment on Vercel

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHassan-Zahid-Khan-1%2FBangles&env=NEXT_PUBLIC_EMAILJS_SERVICE_ID,NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,NEXT_PUBLIC_EMAILJS_USER_ID)

### Manual Deployment

1. **Push to GitHub**
```bash
git push origin main
```

2. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Framework: Next.js (auto-detected)
   - Environment Variables: Add your EmailJS credentials
   - Click Deploy

3. **Set Environment Variables in Vercel**
   - In Vercel Dashboard, go to Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
     - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
     - `NEXT_PUBLIC_EMAILJS_USER_ID`

4. **Done!** Your site will be live at `https://your-project.vercel.app`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Project Structure

```
bangles-website/
├── pages/              # Next.js pages
│   ├── index.js       # Homepage
│   ├── shop.js        # Product shop page
│   ├── cart.js        # Shopping cart
│   ├── wishlist.js    # Wishlist page
│   ├── contact.js     # Contact page
│   ├── about.js       # About page
│   └── _app.js        # App wrapper
├── components/         # React components
│   ├── Navbar.js      # Navigation
│   ├── Footer.js      # Footer
│   └── ProductCard.js # Product card
├── data/              # Static data
│   └── products.js    # Product catalog
├── styles/            # Global styles
│   └── globals.css    # Global CSS
├── .env.example       # Environment example
├── next.config.js     # Next.js config
└── vercel.json        # Vercel config
```

## Features Implemented

- ✅ Responsive product grid
- ✅ Shopping cart (localStorage)
- ✅ Wishlist functionality
- ✅ Email order confirmations (EmailJS)
- ✅ Product filtering and sorting
- ✅ Product detail modal
- ✅ Toast notifications
- ✅ Smooth animations
- ✅ Mobile-friendly design
- ✅ SEO-friendly structure

## Troubleshooting

### Emails not sending?
1. Verify EmailJS Service ID, Template ID, and User ID in `.env.local`
2. Check EmailJS Dashboard for service status
3. Test email template in EmailJS Dashboard
4. Ensure email is valid format in cart form

### Build failing on Vercel?
1. Check build logs in Vercel Dashboard
2. Ensure all dependencies are listed in `package.json`
3. Verify Node.js version is 18+ in Vercel Settings

### Styles not loading?
1. Clear `.next` folder and rebuild
2. Check CSS imports in components
3. Verify CSS module syntax if using modules

## Contributing

Feel free to fork this project and add your improvements!

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on [GitHub Issues](https://github.com/Hassan-Zahid-Khan-1/Bangles/issues)