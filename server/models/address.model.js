import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address_line: {
        type: String,
        defalut: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    pincode: {
        type: String,
    },
    country: {
        type: String,
    },
    moblile: {
        type: Number,
        defalut: null
    }
}, {
    timestamps: true
})

const AddressModel = mongoose.model("address", addressSchema);
export default AddressModel;