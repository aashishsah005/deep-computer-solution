# Deep Computer And Solution — Website

Full-stack MERN site for **Deep Computer And Solution**, Rangeli Rd,
Biratnagar 56613, Nepal — a computer sales & repair shop. Includes a
product catalog (new + refurbished, priced in NPR), a repair-booking
form, WhatsApp-first enquiries, and an admin panel for managing products
and repair requests.

## Stack
- **Frontend:** React + Vite + Tailwind CSS → deploy on **Vercel** (free)
- **Backend:** Node.js + Express → deploy on **Render** (free tier)
- **Database:** MongoDB Atlas (free M0 cluster)
- **Images:** Cloudinary (free tier)

## Project structure
```
deep-computer-solution/
  backend/     Express API, MongoDB models, admin auth
  frontend/    React site (public pages + /admin panel)
```

## 1. Backend setup
```bash
cd backend
npm install
cp .env.example .env
```
Fill in `.env`:
- `MONGO_URI` — from MongoDB Atlas (free cluster → Connect → Drivers)
- `JWT_SECRET` — any long random string
- `CLOUDINARY_*` — from your free Cloudinary dashboard
- `SHOP_WHATSAPP_NUMBER` — already set to `9779807305174` (shop's real WhatsApp number)

Create the first admin (owner) login:
```bash
node seed.js owner@deepcomputersolution.com yourpassword
```
This prints the login you'll use at `/admin/login`. **Change the password after first login** (you'll need to add a "change password" admin route, or update it directly via a script — not included by default to keep scope tight).

Run the API:
```bash
npm run dev      # http://localhost:5000
```

## 2. Frontend setup
```bash
cd frontend
npm install
```
`src/components/WhatsAppButton.jsx` already has the shop's real WhatsApp number (`9779807305174`, i.e. +977 980-7305174).

Run the site:
```bash
npm run dev       # http://localhost:5173
```
In dev, Vite proxies `/api` requests to `http://localhost:5000` (see `vite.config.js`).

## 3. What's included
- **Public site:** Home, Products (filter by category/condition, search), Product detail, Repair Services (with booking form), About, Contact
- **WhatsApp integration:** every product and the floating button open a pre-filled WhatsApp chat — no payment gateway needed since the shop takes orders by phone/WhatsApp
- **Admin panel** (`/admin/login`): dashboard stats, full product CRUD with image upload, repair request inbox with status updates (Pending → In Progress → Completed)

## 4. Still to fill in before launch
- Real "About" copy — shop history, years in business, certifications (`src/pages/About.jsx`)
- Shop logo / favicon
- Real shop photos (storefront/interior) for the homepage — swap into `src/pages/Home.jsx` once you have them exported from Google Maps or a phone camera
- Actual product photos and stock uploaded via the admin panel
- Business hours are currently listed as "flexible" — update `Footer.jsx` / `Contact.jsx` if the owner sets fixed hours later

Address, phone/WhatsApp, and map location are already filled in with the
real details (Rangeli Rd, Biratnagar 56613, Nepal / +977 980-7305174),
and prices are formatted in NPR.

## 5. Deployment (all free-tier)
1. **MongoDB Atlas** — create free M0 cluster, get connection string
2. **Cloudinary** — free account, get cloud name/API key/secret
3. **Render** — deploy `backend/` as a Web Service, add the same env vars from `.env`
4. **Vercel** — deploy `frontend/`, set the API base URL (update `src/api/client.js` baseURL to your Render URL, or add a rewrite/proxy in `vercel.json`)

## Notes on scope
This build intentionally skips online checkout/payment since the owner
wants browse-and-enquire, not e-commerce — that's what keeps this
achievable within a ₹10,000 budget and free hosting. If he later wants
online payment, Razorpay can be layered on top of the existing Product
model without a rebuild.
