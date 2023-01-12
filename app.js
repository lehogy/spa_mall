// app.js
const express = require('express');
const app = express();
const port = 3000;
const goodsRouter = require('./routes/good.js')
const cartsRouter = require('./routes/cart.js')
const connect = require('./schemas') // index.js는 생략해도 된다.
connect(); // 가져온 몽고DB를 실행한다.

// app.use() → 전역미들웨어: 모든 미들웨어에 적용하는 것

app.use(express.json()) // req.body를 사용하기 위해서 작성한다.

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/api', [goodsRouter, cartsRouter]) // 전역 미들웨어 → api 경로가 추가된 경우 모두 goodsRouter로 가라

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});