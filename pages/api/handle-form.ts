// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import exceljs from "exceljs";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let nameFileExcel = `pages/api/test.xlsx`;
    const workbook = new exceljs.Workbook();
    const day = new Date(req.body["Date"]).toLocaleString("default", {
      day: "2-digit",
    });
    const month = new Date(req.body["Date"]).toLocaleString("default", {
      month: "long",
    });
    //column = Category	Month	Day	Type	Amount	Remarks
    const headers = [
      "Category",
      "Type",
      "Date",
      "Day",
      "Month",
      "Amount",
      "Remarks",
    ];
    const column = ["A", "B", "C", "D", "E", "F", "G"];
    workbook.xlsx.readFile(nameFileExcel).then(function () {
      const worksheet = workbook.getWorksheet(1);
      const lastRow = worksheet.lastRow ? worksheet.lastRow.number + 1 : 2;
      const getRowInsert = worksheet.getRow(lastRow);
      column.map((c, i) => {
        getRowInsert.getCell(c).value = req.body[headers[i]];
      });

      getRowInsert.getCell("D").value = day;
      getRowInsert.getCell("E").value = month;

      getRowInsert.commit();
      return workbook.xlsx.writeFile(nameFileExcel);
    });
    res.redirect("/?status=success");
    res.status(200);
  } catch (e) {
    res.redirect("/?status=failure");
    res.status(500);
  }
}
