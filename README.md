# 🛒 Online Shopping

A full-stack online store built with **Next.js** and **PostgreSQL**. Users can sign up, log in, browse products by category and go through a mock checkout.

## ✨ Features

- 🔐 **Sign up & login**: passwords hashed with bcrypt, sessions with JWT
- 🛍️ **Product catalog**: categories like clothing, electronics, furniture and home & living
- 🛒 **Shopping cart**: add items, change quantity, remove, see subtotal, shipping and total (saved in the browser)
- 🎠 **Animated UI**: carousels with Swiper, animations with Framer Motion
- 💳 **Mock checkout**: pay for the whole cart with a test payment (no real money)
- 📧 **Email**: welcome email on sign-up with Nodemailer
- 💬 **Contact & feedback** pages

## 🛠 Built with

| Part | Tech |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Backend | Next.js API routes |
| Database | PostgreSQL + Knex.js (migrations) |
| Auth | bcryptjs, jsonwebtoken |
| Other | Nodemailer, Swiper, Framer Motion |

## 🚀 Run it locally

**1. Clone and install**

```bash
git clone https://github.com/AshishRai-0197/online_shopping.git
cd online_shopping
npm install
```

**2. Create a `.env` file**

```env
PG_USER=your_db_user
PG_PASSWORD=your_db_password
PG_DATABASE=online_shopping
JWT_SECRET=a_long_random_secret
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=you@example.com
EMAIL_PASS=your_email_password
```

> The database runs on `localhost:5433` (set in `knexfile.js`).

**3. Create the tables and start the app**

```bash
npx knex migrate:latest
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## 🗄️ Database tables

- **users**: name, email, hashed password
- **products**: name, price, description, brand

## 📁 Project structure

```
app/
  api/          # signup, login, email, fake_payment
  products/     # product listing
  cart/         # shopping cart page
  context/      # CartContext (cart state, saved to localStorage)
  _components/  # Header, Footer, FlipCard
  signup/       # sign-up page
  contact/      # contact page
  feedback/     # feedback page
migrations/     # database tables
```

## 👤 Author

**Ashish Rai**: [LinkedIn](https://www.linkedin.com/in/ashish-rai-776022383/) · [GitHub](https://github.com/AshishRai-0197)
