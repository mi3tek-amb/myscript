$(document).ready(function(){
	
$.getJSON("http://mitsuki0524.tumblr.com/api/read/json?num=50&callback=?",function(data) {
       		$.each(data.posts, function(i, posts) {
           		var photo = this['photo-url-250'];
            	var url = this['photo-link-url'];
            		if (this['type'] === "photo") {
                		$('ul.Tmbphoto').append('<li><a href="' + url + '" target="_blank"><img src="' + photo + '" \/><\/a<\/li>');
            		
            		}
        	});
    });	
	
$(document).ready(function(){
	function ticker(){
        $('.Tmbphoto li:first').slideToggle('slow',function(){
        $(this).appendTo($('.Tmbphoto')).fadeIn(); 
        });
    }
    setInterval(function(){ticker()}, 3000);
});
});