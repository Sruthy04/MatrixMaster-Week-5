import express from "express";
import fs from "fs";

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get("/data", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);
    const sortedData = jsonData.sort((a, b) => {
      const dateA = new Date(a.createdAt.split("-").reverse().join("-"));
      const dateB = new Date(b.createdAt.split("-").reverse().join("-"));
      return dateB - dateA;
  });

    res.json(sortedData);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
