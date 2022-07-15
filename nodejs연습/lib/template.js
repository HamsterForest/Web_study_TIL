var template={
    html:function(title,list,body,control){//control에 업데이트버튼을 넣거나 넣지 않음
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
        ${control}
        ${body}
        </body>
        </html>
        
        `;
    },
    list:function(filelist){
        var list='<ul>';
        var i=0;
        while(i<filelist.length){
            list+=`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i+=1;
        }
        list=list+'</ul>';
        return list;
    }
}

module.exports=template;