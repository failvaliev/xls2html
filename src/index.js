const path = require("path");
const express = require('express');
const startProc = require('./API/index')

const PORT = process.env.PORT || 8800;

const app = express();
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/output.json', function (req, res) {
  res.sendFile(path.join(__dirname, '../output.json'));
});

app.get('/calc', function (req, res) {
  startProc();
  res.send({ message: "OK" })
})

try {
  app.listen(PORT, () => {
    console.log("Server is running on port " + 8800);
  })
} catch (error) {
  console.log(error);
}





