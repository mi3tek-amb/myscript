$.fn.tumblr=function(j){
	settings={type:null,load:null,userId:null,show:null,zoom:false};j&&$.extend(settings,j);
	
	var that = this;
if(settings.type=='tumblr'){
	var d=142*settings.load+40;var e=140*settings.show;
	$(this).css({width:e}).append("<ul id=tumblrWrap class=clearfix style=position:relative;width:"+d+"px;min-height:160px;>");
	$.getJSON("http://"+settings.userId+".tumblr.com/api/read/json?num="+settings.load+"&callback=?",function(i){
		$.each(i.posts,function(l,k){var m=this["photo-url-250"];
			var n=this["url"];
			if(this["type"]==="photo"){
				$(that).find("ul#tumblrWrap")
				.append('<span style=background:#000><a href="'+n+'"target=_blank><img style=display:none;height:200px;position:relative;right:0px src="'+m+'"/></a</span>')
				.find('img').bind('load',function(){
					var i=$(this).width();
					i=i/2;imgCenter=i-65;
					var i=$(this).height();
					i=i/2;imgheight=i-75;
					$(this).css({right:imgCenter,bottom:imgheight}).fadeIn();
					if(settings.zoom == true)$(this).hover(function(){$(this).stop().animate({height:220,marginLeft:-10,marginTop:-10,});
					},function(){$(this).stop().animate({height:200,marginLeft:0,marginTop:0});});
				});
			}
		});
	});
};
if(settings.type == 'instagram'){
	var d=156*settings.load+40;var e=156*settings.show;
	$(this).css({width:e}).append("<ul id=tumblrWrap class=clearfix style=position:relative;width:"+d+"px;min-height:160px;>");
	$(this).find('#tumblrWrap').instagram({userId:"178511497",show:settings.load,accessToken:"178511497.8022044.30d0558ec78148e38bd7b249680d366b"});
};
	var f=settings.load/settings.show;
	f=Math.ceil(f);
	$(this).append("<div id=navi><div id=prev class=btn></div><div id=positionNavi></div><div id=next class=btn></div><div class=debug></p></div>");
	var a="<div class=mark>";
	for(loop=1;loop<=f;loop++){$("#positionNavi").append(a)};
	
	var tumblrWrap = $(that).find("ul#tumblrWrap");
	var c=$(that).find("#positionNavi").find(".mark");
		$(c).eq(0).css({backgroundPosition:"right"});
		var b=0;
		var h=true;
		var g=$(tumblrWrap).offset().left;
		$(that).find("#next").click(function(){
			var i=$(tumblrWrap).offset().left;
			i=i-g;
			if(b==f-1){return false}
			if(h){h=false;$(tumblrWrap).animate({left:i-e},function(){h=true});
			$(c).eq(b).css({backgroundPosition:"left"});
			b=b+1;
			$(c).eq(b).css({backgroundPosition:"right"});
			}else{return false}
		});
			
		$(that).find("#prev").click(function(){
			var i=$(tumblrWrap).offset().left;
			i=i-g;
			if(b==0){return false}if(h){h=false;
			$(tumblrWrap).animate({left:i+e},function(){
				h=true});
				$(c).eq(b).css({backgroundPosition:"left"});
				b=b-1;
				$(c).eq(b).css({backgroundPosition:"right"});
			}else{return false};
		});
	return this;
};
