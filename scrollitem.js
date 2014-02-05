(function($){
$(function(){

	var setting = {
        allImageLength : 3000,
        defLoadImageLength : 90,
        loadImageLength : 40
	};
    
    index = 0;
    
    //default loading
	var imgElmlength = setting.defLoadImageLength,
        imgElmWrap = [];
    for(i=1;i<=imgElmlength;i++){
        imgElmWrap.push('<div class="thum-image"><a href="auto_changchun-2012-jul/'+formatNum(4, index+i)+'.html" title="拡大画像へ"><img class="thum" src="http://asianbeauty.tv/inspection/china/auto_changchun-2012-jul/'+formatNum(4, index+i)+'-thum.jpg"></a></div>');
    };

    index = img_index(index,imgElmlength);
    
    $('#imgWrap').append(imgElmWrap).find('.thum').fadeIn(200);
    
	$.fn.bottom = function(options) {
	
		var defaults = {
			proximity: 0
		};
	
		var options = $.extend(defaults, options);
	
		return this.each(function() {
			var obj = this;
			$(obj).on("scroll", function() {
				if (obj == window) {
					scrollHeight = $(document).height();
				}
				else {
					scrollHeight = $(obj)[0].scrollHeight;
				}
				scrollPosition = $(obj).height() + $(obj).scrollTop();
				if ( (scrollHeight - scrollPosition) / scrollHeight <= options.proximity) {
					$(obj).trigger("bottom");
				}
			});
	
			return false;
		});
	};
    
	function formatNum(leng, num) {
	        var src = new String(num);
	        var cnt = leng - src.length;
			if (cnt <= 0) return src;
			while (cnt-- > 0) src = "0" + src; return src;
	};
    
    function img_index(now_index,b){
           index = now_index + b;
           return index;
    };
    
	$(window).bottom();
	
	$(window).on('bottom', function() {

		var obj = $(this);
		if (!obj.data("loading")){
			obj.data("loading", true);
			setTimeout(function(){
	        var imgElmlength = setting.loadImageLength,
	        	imgElmWrap = [];
	        
	        if(　setting.allImageLength-index < setting.loadImageLength ){
		        imgElmlength = setting.allImageLength-index;
	        };
	        
	        for(i=1;i<=imgElmlength;i++){
	        
	        	num = index + i;
	        	
	            imgElmWrap = '<div class="thum-image"><a href="auto_changchun-2012-jul/'+formatNum(4, index+i)+'.html" title="拡大画像へ"><img class="thum" src="http://asianbeauty.tv/inspection/china/auto_changchun-2012-jul/'+formatNum(4, index+i)+'-thum.jpg"></a></div>';
	            
	            $(imgElmWrap).hide().appendTo('#imgWrap').fadeIn(200+(i*20+50));
	            
	       
	        };
	        
            index = img_index(index,imgElmlength);
            
	        obj.data("loading", false);
	        
	        if( index >= setting.allImageLength ){
		        $(window).off('bottom');
				$(window).off('scroll');
				return false;
	        };
	        },500);
		}
	
	});

});
})(jQuery);