const path = require("path");
const express = require('express');
const startProc = require('./API/index')

const app = express();
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/output.json', function (req, res) {
  res.sendFile(path.join(__dirname, '../output.json'));
});

app.post('/calc', function (req, res) {
  startProc();
})

try {
  app.listen(8800, () => {
    console.log("Server is running on port " + 8800);
  })
} catch (error) {
  console.log(error);
}





