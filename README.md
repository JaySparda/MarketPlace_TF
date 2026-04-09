# 🎩 Mann Co. Store - Third-Party TF2 Marketplace

A full-stack e-commerce simulation inspired by the Team Fortress 2 universe. This project mimics a third-party marketplace where administrators can manage inventory and users can browse, manage a cart, and "purchase" items through a simulated payment flow.

---

## 🚀 Features

### **For Users**
* **Item Catalog:** Browse a wide variety of hats, weapons, and cosmetics.
* **Shopping Cart:** Add multiple items to a persistent cart before checking out.
* **Checkout Simulation:** A functional payment simulation to "finalize" orders and process transactions.

### **For Administrators (The "Saxton Hale" Experience)**
* **Inventory Management:** Full **CRUD** (Create, Read, Update, Delete) capabilities for the store catalog.
* **Product Editing:** Update item names, descriptions, and prices on the fly.
* **Stock Control:** Add new stock or remove listings directly from the dashboard.

---

## 🛡️ Security System
To ensure data integrity and secure access, the following measures are implemented:

* **Authentication:** User accounts are secured using **JWT (JSON Web Tokens)** for session management.
* **Password Hashing:** Sensitive user data is never stored in plain text; we use **bcrypt** for industry-standard encryption.
* **Protected API Routes:** Administrative actions (Add/Edit/Delete) are restricted to authorized accounts only.
* **Input Validation:** Server-side checks to prevent NoSQL injection and ensure data consistency in MongoDB.

---

## 🛠️ Tech Stack

* **Frontend:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) (for a lightning-fast development experience)
* **Backend:** [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
* **Database:** [MongoDB](https://www.mongodb.com/) (NoSQL)
* **Styling:** (Add your styling tool here, e.g., Tailwind CSS or CSS Modules)

---

## 🏗️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/JaySparda/MarketPlace_TF.git
    cd mann-co
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd server
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../client
    npm install
    ```

4.  **Environment Variables:**
    Create a `.env` file in your server directory and include:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```

5.  **Run the Application:**
    ```bash
    # From the server directory
    npm run dev
    ```

---

## 📝 Future Roadmap
* **Trading Bot Integration:** Simulate automated Steam trade offers.
* **Item Rarity Filters:** Sort by Strange, Unusual, or Vintage qualities.
* **Real-time Price Scraping:** Compare prices with the official Steam Community Market.

---

*Disclaimer: This is a fan-made project for educational purposes. All assets and themes are inspired by Team Fortress 2, owned by Valve Corporation.*
