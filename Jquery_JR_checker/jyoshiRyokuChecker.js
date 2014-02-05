function setRatio(resizeElm){
	outW = resizeElm.width();
	resizeElm.find('.slabs').each(function(n){
		elm = $(this);
		inW = elm .css({
		  	display:'inline',
			whiteSpace:'nowrap'
		}).width();
		
		var ratio =  outW / inW;
		newSize = ratio * init * fontRetio;
		if( newSize > 160 ){ newSize = 160 };
		elm.css({
			'font-size': newSize + 'px',
			'line-height' : newSize/1.05 + 'px'
			});
		whiteSpace = elm.text(),
		whiteSpace = whiteSpace.match(/\s/g).length,
		inW = $(this).width(),
		parWidth = outW-inW,
		wordSpace = parWidth/(whiteSpace-3);
		elm.css({'word-spacing' : wordSpace , visibility:'visible' ,display:'block'});
	});
};

var callback_JPtag = function(jsonTypeResult) {
	
	var items = jsonTypeResult["items"],
		tags =[],
		contents = [];
	
	for(var i = 0; i < items.length; i++) {
		var elem = items[i];
		tags.push(elem["description"]);
	};
	
	function articleSrc(a){
	
		var tag = $(a).text();
		$(a).parent().parent().each(function(){
		var document_uri = document.URL;
				
		$(this).find('.res_cloud').find('h3').empty().append(tag + 'を含む記事');
			$(this).find('.res_cloud').find('li.title').hide().each(function(){
				if($(this).find('p.tags').text().toLowerCase().match(tag.toLowerCase())){$(this).show()};
				
				var this_url = $(this).find('a').attr('href');
				if(this_url == document_uri){$(this).remove();};
			
			});	
			
		});
		return this;
	};
		
	$('.JPCHECKER').each(function(){
		$(this).append('<div class="res_cloud"><h3></h3><ul style="list-style-type:circle"></ul></div>');
		
		for(var i = 0; i < items.length; i++) {
			var elem = items[i],
				content = '<li class="title" style="display:none"><a href="'+elem["link"]+'">'+elem["title"]+'</a>'+'<p class="tags" style="display:none">'+elem["description"]+'</p></li>';
				$('.res_cloud ul').append(content);
			
		};
		
		articleSrc($(this).find('span.cloud').eq(0));
		
		$('span.cloud').on('click',function(){
			articleSrc(this);
			return false;			
		});
	});
	
	$('#tagCloud').each(function(){
	
		$(this).append('<div class="skinMenu tagClowd"><div class="skinMenuHeader"><span class="skinMenuTitle">タグクラウド</span></div><div class="skinMenuBody"><ul class="tagcloudList"></ul></div></div>');
	
		var that_value = String(tags),
			wordcloud =[];
		
		
		for (i = 0; i < JRP_tag_word.length; i++){
			var WC = that_value.match(JRP_tag_word[i]);
			if( WC ){
				fontsize = Number(WC.length)*0.3+12;
				wordcloud.push('<li class="cloudtag" style="color:#e55;cursor:pointer;font-size:'+fontsize+'px" ><a href="#">'+WC[0].toLowerCase()+'</a></li>')
			};
		};
		
		$(this).find('ul.tagcloudList').append(wordcloud)
		.end().find('li.cloudtag a').click(function(){
			var this_tag = $(this).text();
			location.href='http://ameblo.jp/miumiu3tek/themeentrylist-00000000000.html?search_tag='+this_tag;
		});
		
	});

	
	document_uri = document.URL;
	if(document_uri.match(/search_tag=/g)){
		$('.listContentsArea').empty().each(function(){
			document_uri = decodeURI(document_uri);
			this_tag = document_uri.split('?search_tag=').pop();
			$(this).append('<h2>”'+this_tag+'”を含む記事</h2>');
			$(this).append('<ul id="tagEntryList" />');
			for(var i = 0; i < items.length; i++) {
				var elem = items[i],
					content = '<li class="title" style="display:none"><a href="'+elem["link"]+'">'+elem["title"]+'</a>'+'<p class="tags" style="display:none">'+elem["description"]+'</p></li>';
					$('ul#tagEntryList').append(content);
			};
			$(this).find('#tagEntryList').find('li.title').each(function(){
				if($(this).find('p.tags').text().toLowerCase().match(this_tag.toLowerCase())){

				
				tag_uri = $(this).find('a').attr('href');
				$.ajax({type: "get",
						dataType: "html",
						url: tag_uri,
						success: function(recentData){
							$($.parseHTML(recentData)).find('.skinArticle').each(function(){
								var title = $(this).find('.skinArticleHeader h1').html();
								var href = $(this).find('.skinArticleHeader h1 a').attr('href');
								var intro = $(this).find('.articleText').find('.intro').text();
								var img = $(this).find('.articleText').find('.header').find('img').attr('src');
								var date = $(this).find('.articleTime').html();
		
								if(!img){img = '<img src="http://miumiu3tk.sakura.ne.jp/common_image/column_no-img.jpg">'}
								else{img = img.replace('http://',''), img = '<img src="http://imgstat.ameba.jp/view/d/300/'+img+'" />'};
		
								var recentColumn = '<li class ="column recent">'+
													'<aside><span class="date">'+date+'</span><h3><span class="slabs">'+title+'</span></h3>'+
													'<span><a href="'+href+'">'+img+'</a></span>'+
													'<p>'+intro+'</p></aside>'+
													'<span class="readMore"><a href="'+href+'">続きを読む</a></span></li>';
		
								$(recentColumn).appendTo('#tagEntryList')
								.find('h3').each(function(){
										init = 36;
										fontRetio = 1.05;
										setRatio($(this));
									});
									
								$("#tagEntryList").html(
									$("#tagEntryList .column").sort(function(a, b) {
										return $(a).find(".date time").attr('datetime') > $(b).find(".date time").attr('datetime') ? -1 : 1;
									})
								);
								
							});
						}
				});
			};
				
			}).remove();
		});
	};

};

$.fn.JRChecker = function(){

	return this.each(function(){
		var text = $(this).find('.articleText').text(),
			entryTag = $(this).find('.articleText').find('.entryTag').text().split(','),
			title = $(this).find('.skinArticleHeader h1'),
			thisUri = title.find('a').attr('href'),
			title = title.text(),
			that = text+title,
			tagName = [],
			JPPoint = 0,
			allJP = 0,
			wordcloud =[];
		
	
		for (i = 0; i < JRP_tag_word.length; i++){
			var WC = that.match(JRP_tag_word[i]);
			if( WC ){
				JPPoint=JPPoint+3,
				fontsize = Number(WC.length)*0.3+14;
				tagName.push(WC);
				wordcloud.push('<span class="cloud" style="color:#e55;cursor:pointer;font-size:'+fontsize+'px" >'+WC[0].toLowerCase()+'</span>')
			};
		};
		
		var JyoshiRyoku = JPPoint*20;
		
		$(this).append('<div class="JPCHECKER"><p>この記事を読むのにおよそ<font color="#e55" size="3em">'+JyoshiRyoku+'</font>Kcalの女子力を使います</p>'+
						'<div class="clearfix"></div><span style="display:none" class="entryTagName">{"title": "'+title+'","link": "'+thisUri+'","description": "'+tagName+entryTag+'"}</span></div>');
		
		var that = $(this).find('.JPCHECKER').find('div');
		
		for (i = 0; i < wordcloud.length; i = i +1){
			$(that).append(wordcloud[i]);
		};
		
	});
	
};
	
(function($){

	$.getScript('http://mi2log.com/amblo/api/entryListJson.js');
}(jQuery));