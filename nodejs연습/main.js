var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title,list,body){
    return `
    <!doctype html>
    <html>
    <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
    </head>
    <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
    </body>
    </html>
    
    `;
}

function templateList(filelist){
    var list='<ul>';
    var i=0;
    while(i<filelist.length){
        list+=`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i+=1;
    }
    list=list+'</ul>';
    return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData=url.parse(_url,true).query;//쿼리스트링에 따라서 다른 정보를 출력하는 웹 구현
    var pathname=url.parse(_url,true).pathname;

    if(pathname==='/'){//루트라면
        if(queryData.id===undefined){
            fs.readdir('./data',function(error,filelist){//목록을 형성하기위해 파일 목록을 불러온다.
                var title='Welcome';
                var description='Hello node.js';
                var list=templateList(filelist);
                var template=templateHTML(title,list,`<h2>${title}</h2><p>${description}</p>`);
                response.writeHead(200);
                response.end(template);
            })
        } else{
            fs.readdir('./data',function(error,filelist){//목록을 형성하기위해 파일 목록을 불러온다.
                fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){//파일 내용을 읽어온다. description에 저장된다.
                    //탬플릿 형식으로->탬플릿 형식은 내장된 표현식을 허용한다.(여러줄문자열,문자열형식화,문자열태깅)
                    var list=templateList(filelist);
                    var title=queryData.id;
                    var template=templateHTML(title,list,`<h2>${title}</h2><p>${description}</p>`);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    }
    else{
        response.writeHead(404);
        response.end('Not found');
    }
 
});

app.listen(3000);