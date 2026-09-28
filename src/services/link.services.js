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
    { returnDocument: after, upsert: true }
  );

  //convert count to base62
  const encoded = base62.encode(counter?.seq); //0

  //convert encoded to random 6 digit hash
  const hash = sqids.encode([encoded]); //bMZn4Y

  const shortUrl = `https://dorrop.ly/${hash}`;

  const link = await Link.create({ shortUrl, longUrl });
  return link;
};
