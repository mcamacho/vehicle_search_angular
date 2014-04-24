"use strict";angular.module("vehicleSearchAngularApp").directive("mkFocus",function(){return function(a,b,c){a.$watch(c.mkFocus,function(a){a||b[0].focus()})}}),angular.module("vehicleSearchAngularApp").controller("menuAccordion",["$scope","$log","_","collectionFactory","sourceFactory","$sce",function(a,b,c,d,e,f){a.menu={setCurrent:function(a){this.current=this.current===a?-1:a},resultsQty:function(){return this.listI?this.listI.length:"0"},filterList:function(a,b){this.filterObj[a]=b},uniq:function(a){var b=this.categoriesI[a],d=c.keys(b.options),e="";return 1===d.length&&(e="<span>"+d[0]+"</span>",c.has(this.filterObj,b.valueKey)&&(e+='<span> <i class="foundicon-remove"></i> </span>')),f.trustAsHtml(e)},removeOption:function(a){this.filterObj=c.omit(this.filterObj,this.categoriesI[a].valueKey)},getQuery:function(){this.query=c.map(this.filterObj,function(a,b){return b.replace(/([A-Z])/,"_$1").toLowerCase()+"="+a}).join("/")},updateModel:function(){function a(a){return a.indexOf(",")>-1}var b=c.omit(this.filterObj,a),f=c.pick(this.filterObj,a);this.listI=c.isEmpty(b)?this.listC:c.where(this.listC,b),c.isEmpty(f)||(this.listI=c.filter(this.listI,function(a){var b=[];for(var d in f){var e=f[d].split(","),g=a[d].search(/[a-zA-Z]/)>-1?-1:parseInt(a[d].replace(",",""),10);b.push(g>=parseInt(e[0],10)&&g<=parseInt(e[1],10))}return c.indexOf(b,!1)>-1?!1:!0})),this.categoriesI=d(this.listI).menucategories(e.vehicleKeyV1)},getSlider:function(a){for(var b=c.pluck(this.listI,a),d=[],e=b.length-1;e>=0;e--)b[e].search(/[a-zA-Z]/)<0&&d.push(parseInt(b[e].replace(",",""),10));var f=1e3*Math.floor(c.min(d)/1e3),g=1e3*Math.ceil(c.max(d)/1e3);return{from:f,to:g,step:1e3,min:f,max:g}}},a.$watch("menu.filterObj",function(){a.menu.current=-1,a.menu.getQuery(),a.menu.updateModel()},!0),a.$watch("menu.slider",function(b,d){if(b&&d)for(var e in b)c.isEqual(b[e],d[e])||(a.menu.filterObj[e]=a.menu.slider[e].from+","+a.menu.slider[e].to)},!0),a.$watch("loc.changed",function(){a.loc.changed&&(a.menu.active=!1)},!0),a.$watch("base.mainData",function(){b.log("watch mainData");var f=a.base.mainData;a.menu.filterObj={},c.isEmpty(f)||(c.assign(a.menu,{listC:f,listI:f,categoriesI:d(f).menucategories(e.vehicleKeyV1)}),c.assign(a.menu,{slider:{price:a.menu.getSlider("price"),mileage:a.menu.getSlider("mileage")},active:!0}))},!1)}]),angular.module("vehicleSearchAngularApp").controller("searchCategoryCtrl",function(){}),angular.module("vehicleSearchAngularApp").factory("sourceFactory",function(){var a=function(a,b,c){for(var d=[];b--;)d.push(b*a+c);return d.reverse()};return{vehicleKeyV1:{year:{keyval:"year",menu:{order:5,valueLabel:"Year"}},make:{keyval:"make",menu:{order:10,valueLabel:"Make"}},model:{keyval:"model",menu:{order:15,valueLabel:"Model"}},standardBody:{keyval:"standard_body",menu:{order:20,valueLabel:"Body"}},exteriorColor:{keyval:"exterior_color",menu:{order:25,valueLabel:"Color"}},transmission:{keyval:"transmission",menu:{order:30,valueLabel:"Transmission"}},fuelType:{keyval:"fuel_type",menu:{order:35,valueLabel:"Fuel Type"}},price:{keyval:"price",slideorder:5},mileage:{keyval:"mileage",slideorder:10},vin:{keyval:"vin"},image1:{keyval:"image_1"},extColorCode:{keyval:"ext_color_code"},evoxId:{keyval:"evox_id"}},rangeArray:a}}),angular.module("vehicleSearchAngularApp").factory("collectionFactory",["_",function(a){return function(b){var c={list:b,menucategories:function(b){var c=a.pick(b,function(b){return a.has(b,"menu")}),d=a.mapValues(c,function(b,c){var d=a.pluck(this.list,c),e=a.countBy(d,function(a){return a});return{valueKey:c,valueLabel:b.menu.valueLabel,order:b.menu.order,options:e}},this);return a.sortBy(d,"order")}};return c}}]),angular.module("vehicleSearchAngularApp").factory("dashFactory",["$location",function(a){return{queryValues:function(a,b){var c=[];return angular.forEach(a,function(a,c){this.push(a[b]===c?a[b]:a[b]+"="+c)},c),c},dlocation:a}}]),angular.module("vehicleSearchAngularApp").filter("fulltextFilter",["$filter",function(a){return function(b,c){if(!c||0===c.length)return b;var d=c.split(" ");return d.forEach(function(c){c&&c.length&&(b=a("filter")(b,c))}),b}}]);