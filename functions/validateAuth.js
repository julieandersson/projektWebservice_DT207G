const jwt = require("jsonwebtoken"); // Inkludera jsonwebtoken

// Middleware-funktion för att validera token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Hämtar token från Authorization-headern

    // Om ingen token finns/om användaren ej har tillgång till sidan, returnera status 401 (Unauthorized)
    if (token == null) {
        return res.status(401).json({ message: "Nekad åtkomst, token saknas." });
    }

    // Verifiera JWT-token med hemliga nyckeln
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if (err) {
            // Om token är ogiltig, returnera status 403 (Forbidden)
            return res.status(403).json({ message: "Ogiltig JWT-token." });
        }

        req.username = username; // Tilldela det dekodade användarnamnet till request-objektet
        next(); // Fortsätt till nästa middleware eller route-handler
    });
}

module.exports = { authenticateToken }; // Exporterar funktionen
