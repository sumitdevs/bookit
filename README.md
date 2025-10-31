# 🧭 BookIT — Adventure & Experience Booking Platform  

BookIT is a **full-stack MERN application** that allows users to explore, book, and confirm exciting experiences such as kayaking, rafting, trekking, and more. It features dynamic slot availability, promo code validation, and seamless booking confirmation.  

---

## 🚀 Features  

### 🌐 Frontend (React + Vite)
- Interactive homepage with live search  
- Experience detail page with dynamic slot and date selection  
- Secure checkout page with promo code validation  
- Booking confirmation/failure feedback  
- Responsive UI built using **Tailwind CSS**

### 🧠 Backend (Node.js + Express + MongoDB)
- RESTful API for experiences, bookings, and promo validation  
- MongoDB models for experiences, slots, and promos  
- Atomic booking updates to prevent double-booking  
- Promo code validation (flat and percentage discounts)  
- Database seeding script (`seed.js`)

---

## 🧩 Folder Structure  
```
BookIT/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ │ ├── bookings.controller.js
│ │ │ ├── experiences.controller.js
│ │ │ └── promo.controller.js
│ │ ├── models/
│ │ │ ├── Booking.js
│ │ │ ├── Experience.js
│ │ │ └── Promo.js
│ │ ├── routes/
│ │ │ ├── bookings.routes.js
│ │ │ ├── experiences.routes.js
│ │ │ └── promo.routes.js
│ │ ├── utils/
│ │ │ └── seed.js
│ │ ├── app.js
│ │ └── index.js
│ ├── .env
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ │ ├── Header.jsx
│ │ │ ├── Footer.jsx
│ │ │ └── TourCards.jsx
│ │ ├── pages/
│ │ │ ├── HomePage.jsx
│ │ │ ├── ProductDetailPage.jsx
│ │ │ ├── CheckoutPage.jsx
│ │ │ └── BookingConfirmed.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── package.json
│ └── index.html
│
├── .gitignore
└── README.md
```


---

## ⚙️ Installation & Setup  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/yourusername/BookIT.git
cd BookIT
```

### 2️⃣ Backend Setup
```
cd backend
npm install
```
Create a .env file inside /backend and add:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
Seed sample data:
```
node src/utils/seed.js
```
Start backend server:
```
npm start
```
### 3️⃣ Frontend Setup
```
cd ../frontend
npm install
npm run dev
```
### 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **GET** | `/api/experiences` | Fetch all experiences |
| **GET** | `/api/experiences/:id` | Fetch a specific experience |
| **POST** | `/api/bookings` | Create a new booking |
| **POST** | `/api/promo/validate` | Validate promo code |


###💡 Core Functionalities
Prevent Double-Booking: Each booking transaction locks the slot availability atomically.
Dynamic Slot Updates: Available seats automatically decrease after successful bookings.
Promo Code Validation:
SAVE10 → 10% off
FLAT100 → ₹100 off
Form Validation: Ensures valid inputs before confirming bookings.
Real-Time Feedback: Users receive success/failure pages after each booking attempt.

## 🧠 Technologies Used

| Layer      | Technologies                           |
|-------------|----------------------------------------|
| **Frontend** | React, Vite, Tailwind CSS              |
| **Backend**  | Node.js, Express.js                    |
| **Database** | MongoDB, Mongoose                      |
| **Others**   | Axios, Dotenv, Morgan, CORS            |

### 🧰 Scripts

| Section | Command | Description |
|----------|----------|-------------|
| **Backend** | `npm start` | Start backend server |
| **Backend** | `npm run seed` | Seed database with sample data |
| **Frontend** | `npm run dev` | Start development server |
| **Frontend** | `npm run build` | Build production-ready frontend |

### 📸 Screenshots

| Page | Description | Preview |
|------|--------------|----------|
| 🏠 **HomePage** | Displays all available experiences with search | ![HomePage](https://github.com/yourusername/BookIT/assets/homepage.png) |
| 📄 **ProductDetailPage** | Date/time selection and booking | ![ProductDetailPage](https://github.com/yourusername/BookIT/assets/productdetail.png) |
| 💳 **CheckoutPage** | Promo code & payment validation | ![CheckoutPage](https://github.com/yourusername/BookIT/assets/checkout.png) |
| ✅ **BookingConfirmed** | Displays confirmation and reference ID | ![BookingConfirmed](https://github.com/yourusername/BookIT/assets/bookingconfirmed.png) |




### 🛠️ Future Enhancements
- Add payment gateway integration (Stripe / Razorpay)
- User login & booking history
- Admin dashboard for managing slots & experiences
- Email booking confirmation






