var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData=url.parse(_url,true).query;//쿼리스트링에 따라서 다른 정보를 출력하는 웹 구현
    var pathname=url.parse(_url,true).pathname;

    if(pathname==='/'){//루트라면
        if(queryData.id===undefined){
            fs.readdir('./data',function(error,filelist){
                var title='Welcome';
                var description='Hello node.js';
                var list='<ul>';
                var i=0;
                while(i<filelist.length){
                    list+=`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i+=1;
                }
                list=list+'</ul>'
                var template=`
                <!doctype html>
                <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                <h2>${title}</h2>
                <p>${description}</p>
                </body>
                </html>
                
                `;
                response.writeHead(200);
                response.end(template);
            })
        } else{
            fs.readdir('./data',function(error,filelist){
                var list='<ul>';
                var i=0;
                while(i<filelist.length){
                    list+=`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i+=1;
                }
                list=list+'</ul>'
                fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
                    //탬플릿 형식으로->탬플릿 형식은 내장된 표현식을 허용한다.(여러줄문자열,문자열형식화,문자열태깅)
                    var title=queryData.id;
                    var template=`
                    <!doctype html>
                    <html>
                    <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                    </head>
                    <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                    <h2>${title}</h2>
                    <p>${description}</p>
                    </body>
                    </html>
                    
                    `;
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