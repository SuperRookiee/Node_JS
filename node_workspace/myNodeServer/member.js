const req = require("express/lib/request")
const res = require("express/lib/response")

//============================라우터============================//
var procLogin = function(req, res){
    console.log('모듈내에 있는 procLogin 호출됨')
    var database = req.app.get('database')

    //요청 파라미터 확인
    var userId = req.body.userId || req.query.userId
    var userPwd = req.body.userPwd || req.query.userPwd
    console.log('요청 파라미터 : '+ userId + ',' + userPwd)

    //데이터베이스 객체가 최기화된 경우, authMember 함수 호출하여 사용자 인증
    if(database.db){
        authMember(database, userId, userPwd, function (err, results) {
            if(err) {throw err}
            //조회된 레코드가 있으면 성공 응답 전송
            if(results && results.length > 0){
                res.writeHead('200',{'Content-Type': 'text/html;charset=utf8'})
                var context = {userId: userId, userPwd: userPwd}
                req.app.render('loginSuccess', context, function(err,html){
                    if(err){
                        console.error('뷰 렌더링 중 오류 발생: ' + err.stack)
                        res.writeHead('200',{'Content-Type': 'text/html;charset=utf8'})
                        res.write('<h2>뷰 렌더링 중 오류 발생</h2>')
                        res.write('<p>'+err.stack+'</p>')
                        res.end()
                        return
                    }
                    console.log("rendered : "+ html)
                    res.end(html)
                })
            }
            else{
                //조회된 레코드가 없는 경우 실패 응답 전송
                res.writeHead('200',{'Content-Type': 'text/html;charset=utf8'})
                res.write('<h1>사용자 인증 실패</h1>')
                res.end()
            }
        })
    }
    else{
        res.writeHead('200',{'Content-Type': 'text/html;charset=utf8'})
        res.write('<h1>데이터베이스 연결 실패</h1>')
        res.end()
    }
}

var procAddMember = function(req, res){
    console.log('/process/addMember 호출됨')
    var database = req.app.get('database')
    var userId = req.body.userId || req.query.userId
    var userPwd = req.body.userPwd || req.query.userPwd
    var userName = req.body.userName || req.query.userName
    var userAge = req.body.userAge || req.query.userAge
    console.log('요청 파라미터 : '+ userId + ',' + userPwd + ',' + userName+ ',' + userAge)
    //데이터베이스 객체가 최기화된 경우, addMember 함수 호출하여 사용자 인증
    if(database.db){
        addMember(database, userId, userPwd, userName, userAge, function (err, addedUser) {
            if(err) {throw err}
            //추가된 데이터가 있으면 성공 응답 전송
            if(addedUser){
                var context = {addedUser: addedUser}
                req.app.render('addMember', context, function(err, html){
                    if(err){
                        console.error('뷰 렌더링 중 오류 발생: ' + err.stack)
                        res.writeHead('200',{'Content-Type': 'text/html;charset=utf8'})
                        res.write('<h2>뷰 렌더링 중 오류 발생</h2>')
                        res.write('<p>'+err.stack+'</p>')
                        res.end()
                        return
                    }
                    console.log("rendered : "+ html)
                    res.end(html)
                })
            }
            else{   //결과 객체가 없으면 실패 응답 전송
                res.writeHead('200',{'Content-Type': 'text/html;charset=utf8'})
                res.write('<h1>가입 실패</h1>')
                res.end()
            }
        })
    }
    else{
        res.writeHead('200',{'Content-Type': 'text/html;charset=utf8'})
        res.write('<h1>데이터베이스 연결 실패</h1>')
        res.end()
    }
}

var procListMember = function (req, res) {
    console.log('/process/listMember 호출 됨')
    var database = req.app.get('database');
    if(database){
        //1. 모든 사용자 검색
        // MemberModel.findAll(function(err, results){
        listMember(database, function(err, results) {
            if(err){
                console.error('사용자 리스트 조회 중 오류 발생: ' + err.stack)
                res.writeHead('200',{'Content-Type': 'text/html;charset=utf8'})
                res.write('<h2>사용자 리스트 조회 중 오류 발생</h2>')
                res.write('<p>'+ err.stack +'</p>')
                res.end()
                return
            }
            if(results){
                var context = {results : results}
                req.app.render('listMember', context, function(err,html){
                    if(err){
                        console.error('뷰 렌더링 중 오류 발생 : ' + err.stack)
                        res.writeHead('200',{'Content-Type': 'text/html;charset=utf8'})
                        res.write('<h2>뷰 렌더링 중 오류 발생</h2')
                        res.write('<p>'+err.stack+'</p>')
                        res.end()
                        return
                    }
                    console.log('rendered' + html)
                    res.end(html)
                })
            }
            else{ //결과 객체가 없으면 실패 응답 전송

            }
        })  //findAll
    }
}

