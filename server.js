const express = require("express"); // Inkluderar express
const app = express(); // Använder express

const mongoose = require("mongoose"); // Inkluderar mongoose

// Inkluderar och använder cors för att tillåta alla domäner
const cors = require("cors");
app.use(cors());

require("dotenv").config(); // Inkluderar env-fil

app.use(express.json()); // Middleware för konvertering till json
const port = process.env.PORT || 3000;

// Inkluderar och använder exporterade routes
const authRoutes = require("./routes/authRoutes"); // för admin-användare
const menuRoutes = require("./routes/menuRoutes"); // för restaurangens meny
const reviewRoutes = require("./routes/reviewRoutes") // för recensioner
const messageRoutes = require("./routes/messageRoutes"); // för meddelanden/kontakt
const bookingRoutes = require("./routes/bookingRoutes"); // för bokningar på webbplatsen

app.use("/api", authRoutes);
app.use("/api/cuisine", menuRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);

// Ansluter till MongoDB med URL från env-filen
mongoose.set("strictQuery", false); // Använder inte strikt sökning
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Ansluten till MongoDB!");
}).catch((error) => {
    console.error("Fel vid anslutning till databasen...");
});

// Startar applikationen
app.listen(port, () => {
    console.log("Servern startad på port: " + port);
});