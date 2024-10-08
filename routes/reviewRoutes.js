/* Routes för recensioner på webbplatsen */

const express = require("express"); // Inkluderar express
const router = express.Router(); // Inkluderar Router-objekt
const Review = require("../models/review"); // Inkluderar model-review

// GET-anrop för att visa recensioner
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find({}); // Hämta alla recensioner från MongoDB
        // Kontrollerar om det finns några recensioner
        if (reviews.length === 0) {
            return res.status(404).json({ message: "Det finns inga recensioner att hämta" });
        } else {
        return res.json(reviews); // Returnera recensioner
        }
    } catch (error) {
        console.error("Något gick fel vid hämtning av recensioner: ", error);
        return res.status(500).json({ error: "Serverfel, kunde inte hämta recensioner" });
    }
});

// POST-anrop för att lägga till en recension
router.post("/", async (req, res) => {
    try {
        // Validera inkommande data
        const { name, comment, rating } = req.body;
        if (!name || !comment || !rating) {
            return res.status(400).json({ error: "Vänligen ange ditt namn, betyg och kommentar." });
        }

        // Skapa ny recension med data från body
        const newReview = await Review.create({ name, comment, rating });
        res.status(201).json({ message: "Din recension har lagts till", review: newReview });
    } catch (error) {
        console.error("Något gick fel vid tillägg av recension: ", error);
        return res.status(500).json({ error: "Serverfel, kunde inte lägga till recension" });
    }
});


module.exports = router; // Exportera Router-objektet

