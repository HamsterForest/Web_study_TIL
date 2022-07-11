var Body={
    setColor:function(color){
        document.querySelector('body').style.color=color;/*querySelector는 첫번째 element만 가져옴*/
    },
    setBackgroundColor:function(color){
        document.querySelector('body').style.backgroundColor=color;
    }
}
var Links={
    setColor:function(color){
        var alist=document.querySelectorAll('a');/*querySelectorAll은 해당 하는 모든 element를 가져옴, 배열*/
        var i=0;
        while(i<alist.length){
            alist[i].style.color=color;
            i+=1;
        }
    }
}
var Buttons={
    AllButton_txt_change:function(text){
        console.log('지금txt_change 성공적 진입');
        var input_list=document.querySelectorAll('input');/*다른 버튼의 값도 바꾼다.*/
        var i=0;
        while(i<input_list.length){
            input_list[i].value=text;
            i+=1;
        }
    }
}

function continueButton(){
    /*이미 야간모드를 실행한적 있으면 새로운 페이지를 열어도 계속 야간모드이도록*/
    if (localStorage.getItem('button_status')==='false'){
        Buttons.AllButton_txt_change('Day');
        Body.setBackgroundColor('black');
        Body.setColor("white");
        Links.setColor('white');
    }
}

function nightDayHandler(self){
    
    /*만약 야간모드가 아닌 상태라면*/
    if (self.value==='Night'){

        localStorage.setItem('button_status','false');

        Body.setBackgroundColor('black');
        Body.setColor("white");
        
        Buttons.AllButton_txt_change('Day');

        Links.setColor('white');
    }
    /*야간 모드를 실행중인 상태라면 */
    else{ 
        localStorage.setItem('button_status','true');
        Body.setBackgroundColor('white');
        Body.setColor('black');
        
        Buttons.AllButton_txt_change('Night');

        Links.setColor('black');
    }
}