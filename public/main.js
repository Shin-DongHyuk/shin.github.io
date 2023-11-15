const bt1=document.querySelector("#btn1");
const bt2=document.querySelector("#btn2");
const top_btn1=document.querySelector("#top_btn1");
const email_text=document.querySelector("#email_text");//email_text
const title_text=document.querySelector("#title_text");
const textarea_text=document.querySelector("#textarea_text");

let array_test=[]; // 제목넣기
let main_array=[]; //본문 넣기
let email_array=[]; //본문 넣기
function recreateclick(){
    let save_file=["수정",email_text.value,title_text.value,textarea_text.value];
    localStorage.setItem("savefile",JSON.stringify(save_file));
    window.location.href = "sub_view_1.html";
}
function mysubmit(e){
    e.preventDefault();
    submitForm({email: email_text.value, title: title_text.value, maintext: textarea_text.value});
    makeboard(array_test); //게시판 보여주는 함수
    //window.location.href = "sub_view_1.html";
}

function submitForm(formData) {///////////데이터를 전송하는 것    

    // 서버로 데이터 전송
    fetch('/postData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Data received from server:', data);
    })
    .catch(error => console.error('Error sending data to server:', error));
}

function makeboard(array_test) {
    array_test=[];
    main_array=[];
    email_array=[];
    const test_t1 = document.querySelector("#t1");
    const test_t2 = document.createElement('p');
    while (test_t1.firstChild) {
     test_t1.removeChild(test_t1.firstChild);
    }
    let count=0;
    fetch('/getData')
      .then(response => response.json())
      .then(data => {
        // 가져온 데이터를 활용하여 DOM 업데이트
        data.slice(-5).forEach(item => {
  
          const listItem1 = document.createElement('p');
          const listItem2 = document.createElement('a');
          const listItem3 = document.createElement('p');
         
          listItem3.innerText=(count+1)+". ";
          listItem2.innerText = item.title;
          listItem2.href = "sub_view_1.html";
          listItem2.id=count;
          listItem2.addEventListener('click', function () {
            clicklink(this.id);});
          count++;
          main_array.push(item.maintext);
          array_test.push(item.title);
          email_array.push(item.email);
          listItem3.appendChild(listItem2);
          listItem1.appendChild(listItem3);
          test_t2.appendChild(listItem1);
  
        });
        
        test_t1.appendChild(test_t2);
        let array_test2=JSON.stringify(array_test);
        let main_array2=JSON.stringify(main_array);
        let email_array2=JSON.stringify(email_array);
        localStorage.setItem("username",array_test2);
        localStorage.setItem("usermain",main_array2);
        localStorage.setItem("useremail",email_array2);
      })
      .catch(error => console.error('Error fetching data from server:', error));
      
      
  }


function clicklink(e) // 게시판 누르면 아이디넘버 로컬에 저장하기
{
  
  localStorage.setItem("linknumber",e);

}
function mainbuttonclick()
{
   
    window.location.href="sub_view_2.html";
}
makeboard(array_test);
bt1.addEventListener("click",mysubmit);
bt2.addEventListener("click",recreateclick);
top_btn1.addEventListener("click",mainbuttonclick);