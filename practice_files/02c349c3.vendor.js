"use strict";angular.module("geolocation",[]).constant("geolocation_msgs",{"errors.location.unsupportedBrowser":"Browser does not support location services","errors.location.permissionDenied":"You have rejected access to your location","errors.location.positionUnavailable":"Unable to determine your location","errors.location.timeout":"Service timeout has been reached"}),angular.module("geolocation").factory("geolocation",["$q","$rootScope","$window","geolocation_msgs",function(a,b,c,d){return{getLocation:function(e){var f=a.defer();return c.navigator&&c.navigator.geolocation?c.navigator.geolocation.getCurrentPosition(function(a){b.$apply(function(){f.resolve(a)})},function(a){switch(a.code){case 1:b.$broadcast("error",d["errors.location.permissionDenied"]),b.$apply(function(){f.reject(d["errors.location.permissionDenied"])});break;case 2:b.$broadcast("error",d["errors.location.positionUnavailable"]),b.$apply(function(){f.reject(d["errors.location.positionUnavailable"])});break;case 3:b.$broadcast("error",d["errors.location.timeout"]),b.$apply(function(){f.reject(d["errors.location.timeout"])})}},e):(b.$broadcast("error",d["errors.location.unsupportedBrowser"]),b.$apply(function(){f.reject(d["errors.location.unsupportedBrowser"])})),f.promise}}}]),function(a,b){function c(a,b,c){d.directive(a,["$parse","$swipe",function(d,e){var f=75,g=.3,h=30;return function(i,j,k){function l(a){if(!m)return!1;var c=Math.abs(a.y-m.y),d=(a.x-m.x)*b;return n&&f>c&&d>0&&d>h&&g>c/d}var m,n,o=d(k[a]);e.bind(j,{start:function(a){m=a,n=!0},cancel:function(){n=!1},end:function(a,b){l(a)&&i.$apply(function(){j.triggerHandler(c),o(i,{$event:b})})}})}}])}var d=b.module("ngTouch",[]);d.factory("$swipe",[function(){function a(a){var b=a.touches&&a.touches.length?a.touches:[a],c=a.changedTouches&&a.changedTouches[0]||a.originalEvent&&a.originalEvent.changedTouches&&a.originalEvent.changedTouches[0]||b[0].originalEvent||b[0];return{x:c.clientX,y:c.clientY}}var b=10;return{bind:function(c,d){var e,f,g,h,i=!1;c.on("touchstart mousedown",function(b){g=a(b),i=!0,e=0,f=0,h=g,d.start&&d.start(g,b)}),c.on("touchcancel",function(a){i=!1,d.cancel&&d.cancel(a)}),c.on("touchmove mousemove",function(c){if(i&&g){var j=a(c);if(e+=Math.abs(j.x-h.x),f+=Math.abs(j.y-h.y),h=j,!(b>e&&b>f))return f>e?(i=!1,void(d.cancel&&d.cancel(c))):(c.preventDefault(),void(d.move&&d.move(j,c)))}}),c.on("touchend mouseup",function(b){i&&(i=!1,d.end&&d.end(a(b),b))})}}}]),d.config(["$provide",function(a){a.decorator("ngClickDirective",["$delegate",function(a){return a.shift(),a}])}]),d.directive("ngClick",["$parse","$timeout","$rootElement",function(a,c,d){function e(a,b,c,d){return Math.abs(a-c)<o&&Math.abs(b-d)<o}function f(a,b,c){for(var d=0;d<a.length;d+=2)if(e(a[d],a[d+1],b,c))return a.splice(d,d+2),!0;return!1}function g(a){if(!(Date.now()-j>n)){var b=a.touches&&a.touches.length?a.touches:[a],c=b[0].clientX,d=b[0].clientY;1>c&&1>d||f(k,c,d)||(a.stopPropagation(),a.preventDefault(),a.target&&a.target.blur())}}function h(a){var b=a.touches&&a.touches.length?a.touches:[a],d=b[0].clientX,e=b[0].clientY;k.push(d,e),c(function(){for(var a=0;a<k.length;a+=2)if(k[a]==d&&k[a+1]==e)return void k.splice(a,a+2)},n,!1)}function i(a,b){k||(d[0].addEventListener("click",g,!0),d[0].addEventListener("touchstart",h,!0),k=[]),j=Date.now(),f(k,a,b)}var j,k,l=750,m=12,n=2500,o=25,p="ng-click-active";return function(c,d,e){function f(){o=!1,d.removeClass(p)}var g,h,j,k,n=a(e.ngClick),o=!1;d.on("touchstart",function(a){o=!0,g=a.target?a.target:a.srcElement,3==g.nodeType&&(g=g.parentNode),d.addClass(p),h=Date.now();var b=a.touches&&a.touches.length?a.touches:[a],c=b[0].originalEvent||b[0];j=c.clientX,k=c.clientY}),d.on("touchmove",function(){f()}),d.on("touchcancel",function(){f()}),d.on("touchend",function(a){var c=Date.now()-h,n=a.changedTouches&&a.changedTouches.length?a.changedTouches:a.touches&&a.touches.length?a.touches:[a],p=n[0].originalEvent||n[0],q=p.clientX,r=p.clientY,s=Math.sqrt(Math.pow(q-j,2)+Math.pow(r-k,2));o&&l>c&&m>s&&(i(q,r),g&&g.blur(),b.isDefined(e.disabled)&&e.disabled!==!1||d.triggerHandler("click",[a])),f()}),d.onclick=function(){},d.on("click",function(a,b){c.$apply(function(){n(c,{$event:b||a})})}),d.on("mousedown",function(){d.addClass(p)}),d.on("mousemove mouseup",function(){d.removeClass(p)})}}]),c("ngSwipeLeft",-1,"swipeleft"),c("ngSwipeRight",1,"swiperight")}(window,window.angular),angular.module("nouislider",[]).directive("slider",function(){return{restrict:"A",scope:{start:"@",step:"@",end:"@",ngModel:"=",ngFrom:"=",ngTo:"="},link:function(a,b){var c,d,e,f;return e=jQuery(b),null!=a.ngFrom&&null!=a.ngTo?(c=null,f=null,e.noUiSlider({range:[a.start,a.end],start:[a.ngFrom||a.start,a.ngTo||a.end],step:a.step||1,connect:!0,slide:function(){var b,d,g;return g=e.val(),b=g[0],d=g[1],c=parseFloat(b),f=parseFloat(d),a.values=[c,f],a.$apply(function(){return a.ngFrom=c,a.ngTo=f})}}),a.$watch("ngFrom",function(a){return a!==c?e.val([a,null]):void 0}),a.$watch("ngTo",function(a){return a!==f?e.val([null,a]):void 0})):(d=null,e.noUiSlider({range:[a.start,a.end],start:a.ngModel||a.start,step:a.step||1,handles:1,slide:function(){return d=e.val(),a.$apply(function(){return a.ngModel=parseFloat(d)})}}),a.$watch("ngModel",function(a){return a!==d?e.val(a):void 0}))}}}),angular.module("ivpusic.cookie",["ng"]).factory("ipCookie",["$document",function(a){return function(){function b(b,c,d){var e,f,g,h,i,j,k,l,m;if(d=d||{},void 0!==c)return c="object"==typeof c?JSON.stringify(c):String(c),"number"==typeof d.expires&&(m=d.expires,d.expires=new Date,-1===m?d.expires=new Date("Thu, 01 Jan 1970 00:00:00 GMT"):d.expires.setDate(d.expires.getDate()+m)),a[0].cookie=[encodeURIComponent(b),"=",encodeURIComponent(c),d.expires?"; expires="+d.expires.toUTCString():"",d.path?"; path="+d.path:"",d.domain?"; domain="+d.domain:"",d.secure?"; secure":""].join(""),a[0].cookie;for(f=[],l=a[0].cookie,l&&(f=l.split("; ")),e={},k=!1,g=0;g<f.length;++g)if(f[g]&&(h=f[g],i=h.indexOf("="),j=h.substring(0,i),c=decodeURIComponent(h.substring(i+1)),void 0===b||b===j)){try{e[j]=JSON.parse(c)}catch(n){e[j]=c}if(b===j)return e[j];k=!0}return k&&void 0===b?e:void 0}return b.remove=function(a,c){var d=void 0!==b(a);return d&&(c||(c={}),c.expires=-1,b(a,"",c)),d},b}()}]);