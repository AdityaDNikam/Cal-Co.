import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
        },
        age: {
            type: Number,
            required: [true, "Age is required"],
            min: [1, "Age must be a positive number"],
            max: [80, "Age must be less than 80"]
        },
        // Weight is in Kg
        weight: {
            type: Number,
            required: [true, "Weight is required"],
            min: [20, "Weight must be at least 20kg"],
            max: [400, "Weight must be less than 400kg"]
        },
        // Height is in cms
        height: {
            type: Number,
            required: [true, "Height is required"],
            min: [60, "Height must be at least 60cms"],
            max: [300, "Height must be less than 200cms"]
        },
        country: {
            type: String,
            required: [true, "Country is required"],
            trim: true,
            enum: ["India", "USA", "UK", "Australia", "Canada", "Germany", "France", "Italy", "Spain", "Portugal", "Brazil", "Mexico", "Argentina", "Chile", "Colombia", "Peru", "Venezuela", "Ecuador", "Bolivia", "Paraguay", "Uruguay", "Guyana", "Suriname", "French Guiana"],
        },
        email: {
            type: String,
            required: [true, "Email address is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
        },
        contactNumber: {
            type: String,
            required: [true, "Contact number is required"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

User.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


export default User;