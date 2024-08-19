const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Your name is required."],
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
        type: Number,
        required: [true, "Phone number is required."],
    },

    password: {
        type: String,
        required: [true, "Password is required."],
        minLength: [8, "Password must be at least 8 characters."],
        match: [/^.{8,}$/,
            'Password must be at least 8 characters.'],
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