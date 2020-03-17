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
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
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
    //---------------------------------------------------
    // 배경 자동 바꾸기 실행
    // bgChange();

    // 배경을 15초 마다 바꾸자. (막음)
    function bgChange() {
        var bg = ['bg1.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'bg6.jpg'];
        var bg_index = 0;
        setInterval(function() {
            if (bg_index >= bg.length) bg_index = 0;
            // 배경 10초 마다 움직임. 그러나 마음에 들진 않음, 크기 다 맞춰야 될듯
            $('#wrap').css({
                'background': 'url(images/' + bg[bg_index] + ')',
                'background-size': 'cover',
                'background-repeat': 'no-repeat',
                'background-position': 'center center'
            }, 5000);
            bg_index++;
        }, 10000);
    }


    //------------------------------------------------
        // 전체 영역 div 
        var wrapDiv = $('#wrap');
        // 각 내용별 div 클래스
        var pages = $('.page');
        // gnb 버튼
        var btGnb = $('#bt_gnb');
        // gnb
        var gnbDiv = $('.gnb');
        // 메뉴 영역 너비값을 자동으로 계산
        var gnbW = gnbDiv.outerWidth();
        gnbW = parseInt(gnbW);
        // gnb 보이기 숨기기
        var gnbSpeed = 0.8; // 0.4초


        // -------일반 jQuery -----------
        // var gnbSpeed = 400;
        /* btGnb.click(function(){
             gnbDiv.stop().animate({
                 right: 0
             }, gnbSpeed);
         });*/
        btGnb.click(function() {
            // 메뉴를 오른쪽으로 배치를 했기 때문에
            var gnbPosition = gnbDiv.css('right');
            gnbPosition = parseInt(gnbPosition); // 숫자로 바꾸기

            var temp_Pos;
            // 토글 키 만들기
            if (gnbPosition < 0) {
                // 만약에 메뉴가 닫혀있다면.. 펼쳐라.
                temp_Pos = 0;
            } else {
                // 만약에 메뉴가 펼쳐져 있다면.. 닫아라.
                temp_Pos = -1 * gnbW;
            }

            TweenMax.to(gnbDiv, gnbSpeed, {
                right: temp_Pos,
                ease: Power4.easeOut
            });

        });

        // 휠 코딩 -----------------------------------
        var scrollDir = ''; // down, up
        var scrollDefence = false; // false면 적용, true면 막기

        // 휠 체크
        $(this).bind('mousewheel DOMMouseScroll', function(e) {

            var distance = e.originalEvent.wheelDelta;
            // distance 가  120 이면 휠을 위로 드래그
            // distance 가  -120 이면 휠을 아래로 드래그

            // 만약 distance 가 없다면
            if (distance == null) {
                distance = e.originalEvent.detail * -1;
            }

            if (distance < 0) {
                scrollDir = 'down';
            } else if (distance > 0) {
                scrollDir = 'up';
            }

            // 페이지를 움직이자.
            pageMove();


            //!!!!!!!!!!!!!!!!!!!!흰색 백그라운드 해결 중!!!!!!!!!!!!!!!!!!!!!!1
            if (pageShowIndex == 0) {
                $('.main_bg').css('right', '55%');
                $('.slide_btn').css('right', '65%');

            } else {
                $('.main_bg').css('right', '0%');
                $('.slide_btn').css('right', '12%');

            }
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        });


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

        function pageMove() {

            if (scrollDir == "up") {
                // 위로 휠
                if (pageShowIndex == 0) {} else {
                    pageShowIndex = pageShowIndex - 1;
                    TweenMax.to(wrapDiv, pageMoveSpeed, {
                        left: -1 * tgPos[pageShowIndex],
                        onComplete: function() {
                            // 다시 스크롤을 받아들이겠다.
                            scrollDefence = false;
                            // 애니메이션을 제거하거나 넣기 적절한 위치
                            showAni();
                        }
                    });
                }
            } else {
                // 아래로 휠
                if (pageShowIndex == pageCount - 1) {} else {
                    pageShowIndex = pageShowIndex + 1;
                    TweenMax.to(wrapDiv, pageMoveSpeed, {
                        left: -1 * tgPos[pageShowIndex],
                        onComplete: function() {
                            // 다시 스크롤을 받아들이겠다.
                            scrollDefence = false;
                            // 애니메이션을 제거하거나 넣기 적절한 위치
                            showAni();
                        }
                    });
                }
            }
            // 1페이지가 아닐시 예약 버튼 슬라이드 아웃.
            var book_toggle = true;
            if (pageShowIndex == 0 && book_toggle == true) {
                $('#book').slideDown();
                book_toggle = false;
            } else {
                $('#book').slideUp();
                book_toggle = true;
            }

            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 수정중 !!!!!!!!!!!!!!!

            if (pageShowIndex == 1) {
                $('.menu > li > a').eq(pageShowIndex - 1).css({
                    'color': '#d2b372',
                    'text-decoration': 'underline'
                });
                $('.main_2').fadeIn(2000);
            } else {
                $('.menu > li > a').eq(0).css({
                    'color': '#000000',
                    'text-decoration': 'none'
                });
                $('.main_2').hide();
            }
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }

        // 애니메이션을 넣어주는 기능
        function showAni() {
            $.each(pages, function(index, item) {
                if (index == pageShowIndex) {
                    // 해당하는 .contents 내의 요소 addClass 
                    $('.language > span').css('color','#000');
                } else {
                    // 해당하는 .contents 내의 요소 removeClass
                    $('.language > span').css('color','#fff');
                }
            });
        }

        var About = $('.menu > li > a').eq(0);
        
        About.click(function(e){
            e.preventDefault();
            // console.log(this);
            $('.abouthotel').addClass('on');
            scrollDir = "down"
            pageMove();
            if (pageShowIndex == 0) {
                $('.main_bg').css('right', '55%');
                $('.slide_btn').css('right', '65%');

            } else {
                $('.main_bg').css('right', '0%');
                $('.slide_btn').css('right', '12%');

            }
        });

    });