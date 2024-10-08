/* booking-model med regler för bordsbokningar */

const mongoose = require("mongoose"); // Inkluderar mongoose

// Booking-schema som definierar fält och regler för varje bokning
const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Ange ditt namn för bokningen."]
    },
    email: {
        type: String,
        required: [true, "Ange din e-postadress för bokningen."]
    },
    phoneNumber: {
        type: String,
        required: [true, "Ange ditt telefonnummer för bokningen."]
    },
    numberOfGuests: {
        type: Number,
        required: [true, "Ange antal gäster för bokningen."]
    },
    bookingDate: {
        type: Date,
        required: [true, "Ange datum och tid för bokningen."]
    },
    specialRequests: {
        type: String,
        default: "" // Lämnas tom om inga särskilda önskemål anges
    },
    dateCreated: {
        type: Date,
        default: Date.now // Datum då bokningen skapades
    }
});

// Skapar en booking-modell baserad på schemat, lägger till i en collection "bookings"
const Booking = mongoose.model("Booking", bookingSchema, "bookings");
module.exports = Booking; // Exporterar Booking