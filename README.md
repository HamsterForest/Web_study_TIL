# web_study TIL(Today I learned)
## 웹제작 공부 기록- HTML, CSS, JavaScript, Node.js
web_study는 html, css, javascript, Node.js를 공부하며 배운것을 간단히 구현하는것에 의의를 둔다.
이 레포지토리의 최종적인 목표는 강의에서 들은 요소를 모두 자연스럽게 녹여내어
하나의 완전한 인터넷 페이지를 만드는 것에 있다.
+ 동적 웸페이지를 구현하는 node.js공부는 안에 'nodejs_study'폴더에서 따로 이루어지도록 하고 있다.
## 알게된 구현법  
1. html의 태그문법사용
1. 기본적인 디자인 도구의사용. 그리드사용과 화면크기에 따른 레이아웃변경(CSS)
1. 자바스크립트를 사용해 버튼 만들기(주간/야간모드 구현)
1. Node.js를 이용한 CRUD 구현과 보안, 서버생성  
    + Node.js를 사용한 기초적인 웹서버의 생성 
    + URL로 입력된 값을 사용-쿼리스트링 사용 (Node.js)
    + 동적인 웹페이지의 생성-특정 URL(쿼리스트링)에 맞춰 웹페이지의 제목이 바뀐다.(Node.js)
    + 동적인 웹페이지이 셍성-특정 URL(쿼리스트링)에 맞춰 웹페이지의 본문이 바뀐다.(Node.js)
    + Not found오류구현-존재하지 않는 정보에 대한 요청이 들어왔을때 오류페이지 출력.(Node.js)
    + data폴더에 파일을 읽어와서 이를 토대로 href목록생성-data폴더에 글을 쓰면 웹페이지에 등록됨.(Node.js)
    + 사용자로부터 텍스트입력을 받아 서버에 전송(post형식), 전송된정보를 토대로 data폴더에 파일을 생성.(Node.js)
    + 리다이렉션-자신이 입력한 텍스트를 보여주는 페이지로 리다이렉션 (Node.js)
    + 수정기능의 구현 (Node.js)
    + 삭제기능의 구현 (Node.js)
    + 사용자가 url을 통해 서버 내의 폴더들을 탐색하는 것을 방지함(Node.js)
    + 사용자가 글을 입력할때 html의 문법을 사용해 공격하는 것을 방지함(Node.js)
