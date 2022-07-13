var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData=url.parse(_url,true).query;//쿼리스트링에 따라서 다른 정보를 출력하는 웹 구현
    var title=queryData.id;
    
    if(_url == '/'){
      _url = '/index.html';
      title='Welcome';
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
        //탬플릿 형식으로->탬플릿 형식은 내장된 표현식을 허용한다.(여러줄문자열,문자열형식화,문자열태깅)
        var template=`
        <!doctype html>
        <html>
        <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${description}</p>
        </body>
        </html>
        
        `;
        response.end(template);
    });
    
    
 
});

app.listen(3000);