import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@", req.query);
  try {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@=============================");
    let { db } = await connectToDatabase();

    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@1111111111111111111111");

    const newItem = req.query;
    console.log(
      "@@@@@@@@@@@@@@@@@@@@@@@@@@@22222222222222222222222222222",
      typeof newItem
    );
    db.collection("expense").insertOne(newItem, function (err: any, res: any) {
      if (err) {
        console.log("ERROR", err);
        throw err;
      }
      console.log("1 Item inserted");
    });
    console.log("########################");
    res.status(200).send({ message: "Item inserted successfully" });
  } catch (e) {
    res.status(500).send({ message: "Item inserted Failed" });
  }
}
