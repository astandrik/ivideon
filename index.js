var express = require("express"),
    app = express(),
    port = 80,
    path = require("path");

app.listen(port, () => {
  console.log("app listening on port " + port);
});

app.use(express.static(path.join(__dirname )));

app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
})