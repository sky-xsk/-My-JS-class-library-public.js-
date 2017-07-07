/*!
 *
 * author:  xsk_sky
 * Date:    2017-06-30
 * Name:    public.js
 * Desc:    原生js封装自己常用的类库及js兼容性写法;
 * github： https://github.com/sky-xsk
 * 
 */
/*============================================================函数写法部分================================================================*/
var x = {
    //设置样式
    setStyle: function(obj, json) {
        var arr = '';
        for (arr in json) {
            obj.style[arr] = json[arr];
        }
    },
    //调用方法：x.setStyle('div',{width:200px,height:200px})

    //获取样式    
    getStyle: function(obj, attr) {
        if (obj.currentStyle) { //兼容性的写法
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, null)[attr];
        }
    },
    //调用方法：x.getStyle('div','width')

    //添加事件方法
    addEvent: function(obj, Sevent, fn) { //参数意义：对象，事件，函数
        if (obj.attachEvent) {
            obj.attachEvent('on' + Sevent, fn)
        } else {
            obj.addEventListener(Sevent, fn, false)
        }
        //两种方法 
        //obj.attachEvent ? obj.attachEvent('on' + Sevent, fn) : obj.addEventListener(Sevent, fn, false);
    },
    //调用方法  x.addEvent(obj, 'click', fn); 这里以click为例子

    //删除事件
    removeEvent: function(obj, Sevent, fn) {
        if (obj.detachEvent) {
            obj.detachEvent('on' + Sevent, fn)
        } else {
            obj.removeEventListener(Sevent, fn, false)
        }
    },
    //x.removeEvent(obj, 'click', fn);

    //添加class类名 
    addClass: function(obj, classNames) {
        obj.className ? obj.className = obj.className + ' ' + classNames : obj.className = classNames;
    },
    //调用方法  x.addClass(obj,'classNames') 这里以click为例子

    //清空class
    removeClass: function(obj, classNames) {
        if (obj.className) {
            obj.className = '';
        } else {
            return false;
        }
    },
    //调用方法  x.removeClass(obj,'classNames') 这里以click为例子

    //根据数组的元素操作数组进行排序(从小到大)
    arrSort: function(pros) {
        return function(a, b) {
            var value1 = a[pros];
            var value2 = b[pros];
            return value1 - value2 > 0 ? 1 : -1;
        }
    },
    //调用方法 Array.sort(arrSort('pros'));

    //数组去重
    arrAlong: function(arr) {
        for (var i = 0; i < arr.length; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[i] == arr[j]) {
                    arr.splice(j, 1);
                    j--;
                }
            }
        }
        return arr;
    },

    //调用方法x.arrAlong();传入的参数为数组

    //阻止冒泡事件
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    //调用方法：x.stopPropagation(event);

    //阻止默认事件
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    //调用方法：x.preventDefault(event);

    //动态（异步）加载js（同时可扩展css）
    loadJS: function(url) {
        var statu = true; //初始状态  
        var js = document.getElementsByTagName("script");
        var len = js.length;
        for (var i = 0; i < len; i++) {
            if (js[i].getAttribute("src") == url) {
                statu = false; //如果已经添加，则设置为Flase，不再添加 
            }
        };
        if (statu) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            var header = document.getElementsByTagName("head")[0];
            header.appendChild(script);
        }
    },
    //调用方法：x.loadJS(url);
};

//获取id
function getId(id) {
    return document.getElementById(id);
};
//调用方法：getId('div')

//获取name
function getName(name) {
    return document.getElementsByName(name);
};
//调用方法：getName('name')

//获取tagName
function getTagName(tagName) {
    return document.getElementsByTagName(tagName);
};
//调用方法：getTagName('tagName')

//获取className
//单独写document.getElementsByClassName，兼容document.getElementsByClassName的写法
if (!document.getElementsByClassName) {
    document.getElementsByClassName = function(cls) {
        var ret = [];
        var els = getTagName('*');
        for (var i = 0, len = els.length; i < len; i++) {
            if (els[i].className.indexOf(cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls) >= 0) {
                ret.push(els[i]);
            }
        }
        return ret;
    }
};
//获取className
function getClass(tagName, className) {
    if (document.getElementsByClassName) {
        return document.getElementsByClassName(className);
    } else {
        var tags = document.getTagName(tagName);
        var tagArr = [];
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].class == className) {
                tagArr[tagArr.length] = tags[i];
            }
        }
        return tagArr;
    }
};
//调用方法：getClass('div','divClassName')

//时间戳转换
function timetrans(date) {
    var date = new Date(date * 1000); //如果date为10位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
}
//调用方法console.log(timetrans(456255454))

/*============================================================对象写法部分================================================================*/
//cookie读，写，删除（对象的写法）
var CookieUtil = {
    //读取cookie
    get: function(name) {
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd;
        if (cookieStart > -1) {
            cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    },
    //设置cookie
    set: function(name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }

        if (path) {
            cookieText += "; path=" + path;
        }

        if (domain) {
            cookieText += "; domain=" + domain;
        }

        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },
    //清空cookie
    unset: function(name, path, domain, secure) {
        this.set(name, "", new Date(0), path, domain, secure);
    }

};

//调用方法：CookieUtil.set('name','xsk'); 写入
//调用方法：CookieUtil.get('name');  
//调用方法：CookieUtil.unset('name');

/*============================================================封装简单的运动部分================================================================*/
function startMove(obj, json, fn) { //参数含义：对象，样式格式，函数
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bStop = true;
        for (var attr in json) {
            var iCur = 0;
            if (attr == 'opacity') {
                iCur = parseInt(parseFloat(x.getStyle(obj, attr)) * 100);
            } else {
                iCur = parseInt(x.getStyle(obj, attr));
            }
            var iSpeed = (json[attr] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            if (iCur != json[attr]) {
                bStop = false;
            }

            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 30)
}
//调用方式： startMove('div',{width:100,height:300},function(){'div',{ opacity:0 }}); 给div对象添加运动