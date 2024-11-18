import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    categoryId: [
        {
            type: mongoose.Schema.ObjectId,
            ref : "category"
        }
    ]
}, {
    timestamps: true
})

const CategoryModel = mongoose.model("subCategory", subCategorySchema);
export default CategoryModel;