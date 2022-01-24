const nconf = require('nconf');
nconf.env();
console.log('OS 환경변수의 값: %s', nconf.get('OS'));

const os = require('os');
console.log('시스템의 hostname : %s', os.hostname())
console.log('시스템의 메모리 : %d / %d', os.freemem(), os.totalmem)
console.log('시스템의 CPU 정보\n')
console.dir(os.cpus())
console.log('시스템의 네트워크 인터페이스 정보\n')
console.dir(os.networkInterfaces())

var path = require('path')
//디렉터리 이름 합치기
var directores = ["user", "mike", "docs"];
var docsDirectory = directores.join(path.sep)
console.log('문서 디렉터리 : %s', docsDirectory)
//디렉터리 이름과 파일 이름 합치기
var curPath = path.join('/Users/mike', 'notepad.exe')
console.log('파일 패스 : %s', curPath);