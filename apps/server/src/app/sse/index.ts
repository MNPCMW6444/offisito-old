export const subscribe = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  setTimeout(() => {
    res.write(`data: ${JSON.stringify({ message: "watching db..." })}\n\n`);
  }, 1000);

  req.on("close", () => {
    /*stop watching*/
  });
};
