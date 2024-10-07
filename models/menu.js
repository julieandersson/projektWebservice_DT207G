/* menu-model med regler för menyn på webbplatsen */

const mongoose = require("mongoose"); // Inkludera mongoose

// Meny-schema som definierar fält och regler för varje maträtt
const menuSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Du måste ange ett namn på maträtten."],
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Du måste ange vad maträtten kostar."]
    },
    category: {
        type: String,
        required: [true, "Du måste ange vilken kategori maträtten tillhör."],
        enum: ['Förrätt', 'Nigiri', 'Maki', 'Varma rätter', 'Dessert', 'Cocktails']
    }
});

// Skapar en menu-modell baserad på schemat, lägger till i en collection "menu"
const Menu = mongoose.model("Menu", menuSchema, "menu");
module.exports = Menu; // exporterar Menu