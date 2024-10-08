const express = require("express"); // Inkluderar express
const router = express.Router(); // Skapar en router
const Booking = require("../models/booking"); // Inkluderar booking-modellen
const { authenticateToken } = require("../functions/validateAuth"); // Inkluderar autentiseringsfunktionen

// POST-route för att göra en bokning
router.post("/", async (req, res) => {
    try {
        const { name, email, phoneNumber, numberOfGuests, bookingDate, specialRequests } = req.body;

        // Validera att nödvändig information har skickats med
        if (!name || !email || !phoneNumber || !numberOfGuests || !bookingDate) {
            return res.status(400).json({ error: "Vänligen fyll i alla obligatoriska fält: namn, e-post, telefonnummer, antal gäster och bokningsdatum." });
        }

        // Skapa en ny bokning och spara i databasen
        const newBooking = await Booking.create({ name, email, phoneNumber, numberOfGuests, bookingDate, specialRequests });

        // Skicka bekräftelse till användaren
        res.status(201).json({ message: "Din bokning har registrerats. Vi ser fram emot ditt besök!", booking: newBooking });
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Om det är ett valideringsfel, returnera specifikt felmeddelande
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: messages.join(', ') });
        }
        console.error("Något gick fel vid bokningen: ", error);
        res.status(500).json({ error: "Ett serverfel uppstod, vänligen försök igen senare." });
    }
});

// GET-route för att hämta alla bokningar (endast åtkomlig för inloggad admin)
router.get("/", authenticateToken, async (req, res) => {
    try {
        // Hämta alla bokningar från databasen
        const bookings = await Booking.find({});
        if (bookings.length === 0) {
            return res.status(404).json({ message: "Inga bokningar att visa." });
        }
        res.json(bookings);
    } catch (error) {
        console.error("Något gick fel vid hämtning av bokningar: ", error);
        res.status(500).json({ error: "Kunde inte hämta bokningar." });
    }
});

module.exports = router; // Exporterar router-objektet