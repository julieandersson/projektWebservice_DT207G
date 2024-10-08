/* Routes för att skicka meddelande på webbplatsen */

const express = require("express"); // Inkluderarr express
const router = express.Router(); // Inkluderar Router-objekt
const Message = require("../models/message"); // Inkluderar message-modell
const { authenticateToken } = require("../functions/validateAuth"); // Inkluderar autentiseringsfunktionen

// POST-route för att skicka ett meddelande
router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validera att nödvändig information har skickats med
        if (!name || !email || !message) {
            return res.status(400).json({ error: "Vänligen fyll i namn, e-post och meddelande." });
        }

        // Skapa ett nytt meddelande och spara i databasen
        const newMessage = await Message.create({ name, email, message });

        // Skicka auto-svar till användaren
        res.status(201).json({ message: "Ditt meddelande har mottagits. Vi återkommer så snart som möjligt!", newMessage });
    } catch (error) {
        console.error("Något gick fel vid skickandet av meddelandet: ", error);
        res.status(500).json({ error: "Ett fel uppstod, vänligen försök igen senare." });
    }
});

// GET-route för att hämta alla meddelanden (endast åtkomlig för inloggad admin)
router.get("/", authenticateToken, async (req, res) => {
    try {
        // Hämta alla meddelanden från databasen
        const messages = await Message.find({});
        if (messages.length === 0) {
            return res.status(404).json({ message: "Inga meddelanden att visa." });
        }
        res.json(messages);
    } catch (error) {
        console.error("Något gick fel vid hämtning av meddelanden: ", error);
        res.status(500).json({ error: "Kunde inte hämta meddelanden." });
    }
});

// PUT-route för att svara på ett meddelande (endast åtkomlig för inloggad admin)
router.put("/:id/response", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { response } = req.body;

        // Kontrollera att ett svar har skickats med
        if (!response) {
            return res.status(400).json({ error: "Vänligen skriv ett svar." });
        }

        // Uppdatera meddelandet med admin-svaret
        const updatedMessage = await Message.findByIdAndUpdate(id, { response }, { new: true });
        if (!updatedMessage) {
            return res.status(404).json({ message: "Meddelandet hittades inte." });
        }

        res.json({ message: "Svaret har skickats!", updatedMessage });
    } catch (error) {
        console.error("Något gick fel vid svarandet på meddelandet: ", error);
        res.status(500).json({ error: "Kunde inte skicka svar." });
    }
});

module.exports = router; // Exporterar router-objektet
