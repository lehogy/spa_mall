const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/spa_mall")
    .catch(err => console.log(err)); // 에러가 발생하면 err에 에러를 할당하고 콘솔 로그로 출력한다.
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
}); // 커넥션 이후의 에러핸들링

module.exports = connect;