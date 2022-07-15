/*
function a(){
    console.log('A');
}
*/
var a=function(){//자바스크립트에서 함수는 값이다.
    console.log('A');
}

//a();

function slowfunc(callback){//오랜시간이 걸리는 함수
    callback();//slowfunc라는 오랜시간이 걸리는 함수가 실행이 되고 이후 callback함수를 호출한다.
}

slowfunc(a);