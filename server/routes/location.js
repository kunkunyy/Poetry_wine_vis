var express = require('express');
var router = express.Router();
var URL = require('url')
const fs = require('fs');

router.get('/', function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域 http:127.0.0.1:8080
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

    fs.readFile('./source/poetry_wine_location_final.json', 'utf-8', function read(err, data) {
        dataset = JSON.parse(data);
        let xi = {
            'type': 'FeatureCollection',
            'features': dataset['features'].filter((item) => {
                // item['properties']['dynasty']==e['path'][0].innerHTML
                if (item['properties']['poerty_infor']['emotion'] == '喜') {
                    return item
                }
            })
        }
        let ai = {
            'type': 'FeatureCollection',
            'features': dataset['features'].filter((item) => {
                // item['properties']['dynasty']==e['path'][0].innerHTML
                if (item['properties']['poerty_infor']['emotion'] == '哀') {
                    return item
                }
            })
        }
        let si = {
            'type': 'FeatureCollection',
            'features': dataset['features'].filter((item) => {
                // item['properties']['dynasty']==e['path'][0].innerHTML
                if (item['properties']['poerty_infor']['emotion'] == '思') {
                    return item
                }
            })
        }
        let result = [xi,ai,si];
        res.send(result)
    })

})
module.exports = router;