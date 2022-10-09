// api are written just like node
// http://localhost:3000/api/getblogs?slug=learn-nextjs
import * as fs from "fs";
export default function handler(req, res) {
  fs.readFile(`blogData/${req.query.slug}.json`, "utf-8", (err, data) => {
    if (err) {
      res.status(404).json({ error: "No such blog found" });
      return;
    }
    const json_data = JSON.parse(data);
    res.send(json_data);
  });
}
