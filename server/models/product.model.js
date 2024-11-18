import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name: {
        type: String,

    },
    image: {
        type: Array,
        dafault: []
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "category"
        }
    ],
    subCategory: [
        {

            type: mongoose.Schema.ObjectId,
            ref: "subCategory"
        }
    ],
    unit: {
        type: String,
        default: ""
    },
    stock: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: null
    },
    description: {
        type: String,
        default: ""
    },
    more_details: {
        type: Object,
        default: {}
    },
    publish: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;