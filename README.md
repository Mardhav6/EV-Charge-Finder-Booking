# 🚗 EV Charge Finder & Booking System

An intuitive web application designed to help electric vehicle (EV) users find nearby charging stations, view availability, and book slots in advance. Built with a modern tech stack including **React (TypeScript)**, **Tailwind CSS**, and **Firebase** for authentication.

---

## 🌟 Features

- 🔍 Search for EV charging stations based on location
- 📍 View station details and availability
- 📅 Book charging slots in advance
- 🔐 User authentication (login/signup)
- 🧾 View and manage bookings from a dashboard

---

## 🛠️ Tech Stack

- **Frontend:** React (with TypeScript), Tailwind CSS
- **Authentication:** Firebase Auth
- **Database:** Firebase Firestore / SQL (based on file structure)
- **Deployment:** (Add your platform – e.g., Vercel, Netlify)

---

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mardhav6/EV-Charge-Finder-Booking.git
   cd EV-Charge-Finder-Booking
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project.
   - Add your Firebase config to `firebase-config.ts`.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```
📦 EV-Charge-Finder-Booking
├── src/
│   ├── components/          # Reusable components (e.g., Navbar, BookingCard)
│   ├── pages/               # Page components (Home, Login, Signup)
│   ├── context/             # Auth context using React Context API
│   ├── firebase-config.ts   # Firebase configuration
│   └── App.tsx              # Root component
├── public/
├── tailwind.config.js       # Tailwind CSS configuration
├── package.json
└── README.md
```

---

## 📸 Screenshots

*(Add screenshots of your app here if available)*

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT License
