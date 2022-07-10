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
        var input_list=document.querySelectorAll('input');/*다른 버튼의 값도 바꾼다.*/
        var i=0;
        while(i<input_list.length){
            input_list[i].value=text;
            i+=1;
        }
    }
}
function nightDayHandler(self){
    if (self.value==='Night'){/*만약 야간모드*/
        Body.setBackgroundColor('black');
        Body.setColor("white");
        
        Buttons.AllButton_txt_change('Day');

        Links.setColor('white');
    }
    else{ 
        Body.setBackgroundColor('white');
        Body.setColor('black');
        
        Buttons.AllButton_txt_change('Night');

        Links.setColor('black');
    }
}