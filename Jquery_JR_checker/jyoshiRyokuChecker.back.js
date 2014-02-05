var callback = function(jsonTypeResult) {
	
	var articleSrc = function(a){
		var tag = $(a).text();
		$(a).parent().parent().each(function(){
		var thisUri = $(this).find('span.entryTag').find('p.uri').text();
			$(this).find('.res_cloud').remove();
			$(this).append('<div class=res_cloud><h3>タグ”'+tag+'”を含む記事</h3><ul style=list-style-type:circle></ul></div>');
			
			var items = jsonTypeResult["items"];

			for(var i = 0; i < items.length; i++) {
				var elem = items[i];
				var url = elem["link"];
				var content = '<li class=title style=display:none><a href="'+url+'">'+elem["title"]+'</a>'+'<p class=tags style=display:none>'+elem["description"]+'</p></li>'
				$(this).find('.res_cloud ul').append(content);
			}						
			$(this).find('.res_cloud').find('li.title').each(function(){
				var tags=$(this).find('p.tags').text();
				if(tags.match(tag)){$(this).show()};
				var url=$(this).find('a').attr('href');
				if(url == thisUri){$(this).remove();};
			});	
		});return this;
	};
	
	
	$('.JPCHECKER').find('span.cloud :eq(0)').each(function(){
		articleSrc(this);
	});
	
	$('span.cloud').mouseover(function(){
		$(this).css({border:'3px'}),
		function(){
			$(this).css({border:'0px'});
		};
		$(this).click(function(){
			articleSrc(this);return false;			
		});
	});
};

