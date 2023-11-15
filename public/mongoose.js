const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connect = () => {
    mongoose
    .connect("mongodb://127.0.0.1:27017/study")
    .catch(err => console.log(err));
    console.log('몽고디비 연결');
};

mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러2', error);
});

mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다');
  connect();
});

module.exports = connect;