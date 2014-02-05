function duplicate(array,str){
    for(var i =0; i < array.length; i++){
        if(str == array[i]){
            return true;
        }
    }
    return false;
};

//ワードを個別に配列化
function eachWords(c){
	var d = new Array;
	for (var i = 0; i < c.length; i++){
	    if( !duplicate(d, c[i]) ){
			d.push(c[i]);
		}
	};
	return d;
};

function createWords(e,f){
	
	var g =new Array;
	
	for (i = 0; i < f.length; i++){
				
		var WC = $.grep(e, function(n){
					return n === f[i];
				});
		
		if( WC.length){
		
			fontretio = WC.length/e.length;
			fontsize = Math.round(fontretio*100)*2+10;
			fontcolor = fontretio*30;
			g.push('<li class="cloudtag" style="cursor:pointer;font-size:'+ fontsize +'px" ><a href="#" style="opacity:'+ fontcolor +'">'+WC[0]+'</a></li>')
		}
	};
	return g;
};
			

function callback_JPtag(jsonResult) {
	
	var items = jsonResult.items,
		tags = new Array;
	
	//タグを配列に挿入
	for(var i = 0; i < items.length; i++) {
		var elem = items[i];
		tags.push(elem["tag"]);
	};
	var array = String(tags).split(',');
	var all_words = $.grep(array, function(e){return e !== "";}),
		tag_words = eachWords(all_words);

		
	//クラウド実装
	$('#tagCloud').find('.tagcloudList').append(createWords(all_words,tag_words));
	
	$('.cloudtag a').click(function(){
		var this_tag = $(this).text();
		location.href='http://ameblo.jp/miumiu3tek/themeentrylist-00000000000.html?search_tag='+this_tag;
	});
		

	
	var document_uri = document.URL;
	
	if(document_uri.match(/search_tag=/g)){
		$('.error').remove();
		$('#recent_entries_list').empty().each(function(){
			
			document_uri = decodeURI(document_uri);
			this_tag = document_uri.split('?search_tag=').pop();
			
			$(this).append('<h3>”'+this_tag+'”を含む記事</h3>')
			.append('<ul id="tagEntryList" />');
			
			for(var i = 0; i < items.length; i++) {
				
				var elem = items[i],
					content = '<li class="entries" style="display:none">'+
					'<p class="updatetime">'+elem["date"]+'</p>'+
					'<a href="'+elem["link"]+'">'+
						'<p class="newentrytitle">'+elem["title"]+'</p>'+
					'</a><span class="theme cloudtag">タグ：<a href="#">'+String(elem["tag"]).split(',').join('</a><a href="#">')+'</a></span>'
					+'</li>';
					
					$('ul#tagEntryList').append(content);
			};
			
			$(this).find('#tagEntryList .entries').each(function(){
				if( $(this).find('.cloudtag').text().toLowerCase().match(this_tag.toLowerCase()) ){
					$(this).fadeIn();
				}else{
					$(this).remove();
				}
			});

		});
		
	}else if( document_uri === 'http://ameblo.jp/miumiu3tek/' | document_uri === 'http://ameblo.jp/miumiu3tek' ){
		
		$('#sub_main').empty().each(function(){
						
			$(this)
			.append('<div id="recent_entries_list"><h3>RECENT ENTRIES</h3><ul id="tagEntryList" /></div>');
			
			for(var i = 0; i < 10; i++) {
				
				var elem = items[i],
					content = '<li class="entries">'+
					'<p class="updatetime">'+elem["date"]+'</p>'+
					'<a href="'+elem["link"]+'">'+
						'<p class="newentrytitle">'+elem["title"]+'</p>'+
					'</a><span class="theme cloudtag">タグ：<a href="#">'+String(elem["tag"]).split(',').join('</a><a href="#">')+'</a></span>'
					+'</li>';
					
					$('ul#tagEntryList').append(content);
			};
		}).animate({opacity:1});
		
	};
	
	$('#sub_main').animate({opacity:1});
};
	
(function($){
	$.getScript('http://mi2log.com/amblo/api/entryListJson.js');
}(jQuery));