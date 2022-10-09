import { error } from "console";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const id = uuidv4();
    const data = { ...req.body, id: id };
    fs.writeFile(
      `contactData/${req.body.name}_id=${id}.json`,
      JSON.stringify(data),
      (error) => {
        console.log(error);
      }
    );
  } else {
    console.log("only POST is available ");
  }
}
