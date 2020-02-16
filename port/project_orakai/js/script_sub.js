$(document).ready(function() {
 // booking 달력 기능
     $(".selector").flatpickr({
            mode: "range",
            minDate: new Date(),
        });

    //  swiper 수정 위치 ---------------------------
    var swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 40,
            stretch: 0,
            depth: 400,
            modifier: 1,
            slideShadows: true,
        },
        direction: 'horizontal',
        slidesPerView: 3,
        spaceBetween: 30,
        mousewheel: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    //---------------------------------------------------
    // 다음 화면 바뀔 때 바뀌는 내용들
    $('.submenu > li > a').css({
        color: '#000'
    });

    $('.menu > li > a').mouseenter(function() {
        $(this).css({
            color: '#d2b372',
            'text-decoration': 'underline'
        });;
    });
    $('.menu > li > a').mouseleave(function() {
        $(this).css({
            color: '#000',
            'text-decoration': 'none'
        });;
    });

    $('.submenu > li > a').mouseenter(function() {
        $(this).css({
            color: '#d2b372',
        });;
    });
    $('.submenu > li > a').mouseleave(function() {
        $(this).css({
            color: '#000',
        });;
    });

    $('.submenu > li > a').css({
        color: '#000'
    });
    $('.language > span').css({
        color: '#000'
    });



    //---------------------------------------------------
    // more view 버튼 -> 배경 바꾸기 코드
    var wrapBg = $('#wrap_bg');
    var slideWrap = $('#slide_wrap');
    var i = 1;
    // 처음 시작시 슬라이드 안보임
    slideWrap.hide();
    // 닫기버튼 누를시 슬라이드 닫힘
    $('.close_btn').click(function() {
        slideWrap.hide();
    });
    // 몰뷰 버튼 클릭시 슬라이드 열림
    $('.slide_btn > a ').click(function() {
        slideWrap.show();

        if (i < 5) {
            wrapBg.css({
                'background': "url('images/bg" + i + ".jpg')",
                'background-size': 'cover',
                'background-repeat': 'no-repeat',
                'background-position': 'center center'
            });

            i++;

        } else {
            wrapBg.css({
                'background': "url('images/bg" + 0 + ".jpg')",
                'background-size': 'cover',
                'background-repeat': 'no-repeat',
                'background-position': 'center center'
            });
            i = 1;
        }
    });

    //---------------------------------------------------
    // Book now -> booking바 업 다운 코드.
    $('.booknow').find("span").click(function() {
        $('#book').slideToggle();
        $('.book_wrap').css('animation-delay', '0s');
    });
    //------------------------------------------------

    $(document).ready(function() {
        // 전체 영역 div 
        var wrapDiv = $('#wrap');
        // 각 내용별 div 클래스
        var pages = $('.page');
        // 현재보이는 페이지 번호
        var pageShowIndex = 0;
        // 다음 보일 페이지 번호
        var pageNextIndex = 1;
        // 페이지의 이동속도 
        var pageMoveSpeed = 0.8; // 1.0 초
        // 페이지 총 개수
        var pageCount = pages.length;

        // 윈도우의 너비값
        var winW = $(window).width();
        winW = parseInt(winW);
        // 윈도우의 높이값
        var winH = $(window).height();
        winH = parseInt(winH);
        // 매번 윈도우의 사이즈를 체크해서 화면이동 값을
        // 화면의 사이즈를 줄이거나 늘인다면 무조건 실행해서
        // 새로운 너비, 높이값으로 세팅해야 한다.
        $(window).resize(function() {
            // 윈도우 높이값
            winH = $(window).height();
            winH = parseInt(winH);
            // 윈도우 너비값
            winW = $(window).width();
            winW = parseInt(winW);

            // 항상 위치를 체크합니다.
            pageReset();
            // 각각의 wrap div 가 스코롤 될때 마다.
            // 세로 상으로 이동해야 될 위치값.
            for (var i = 0; i < pageCount; i++) {
                tgPos[i] = i * winW
            }
            //
            wrapDiv.css('left', -1 * tgPos[pageShowIndex]);

        });
        // 초기 위치 잡기;
        wrapDiv.css({
            position: 'absolute',
            left: 0,
            top: 0
        });

        pageReset();

        // 이동해야하는 목표값
        var tgPos = [];

        // 롤링 되지 않는 컨셉
        // 초기 위치 설정
        function pageReset() {
            $.each(pages, function(index, item) {
                $(this).css({
                    left: winW * index,
                    height: '100%',
                    width: '100%'
                });
            });

        }


        // 각각의 wrap div 가 스코롤 될때 마다.
        // 세로 상으로 이동해야 될 위치값.
        for (var i = 0; i < pageCount; i++) {
            tgPos[i] = i * winW
        }


    });
});