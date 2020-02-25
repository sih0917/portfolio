$(document).ready(function() {
    // 버튼 클릭시 다크모드 효과
    var bg_click = $('.bg_click');

    bg_click.click(function() {
        DarkChange();
    });

    function DarkChange() {
        $('.sky,.moon,.people1,.people2,.people3,.people4,.txt').toggleClass('active');
        var bg_text = $('.bg_click').text();
        if (bg_text == 'Dark') {
            // dark 모드
            bg_click.text("Light");
            $('html').removeClass('light')
            $('html').addClass('dark')
            $('.qrcode > img').attr('src', "images/qrcode.png");

        } else {
            // light 모드    
            bg_click.text("Dark");
            $('html').addClass('light')
            $('html').removeClass('dark')
            $('.qrcode > img').attr('src', "images/qrcode_light.png");
        }
    }

    // 컴퓨터에서 다크모드 시
    const darkModeMeidaQuery = window.matchMedia('(prefers-color-scheme: dark)');



    function updateForDarkModeChange() {
        if (darkModeMeidaQuery.matches) {
            // 다크모드 on.
            $('.sky, .moon, .people1, .people2, .people3, .people4, .txt').removeClass('active');
            //  ----------------------- 배경 버튼 클릭시 변경하기
            $('.bg_click').text('Light');
            $('.qrcode > img').attr('src', "images/qrcode.png");

        } else {
            // 다크모드 off.
            $('.sky, .moon, .people1, .people2, .people3, .people4, .txt').addClass('active');
            $('.bg_click').text('Dark');
            $('.qrcode > img').attr('src', "images/qrcode_light.png");
        }
        
        // qr코드 light 일때
            var qrBG = $('#contact').css('background-color');
            
            bg_click.click(function(){
            	qrBG = $('#contact').css('background-color');
            });
           
            $('.qrcode').mouseenter(function() {
            	 if (qrBG == 'rgb(255, 255, 255)') {
            	 	$('.qrcode > img').attr('src', "images/qrcode.png");
               		$('.pointer').animate({ 'opacity': 0 });
	            } 
            });
            $('.qrcode').mouseleave(function() {
            	if (qrBG == 'rgb(255, 255, 255)') {
            		$('.qrcode > img').attr('src', "images/qrcode_light.png");
                	$('.pointer').animate({ 'opacity': 1 }, 500);
            	} 
            });
    }

    darkModeMeidaQuery.addListener(updateForDarkModeChange);
    updateForDarkModeChange();




});