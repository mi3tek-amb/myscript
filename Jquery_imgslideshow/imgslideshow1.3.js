/* 
 * JQuery slideshow1.2
 * 
 * Licensed under the MIT license.
 * Copyright 2012 Mitsuki Suzuki.
 */ 
 
/*Wraped image for Resize & Center

$.fn.imgCenter=function(option){
	$(this).removeAttr('width').removeAttr('height').css({width:" ",height:" ",padding:0});
	var def = {type:'both',displayWidth:null,displayheight:null,maxWidth:null,maxheight:null};
	option&&$.extend(def,option);
	
		var tbh=$(this).height();
		var tbw=$(this).width();
		if(option.displayWidth>option.displayheight){var maxSize=option.option.displayWidth}else{var maxSize=option.displayheight};
		if(tbh>tbw){$(this).css({width:option.maxWidth});};
		if(tbh<tbw){$(this).css({height:option.maxheight});};
		if(tbh==tbw){$(this).css({height:maxSize});};
		tbh=$(this).height();
		tbw=$(this).width();
		var disheight = option.displayheight/2;
		var disWidth = option.displayWidth/2;
		var i=tbh/2;var imgheight=i-disheight;
		var i=tbw/2;var imgWidth=i-disWidth;
		$(this).css({position:'relative',right:imgWidth,bottom:imgheight});
	return this;
};

*///main

$.fn.tumblr=function(j){
	settings={
	
		margin:2,
		viewWidth:null,
		viewHeight:200,
		type:null,
		load:null,
		userId:null,
		show:null,
		auto:false,
		zoom:false,
		autoIntTime:5000
		
		};
		
		j&&$.extend(settings,j);
		
	var that = this;
	if(settings.type=='tumblr'){
		var width=settings.viewWidth/settings.show;
		var d=width*settings.load+40;var e=width*settings.show;
		
		$(this).css({width:e})
		.append("<ol class=tumblrWrap clearfix style=position:relative;width:"+d+"px;height:"+settings.viewHeight+"px;>");
		
		$.getJSON("http://"+settings.userId+".tumblr.com/api/read/json?num="+settings.load+"&callback=?",function(i){
			$.each(i.posts,function(l,k){
				var m=this["photo-url-500"];
				var n=this["url"];
				var o=this["photo-caption"];
				var p=this["date"];
				if(this["type"]==="photo"){
					$(that).find(".tumblrWrap")
					.append('<li style="width:'+width+'px;height:'+settings.viewHeight+'px"><div class="popupTitle" style="display:none;width:'+width+
					'px;height:'+settings.viewHeight+'px"><blockquote>'+o+'</blockquote></div><img style="display:none;right:0px" src='+m+
					'><a href='+n+'><div class=popupDesc>'+p+'</div></a></span>')
					.find('img').bind('load',function(){
						$('.popupTitle').hide();
						$(this).imgCenter({displayWidth:width,displayheight:200,maxWidth:width,maxheight:settings.viewHeight,a:settings.viewHeight,b:width}).fadeIn();
						
					});
				}
			});
		});
	};
	
	if(settings.type == 'instagram'){
		var width=settings.viewWidth/settings.show;
		var d=width*settings.load+40;var e=width*settings.show;

		$(this).css({width:e}).append("<ol class=tumblrWrap class=clearfix style=position:relative;width:"+d+"px;min-height:160px;>");
		$(this).bind('load','.tumblrWrap',function(){
			$('.tumblrWrap').instagram({userId:"178511497",show:settings.load,accessToken:"178511497.8022044.30d0558ec78148e38bd7b249680d366b"});
		});
	};
	
	var f=settings.load/settings.show;
	
	f=Math.ceil(f);
	$(this).append("<div class=navi><div class=prev class=btn></div><div class=positionNavi></div><div class=next class=btn></div><div class=debug></div></div>");
	var a="<div class=mark>";
	for(loop=1;loop<=f;loop++){$(".positionNavi").append(a)};
	
	var tumblrWrap = $(that).find(".tumblrWrap");
	var c=$(".positionNavi").find(".mark");
	
	$(c).eq(0).css({backgroundPosition:"right"});
		var b=0;
		var h=true;
		var i=0;
		var pouse=false;
		
		$(".next").click(function(){
			if(settings.auto){clearInterval(autoplay);pouse=true;};
			if(b==f-1){return false}
			if(h){h=false;i=i-e;$(tumblrWrap).animate({left:i},function(){h=true});
			$(c).eq(b).css({backgroundPosition:"left"});
			b=b+1;
			$(c).eq(b).css({backgroundPosition:"right"});
			if(pouse){automode();pouse=false;};
			}else{return false}
		});
			
		$(".prev").click(function(){
			if(settings.auto){clearInterval(autoplay);pouse=true;};
			if(b==0){return false}
			if(h){h=false;i=i+e;$(tumblrWrap).animate({left:i},function(){h=true});
			$(c).eq(b).css({backgroundPosition:"left"});
			b=b-1;
			$(c).eq(b).css({backgroundPosition:"right"});
			if(pouse){automode();pouse=false;};
			}else{return false};
		});
		
		function automode(){
			function auto(){
				if(b==f-1){$(c).eq(b).css({backgroundPosition:"left"});b=-1;i=e;h=true;}
				if(h){h=false;i=i-e;$(tumblrWrap).animate({left:i},function(){h=true});
					$(c).eq(b).css({backgroundPosition:"left"});
					b=b+1;
					$(c).eq(b).css({backgroundPosition:"right"});
				};
			};
		autoplay = setInterval(function(){auto()}, settings.autoIntTime);
		};
		
		if(settings.auto){
			automode();
		};
		
	return this;
};