$.fn.JRChecker = function(){
	var text = $(this).find('.articleText').text();
	var title = $(this).find('.skinArticleHeader h1');
	var thisUri = title.find('a').attr('href');
		title = title.text();
	var that = text+title;
	var JPPoint = 0;
	var allJP = 0;
	var wordcloud =[];
	//評価A
	var JRP_RankA = [
	/iPhone5/g,
	/なんかなんかぁ〜/g,
	/かわいそーなコ★/g,
	/覚えたぞぉ/g,
	/メモメモ/g,
	/私のハードディスク/g,
	/キュンキュンキュン！/g,
	/オムレツ/g,
	/ひよこ|ヒヨコ/g,
	/死んじゃうじゃないですかぁ/g,
	/わかんな+[^\x01-\x7E]+い!!/g,
	/彼氏|だーりん|ダーリン|だ〜りん|だぁりん/g,
	/女子力/g,/女子力向上|女子力強化/g,
	/女子ブロガー|ブロガー/g,
	/今日のコーデ/g,
	/UV|ＵＶ|日焼け止め|日傘/g,
	/なちゅめ|ナチュメ|ナチュラルメイク/g,
	/モテたい/g,
	/盛る|盛り|盛れた/g,
	/キメ|キメッ|キメっ/g,
	/キマった|キマッた|キマッタ|きまった/g,
	/＞＜/g
	];

	//評価B
	var JRP_RankB = [
	/料理/g,
	/スイーツ/g,
	/パスタ/g,
	/結婚/g,
	/トレンド|流行/g,
	/一人旅|旅行/g,
	/コーデ|コーディネイト/g,
	/おしゃれ|オシャレ|シャレオツ|おしゃかわ|オシャかわ|オシャカワ/g,
	/かわいい|カワイイ|可愛/g,
	/モテ|もて/g,/かわ|カワ/g,
	/気配り/g,
	/掃除/g,
	/ご褒美/g,
	/ファッション/g,
	/マスト|マストアイテム/g,
	/ブラバ|ブランドバッグ/g,
	/デカ目/g,/カラコン/g,/コスメ/g,/マスカラ/g,/ビューラー/g,/リップ/g,/つけま|付けマ|ツケマ|付け睫毛|つけまつげ|つけ睫毛/g,/エクステ/g,/パーマ|パ〜マ|ぱーま|ぱ〜ま/g,
	/ファンデ|ファンデーション/g,
	/肌の手入れ/g,
	/お菓子/g,
	/クッキー/g,
	/ケーキ/g,
	/マカロン|まかろん/g,
	/卵|薄力粉|バター|砂糖/g,
	/♥|♡/g,
	/★|☆/g,
	];

	//評価C
	var JRP_RankC = [
	/たぁ|たあ|た〜/g,
	/失敗/g,
	/らねー|らねぇ|らねぇ/g
	];

	//評価D
	var JRP_RankD = [
	/うざ|ウザい/g,
	/キモい|きもい|きもっ|キモッ|きも〜|キモ〜/g
	];

	//評価E
	var JRP_RankE = [
	/(化粧|メイク)+[^\x01-\x7E]+(放置|忘れ|面倒|メンド|盛れない)/g,
	/洋服[^\x01-\x7E]+(なんでもいい|かってない|いらない|買ってない)/g,
	/外[^\x01-\x7E]+(出ない|でない|出たくない|でたくない)/g,
	/トレンド+[^\x01-\x7E]+(いらない|とか|なに|何)/g,
	/だるい|だる|ダルい|メンドクサイ|面倒くさい|面倒/g,
	/スッピン|すっぴん/g,/化粧落ちた/g,/しまむら|シマムラ/g,/ジャージ/g,/スウェット/g
	];

	//評価F
	var JRP_RankF = [
	/女[^\x01-\x7E]+(捨てた|すてた)/g,
	/死/g,/鬱|欝/g,/太った/g,/モテない/g
	];

	for (i = 0; i < JRP_RankA.length; i++){
		var WC = that.match(JRP_RankA[i]);
		if( WC ){JPPoint=JPPoint+3; allJP++; var WCword = WC[0]; wordcloud.push('<span class=cloud style=color:#FFA9B8;cursor:pointer;>'+WCword+'</span>');};
	};
	for (i = 0; i < JRP_RankB.length; i++){
		var WC = that.match(JRP_RankB[i]);
		if( WC ){JPPoint=JPPoint+1; allJP++; var WCword = WC[0]; wordcloud.push('<span class=cloud style=color:#f7d1d5;cursor:pointer;>'+WCword+'</span>');};
	};
	for (i = 0; i < JRP_RankC.length; i++){
		var WC = that.match(JRP_RankC[i]);
		if( WC ){JPPoint=JPPoint+0; allJP++; var WCword = WC[0]; wordcloud.push('<span class=cloud style=color:#cccccc;cursor:pointer;>'+WCword+'</span>');};
	};
	for (i = 0; i < JRP_RankD.length; i++){
		var WC = that.match(JRP_RankD[i]);
		if( WC ){JPPoint=JPPoint-1; allJP++; var WCword = WC[0]; wordcloud.push('<span class=cloud style=color:#fed8ff;cursor:pointer;>'+WCword+'</span>');};
	};
	for (i = 0; i < JRP_RankE.length; i++){
		var WC = that.match(JRP_RankE[i]);
		if( WC ){JPPoint=JPPoint-2; allJP++; var WCword = WC[0]; wordcloud.push('<span class=cloud style=color:#e0b8fd;cursor:pointer;>'+WCword+'</span>');};
	};
	for (i = 0; i < JRP_RankF.length; i++){
		var WC = that.match(JRP_RankF[i]);
		if( WC ){JPPoint=JPPoint-3; allJP++; var WCword = WC[0]; wordcloud.push('<span class=cloud style=color:#679be2;cursor:pointer;>'+WCword+'</span>');};
	};

	var JyoshiRyoku =JPPoint*allJP*3;
	$(this).append('<div class=JPCHECKER>この記事を読むのにおよそ<font color=#FFA9B8 size=3em>'+JyoshiRyoku+'</font>Kcalの女子力を使います<br/><br/>'+
					'♥女子りょくらうど*（'+wordcloud.length+'）♥<br/><div class=clearfix></div></div>');
	
	var that = $(this).find('.JPCHECKER').find('div');
	for (i = 0; i < wordcloud.length; i = i +1){
		$(that).append(wordcloud[i]);
	};
	
	var JPword = that.text();
		JPword = '<span style=display:none class="entryTag"><p class=title>'+title+'</p><p class=uri>'+thisUri+'<p class-description>'+JPword+'</span>';
	$(this).find('.JPCHECKER').append(JPword);
	return this;
};

//get to list

(function($){
	$('.skinArticle').each(function(){
		$(this).JRChecker();		
	});
	$('.JPCHECKER').each(function(){
		$.getScript('http://miumiu3tk.sakura.ne.jp/api/jrp_tag.js');		
	});
}(jQuery));