const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Your first name is required."],
        trim: true,
    },

    address: {
        type: String,
    },

    email: {
        type: String,
        required: [true, "Email is required."],
        trim: true,
        unique: [true, "Email already exist"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Provide a valid email address."]
    },

    phoneNumber: {
        type: Number
    },

    password: {
        type: String,
        required: [true, "Password if required."],
        minLength: [8, "Password must be at least 8 characters."],
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            'Password musr contain at least one uppercase letter, one lowercase letter, and one number'],
        select: false
    },
    gender: {
        type: String

    },
    location: {
        type: String
    },
}, { timestamps: true })


// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("users", userSchema)