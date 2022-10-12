import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let { db } = await connectToDatabase();

    const newItem = JSON.parse(req.body);
    db.collection("expense").insertOne(newItem, function (err: any, res: any) {
      if (err) {
        console.log("ERROR", err);
        throw err;
      }
      console.log("1 Item inserted");
    });
    res.status(200).send({ message: "Item inserted successfully" });
  } catch (e) {
    res.status(500).send({ message: "Item inserted Failed" });
  }
}
