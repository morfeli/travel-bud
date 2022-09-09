import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../components/helper-functions/HelperFunctions";

export default async function saveLocationHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;

    const { fsq_id, name, address, locality, email, objectID } = data;
    const client = await connectToDatabase();

    const db = client.db("morfeli-travelbud");

    const userExists = await db.collection("saved-venues").findOne({
      userID: objectID,
    });

    const userAlreadySavedVenue = await db.collection("saved-venus").findOne({
      userID: objectID,
      savedVenus: { $in: [fsq_id] },
    });

    if (!userExists) {
      await db.collection("saved-venues").insertOne({
        userID: objectID,
        email: email,
        savedVenues: [{ name, address, locality, fsq_id }],
      });
    } else if (userExists && userAlreadySavedVenue) {
      if (userAlreadySavedVenue) {
        res.status(201).json({
          message: "You already saved this venue, go check it out :)",
        });

        return;
      }
    } else if (userExists && !userAlreadySavedVenue) {
      db.collection("saved-venues").updateOne(
        { userID: objectID },
        { $addToSet: { savedVenues: { name, address, locality, fsq_id } } }
      );
    }

    res.status(201).json({ message: "Saved!" });
    client.close();
  }
}