var procUpdateMember = function(req, res){
    console.log('/process/updateMember 호출됨')
    //요청 파라미터 확인
    var userId = req.body.userId || req.query.userId
    var userPwd = req.body.userPwd || req.query.userPwd
    console.log('요청 파라미터 : '+ userId + ',' + userPwd)

    var database = req.app.get('database');
    //데이터베이스 객체가 최기화된 경우, authMember 함수 호출하여 사용자 인증
    if(database){
        updateMember(database, userId, userPwd, function (err, result) {
            if(err) {throw err}
            //수정된 데이터가 있으면 성공 응답 전송
            if(result && result.modifiedCount > 0){
                console.dir(result)
                res.writeHead('200',{'Content-Type': 'text/html;charset=utf8'})
                res.write('<h1>회원 정보 수정 성공</h1>')
                res.end()
            }
            else{   //결과 객체가 없으면 실패 응답 전송
                res.writeHead('200',{'Content-Type': 'text/html;charset=utf8'})
                res.write('<h1>회원 정보 수정 실패</h1>')
                res.end()
            }
        })
    }
    else{
        res.writeHead('200',{'Content-Type': 'text/html;charset=utf8'})
        res.write('<h1>데이터베이스 연결 실패</h1>')
        res.end()
    }
}




//============================속성 함수============================//
//사용자를 인증하는 함수
var authMember = function(database, userId, userPwd, callback){
    console.log('authMember 호출됨 : ' +userId+','+userPwd)
    database.MemberModel.findById(userId, function(err, results){
        console.log("findbyid 호출됨:");
        if(err){
            callback(err,null)
            return
        }
        console.log("아이디[%s]로 사용자 검색 결과", userId)
        if(results.length > 0){
            console.log("아이디와 일치하는 사용자 찾음", userId,userPwd)
            //2.비밀번호 확인
            if(results[0]._doc.userPwd === userPwd){
                console.log('비밀번호 일치함')
                callback(null,results)
            }
            else{
                console.log('비밀번호 일치하지 않음')
                callback(null,null)
            }
        }
        else{
            console.log("아이디와 일치하는 사용자를 찾지 못함")
            callback(null,null)
        }
    })
}//authMember ends

//사용자를 추가하는 함수
var addMember = function(database, userId, userPwd, userName, userAge, callback){
    console.log('addMember 호출됨 : ' +userId+','+userPwd+','+userName+','+userAge)
    //MemberModel 인스턴스 생성
    var user = new database.MemberModel({"userId":userId, "userPwd": userPwd, "userName": userName, "age": userAge})
    
    //save()로 저장: 저장 성공 시 addedUser 객체가 파라미터로 전달됨
    user.save(function(err, addedUser){
        console.log("addedUser%j", addedUser)
        if(err){
            callback(err,null)
            return
        }
        console.log("사용자 데이터 추가함")
        callback(null, addedUser)
    })

}//addMember ends


var listMember = function (database, callback) {
    console.log('listMember 호출됨');
    //모든 회원 검색
    database.MemberModel.findAll(function (err, results) {
        if (err) {
            callback(err, null);
            return;
        }
        if (results.length > 0) {
            console.log('등록된 회원 목록 결과 : ' + results);
            callback(null, results);
        } 
        else {
            console.log('등록된 회원 없음');
            callback(null, null);
        }
    })
}

//회원 수정을 위한 함수
var updateMember = function (database, userId, userPwd, callback) {
    console.log("updateMember 호출됨:"+ userId+','+userPwd)
    //Members 컬렉션 참조
    database.MemberModel.updateOne({"userId": userId}, { $set:{"userPwd" : userPwd} } ,function (err, result) {
        if(err){
            //오류 발생 시 콜백 함수를 호출하면서 오류 객체 전달
            callback(err,null)
            return
        }
        if(result.modifiedCount > 0){
            console.log("사용자 레코드 추가됨 :", result.modifiedCount)
        }
        else{
            console.log("추가되지 않았음")
        }
        callback(null,result)
    })
}


module.exports.procLogin = procLogin
module.exports.procAddMember = procAddMember
module.exports.procListMember = procListMember
module.exports.procUpdateMember = procUpdateMember