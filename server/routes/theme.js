var express = require('express');
var router = express.Router();
var URL = require('url')
const fs = require('fs');

router.get('/', function(req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域 http:127.0.0.1:8080
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

    fs.readFile('./source/themeRiver_data.json', 'utf-8',function read(err,data){
        fs.readFile('./source/g2-theme.json','utf-8',function(err,data1){
            let dataset = JSON.parse(data);
            let theme = JSON.parse(data1);
            res.send([theme,dataset])
        })
    })

})
module.exports = router;