/* Routes för menyn på webbplatsen */

const express = require("express"); // Inkluderar express
const router = express.Router(); // Inkluderar Router-objekt
const Menu = require("../models/menu"); // Inkluderar menu-model
const { authenticateToken } = require("../functions/validateAuth.js"); // Inkluderar autentiseringsfuntion

// GET-route för att hämta alla maträtter (cuisine) på menyn
router.get('/', async (req, res) => {
    try {
        const cuisines = await Menu.find({}); // Hämta alla maträtter från MongoDB
        if (!cuisines || cuisines.length === 0) {
            return res.status(404).json({ message: "Menyn är tom, inga maträtter hittades." });
        }
        return res.json(cuisines); // Returnera listan av maträtter
    } catch (error) {
        console.error("Fel vid hämtning av menyn: ", error);
        return res.status(500).json({ error: "Serverfel, kunde inte hämta menyn." });
    }
});

// POST-route för att lägga till en ny maträtt (cuisine) på menyn
router.post('/', authenticateToken, async (req, res) => {
    try {
        const newCuisine = new Menu(req.body); // Skapa en ny maträtt med data från request body
        await newCuisine.save(); // Spara den nya maträtten i databasen
        res.status(201).json({ message: "Ny maträtt tillagd på menyn." });
    } catch (error) {
        console.error("Fel vid tillägg av ny maträtt: ", error);
        res.status(500).json({ error: "Serverfel, kunde inte lägga till maträtten." });
    }
});

// PUT-route för att uppdatera en specifik maträtt (cuisine) på menyn
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params; // Hämta id på maträtt från URL-parametrarna
        const updatedCuisine = await Menu.findByIdAndUpdate(id, req.body, { new: true }); // Uppdatera maträtt
        if (!updatedCuisine) {
            return res.status(404).json({ message: "Maträtt hittades inte, kunde inte uppdatera." });
        }
        return res.json({ message: "Maträtt uppdaterades.", updatedCuisine });
    } catch (error) {
        console.error("Fel vid uppdatering av maträtt: ", error);
        return res.status(400).json({ error: "Felaktig förfrågan, kunde inte uppdatera maträtten." });
    }
});

// DELETE-route för att ta bort en specifik maträtt (cuisine) från menyn
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params; // Hämta id på maträtt från URL-parametrarna
        const deletedCuisine = await Menu.findByIdAndDelete(id); // Ta bort maträtt
        if (!deletedCuisine) {
            return res.status(404).json({ message: "Maträtt hittades inte, kunde inte tas bort." });
        }
        return res.json({ message: "Maträtt borttagen från menyn." });
    } catch (error) {
        console.error("Fel vid borttagning av maträtt: ", error);
        return res.status(500).json({ error: "Serverfel, kunde inte ta bort maträtten." });
    }
});

module.exports = router; // Exporterar router-objektet