// api are written just like node
// fetch("http://localhost:3000/api/blogs");
// can send max post u need too /api/blogs?max={number}
import * as fs from "fs";
import { platform } from "os";
export default async function handler(req, res) {
  const directory = await fs.promises.readdir("blogData");
  //   console.log(directory); -> we got all the files
  // first file is .DS_Store file which is mac spicific shit
  if (directory[0] === ".DS_Store" && platform() === "darwin")
    directory.shift();
  const allPosts = [];
  let length = req.query.max || directory.length;
  if (length > directory.length) length = directory.length;
  // console.log(length);
  for (let i = 0; i < length; i++) {
    const currFile = await fs.promises.readFile(
      `blogData/${directory[i]}`,
      "utf-8"
    );
    allPosts.push(JSON.parse(currFile));
  }
  res.send(allPosts);
}
