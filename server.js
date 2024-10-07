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

app.use("/api", authRoutes);

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