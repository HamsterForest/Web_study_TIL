var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template=require('./lib/template.js');//lib폴더에 모듈화함
var path=require('path');//보안을위함-상대방이 path를 이용해 서버의 모든곳을 탐색하는것을 막는것
//path.parse를 사용하여 경로를 탐색할수 있는 정보를 세탁할 수 있다.
var sanitizeHtml=require('sanitize-html');//사용자가 script문을 활용해 공격하는것을 방어하기위함

var app = http.createServer(function(request,response){//request=>요청할때 웹브라우저가 보낸정보
    //response=>응답할때 우리가 웹브라우저에 전송할정보
    var _url = request.url;
    var queryData=url.parse(_url,true).query;//쿼리스트링에 따라서 다른 정보를 출력하는 웹 구현
    var pathname=url.parse(_url,true).pathname;
    if(pathname==='/'){//루트라면
        if(queryData.id===undefined){//기본 홈페이지
            fs.readdir('./data',function(error,filelist){//목록을 형성하기위해 파일 목록을 불러온다.
                var title='Welcome';
                var description='Hello node.js';
                var list=template.list(filelist);
                var html=template.html(title,list,`<h2>${title}</h2><p>${description}</p>`
                    , `<a href="/create">create</a>`        
                );
                response.writeHead(200);
                response.end(html);
            });
        } else{//목록에 있는 세부 홈페이지
            fs.readdir('./data',function(error,filelist){//목록을 형성하기위해 파일 목록을 불러온다.
                var filteredID=path.parse(queryData.id).base;//보안을위함
                fs.readFile(`data/${filteredID}`,'utf8',function(err,description){//파일 내용을 읽어온다. description에 저장된다.
                    //탬플릿 형식으로->탬플릿 형식은 내장된 표현식을 허용한다.(여러줄문자열,문자열형식화,문자열태깅)
                    var title=queryData.id;
                    var list=template.list(filelist);
                    var sanitizedTitle=sanitizeHtml(title);//정보가 오염되었을 수도 있으니 살균
                    var sanitizedDescription=sanitizeHtml(description);
                    var html=template.html(sanitizedTitle,list,`<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`
                        ,`<a href="/create">create</a> 
                        <a href="/update?id=${sanitizedTitle}">update</a>
                        <form action="delete_process" method="post">
                            <input type="hidden" name="id" value="${sanitizedTitle}">
                            <input type="submit" value="delete">
                        </form>
                        `
                    );
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    }
    else if(pathname==='/create'){//create링크로 들어오는경우(글을 생성하는 역할)
        fs.readdir('./data',function(error,filelist){//목록을 형성하기위해 파일 목록을 불러온다.
            var title='Web-create';
            var list=template.list(filelist);
            //사용자가 입력한 내용을 post형식으로 create_process로 보낸다.
            var html=template.html(title,list,
                `<h2>${title}</h2>
                <form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
                </form>`
                , ''
            );
            response.writeHead(200);
            response.end(html);
        });
    }
    else if(pathname==='/create_process'){
        // /create에서 post형식으로 data로 받는다.
        var body='';
        //웹브라우저가 포스트 방식으로 데이터를 전송할때 데이터가 굉장히 많으면,
        //데이터를 한번에 처리하다가는 무리가감.
        //그래서 nodejs에서는 데이터가 많을경우를 대비해서 아래와 같은 방식을 사용한다.
        //조각조강의 양들을 서버가 수신할때마다 밑의 callback함수를 호출하게 되어있다.
        //호출할때 data라는 인자를 통해 수신한정보를 주기로 약속하고 있다.
        request.on('data',function(data){
            body+=data;
        });
        //더이상 들어올 정보가 없으면 end다음에 들어오는 callback함수를 호출하도록 약속하였다.
        request.on('end',function(){
            var post=qs.parse(body);//post데이터에 post정보가 들어있다.
            var title=post.title;
            var description=post.description;
            fs.writeFile(`data/${title}`,description,'utf8',function(err){
                response.writeHead(302
                    ,{Location: `/?id=${title}`});//페이지를 다른 곳으로 리다이렉션 시키라는 뜻
                response.end();
            });
        });
    }
    else if(pathname==='/update'){//업데이트, 수정기능 구현
        fs.readdir('./data',function(error,filelist){//목록을 형성하기위해 파일 목록을 불러온다.
            var filteredID=path.parse(queryData.id).base;//보안을위함
            fs.readFile(`data/${filteredID}`,'utf8',function(err,description){//파일 내용을 읽어온다. description에 저장된다.
                //탬플릿 형식으로->탬플릿 형식은 내장된 표현식을 허용한다.(여러줄문자열,문자열형식화,문자열태깅)
                var list=template.list(filelist);
                var title=queryData.id;
                var html=template.html(title,list,
                    `
                    <form action="/update_process" method="post">
                    <input type="hidden" name="id" value="${title}">
                    <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                    <p>
                        <textarea name="description" placeholder="description">${description}</textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                    </form>`
                    ,`<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
                );
                response.writeHead(200);
                response.end(html);
            });
        });
    }
    else if(pathname==='/update_process'){
        // /create에서 post형식으로 data로 받는다.
        var body='';
        //웹브라우저가 포스트 방식으로 데이터를 전송할때 데이터가 굉장히 많으면,
        //데이터를 한번에 처리하다가는 무리가감.
        //그래서 nodejs에서는 데이터가 많을경우를 대비해서 아래와 같은 방식을 사용한다.
        //조각조강의 양들을 서버가 수신할때마다 밑의 callback함수를 호출하게 되어있다.
        //호출할때 data라는 인자를 통해 수신한정보를 주기로 약속하고 있다.
        request.on('data',function(data){
            body+=data;
        });
        //더이상 들어올 정보가 없으면 end다음에 들어오는 callback함수를 호출하도록 약속하였다.
        request.on('end',function(){
            var post=qs.parse(body);//post데이터에 post정보가 들어있다.
            var title=post.title;
            var description=post.description;
            var id=post.id;
            fs.rename(`data/${id}`,`data/${title}`,function(error){
                fs.writeFile(`data/${title}`,description,'utf8',function(error){
                    response.writeHead(302
                    ,{Location: `/?id=${title}`});//페이지를 다른 곳으로 리다이렉션 시키라는 뜻
                    response.end();
                });
            });
        });
    }
    else if(pathname==='/delete_process'){//삭제기능구현
        // /create에서 post형식으로 data로 받는다.
        var body='';
        //웹브라우저가 포스트 방식으로 데이터를 전송할때 데이터가 굉장히 많으면,
        //데이터를 한번에 처리하다가는 무리가감.
        //그래서 nodejs에서는 데이터가 많을경우를 대비해서 아래와 같은 방식을 사용한다.
        //조각조강의 양들을 서버가 수신할때마다 밑의 callback함수를 호출하게 되어있다.
        //호출할때 data라는 인자를 통해 수신한정보를 주기로 약속하고 있다.
        request.on('data',function(data){
            body+=data;
        });
        //더이상 들어올 정보가 없으면 end다음에 들어오는 callback함수를 호출하도록 약속하였다.
        request.on('end',function(){
            var post=qs.parse(body);//post데이터에 post정보가 들어있다.
            var filteredID=path.parse(post.id).base;//보안을위함
            fs.unlink(`data/${filteredID}`,function(error){
                response.writeHead(302
                    ,{Location: `/`});//페이지를 다른 곳으로 리다이렉션 시키라는 뜻
                response.end();
            });
        });
    }
    else{//없는 페이지
        response.writeHead(404);
        response.end('Not found');
    }
 
});

app.listen(3000);
//pm2에서 로그가 계속 업데이트되도록 하는 방법 알아내기