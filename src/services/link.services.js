import base62 from "base62";
import Sqids from "sqids";
import Link from "../models/link.model.js";
import Counter from "../models/counter.model.js";

const sqids = new Sqids({ minLength: 6 });

export const shortenUrl = async (longUrl) => {
  //example - https://students.ru.ac.ke/
  const counter = await Counter.findByIdAndUpdate(
    "links",
    { $inc: { seq: 1 } },
    { returnDocument: "after", upsert: true }
  );

  //convert count to base62
  const encoded = base62.encode(counter?.seq); //0

  //convert encoded to random 6 digit hash
  const hash = sqids.encode([encoded]); //bMZn4Y

  const shortUrl = `http://localhost:5000/api/v1/links/${hash}`;

  const link = await Link.create({ shortUrl, longUrl });
  return link;
};

export const redirectToOriginal = async (hash) => {
  const longUrl = await Link.findOne({
    shortUrl: `http://localhost:5000/api/v1/links/${hash}`,
  }).select("longUrl -_id").lean();  //returns an object
  return longUrl.longUrl;
};
