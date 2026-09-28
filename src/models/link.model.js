import {Schema, model} from "mongoose";

const linkSchema = new Schema(
    {
        shortUrl: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        longUrl: {
            type: String,
            required: true,
            trim: true
        }
    }
);

const Link = model("Link", linkSchema);
export default Link;
