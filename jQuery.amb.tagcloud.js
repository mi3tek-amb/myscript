/* TagCloud.js for Ameblo
 *
 * The MIT License (MIT) Copyright (c) 2013
 * copyright : Mistuki Suzuki
 */
(function($){

$.tagcloud = new Function;

$.tagcloud.prototype = {
	createTag : function(e,f){
		
		var h,g =new Array;
		
		for (i = 0; (h=f[i])!=null; i++){
					
			var WC = $.grep(e, function(n){
						return n === h;
					});
			if( WC.length < 2 ){
				continue;
			};
			
			fontretio = WC.length/e.length;
			fontsize =Math.round(fontretio*100)*2+12;
			fontcolor = fontretio*30;
			g.push('<li class="cloudtag" style="font-size:'+ fontsize +'px" >'
			+'<a href="#" style="opacity:'+ fontcolor +'">'+WC[0]+'</a></li>')
			
		};
		return g;
	},
	createElms : function(elm,undefined){
		
		var 
		elms = new Array,
		description = elm["desc"],
		description = $( $.parseHTML(description) ),
		date = elm["date"],
		date = date.replace(' ', '').split('-'),
		src,getSrc = $(description).find('img').eq(0).attr('src');
		
		if( getSrc != undefined ){
			if( getSrc.match('emoji') ){
				src = 'http://mi2log.com/amblo/common_image/book.jpg';
			}else{
				src = shortedImg400 + getSrc.replace('http://','');
			}
			
		}else if( getSrc === undefined ){
			var youtubeIframe = description.find('iframe');
			if( youtubeIframe.length ){
				src = 'http://i.ytimg.com/vi/'
					+(youtubeIframe.attr('src').split('/')[4])+'/0.jpg';
					
			}else if(elm["tag"].match('メモ')){
				src = 'http://mi2log.com/amblo/common_image/memo.jpg';
				
			}else{
				src = 'http://mi2log.com/amblo/common_image/book.jpg';
				
			}
		}
		
		var descImg = 
			$('<img/>').attr( 'src',src ).hide().on('load',function(){
				if($(this).attr('src').match('http://i.ytimg.com/') ){
					$(this).attr({width:230,style:'margin-top:28px'});
				}else{	
					$(this).attr({width:230});
				}
				$(this).fadeIn(500).parent()
				.find('.mask').delay(1000).fadeIn(500);
			});

		
		
		descText = $(description).find('span.tag').remove()
					.end().find('pre,style,div').remove()
					.end().html().split('<!--more-->')[0],
		
		descText = $($.parseHTML(descText)).text();
			
		if(descText.length > 100)descText = descText.substr(0, 99) + '…';
		
		var elm =
		'<li class="entries">\
			<div class="eyecatch">\
			<a class="mask" href="'+elm["link"]+'"><p class="active">Read</p></a>\
			</div>\
			<div class="infoWrap">\
				<p class="entryDate">'+date[0]+'年'+date[1]+'月'+date[2]+'日</p>\
				<p class="newentrytitle">\
					<a href="'+elm["link"]+'">'+elm["title"]+'</a>\
				</p>\
				<p class="desc">'+descText+'</p>\
				<p class="cloudtag"><a href="#">'+
					( String(elm["tag"]).split(',').join( '</a><a href="#">' ) || '' )+'</a>\
				</p>\
				<p class="readmore">\
					<a href="'+elm["link"]+'">Read More</a>\
				</p>\
			</div>\
		</li>';
	
		return $(elm).find('.eyecatch').append(descImg).end();
	},	
	tagsearch : function( items, a ){
		
		var this_tag = a.text();
		
		$('#sub_main').fadeOut(500,function(){
			
			$(this).empty().each(function(){
				var listBody = $('<ul id="tagEntryList">');
				$(this).append(listBody);

				var item,
				this_tagReg = new RegExp( this_tag, 'gi'),
				w=1,i=0;
				
				for( ; (item = items[i])!=null ; i++ ){
					if( (String(item['tag']).match( this_tagReg )) ){
						var elem = $tc.createElms(item);
						listBody.append( $(elem).hide().delay(500).slideDown(500) );
						w = w+1;
					};
				};
				listBody.prepend('<h3 class="tagResult">Result of ”'+this_tag+'”( '+w+' ) </h3>');
			});
			$(this).fadeIn(500);
			
		});
	}
};

callback_tagCloud = function(jsonResult) {
	
	var items = jsonResult.items,
		tags = new Array,
		$tc = new $.tagcloud;
	
	for(var i = 0; i < items.length; i++) {
		var item = items[i];
		tags.push(item["tag"]);
	};

	var array = String(tags).split(','),
	all_words = $.grep(array, function(e){return e !== ""}),
	tag_words = new Array;
	for (var i = 0; i < all_words.length; i++){
	    if( !$fn.duplicate(tag_words, all_words[i]) ){
			tag_words.push(all_words[i]);
		}
	};
	
	$('#tagCloud').find('.tagcloudList')
		.append( $tc.createTag(all_words,tag_words) );

	
	$(document).on('click','.cloudtag a',function(){
		$('body,html').animate({scrollTop:0},800);
		$tc.tagsearch( items,$(this) );
		return false;
	});
	
	if( documentUrl==='http://ameblo.jp/miumiu3tek/' || documentUrl==='http://ameblo.jp/miumiu3tek' ){
		$('#sub_main').empty().each(function(){
			
			var listBody = $('<ul id="tagEntryList">');
			$(this).append(listBody);
			
			for(var i=0 ; i<5 ; i++ ){
				var elem = $tc.createElms(items[i]);
				listBody.append( $(elem).hide().delay(500).slideDown(500) );
			};
			
			$(this).prepend('<h3 class="tagResult">Recent Entries</h3>');
		});
	}
	$('#wrap').fadeIn(500);
};

	
})(jQuery);