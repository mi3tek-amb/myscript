 /*
 *javascript dekomoji editer
 *       script written by Mitsuki
 */
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script type="text/javascript">google.load('jquery', '1.7.2');</script>
<script type="text/javascript">(_JQ162_=jQuery)(function(){$=jQuery=_JQ172_;});</script>
//この３行はすでに貼ってある場合は省いて大丈夫です。

<script>
	 $('emoji').each(function(){
	 
		var emojitype = $(this).text();

		var emojiurl = '　<!--画像（絵文字）が入ってるフォルダまでの絶対パス-->　';
		
		$(this).addClass( emojitype ).each(function(){
			var emoji = $(this).attr('class');
			var emoji = emojiurl + emoji + '.png';
			if(!emoji) var emoji = emojiurl + emoji + '.gif';
			$(this).empty().append('<img src="' + emojiurl + emoji + '.png"/>' );
		});
	 });
 </script>
 
<script>
 window.onload = function(){
	var emojilength = document.getElementsByTagName('emoji').length;
	var i = 0;
	
	for (i=0; i<emojilength; i++) {
		var emojiurl = ' <!--画像（絵文字）が入ってるフォルダまでの絶対パス--> ';
		var emojiobj = document.getElementsByTagName('emoji');
		var emoji = emojiobj[i].innerHTML;
		 	emoji = emojiurl + emoji + '.png';
		var emojiimg = document.createElement('img');
			emojiimg.src = emoji;			
			emojiobj[i].innerHTML = ('');
			emojiobj[i].appendChild(emojiimg);		
	};
};
</script>