import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "provide name"],
    },

    email: {
        type: String,
        required: [true, "provide email"],
    },

    password: {
        type: String,
        required: [true, "provide password"],
    },

    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: null
    },
    refresh_token: {
        type: String,
        default: ""
    },

    varify_email: {
        type: Boolean,
        default: false
    },
    last_login_date: {
        type: Date,
        default: ""
    },
    status: {
        type: String,
        enum: ["active", "inactive", "suspended"],
        default: "active"
    },
    address_details: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "address"
        }
    ],
    shoping_cart: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "cartProduct"
        }
    ],
    order_history: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "order"
        }
    ],

    forgot_password_otp: {
        type: String,
        default: null
    },
    forgot_password_expire: {
        type: Date,
        default: ""
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    },
},{
    timestamps: true
})

const UserModel = mongoose.model("user", userSchema);

export default UserModel;