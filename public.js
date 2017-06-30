/*!
 *
 * author:  xsk_sky
 * Date:    2017-06-30
 * Name:    public.js
 * Desc:    原生js封装自己常用的类库及js兼容性写法;
 * github： https://github.com/sky-xsk
 * 
 */
/*============================================================================================================================*/
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

//设置样式
function setStyle(obj, json) {
    var arr = '';
    for (arr in json) {
        obj.style[arr] = json[arr];
    }
};
//调用方法：setStyle('div',{width:200px,height:200px})

//获取样式    
function getStyle(obj, attr) {
    if (obj.currentStyle) { //兼容性的写法
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, null)[attr];
    }
};
//调用方法：getStyle('div','width')

//添加事件方法
function addEvent(obj, Sevent, fn) { //参数意义：对象，事件，函数
    if (obj.attachEvent) {
        obj.attachEvent('on' + Sevent, fn)
    } else {
        obj.addEventListener(Sevent, fn, false)
    }
    //两种方法 
    //obj.attachEvent ? obj.attachEvent('on' + Sevent, fn) : obj.addEventListener(Sevent, fn, false);
};
//调用方法  addEvent(obj, 'click', fn); 这里以click为例子

//添加class类名 
function addClass(obj, classNames) {
    obj.className ? obj.className = obj.className + ' ' + classNames : obj.className = classNames;
};
//调用方法  addClass(obj,'classNames') 这里以click为例子

//根据数组的元素操作数组进行排序(从小到大)
function arrSort(pros) {
    return function(a, b) {
        var value1 = a[pros];
        var value2 = b[pros];
        return value1 - value2 > 0 ? 1 : -1;
    }
}
//调用方法 Array.sort(arrSort('pros'));

//阻止冒泡事件
function stopPropagation(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}
//调用方法：stopPropagation(event);

//阻止默认事件
function preventDefault(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}
//调用方法：preventDefault(event);