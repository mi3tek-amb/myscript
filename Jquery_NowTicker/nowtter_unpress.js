(function($){
		
var nowtterLogImg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAAMgAAAA+CAYAAABuk1SaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp'+
    'bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6'+
    'eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0'+
    'NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo'+
    'dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw'+
    'dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv'+
    'IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS'+
    'ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD'+
    'cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFu'+
    'Y2VJRD0ieG1wLmlpZDo2QzgxMUVERTREQzExMUUyODFGN0Q2Qzk4MkU3ODJBQyIgeG1wTU06RG9j'+
    'dW1lbnRJRD0ieG1wLmRpZDo2QzgxMUVERjREQzExMUUyODFGN0Q2Qzk4MkU3ODJBQyI+IDx4bXBN'+
    'TTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZDODExRURDNERDMTExRTI4'+
    'MUY3RDZDOTgyRTc4MkFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZDODExRURENERDMTEx'+
    'RTI4MUY3RDZDOTgyRTc4MkFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4'+
    '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'+
    'PRP+LcAAI2Y7rCIf2agAAAAASUVORK5CYII=';
var ajaxloadimg = 'data:image/gif;base64,'+
    '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'+
    'Cwg1RAAAOwAAAAAAAAAAAA==';
    
function timelineGet(offset,obj,that,setUri,ajaxLoad){
	var top = $(that).find('ul.list').height(),
	uri = setUri;
	setTimeout(function(){
		$.ajax({
			
			type:"get",
			dataType:"html",
			url:uri,
			success:function(i){
			
				$(i).find('p.content').each(function(i){
					var nowContent = $(this).html();
					$('<li class="now" style="display:none">'+nowContent+'</li>').appendTo($(that).find('ul.list')).fadeIn(1000*i);
				});

			}
		});
	},1000);
};

$.fn.bottom = function(options) {
	
	var defaults = {
		proximity: .01
	};

	var options = $.extend(defaults, options);

	return this.each(function() {
		var obj = this;
		$(obj).on("scroll", function() {
			scrollHeight = $(that).find('#nowTimeLine .list').height();
			scrollPosition = $(obj).height() + $(obj).scrollTop();
			if ( (scrollHeight - scrollPosition) / scrollHeight <= options.proximity) {
				$(obj).trigger("bottom");
			}
		});
		return false;
	});
};

$.fn.nowtter=function(option){
	
	var that = this;

	var option = $.extend({
		id:null,
		limit:5,
		moreLoad:true,
		autoplay:false,
		bodycolor:'#252525',
		textcolor:'#fff',
		subtextcolor:'#aaa',
		inbodycolor:'#fafafa',
		intextcolor:'#111',
		bordercolor:'#eee',
		imgIcon:'inline'
	}, option);
	
	var overflow = 'hidden';

	return this.each(function(){
	
		var nowtterStyle = '#nowtterTicker{padding-bottom: 10px;position:relative;clear: both;width:100%;height:auto;border-radius:2px;overflow:hidden;background:'+option.bodycolor+'} #nowtterAuthWrapper{padding: 10px 5px 5px;height:57px} #nowtterAuthImgWrap{display:inline-block;float:left} #nowtterAuthImgWrap>img{border-radius:2px;margin-right:10px;float:left;border: '+option.textcolor+' solid 2px;display:'+option.imgIcon+'} #nowtterAuthWrapper>span.authName{font-size:1.2em;height:38px;display:inline-block;float:left} #nowtterAuthWrapper>span.authName>p{color:'+option.subtextcolor+';font-size:20px;padding:0;height:20px;line-height:1} #nowtterAuthWrapper>span.authName>a{color:'+option.textcolor+'} #nowTimeLine{margin:0 auto;background:'+option.inbodycolor+';width:96%;overflow:'+overflow+';height:auto} #nowTimeLine ul.list{list-style-type:none; padding: 0; position:relative;top:-2px} #nowTimeLine li.now{text-align:left;border-top:1px solid '+option.bordercolor+';padding:5px;position:relative;top:-1px} #nowTimeLine p.content{padding:10px;margin:0;}#nowTimeLine span.text,#nowTimeLine span.history {display: block;color:'+option.intextcolor+'}#nowTimeLine .skinWeakColor.time {color: #aaa;}#nowTimeLine span.device {font-size: 10px;margin-top: 10px;display: block;text-align: right;} #nowTimeLine span.status{display:block} #nowTimeLine span.photoArea>img{width:100px;display:block} #nowTimeLine span.actions{display:none} #nowtterTicker span.logo img{width:100px}#nowtterTicker .logo{margin-left:5px;display:block;float:left} #nowtterTicker span.maker{height:15px;display:inline-block;margin: 9px 5px;float:right;} #nowtterTicker .ajaxLoad {position: absolute;width: 32px;height: 32px;top: 230px;left: 50%;margin-left: -16px;z-index: 20;}',
		nowtterBody = '<div id="nowtterTicker"><span class="logo"><img src='+nowtterLogImg+' /></span><div id="nowTimeLine"><ul class="list" /></div><div id="Lisence"><span class="maker"><a href="http://ameblo.jp/miumiu3tek/entry-11441359767.html">Edited by chan-SUZU</a></span></div></div>',
		ajaxLoad = '<span class="ajaxLoad" style="background:url('+ajaxloadimg+') no-repeat;" />';
		
		$(this).append(nowtterBody);
		$(this).append('<style>'+nowtterStyle+'</style>');

		var setUri = 'http://mi2log.com/amblo/api/cross-access_now';
		
		timelineGet(0,$(window),that,setUri,ajaxLoad);

	});
return false;
};
})($ = new_jQuery = jQuery);