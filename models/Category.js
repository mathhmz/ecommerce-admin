import mongoose from "mongoose";

const { Schema, model, models } = mongoose;



const CategorySchema = new Schema({
    name: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null}
});

const Category = models?.Category || model('Category', CategorySchema);

export default Category;