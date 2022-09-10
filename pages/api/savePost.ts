import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../components/helper-functions/HelperFunctions";
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectId;

export default async function savePosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { post, rateValue, username, objectID, name, address, localilty } =
      req.body;

    const client = await connectToDatabase();

    const db = client.db("morfeli-travelbud");

    await db.collection("user-posts").insertOne({
      username: username,
      objectID: ObjectID.createFromHexString(objectID),
      post: post,
      rating: rateValue,
      venue: name,
      address: address,
      localilty: localilty,
    });

    client.close();
  }
}
