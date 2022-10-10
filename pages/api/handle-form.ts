import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  try {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@=============================");
    let { db } = await connectToDatabase();

    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@1111111111111111111111");

    const newItem = req.body;
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@22222222222222222222222222222");
    db.collection("expense").insertOne(newItem, function (err: any, res: any) {
      if (err) {
        console.log("ERROR", err);
        throw err;
      }
      console.log("1 Item inserted");
    });
    console.log("#########################22222222222222222222222222222");
    res.status(200).send({ message: "Item inserted successfully" });
    // res.redirect("/?status=success");
  } catch (e) {
    res.status(500).send({ message: "Item inserted Failed" });
    // res.redirect("/?status=failure");
  }
}
