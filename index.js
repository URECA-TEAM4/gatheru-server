const express = require('express')
const app = express()
const port = 5000

const bodyParser = require("body-parser"); // req.body
const cookieParser = require("cookie-parser");

// url 파싱해서 데이터 가져올 수 있도록 함
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입으로 온 데이터도 분석해서 가져올 수 있도록 함
app.use(bodyParser.json());
app.use(cookieParser());

// MongoDB
const config = require("./config/key.js");
const mongoose = require("mongoose");
mongoose // 몽구스를 이용해서 mongoDB에 연결
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

  app.use('/api/users', require('./routes/users'));
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})