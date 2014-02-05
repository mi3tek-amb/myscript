/* 
 * JQuery AmebaBlog plugins.
 *  
 * Licensed under the MIT license.
 * Copyright 2012 Mitsuki Suzuki.
 */

//JQuery Now Ticker ver.1.2 
var nowTicker=function(url){
option={
		textcolor:"#fff",
		bgcolor:"#fffafe",
		maincolor:"#f57",
		subcolor:"#fee5e7",
		url:""
};

$.ajax({type:"get",dataType:"jsonp",url:"http://pipes.yahoo.com/poolmmjp/page_loader?url="+url+"&_render=json&_callback=?",success:function(jsonTypeNow){var Nowdoc=$(jsonTypeNow.value.items[0].description);var OwnerName=Nowdoc.find("#ownerName").find("a").remove();$(OwnerName).css({color:option.textcolor,"font-weight":"700",padding:"0","font-size":"1em","text-decoration":"none"});var Nickname=OwnerName.append("'s Now Line");var entry=Nowdoc.find("#nowListArea");$(entry).find(".actions").remove();$(entry).css({width:"100%",margin:"0",padding:"0",});$(entry).find("li.now").css({"list-style-type":"none",margin:"0",padding:"0"});$(entry).find(".skinWeakColor").removeAttr("href").css({color:option.maincolor,"float":"right",width:"100%",background:option.subcolor,"border-radius":"5px","-webkit-border-radius":"5px","-moz-border":"5px"});$(entry).find(".content").css({width:"auto",height:"auto",margin:"0 auto",padding:"0"});$(entry).find(".photoArea").css({display:"block","max-width":"100px","border-radius":"10px","-webkit-border-radius":"10px","-moz-border":"10px"});$(entry).find(".history").css({color:"#aaa"});$(entry).find(".status").css({color:"#aaa"});$("#AmebaNowLine").css({border:"3px solid","border-color":option.maincolor,padding:"5px 5px 5px 5px",background:option.bgcolor,"border-radius":"10px","-webkit-border-radius":"10px","-moz-border":"10px"}).append('<div class="Amtitle"></div><div class="AmebaNowWrapper"></div>');$(Nickname).css({display:"block","margin-bottom":"5px",color:option.textcolor,width:"auto",background:option.maincolor,padding:"5px 5px 5px 5px","border-radius":"10px","-webkit-border-radius":"10px","-moz-border":"10px"});$(".AmebaNowWrapper").css({color:"#000",background:option.bgcolor,width:"100%",height:"300px",overflow:"hidden",margin:"0 10px 10px 0"});$(".Amtitle").append(Nickname);$(entry).appendTo(".AmebaNowWrapper")}})};$(function(){function ticker(){$(".AmebaNowWrapper li:first").slideToggle("slow",function(){$(this).appendTo($(".AmebaNowWrapper")).fadeIn()})}setInterval(function(){ticker()},5000)});

$.fn.nowTicker=function(url){$(this).append('<div id=AmebaNowLine>').append('<span style=text-align:right;color:deeppink;>Ameba now TimeLine by <a href=http://ameblo.jp/miumiu3tek style=font-size:1.2em;>Mi2log*</a></span>');$.ajax({type:"get",dataType:"jsonp",url:yahooPipes+url+"&_render=json&_callback=?",success:function(jsonTypeNow){var Nowdoc=$(jsonTypeNow.value.items[0].description);var entry=Nowdoc.find("#nowListArea").find("li.now :lt(5)").css({borderBottom:"1px dotted #ccc",width:"90%",margin:'0',padding:"0","list-style-type":"none"});$(entry).find(".actions").remove().end().find(".skinWeakColor").removeAttr("href").css({color:'#fff',"float":"right",width:"100%"}).end().find(".content").css({width:"auto",height:"auto",margin:"0 auto",padding:"0",paddingBottom:"10px"}).end().find(".photoArea").css({display:"block","max-width":"100px"}).end().find(".history").css({color:"#aaa"}).end().find(".status").css({color:"#aaa"});$("#AmebaNowLine").append('<div class="Amtitle"></div><div class="AmebaNowWrapper"></div>');$(".AmebaNowWrapper").css({color:"#fff",width:"auto",height:"auto",margin:"0 10px 10px 0"});$(entry).appendTo(".AmebaNowWrapper");}});return this;};