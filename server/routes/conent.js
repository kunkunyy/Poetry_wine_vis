var express = require('express');
var router = express.Router();
var URL = require('url')
let baseData = null;
let placeData = null;
const fs = require('fs');

router.get('/', function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域 http:127.0.0.1:8080
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    let params = URL.parse(req.url, true).query;
    let dynasty = params.dynasty;
    let place = params.place;
    if (baseData !== null) {
        if(dynasty===''&&place===''){
            let dataset = baseData['先秦'];
            res.send(dataset);
        }
        if (dynasty !== '' && place === '') {
            let dataset = baseData[dynasty];
            res.send(dataset);
        }
        if (place !== '' && dynasty === '') {
            let dataset = placeData[place];
            res.send(dataset);
        }
    } else {
        fs.readFile('./source/dynasty_data.json', 'utf-8', function read(err, data) {
            fs.readFile('./source/location_data.json', 'utf-8', function read(err, data1) {
                baseData = JSON.parse(data);
                placeData = JSON.parse(data1);
                console.log(baseData);
                let dataset = baseData['先秦'];
                res.send(dataset);
            })
        })
    }

})
module.exports = router;