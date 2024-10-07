/* user-model med regler för admin-användare */

const mongoose = require("mongoose"); // Inkluderar mongoose
const bcrypt = require("bcrypt"); // Inkluderar bcrypt för hashing av lösenord

// Användar-schema som definierar fält och regler för varje användare
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Hasha lösenord, körs innan användarens data saveas till databasen
userSchema.pre("save", async function(next) {
    try {
        // Om användaren är ny, hashas lösenordet
        if(this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword; // ersätter vanliga lösenord med det hashade
        }
        next(); // registrera användaren
    } catch(error) {
        next(error);
    }
});

// Registrera användare
userSchema.statics.register = async function (username, password) {
    try {
        const user = new this({ username, password });
        await user.save(); // sparar användaren i databasen
        return user; // returnerar den sparade användaren
    } catch(error) {
        throw error;
    }
};

// Jämför hashat lösenord med användarens lösenord
userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);

    } catch (error) {
        throw error; // skickar ev. fel
    }
}

// Logga in en användare
userSchema.statics.login = async function (username, password) {
    try {
        // Hitta anvndaren i databasen via användarnamnet
        const user = await this.findOne({ username});

        if(!user) {
            throw new Error("Felaktigt användarnamn eller lösenord."); // fel om användare ej finns
        }
        const isPasswordMatch = await user.comparePassword(password); // jämför lösenord

        // Om lösenord är inkorrekt
        if(!isPasswordMatch) {
            throw new Error("Felaktigt användarnamn eller lösenord.");
        }

        // Om allt är korrekt, returnera användaren
        return user;
    } catch(error) {
        throw error;
    }
}

// Skapar en user-modell baserad på schemat, lägger till i en collection "adminuser"
const User = mongoose.model("User", userSchema, "adminuser"); 
module.exports = User; // exportera User