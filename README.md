# 🎮 Gamers Den

A modern e-commerce storefront for gaming gear — built with React. Features a full authentication flow, product browsing with search and category filters, a sliding cart sidebar, and an order confirmation screen.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react) ![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## ✨ Features

- **Authentication** — Login and Sign Up with form validation
- **Product Catalogue** — 16 products across 4 categories with tag badges (Best Seller, Hot, New, Top Rated)
- **Search** — Filter products by name or category in real time
- **Category Tabs** — Browse Peripherals, PC Components, Consoles & Controllers, and Gaming Chairs & Desks
- **Cart Sidebar** — Add items, adjust quantities, and remove products with a smooth slide-in animation
- **Checkout Flow** — Order summary and confirmation screen
- **Responsive Design** — Works across desktop and mobile screen sizes

---

## 🛠️ Tech Stack

- **React** (Hooks — useState, useEffect)
- **CSS-in-JS** (injected via `<style>` tag with CSS custom properties)
- **Google Fonts** — DM Serif Display & DM Sans

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/gamers-den.git

# Navigate into the project
cd gamers-den

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `(https://gamers-den-ashen.vercel.app/)`

---

## 📁 Project Structure

```
gamers-den/
├── src/
│   └── App.jsx        # Main application file
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 📸 Preview

> Login screen → Browse products → Add to cart → Checkout

---

## 🔧 Customisation

- **Products** — Edit the `PRODUCTS` array in `App.jsx` to add, remove, or update items
- **Categories** — Update the `CATEGORIES` array to add new sections
- **Colours** — All colours are defined as CSS variables inside the `:root` block in the `css` string, making it easy to retheme the entire app

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Seemon Das**  
🌐 [seemondas.com](https://seemondas.com)  
💼 [GitHub]([https://github.com/your-username](https://github.com/seemondas))
