// 设置fontsize 
var fontSize = 100;
var _w = document.documentElement.clientWidth;
document.getElementsByTagName('html')[0].style.fontSize = parseInt(_w * 100 / 1536 * 100) / 100 + 'px'; //保留一位小数  舍去多余位数，避免 宽度过大屏幕放不下

window.onresize = function() {
    var _w = document.body.clientWidth;
    document.getElementsByTagName('html')[0].style.fontSize = parseInt(_w * 100 / 1536 * 100) / 100 + 'px'; //保留一位小数  舍去多余位数，避免 宽度过大屏幕放不下
}

function getAjax(url, callback) {
    var Oreq = new XMLHttpRequest;
    //当请求调用成功之后调用的函数
    Oreq.onload = function() {
        callback(Oreq.responseText);
    }
    Oreq.open("get", url, true);
    Oreq.send();
}

// 获取现在的天气情况
// 获取天气页面元素
var head = document.querySelector('.header');
var city = document.querySelector('.city');
var body = document.body;
var txtTemperature = document.querySelector("#txt-temperature");
var txtName = document.querySelector('#txt-name');
var infoAqi = document.querySelector('.info-aqi');
var txtWind = document.querySelector('#txt-wind');
var txtHumidity = document.querySelector('#txt-humidity');
var txtKpa = document.querySelector('#txt-kPa');
var txtTime = document.querySelector('#txt-pub-time');
var popwindow = document.querySelector('.popwindow');
var btn_switch = document.querySelector('#btn-tip-switch');
var txtTips = document.querySelector('#txt-tips');
var focus = document.querySelector('.focus');
window.onload = function() {
    // 当前天其
    getAjax("https://tianqiapi.com/free/day?appid=16723385&appsecret=Kz3CVJtB&city=重庆", function(responseText) {
        var answer = JSON.parse(responseText);
        city.innerHTML = answer.city;
        txtTemperature.innerHTML = answer.tem + '°';
        txtName.innerHTML = answer.wea;
        infoAqi.className = 'air-level1 info-aqi'
        txtTime.innerHTML = '中央气象台' + answer.update_time + '发布';
        txtWind.innerHTML = answer.win + answer.win_speed;
        // 天气提醒与
        var tips1 = '天有小雨，出门记得带伞~';
        var tips2 = '光芒透过云缝，洒向大地~';
        var tips3 = '现在的温度比较凉爽~';
        var i = 0
        btn_switch.onclick = function() {
                if (i == 0) {
                    txtTips.innerHTML = tips1;
                    i++;
                } else if (i == 1) {
                    txtTips.innerHTML = tips2;
                    i++;
                } else if (i == 2) {
                    txtTips.innerHTML = tips3;
                    i = 0;
                }
            }
            // 关注
        focus.onclick = function() {
            focus.innerHTML = '已关注';
        }
    })



    var wea_list = document.querySelector('weather-list');
    var wea_items = document.querySelectorAll('.items');
    var btn_prev = document.querySelector('#btn-prev');
    var btn_next = document.querySelector('#btn-next');
    var wea_poster = document.querySelector('.weather-poster');
    getAjax("https://www.tianqiapi.com/api/?version=v9&appid=16723385&appsecret=Kz3CVJtB&city=重庆", function(responseText) {
        //I:未来24小时
        var answer = JSON.parse(responseText);
        var wea_hours = answer.data[0].hours;
        txtHumidity.innerHTML = '湿度 ' + answer.data[0].humidity;
        txtKpa.innerHTML = '气压 ' + answer.data[0].pressure + 'hPa';
        console.log(answer);
        for (var i = 0; i < wea_hours.length; i++) {
            wea_items[i].children[0].innerHTML = parseInt(wea_hours[i].hours) + ':00';
            wea_items[i].children[2].innerHTML = wea_hours[i].wea;
            if (wea_hours[i].wea_img == 'yin') {
                wea_items[i].children[1].src = './images/day/yin.png'
            }
            if (wea_hours[i].wea_img == 'qing') {
                wea_items[i].children[1].src = './images/day/qing.png'
            }
        }
        //    向前向后滚动
        btn_prev.onclick = function(e) {
            wea_poster.className = ' move-left'
            e.preventDefault();
        }
        btn_next.onclick = function(e) {
            wea_poster.className = ' move-right'
            e.preventDefault();

        }


        //II.未来七天
        var day = document.querySelectorAll('.day');
        var date = document.querySelectorAll('.date');
        var daytime = document.querySelectorAll('.daytime')
        var night = document.querySelectorAll('.night')
        var winds = document.querySelectorAll('.wind')
        console.log(answer.data[6].date);
        for (var i = 0; i < 7; i++) {
            winds[i].innerHTML = answer.data[i].win[1] + answer.data[i].win_speed;
            day[i].innerHTML = answer.data[i].week;
            date[i].innerHTML = answer.data[i].date;
            daytime[i].children[0].innerHTML = answer.data[i].wea_day;
            if (answer.data[i].wea_day_img == 'yu') {
                daytime[i].children[1].src = './images/day/yu.png';
            } else if (answer.data[i].wea_day_img == 'qing') {
                daytime[i].children[1].src = './images/day/qing.png';
            } else if (answer.data[i].wea_day_img == 'yun') {
                daytime[i].children[1].src = './images/day/yun.png';
            } else if (answer.data[i].wea_day_img == 'yin') {
                daytime[i].children[1].src = './images/day/yin.png';
            }


            // 晚上
            night[i].children[1].innerHTML = answer.data[i].wea_night;
            if (answer.data[i].wea_night_img == 'yu') {
                night[i].children[0].src = './images/night/yu.png';
            } else if (answer.data[i].wea_night_img == 'qing') {
                night[i].children[0].src = './images/night/qing.png';
            } else if (answer.data[i].wea_night_img == 'yun') {
                night[i].children[0].src = './images/night/yun.png';
            } else if (answer.data[i].wea_night_img == 'yin') {
                night[i].children[0].src = './images/night/yin.png';
            }
        }

        var ctPages = document.querySelector('#ct-pages')
        var items = ctPages.querySelectorAll('.item');
        // 设置icon图片
        var icons = ctPages.querySelectorAll('.icon');
        icons[2].className = 'pill';
        icons[3].className = 'washcar';
        icons[4].className = 'sports';
        icons[5].className = 'sun';



        var content = items[0].querySelector('.content');
        content.innerHTML = answer.aqi.kouzhao;

        items[1].querySelector('.content').innerHTML = answer.aqi.waichu;

    })


    // getAjax("https://www.tianqiapi.com/free/week?appid=16723385&appsecret=Kz3CVJtB&city=重庆", function(responseText) {
    //     console.log(JSON.parse(responseText));
    // })

    // 生活指数 卡片滑动


}

// 搜索栏
var searchBox = document.querySelector('.search-Box');
var popSearch = document.querySelector('.search-popwindow');

searchBox.onfocus = function() {
    popSearch.style = 'display:block';
}
searchBox.onblur = function() {
    popSearch.style = 'display:none';
}

// 节流
var ids = 0;
searchBox.addEventListener("input", inputHandler);

function inputHandler(e) {
    if (ids) return;
    ids = setTimeout(textContentHandler, 500, this);
}

function textContentHandler(elem) {
    getAjax()
    clearTimeout(ids);
    ids = 0;
}
