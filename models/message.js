/* message-model med regler för att skicka meddelande på webbplatsen */


const mongoose = require("mongoose"); // Inkluderar mongoose

// Message-schema som definierar fält och regler för varje meddelande
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Ange ditt namn."]
    },
    email: {
        type: String,
        required: [true, "Ange din e-postadress."]
    },
    message: {
        type: String,
        required: [true, "Meddelandet kan inte vara tomt."]
    },
    response: {
        type: String,
        default: "" // Svar från admin, lämnas tomt tills det besvaras
    },
    dateSent: {
        type: Date,
        default: Date.now // Datum när meddelandet skickades
    }
});

// Skapar en message-modell baserad på schemat, lägger till i en collection "messages"
const Message = mongoose.model("Message", messageSchema, "messages");
module.exports = Message; // Exporterar Message
