//所有页都会用到的funcs

//地区层开始=========
var prox;
var proy;
var proxc;
var proyc;

function show(id){/*--打开--*/
 var d=document.getElementById('showdiv');
 clearInterval(prox);
 clearInterval(proy);
 clearInterval(proxc);
 clearInterval(proyc);

 var o = document.getElementById(id);
 o.style.display = "block";
 o.style.width = "340px";
 o.style.height = "100px"; 
 prox = setInterval(function(){openx(o,340)},10);
 d.href="";
}

function openx(o,x){/*--打开x--*/
var cx = parseInt(o.style.width);
if(cx < x)
{
    o.style.width = (cx + Math.ceil((x-cx)/5)) +"px";
}
else
{
    clearInterval(prox);
    proy = setInterval(function(){openy(o,110)},1);
}
}

function openy(o,y){/*--打开y--*/
var cy = parseInt(o.style.height);
if(cy < y)
{
    o.style.height = (cy + Math.ceil((y-cy)/5)) +"px";
}
else
{
    clearInterval(proy);
}
}

function divcloseed(id){/*--关闭--*/
/*
var o = document.getElementById(id);

if(window.event.y<100 || window.event.x>900 || window.event.x <400)
{
    o.style.display = "none";
}
*/
window.setTimeout("closeed('fd')", 200); 
}

function closeed(id){/*--关闭--*/

clearInterval(prox);
clearInterval(proy);
clearInterval(proxc);
clearInterval(proyc);
var o = document.getElementById(id);
if(o.style.display == "block")
{
    proyc = setInterval(function(){closey(o)},10);
}
}
function closey(o){/*--关闭y--*/
var cy = parseInt(o.style.height);
if(cy > 0)
{
    o.style.height = (cy - Math.ceil(cy/5)) +"px";
}
else
{
    clearInterval(proyc);
    o.style.display = "none";
    //proxc = setInterval(function(){closex(o)},10);
}
}
function closex(o){/*--关闭x--*/
var cx = parseInt(o.style.width);
if(cx > 0)
{
    o.style.width = (cx - Math.ceil(cx/5)) +"px";
}
else
{
    clearInterval(proxc);
    o.style.display = "none";
}
}
//地区层结束=========

//fixPng
function fixPng() { 
    var arVersion = navigator.appVersion.split("MSIE"); 
    var version = parseFloat(arVersion[1]);
    if ((version >= 5.5 && version < 7.0) && (document.body.filters)) { 
        for(var i=0; i<document.images.length; i++) {
            var img = document.images[i];
            var imgName = img.src.toUpperCase(); 
            if (imgName.indexOf(".PNG") > 0) {
                var width = img.width; 
                var height = img.height; 
                var sizingMethod = (img.className.toLowerCase().indexOf("scale") >= 0)? "scale" : "image"; 
                img.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +  img.src.replace("'", "\\'") + "', sizingMethod='" + sizingMethod + "')"; 
                img.src="//i1.hdfimg.com/images/blank.gif";
                mce_src="//i1.hdfimg.com/images/blank.gif"; 
                img.width = width; 
                img.height = height; 
            } 

        }
    }
}
fixPng();

fetchRemoteContent = function (sUrl, targetDivId, timeout, method)
{
    var s = document.createElement('script');
    s.setAttribute('src', sUrl);
    document.body.appendChild(s);
    return;
}
forceRefreshUrl = function (url)
{
    var date = new Date();
    if ('-1' == url.indexOf('?'))
        url += '?said=' + date.getTime();
    else
        url += '&said=' + date.getTime();
    return url;
}

jQuery.extend({
		isEmail: function( paraEmail )
		{
			var reg_email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			if( reg_email.test(paraEmail) ){
				return true;
			}
			return false;
		}
		, isMobile: function( paraMobile )
		{
			var reg_mobile = /^1[3456789][0-9]{9}$/;
			if( reg_mobile.test(paraMobile) ){
				return true;
			}
			return false;
		}
		, isPhone: function( paraPhone )
		{
			var reg_phone = /[0-9]{7}/;

			if( reg_phone.test(paraPhone) ){
				return true;
			}
			return false;
		}
	});
