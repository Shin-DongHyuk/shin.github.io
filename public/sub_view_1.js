const btn1=document.querySelector("#btn1");
const btn2=document.querySelector("#btn2");
const e_txt=document.querySelector("#e_txt");
const m_txt=document.querySelector("#m_txt");
const t_txt=document.querySelector("#t_txt");

let array_box=[];
let main_box=[];
let mail_box=[];
let save_box=[];

function recreateclick()
{
    window.alert("수정되었습니다.");
    
    submitForm({email:e_txt.value,title:t_txt.value,maintext:m_txt.value});
    array_box=JSON.parse(localStorage.getItem("username"));
    main_box=JSON.parse(localStorage.getItem("usermain"));
    mail_box=JSON.parse(localStorage.getItem("useremail"));
    
    array_box.shift();
    main_box.shift();
    mail_box.shift();
    array_box.push(t_txt.value);
    main_box.push(m_txt.value);
    mail_box.push(e_txt.value);
    
    localStorage.setItem("username",JSON.stringify(array_box));
    localStorage.setItem("usermain",JSON.stringify(main_box));
    localStorage.setItem("useremail","123123123");
    localStorage.setItem("useremail",JSON.stringify(mail_box));
    localStorage.setItem('savefile',JSON.stringify(["완료",0]));

    window.location.href = "main.html";
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
function backclick()
{
    localStorage.setItem('savefile',JSON.stringify(["완료",0]));

    window.location.href = "main.html";
}


function makeviewboard(){
    
    const linknumber_1=localStorage.getItem("linknumber");
   
    
    array_box=JSON.parse(localStorage.getItem("username"));
    main_box=JSON.parse(localStorage.getItem("usermain"));
    mail_box=JSON.parse(localStorage.getItem("useremail"));
    save_box=JSON.parse(localStorage.getItem("savefile"));
    
    
        for(i=0;i<5;i++)
        {
            if (linknumber_1==i.toString())
            {   
                
                t_txt.value=array_box[i];
                m_txt.value=main_box[i];
                e_txt.value=mail_box[i];
                
            }
        
        }
        if(save_box[0]=="수정")
        {
            t_txt.value=save_box[1];
            m_txt.value=save_box[2];
            e_txt.value=save_box[3];
        }      
    
    
    
   
}
       
makeviewboard();
btn2.addEventListener("click",backclick);
btn1.addEventListener("click",recreateclick);