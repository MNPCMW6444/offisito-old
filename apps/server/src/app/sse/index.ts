export const subscribe = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  setTimeout(() => {
    res.write(`watching db...: `);
  }, 1000);

  req.on("close", () => {
    /*stop watching*/
  });
};
