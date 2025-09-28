import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/stream", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("Missing url parameter");

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(500).send("Failed to fetch audio");
    }

    res.setHeader("Content-Type", "audio/mpeg");
    response.body.pipe(res);
  } catch (err) {
    console.error("Error streaming audio:", err);
    res.status(500).send("Stream failed");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
