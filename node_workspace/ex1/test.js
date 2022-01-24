// console.log('aaa');
// console.log('숫자 보여주기: %d', 10);
// console.log('문자열 보여주기: %s', '안녕');
// console.log('JSON 보여주기: %j', {name: '코난'});

// var result = 0;
// console.time('elapsedTime');
// for(var i=1; i<=100; i++){
//     result +=i;
// }
// console.timeEnd('elapsedTime');
// console.log('1부터 100까지 합: %d', result);

// console.log('현재 실행한 파일의 이름: %s', __filename);
// console.log('현재 실행한 파일의 path: %s', __dirname);

// var Person = {name: "conana", age: 10}
// console.dir(Person);

// console.log(dog);
// var dog = 'bark';
// console.log(dog);
// var dog = 'happy';
// console.log(dog);

// const dog = "happy"
// const dog = "very happey"

// var dog = 'happy';
// console.log(dog);   //happy
// {
//     var dog = 'sad'
// }
// console.log(dog);   //sad

// let dog = 'happy';
// console.log(dog);
// {
//     let dog = 'sad'
// }
// console.log(dog);   //happy
// // let: 재활당 가능, const: 재활당 불가


// function outer(){
//     var a = 'AA';
//     var b = 'BB';
//     function inner(){
//         var a = 'aa';
//         console.log("from inner: "+a);
//         console.log("from inner: "+b);
//     }
//     return inner;
// }

// var outerFunc = outer();
// outerFunc();

// const car ={
//     name: 'beetle',
//     speed: 100,
//     color: 'yellow',
//     start: function(){
//         return this.speed+10;
//     }
// }
// console.dir(car);

// function add(a,b){
//     return a+b;
// }
// console.log(add(1,4));

// const lamda_add=(a,b)=>{
//     return a+b;
// }
// console.log("lamda_add:"+ lamda_add(2,4));

// const lamda_add2=(a,b)=>a+b;

// console.log("lamda_add:"+ lamda_add2(2,4));

// const myFunc = function(){
//     console.log(arguments);
// }
// myFunc(1,2,3,4);

// const myFunc = (...args)=>{
//     console.log(args);
// }
// myFunc(1,2,3,4);

// function person(){};
// console.log(person.prototype);

// person.prototype.name = 'conan';
// console.log(person.prototype);

// setTimeout(() => {
//    console.log('todo: first!'); 
// }, 3000);

// setTimeout(() => {
//    console.log('todo: second!'); 
// }, 2000);

// setTimeout(() => {
//     setTimeout(() => {
//     console.log('todo: second!'); 
//     }, 2000);
//    console.log('todo: first!'); 
// }, 3000);

// function mySetTimeout(callback){
//     callback();
// }
// console.log(0);
// mySetTimeout(function(){
//     console.log('hello');
// });
// console.log(1);

// console.log(0);
// setTimeout(function(){
//     console.log('hello');
// },0);
// console.log(1);

// function work(sec, callback){
//     setTimeout(() => {
//        callback(new Date().toISOString()); 
//     }, sec*1000);
// };

// work(1,(result)=>{
//     console.log('first',result);
//     work(1,(result)=>{
//         console.log('second',result);
//         work(1,(result)=>{
//             console.log('third',result);
//         })

//     })
// })

// function workP(sec){
//     //Promise 인스턴스를 반환하고, then에서는 성공사 콜백함수 호출
//     return new Promise((resolve, reject) =>{
//         //Promiss 생성자 넘기는 callback
//         //resolve: 동작 완료시 호출, reject : 오류 발생시
//         setTimeout(() => {
//            resolve(new Date().toISOString()); 
//         }, sec*1000);
//     });
// }

// workP(1).then((result) =>{
//     console.log("first",result);
//     return workP(1);
// }).then((result) =>{
//     console.log('second', result);
// })

// const flag = true;
// const promise = new Promise((resolve, reject)=>{
//     if(flag===true){
//         resolve('orage');
//     }else{
//         reject('apple');
//     }
// });

// promise.then((value)=>{
//     console.log(value);
// })
// promise.catch((value)=>{
//     console.log(value);
// })


// console.log('argv 속성의 패러미터 수 :'+process.argv.length);
// console.dir(process.argv);

// process.argv.forEach(function(item, index){
//     console.log(index+":"+item);
// })

// var path = require('path')
// //디렉터리 이름 합치기
// var directores = ["user", "mike", "docs"];
// var docsDirectory = directores.join(path.sep)
// console.log('문서 디렉터리 : %s', docsDirectory)
// //디렉터리 이름과 파일 이름 합치기
// var curPath = path.join('/Users/mike', 'notepad.exe')
// console.log('파일 패스 : %s', curPath);

// var path = require('path')
// //패스에서 디렉터리, 파일 이름, 확장자 구별하기
// var filename = "C:\\Users\mike\\notepad.exe";
// var dirname = path.dirname(filename)
// var basename = path.basename(filename)
// var extname = path.extname(filename)
// console.log('디렉터리 : %s, 파일 이름: %s, 확장자 : %s', dirname, basename, extname)

