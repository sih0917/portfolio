$(document).ready(function() {
    $('section').horizon();
    
    sal({
    	// 페이지로 다시 갔을때, 다시 애니메이션 하려면 false
        once: false,
    });

    $(".dot").draggable();

    // var meImg = $('.me_img > a > img');
    // meImg.mouseenter(function(){
    // 	meImg.fadeIn();
    // 	meImg.attr('src', "images/inho.jpg");
    // });
    // meImg.mouseleave(function(){
    // 	meImg.fadeOut();
    // 	meImg.attr('src', "images/inho.png");
    // });
});