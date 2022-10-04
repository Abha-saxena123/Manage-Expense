import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let { db } = await connectToDatabase();

    const newItem = req.body;
    db.collection("expense").insertOne(newItem, function (err: any, res: any) {
      if (err) {
        console.log("ERROR", err);
        throw err;
      }
      console.log("1 Item inserted");
    });
    res.status(200);
    res.redirect("/?status=success");
  } catch (e) {
    res.status(500);
    res.redirect("/?status=failure");
  }
}
