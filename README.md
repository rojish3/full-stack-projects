# Inventory Management System

## Description

This project is an Inventory Management System built using the MERN stack – MongoDB, Express.js, React, and Node.js. It's designed to efficiently manage inventory, track stock levels, and handle product information in a user-friendly interface.

## Features

- **User Authentication:** Secure user authentication and authorization using JWT tokens.
- **Dashboard Overview:** Provides a snapshot of current stock levels, sales, and product statistics.
- **Product Management:** Add, edit, and delete products with details such as name, description, price, quantity, and more.
- **Inventory Tracking:** Real-time monitoring of inventory levels and automatic notifications for low stock.
- **Order Management:** Create, track, and manage orders with order status updates.
- **Reporting and Analytics:** Generate reports on inventory, sales, and other key metrics.
- **Responsive UI:** A user-friendly interface accessible across different devices.

## Installation

1. **Clone Repository:**

   ```
   git clone https://github.com/rojish3/inventory-management-system.git
   cd inventory-management-system
   ```

2. **Server Setup:**

   ```
   cd be
   npm install
   ```

3. **Client Setup:**

   ```
   cd fe
   npm install
   ```

4. **Environment Variables:**

   - Create a `.env` file in the `server` directory and add necessary environment variables such as database connection strings, JWT secret, etc.

5. **Start Application:**

   ```
   # Start the server
   cd be
   npm start

   # Start the client
   cd fe
   npm run dev
   ```

6. **Access Application:**
   Open a web browser and go to `http://localhost:5173` to access the application.

## Technologies Used

- **Frontend:**
  - React
  - HTML/CSS
  - Tailwind
  - Typescript
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
