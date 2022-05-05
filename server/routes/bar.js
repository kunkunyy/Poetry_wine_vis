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

    fs.readFile('./source/barchart_data.json', 'utf-8',function read(err,data){
        dataset = JSON.parse(data);
        dataset = dataset.sort((a,b)=>a['num'] < b['num'] ? -1 : 0);
        res.send(dataset)
    })

})
module.exports = router;