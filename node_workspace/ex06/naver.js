// 네이버 검색 API예제는 블로그를 비롯 전문자료까지 호출방법이 동일하므로 blog검색만 대표로 예제를 올렸습니다.
// 네이버 검색 Open API 예제 - 블로그 검색
var express = require('express');
const { key } = require('nconf');
var app = express();
var client_id = 'BiihBx22w7dTQhOnPN_O';
var client_secret = 'hPQJEob6Ji';

//require
let static = require('serve-static'), path=require('path'), bodyParser = require('body-parser')

//body-parser를 이용해 application/x-www-orm-urlencoded 및 application/json 파싱
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/public', static(path.join(__dirname,'public')))
app.use('/semantic', static(path.join(__dirname,'semantic')))
app.set('view engine','ejs')
app.set('views', __dirname + '/views');


app.get('/search/blog', function (req, res) {
    var api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.query.query); // json 결과
    //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // xml 결과
    var request = require('request');
    var options = {
        url: api_url,
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

app.post('/search/news', function (req, res) {
    var key = req.query.key || req.body.key

    var api_url = 'https://openapi.naver.com/v1/search/news?&query=' + encodeURI(key); // json 결과
    //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // xml 결과
    var request = require('request');
    var option = {}
    var options = {
        url: api_url,
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let newsItems = JSON.parse(body).items  // items-title,link,description, pubDate
            const newsArray = []
            for (let i = 0; i < newsItems.length; i++) {
                let newsItem = {}
                newsItem.title = newsItems[i].title.replace(/(<([^>]+)>)|&quot;/ig, "") //나머지 아이템들 생략
                newsItem.link = newsItems[i].link.replace(/(<([^>]+)>)|&quot;/ig, "") //나머지 아이템들 생략
                newsItem.description = newsItems[i].description.replace(/(<([^>]+)>)|&quot;/ig, "") //나머지 아이템들 생략
                newsItem.pubDate = newsItems[i].pubDate.replace(/(<([^>]+)>)|&quot;/ig, "") //나머지 아이템들 생략
                newsArray.push(newsItem)
                // res.render('newsList' ,{newsItems:newsItems, newsTitle:newsItem.title, newsItemIink:newsItem.link, newsDescription:newsItem.description, newsPubDate:newsItem.pubDate })
            }

            var context = {newsArray : newsArray}
            req.app.render('newsList', context, function(err,html){
                if(err){
                    console.error('뷰 렌더링 중 오류 발생 : ' + err.stack)
                    res.writeHead('200',{'Content-Type': 'text/html;charset=utf8'})
                    res.write('<h2>뷰 렌더링 중 오류 발생</h2')
                    res.write('<p>'+err.stack+'</p>')
                    res.end()
                    return
                }
                res.end(html)
            })
            return

            res.json(newsArray)
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});



app.listen(3000, function () {
    console.log('http://127.0.0.1:3000/search/news?query=검색어 app listening on port 3000!');
});