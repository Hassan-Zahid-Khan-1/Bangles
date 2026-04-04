# BangleBelle — Next.js Frontend

A stunning Gen-Z feminine bangles e-commerce website with 5 pages, video hero, animations, and Cash on Delivery orders sent to your email.

## Pages
- **/** — Home (video hero, featured products, testimonials, stats)
- **/shop** — Shop (filter by category, sort, product modal)
- **/cart** — Cart + COD Checkout (order details emailed to you)
- **/about** — About Us (story, values, team)
- **/contact** — Contact form + FAQ
- **/wishlist** — Saved items

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure EmailJS (to receive orders by email)

Sign up free at https://www.emailjs.com

1. Create a **Service** (Gmail recommended) → copy your **Service ID**
2. Create an **Email Template** with these variables:
   - `{{from_name}}` — customer name
   - `{{customer_phone}}` — phone number  
   - `{{customer_email}}` — customer email
   - `{{delivery_address}}` — delivery address
   - `{{order_items}}` — list of ordered items
   - `{{grand_total}}` — total amount
   - `{{notes}}` — order notes
   - `{{message}}` — full order details
   - Set **To Email**: hzk3903159@gmail.com
3. Copy your **Template ID** and **Public Key**

4. Open `pages/cart.js` and replace:
```js
service_id: 'YOUR_SERVICE_ID',    // e.g. 'service_abc123'
template_id: 'YOUR_TEMPLATE_ID',  // e.g. 'template_xyz789'
user_id: 'YOUR_PUBLIC_KEY',       // e.g. 'user_ABCDEF123456'
```

> **Fallback**: Even without EmailJS, the order form uses `mailto:` so it will open your email client pre-filled with the order. Works instantly with no setup!

### 3. Run Development Server
```bash
npm run dev
```
Open http://localhost:3000

### 4. Build for Production
```bash
npm run build
npm start
```

## Hero Video
The hero section uses a video from Coverr.co. If the video doesn't load (external URL), you can:
1. Download a free video from https://coverr.co/s?q=jewelry
2. Place it in `/public/videos/hero.mp4`
3. Update the `src` in `pages/index.js`:
   ```html
   <source src="/videos/hero.mp4" type="video/mp4" />
   ```

## Deployment (Free)
Deploy instantly on **Vercel**:
```bash
npx vercel
```

## Tech Stack
- Next.js 14 (React)
- CSS Modules + Global CSS
- EmailJS for order notifications
- Unsplash for product images
- Coverr for hero video
- LocalStorage for cart & wishlist persistence
