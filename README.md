# 📦 IKEA Style E-Commerce Platform

A full-stack E-Commerce application built with **Node.js**, **Express**, **MySQL**, and **React**. The design focuses on minimalism and usability (inspired by IKEA), featuring a complete Admin Panel, JWT Authentication, and a dynamic shopping cart.

![Project Status](https://img.shields.io/badge/status-development-orange)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🚀 Features

### 🛒 User Features (Frontend)
* **Product Catalog:** Browse products with advanced filtering (Category, Price Range).
* **Search:** Real-time product search.
* **Shopping Cart:** Add/Remove items, dynamic total calculation (persisted in LocalStorage).
* **User Account:** Register and Login (JWT secured).
* **Responsive Design:** Optimized for Mobile and Desktop (Minimalist UI).

### 🛡️ Admin Features (Backoffice)
* **Dashboard:** Overview of sales, orders, and stock status.
* **Product Management:** Create, Update, and Delete products.
* **Order Management:** View orders and update status (Pending -> Shipped).
* **User Management:** View registered customers.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS (or CSS Modules), Axios, Context API.
* **Backend:** Node.js, Express.js.
* **Database:** MySQL.
* **Authentication:** JSON Web Tokens (JWT), Bcrypt.

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v14 or higher)
* [MySQL Server](https://dev.mysql.com/downloads/mysql/)
* [Git](https://git-scm.com/)
* [xampp](https://www.apachefriends.org/download.html) (port 3306 for mysql )

---

## 📥 Installation & Setup

Follow these steps to get the project running locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/votre-nom-utilisateur/nom-du-repo.git](https://github.com/votre-nom-utilisateur/nom-du-repo.git)
cd .\E-commerce web
npm install
npm seed.js
npm server.js
cd .\frontend 
npm install
npm start

```

