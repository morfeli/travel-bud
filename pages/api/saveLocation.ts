import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../components/helper-functions/HelperFunctions";
// const mongodb = require("mongodb");

// const int32 = mongodb.Int32;

export default async function saveLocationHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;

    const {
      fsq_id,
      name,
      address,
      locality,
      email,
      objectID,
      venueLat,
      venueLon,
    } = data;

    const client = await connectToDatabase();

    const db = client.db("morfeli-travelbud");

    const userExists = await db.collection("saved-venues").findOne({
      userID: objectID,
    });

    const userAlreadySavedVenue = await db.collection("saved-venus").find({
      userID: objectID,
      savedVenues: { $in: [fsq_id] },
    });

    if (!userExists) {
      await db.collection("saved-venues").insertOne({
        userID: objectID,
        email: email,
        savedVenues: [{ name, address, locality, fsq_id, venueLat, venueLon }],
      });

      res.status(201).json({
        message: "Venue has been saved, go check it out :)",
      });

      client.close();
      return;
    }

    if (userExists && userAlreadySavedVenue) {
      res.status(201).json({
        message: "You already saved this venue, go check it out :)",
      });

      client.close();

      return;
    }

    if (userExists && !userAlreadySavedVenue) {
      await db.collection("saved-venues").updateOne(
        { userID: objectID },
        {
          $addToSet: {
            savedVenues: {
              name,
              address,
              locality,
              fsq_id,
              venueLat,
              venueLon,
            },
          },
        }
      );

      res.status(201).json({ message: "Saved!" });
      client.close();
    }
  }
}
