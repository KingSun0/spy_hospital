function getCookie(c_name) {
    c_name = c_name ? c_name.replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\./g, '\\.') : c_name;
    var arr, reg = new RegExp("(^| )" + c_name + "=([^;]*)(;|$)");
    return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : '';
}
function addCookie(name, value) {
    var str = name + "=" + escape(value);
    var date = new Date();
    var ms = 3650 * 86400 * 1000;
    date.setTime(date.getTime() + ms);
    str += ";expires=" + date.toGMTString() + ";path=/";
    document.cookie = str;
}
if (_CO == null || _CO == undefined) {
    var _LC = this.parent == this && escape(top.location) || 'in_iframe';
    var _RF = escape(document.referrer);
    var _R = Math.round(Math.random() * 10000);
    var _U = getCookie('userinfo[id]');
    var _G = getCookie('g');
    // to resolve the problem: http://confluence.haodf.net/pages/viewpage.action?pageId=28254853
    var dtitle = document.title;
    try {
        dtitle = window.decodeURIComponent(dtitle)
    } catch (e) {
    }
    var _T = escape(dtitle);


    if (_G == "") {
        _G = Math.round(Math.random() * 100000) + "_" + new Date().getTime()
        addCookie('g', _G);
    }

    var _UA = escape(navigator.userAgent.toLowerCase());
    if (location.host != 'hdfimg.com') {
        var protocol = document.location.protocol;
        // 删除document.write方法,避免页面重写
        var _CO = document.createElement('img');

        // to resolve the problem: http://confluence.haodf.net/pages/viewpage.action?pageId=28254853
        var _pstr = 'lc=' + _LC + '&t=' + _T + '&rf=' + _RF + '&u=' + _U + '&g=' + _G + '&_r=' + _R + '&ua=' + _UA;
        if (_pstr.indexOf('lc=https%253A//') === 0 || _pstr.indexOf('lc=http%253A//') === 0) {
            try {
                _pstr = window.unescape(_pstr);
            } catch (e) {
            }
        }
        _CO.src = '//pvstat.haodf.com/pvstat.gif?' + _pstr;
        _CO.style.display = 'none';
        _CO.width = 1;
        _CO.height = 1;
        document.body.appendChild(_CO);
    }
}

(function (i, s, o, g, r, a, m) {
    var ua = window.navigator.userAgent.toLowerCase();
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] ||
        function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
    a.src = g;
    a.async = "async";
    a.defer = "defer";
    var body = s.body || s.documentElement;
    body.appendChild(a);
})(window, document, 'script', '//i2.hdfimg.com/ssi/js/analytics.js', 'ga');

//初步delay设置500,避免异步ajax由于addGA()或addBA()方法的阻塞,无法重回js线程,渲染数据
window.setTimeout(function () {
    addGA();
}, 500);

function addGA() {
    var hostGaType = new Array("m.haodf.com", "360.platform.haodf.com", "openpf.haodf.com", "api.haodf.com", "wxfwh.haodf.com", "wappartner.haodf.com", "sougou.wappartner.haodf.com", "alipay.wappartner.haodf.com");
    var curHost = window.location.host;
    var gaFlag = 0;

    for (var hostGANum = 0; hostGANum < hostGaType.length; hostGANum++) {
        if (hostGaType[hostGANum] == curHost) {
            gaFlag = 1;
            break;
        }
    }

    gaFlag ? _getTrackerName(navigator.userAgent.toLocaleLowerCase()) : ga('create', 'UA-71112033-1', 'auto');
    ga('send', 'pageview');

    /**
     * add by wanghuidan@20170906: 匹配来源
     * @doc http://confluence.haodf.net/pages/viewpage.action?pageId=21843610
     * @param reffer
     * @param userAgent
     * @returns {string}
     * @private
     */
    function _getTrackerName(userAgent) {
        //测试用例：https://www.baidu.com/?reffer=www.baidu.com
        // var urlRegFunc = function (param) {
        //     return new RegExp('^(https?):\/\/[^\/?#:]*\.' + param + '.*$');
        // }
        //创建对应跟踪器
        var createTracker = function (name) {
            ga('create', 'UA-97221905-' + name, 'auto');
        }

        switch (true) {
            //匹配微信
            case /microMessenger/i.test(userAgent): {
                createTracker('3');
                break;
            }
            //手机百度
            case /baidu/i.test(userAgent): {
                createTracker('4');
                break;
            }
            //qq浏览器和手机qq
            case /qq/i.test(userAgent): {
                createTracker('5');
                break;
            }
            //uc
            case /ucbrowser/i.test(userAgent): {
                createTracker('2');
                break;

            }
            //匹配ios
            case /iPhone|iPad|iPod/i.test(userAgent): {
                createTracker('7');
                break;
            }
            //匹配android
            case /android/i.test(userAgent): {
                createTracker('6');
                break;
            }
            default: {
                createTracker('8');
                break;
            }
        }
    }
}

window.setTimeout(function () {
    addBA();
}, 500);

function addBA() {
    var hostGaType = new Array("m.haodf.com", "360.platform.haodf.com", "openpf.haodf.com", "api.haodf.com", "wxfwh.haodf.com", "wappartner.haodf.com", "sougou.wappartner.haodf.com", "alipay.wappartner.haodf.com");
    var curHost = window.location.host;
    var mFlag = 0;
    for (hostGANum = 0; hostGANum < hostGaType.length; hostGANum++) {
        if (hostGaType[hostGANum] == curHost) {
            mFlag = 1;
            break;
        }
    }
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?dfa5478034171cc641b1639b2a5b717d";
    if (mFlag) {
        hm.src = "//hm.baidu.com/hm.js?d4ad3c812a73edcda8ff2df09768997d";
    }
    var body = document.body || document.documentElement;
    body.appendChild(hm);
}

/**
 * when our user requests verify code,
 * nginx need check where there is a cookie contains prefix 'CNZZDATA',
 * if not, return code 256.
 * in the common condition, it is added by cnzz js,
 * but sometimes, specially in ie8, cnzz js loaded failure, cause problem, so we add one here.
 */
addCookie('CNZZDATA-FE', 'CNZZDATA-FE');
