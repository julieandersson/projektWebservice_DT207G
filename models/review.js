/* Review-model med regler för recensioner på webbplatsen */

const mongoose = require("mongoose"); // Inkluderar mongoose

// Review-schema som definierar fält och regler för varje recension
const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Du måste ange ditt namn."]
    },
    comment: {
        type: String,
        required: [true, "Du måste lämna en kommentar."]
    },
    rating: {
        type: Number,
        required: [true, "Sätt en rating."],
        min: [1, "Rating kan inte vara mindre än 1."],
        max: [5, "Högsta rating är 5."]
    },
    date: {
        type: Date,
        default: Date.now // aktuellt datum för när recension gjordes
    }
});

// Skapar en review-modell baserad på schemat, lägger till i en collection "reviews"
const Review = mongoose.model("Review", reviewSchema, "reviews");
module.exports = Review; // Exportera Review