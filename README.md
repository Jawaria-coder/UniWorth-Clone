#   Uniworth Clone

A full-stack e-commerce web application inspired by **Uniworth**.  
Built using **Node.js, Express, MongoDB, and EJS views**, it provides both **customer features** and an **admin dashboard** for managing products and orders.

---

##  Features

###  Landing Page
- Beautiful responsive landing page built with **HTML, CSS, and JavaScript**.
- Showcases products and categories.

###  User Features
- **Authentication**  
  - Sign up and Login system with **cookies** and **JWT tokens**.  
  - Secured routes for logged-in users only.

- **Products & Categories**  
  - Browse products by categories (Shirts, Trousers, etc.).  
  - **Filter, sort, and search** functionality.  
  - Open product detail pages.

- **Cart & Checkout**  
  - Add products to cart (only after login).  
  - Provide shipping details to place orders.

- **Order Tracking**  
  - Orders have statuses:  
    - `Pending`  
    - `In Progress`  
    - `Delivered`  
    - `Completed`

### 🛠 Admin Panel
- Secure **Admin Dashboard** to manage store.  
- **Product Management**  
  - Add, edit, or remove products.  
  - Manage product categories.  
- **Order Management**  
  - View orders placed by users.  
  - Update order status (`Pending`, `In Progress`, `Delivered`, `Completed`).

---

## 🏗️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript, EJS (views)  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ORM)  
- **Authentication:** JWT Tokens, Cookies  
- **Other Tools:** Nodemon, dotenv, bcrypt, etc.  

---

## 📂 Project Structure

Uniworth-Clone/
├── views/ # EJS templates (Landing page, Products, Cart, Admin Panel, etc.)
├── public/ # Static assets (CSS, JS, Images)
├── models/ # MongoDB models (User, Product, Order, Category)
├── routes/ # Express routes (User, Auth, Admin, Products, Orders)
├── middleware/ # Auth middlewares (JWT, cookie checks)
├── app.js # Main server file
└── package.json # Dependencies

---

## 🚀 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/uniworth-clone.git
   cd uniworth-clone
Install dependencies:

npm install
nodemon app.js
Visit:

http://localhost:2000

Credentials
User
Sign up directly from UI.

Admin
Default Admin can be created directly in DB with isAdmin: true.