// var url = require('url')
// var curURL = url.parse('https://search.naver.com/search.naver?where=nexearch&sm=top_sug.pre&fbm=0&acr=1&acq=%EC%9E%90%EB%B0%94%EC%8A%A4&qdt=0&ie=utf8&query=%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8')
// var curStr = url.format(curURL)
// console.log('주소 문자열 : %s', curStr);
// console.dir(curURL)

// var querystring = require('querystring')
// var param = querystring.parse(curURL.query)
// console.log('요청 query 중 파라미터의 값 : %s', param.query)
// console.log('원본 요청 파라미터: %s', querystring.stringify(param))

// process.on('tick', function(count){
//     console.log('tick 이벤트 발생함: %s', count)
// });

// setTimeout(function() {
//     console.log("2초 후에 tick 이벤트 전달 시도함");
//     process.emit('tick', '2')
// }, 2000);

// var fs = require('fs')
// var data = fs.readFileSync('../package.json', 'utf8')
// console.log(data)

// var fs = require('fs')
// fs.readFileSync('../package.json', 'utf8', function(err, data){
//     console.log(data)
// })
// console.log('프로젝트 폴더 안의 package.json 파일 읽기')

// var fs = require('fs')
// fs.writeFile('./output.txt', 'Hello World!', function(err){
//     if(err){
//         console.log('Error : ' + err)
//     }
//     console.log('output.txt 파일에 데이터 쓰기 완료.')
// })

// var fs = require('fs')
// fs.open('./output.txt','w',function(err,fd){
//     if(err) throw err;
//     const buf = Buffer.from('안녕!\n', 'utf-8')
//     fs.write(fd, buf, 0, buf.length, null, function(err,written,buffer){
//         if(err) throw err
//         console.log(err,written,buffer)
//         fs.close(fd, function(){
//             console.log('파일 열고 데이터 쓰고 파일 닫기 완료.')
//         })
//     })
// })

// var fs = require('fs')
// fs.open('./output.txt','r',function(err,fd){
//     if(err) throw err;
//     var buf = Buffer.alloc(20)
//     console.log('버퍼 타입: %s', Buffer.isBuffer(buf))
//     fs.read(fd, buf, 0, buf.length, null, function(err,bytesRead,buffer){
//         if(err) throw err
//         var inStr = buffer.toString('utf8', 0, bytesRead)
//         console.log('파일에서 읽은 데이터 : %s', inStr)
//         console.log(err,bytesRead,buffer)
//         fs.close(fd, function(){
//             console.log('output.txt 파일을 열고 읽기 완료.')
//         })
//     })
// })

// var fs = require('fs')
//  var infile = fs.createReadStream('./output.txt',{flags:'r'})
//  var outfile = fs.createWriteStream('./output2.txt',{flags:'w'})
// infile.on('data', function(data){
//     console.log('읽어 들인 데이터', data);
//     outfile.write(data)
// })
// infile.on('end', function (){
//     console.log('파일 읽기 종료.')
//     outfile.end(function(){
//         console.log('파일 쓰기 종료.')
//     })
// })

// var fs = require('fs')
// fs.mkdir('./docs', 0666, function(err){
//     if(err) throw err
//     console.log('새로운 docs 폴더를 생성')
// })

// fs.rmdir('./docs', function(err){
//     if(err) throw err
//     console.log('docs 폴더를 삭제')
// })

// var http = require('http')
// var server = http.createServer()
// var port = 3000
// // server.listen(port, function(){
// //     console.log('웹 서버 시작 : %d', port)
// // })

// var host = '192.168.0.19';
// var port = 3000;
// server.listen(port,host,'50000',function(){
//     console.log('웹 서버 시작 : %s, %d', host, port);
// });


var fs = require('fs')
var http = require('http')
var server = http.createServer()
var port = 3000
server.listen(port, function(){
    console.log('웹 서버 시작 : %d', port)
})
server.on('connection', function(socket){
    var addr = socket.address()
    console.log('클라이언트가 접속 : %s, %d', addr.address, addr.port)
})
// server.on('request', function(req, res){
//     console.log('클라이언트가 접속 요청함')
//     console.dir(req)
// })

// server.on('request', function(req, res){
//     console.log('클라이언트 요청')
//     res.writeHead(200,{"Content-Type": "text/html;charset=utf-8"})
//     res.write("<!DOCTYPE html>")
//     res.write("<html>")
//     res.write("<head>")
//     res.write("<title>응답 페이지 </title>")
//     res.write("</head>")
//     res.write("<body>")
//     res.write("<h1>NodeJS로부터의 응답 페이지</h1>")
//     res.write("</body>")
//     res.write("</html>")
//     res.end()
// })

// server.on('request', function(req, res){
//     console.log('클라이언트 요청')
//     var filename = 'conan.jpg';
//     fs.readFile(filename, function (err, data){
//         res.writeHead(200, {"Content-Type": "image/jpg"})
//         res.write(data)
//         res.end()
//     })
//     //request
// })

server.on('request', function(req, res){
    console.log('클라이언트 요청')
    var filename = 'conan.jpg';
    var infile = fs.createReadStream(filename, {flags:'r'})
    infile.pipe(res)
})
