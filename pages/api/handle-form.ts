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
    const date = new Date(req.body.Date);
    const day = date.toLocaleString("default", {
      day: "2-digit",
    });
    const month = date.toLocaleString("default", {
      month: "long",
    });

    const newItem = { ...req.body, day, month };
    db.collection("expense").insertOne(newItem, function (err: any, res: any) {
      if (err) {
        console.log("ERROR", err);
        throw err;
      }
      console.log("1 Item inserted");
    });
    res
      .status(200)
      .redirect("/redirect?message=Entry has been added successfully");
  } catch (e) {
    res
      .status(500)
      .redirect(
        "/redirect?message=Oops, somthing went wrong. Please try again"
      );
  }
}
