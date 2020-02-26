$(document).ready(function() {

    var html = $('html');
    var bg_click = $('.bg_click');
    var homeBG = $('.sky, .moon, .people1, .people2, .people3, .people4, .txt');
    var DarkOn = html.hasClass('light');
    var qrcode = $('.qrcode');
    var qrImg = $('.qrcode > img');
    var pointer = $('.pointer');
    var toggle_dark = $('.toggle_dark');
    var darkmode_dot = $('.darkmode_dot');

    // 토글 버튼 모션
    toggle_dark.click(function(){
    	DarkChange();
    });

    // 기기에서 다크모드 시
    const darkModeMeidaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMeidaQuery.addListener(updateForDarkModeChange);
    updateForDarkModeChange();


    // function 모음
    function DarkChange() {
        DarkOn = $('html').hasClass('light');
        if (DarkOn == true) {
           toggle_dark.addClass('on');
            darkMode();
        } else {
        	toggle_dark.removeClass('on');
            lightMode();
            QRMode();
        }
    }

    function updateForDarkModeChange() {
        if (darkModeMeidaQuery.matches) {
        	toggle_dark.addClass('on');
            darkMode();
        } else {
        	toggle_dark.removeClass('on');
            lightMode();
            QRMode();
        }
    }

    function darkMode() {
        //  dark 모드
        bg_click.text('Dark');
        html.removeClass('light')
        homeBG.removeClass('active');
        // qr모드 해제 시 필요한 부분
        qrImg.attr('src', "images/qrcode.png");
        qrcode.mouseleave(function() {
            qrImg.attr('src', "images/qrcode.png");
        });
    }

    function lightMode() {
        // light 모드
        bg_click.text('Light');
        html.addClass('light')
        homeBG.addClass('active');
    }

    function QRMode() {
        qrImg.attr('src', "images/qrcode_light.png");
        qrcode.mouseenter(function() {
            qrImg.attr('src', "images/qrcode.png");
            pointer.addClass('fade');
        });
        qrcode.mouseleave(function() {
            qrImg.attr('src', "images/qrcode_light.png");
            pointer.removeClass('fade');
        });
    }

});