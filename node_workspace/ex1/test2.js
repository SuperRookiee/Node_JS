// const calc = require('./calc.js');
// console.log('모듈로 분리한 후 - calc.add 함수 호출 결과 : %d', calc.add(20,20));

// const calc2 = require('./calc2.js');
// console.log('모듈로 분리한 후 - calc2.add 함수 호출 결과 : %d', calc2.add(10,20));

var Calc = require('./calc3')
var calc = new Calc()
calc.emit('stop')
console.log(Calc.title+'에 stop 이벤트 전달함.');