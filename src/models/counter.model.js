import { Schema, model } from "mongoose";

const counterSchema = new Schema({
    _id: String,
    seq: {type: Number, default: 0}
});

const Counter = model("Counter", counterSchema);
export default Counter;
