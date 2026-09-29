import Sqids from "sqids";
import Counter from "../models/counter.model.js";
import Link from "../models/link.model.js";

const sqids = new Sqids({ minLength: 6 });

export const shortenUrl = async (longUrl) => {
  //example - https://students.ru.ac.ke/
  const counter = await Counter.findByIdAndUpdate(
    "links",
    { $inc: { seq: 1 } },
    { returnDocument: "after", upsert: true, runValidators: true }
  );
  const number = Array.from(String(counter?.seq), Number);

  //convert count digit(s) to random 6 digit hash
  const hash = sqids.encode(number); //bMZn4Y

  const shortUrl = `http://localhost:5000/api/v1/links/${hash}`;

  // if the orignial url does not exist create a new document
  // if it exists add the short url to that document
  const link = await Link.findOneAndUpdate(
    { longUrl },
    {
      $addToSet: { shortUrls: shortUrl },
      $setOnInsert: { longUrl },
    },
    { upsert: true, runValidators: "true", returnDocument: "after" }
  );

  return link;
};

export const redirectToOriginal = async (hash) => {
  const longUrl = await Link.findOne({
    shortUrls: `http://localhost:5000/api/v1/links/${hash}`,
  })
    .select("longUrl -_id")
    .lean(); //returns an object

  if (!longUrl) {
    const error = new Error("Page Not Found");
    error.statusCode = 404;
    throw error;
  }
  return longUrl.longUrl;
};
