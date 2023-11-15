const express =require('express');
const app=express();

const connect=require('./public/mongoose');
const File_1 = require('./public/Schema');
const bodyParser = require('body-parser');
connect();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8080,function(){
    console.log('listen on 8080');
});
app.get('/',function(r,q){
  
    q.sendFile(__dirname+'/public/main.html');
   

});

app.get('/getData', function(req, res) {  // 디비데이터를 getData에 불러오기 sub.html에 출력//
  File_1.find({})
    .then(data => {
      console.log('Data fetched from MongoDB:', data);
      res.json(data);
    })
    .catch(err => {
      console.error('Error fetching data from MongoDB:', err);
      res.status(500).send('Internal Server Error');
    });
    
});
app.post('/postData', (req, res) => { //세이브하기 위해 사용
  const { email, title, maintext } = req.body;

  const newData = new File_1({
    email,
    title,
    maintext
  });

  // save() 메소드는 Promise를 반환하므로, then/catch를 사용하여 비동기적으로 처리
  newData.save()
    .then(() => {
      console.log('Data saved to MongoDB:', newData);
      res.json({ success: true });
    })
    .catch((err) => {
      console.error('Error saving data to MongoDB:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});
