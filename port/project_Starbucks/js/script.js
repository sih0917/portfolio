$(document).ready(function() {

    // 고정 배너 클릭시 사자림
    $('.fix-banner a').click(function(){

        $(this).hide();
    });

    // 비주얼 영역의 효과 넣기
    TweenMax.from($('.v1'), 0.6, {
        opacity: 0,
        delay: 2
    });
    TweenMax.from($('.v2'), 0.6, {
        opacity: 0,
        delay: 1.5
    });
    TweenMax.from($('.v3'), 0.6, {
        opacity: 0,
        delay: 1
    });
    TweenMax.from($('.v4'), 0.6, {
        opacity: 0,
        delay: 1
    });
    TweenMax.from($('.v5'), 0.6, {
        opacity: 0,
        delay: 0.5
    });
    TweenMax.from($('.v6'), 0.6, {
        opacity: 0,
        delay: 0.5
    });
    TweenMax.from($('.v7'), 0.6, {
        opacity: 0,
        delay: 2.5
    });

    // 주메뉴 코드
    // 주메뉴 목록
    var gnbMenu = $('.gnb-list > li');
    // 서브메뉴 목록
    var subMenu = $('.submenu');
    // 현재 선택된 메뉴
    var selectIndex;
    // 기능부여
    $.each(gnbMenu, function(index, item) {
        var nowMenu = $(this);

        nowMenu.mouseenter(function() {
            selectIndex = index;
            // 서브메뉴 보여줘!!!
            showSubMenu(selectIndex);
        });

        nowMenu.mouseleave(function() {
            showSubMenu(9999);
        });
    });

    // 서브메뉴를 보여주는 기능 만들기 (함수)
    function showSubMenu(_aaa) {
        $.each(subMenu, function(index, item) {
            var sub = $(this);
            sub.hide();
            if (_aaa == index) {
                sub.stop().slideDown();
            }
        });
    }




    // 스크롤바가 이동될때 모션 실행
    // 애니메이션 시작 위치 함수를 만들자.
    function aniPos(_div) {

        var _divPos = _div.offset().top - $(window).outerHeight();
        _divPos = _divPos + (_div.outerHeight() / 3);

        return _divPos;

    }

    // nice-good 애니메이션
    var niceGood_1 = $('.nice-good-1');
    var niceGood_2 = $('.nice-good-2');
    // 적용할 애니메이션이 작성된 클래스의 이름
    var niceGood_1_ani = "nice-good-1-ani";
    var niceGood_2_ani = "nice-good-2-ani";

    var niceGoodPos = aniPos($('.nice-good'));
    // niceGood_1.addClass(niceGood_1_ani);
    // niceGood_2.addClass(niceGood_2_ani);

    // nice-good 애니메이션이 시작될 위치값


    // 신상품 적용 애니메이션
    var newGood_3 = $('.new-good-3');
    // 적용할 신상품 애니메이션 클래스 이름
    var newGood_3_ani = "new-good-3-ani";

    var newGoodPos = aniPos($('.new-good'));
    // newGood_3.addClass(newGood_3_ani);

    // 커피메뉴 영역 애니메이션
    var categoryGood_1 = $('.category-good-1');
    var categoryGood_2 = $('.category-good-2');
    var categoryGood_4 = $('.category-good-4');
    // 적용할 신상품 애니메이션 클래스 이름
    var categoryGood_1_ani = "category-good-1-ani";
    var categoryGood_2_ani = "category-good-2-ani";
    var categoryGood_4_ani = "category-good-4-ani";

    var categoryGoodPos = aniPos($('.category-good'));
    // categoryGood_1.addClass(categoryGood_1_ani);
    // categoryGood_2.addClass(categoryGood_2_ani);
    // categoryGood_4.addClass(categoryGood_4_ani);

    // 매장찾기 영역 애니메이션
    var storeSearch_1 = $('.store-search-1');
    var storeSearch_2 = $('.store-search-2');
    var storeSearch_4 = $('.store-search-4');
    var storeSearch_5 = $('.store-search-5');
    var storeSearch_7 = $('.store-search-7');
    // 적용할 신상품 애니메이션 클래스 이름
    var storeSearch_1_ani = "store-search-1-ani";
    var storeSearch_2_ani = "store-search-2-ani";
    var storeSearch_4_ani = "store-search-4-ani";
    var storeSearch_5_ani = "store-search-5-ani";
    var storeSearch_7_ani = "store-search-7-ani";

    var storeSearchPos = aniPos($('.store-search'));

    // storeSearch_1.addClass(storeSearch_1_ani);
    // storeSearch_2.addClass(storeSearch_2_ani);
    // storeSearch_4.addClass(storeSearch_4_ani);
    // storeSearch_5.addClass(storeSearch_5_ani);
    // storeSearch_7.addClass(storeSearch_7_ani);


    //스크롤 위치에 따른 애니메이션
    // 스크롤바 위치
    var scY;
    // 화면 크기(높이)
    // var winH = $(window).outerHeight();
    // 0 ~ div 간 거리
    // var niceGoodDistance = $('.nice-good').offset().top;
    // var newGoodDistance = $('.new-good').offset().top;
    // var categoryGoodDistance = $('.category-good').offset().top;
    // var storeSearchDistance = $('.store-search').offset().top;
    // 각각의 div 세로 크기
    // var niceGoodH = $('.nice-good').outerHeight();
    // var newGoodH = $('.new-good').outerHeight();
    // var categoryGoodH = $('.category-good').outerHeight();
    // var storeSearchH = $('.store-search').outerHeight();
    // 스크롤 계산 값
    // 애니메이션 시작 = div 있는 거리 - 화면크기(높이) + (div세로/3)
    // var niceGoodPos = niceGoodDistance - winH + (niceGoodH / 3);
    // var newGoodPos = newGoodDistance - winH + (newGoodH / 3);
    // var categoryGoodPos = categoryGoodDistance - winH + (categoryGoodH / 3);
    // var storeSearchPos = storeSearchDistance - winH + (storeSearchH / 3);

    $(window).scroll(function() {
        scY = $(window).scrollTop();
        // console.log(scY);

        // nice-goood 모션 적용
        // Magic Number 프로그래머가 제일 싫어하는 것!
        if (scY >= niceGoodPos) {
            niceGood_1.addClass(niceGood_1_ani);
            niceGood_2.addClass(niceGood_2_ani);
        } else {
            niceGood_1.removeClass(niceGood_1_ani);
            niceGood_2.removeClass(niceGood_2_ani);
        }

        if (scY >= newGoodPos) {
            newGood_3.addClass(newGood_3_ani);
        } else {
            newGood_3.removeClass(newGood_3_ani);
        }


        if (scY >= categoryGoodPos) {
            categoryGood_1.addClass(categoryGood_1_ani);
            categoryGood_2.addClass(categoryGood_2_ani);
            categoryGood_4.addClass(categoryGood_4_ani);
        } else {
            categoryGood_1.removeClass(categoryGood_1_ani);
            categoryGood_2.removeClass(categoryGood_2_ani);
            categoryGood_4.removeClass(categoryGood_4_ani);
        }


        if (scY >= storeSearchPos) {
            storeSearch_1.addClass(storeSearch_1_ani);
            storeSearch_2.addClass(storeSearch_2_ani);
            storeSearch_4.addClass(storeSearch_4_ani);
            storeSearch_5.addClass(storeSearch_5_ani);
            storeSearch_7.addClass(storeSearch_7_ani);
        } else {
            storeSearch_1.removeClass(storeSearch_1_ani);
            storeSearch_2.removeClass(storeSearch_2_ani);
            storeSearch_4.removeClass(storeSearch_4_ani);
            storeSearch_5.removeClass(storeSearch_5_ani);
            storeSearch_7.removeClass(storeSearch_7_ani);
        }


    });

    // 검색 버튼 누르면 검색창 펼치기
    // 검색창 펼치기 버튼
    var sbtEff = $('.sbt-eff');
    // 검색폼
    var sTxt = $('.stxt');
    var sBt = $('.sbt');

    // 버튼 클릭 처리하기
    sbtEff.click(function() {
        sbtEff.hide();

        sTxt.css({
            width: 0
        });

        sTxt.show();
        sBt.show();

        TweenMax.to(sTxt, 0.6, {
            width: 140
        });
    });



    // 공지사항 뉴스
    var noticeList = $('.notice-a');
    $.each(noticeList, function(index, item) {
        var temp = $(this);
        // console.log(temp);
        // console.log(index);
        // console.log("--------");

        temp.css({
            position: 'absolute',
            left: 0,
            top: 100
        });
    });
    // 타이머를 만들어 보자
    var noticeTimer;
    // reStart 시간 (1000초 1)
    var noticeReTime = 1500;
    // 보여주어야 하는 공지 사항 번호
    var noticeShowIndex = 0;
    // 총 보여주어야 하는 공지사항 개수
    var noticeTotal = noticeList.length;
    // 처음 목록은 먼저 보여주어야 한다.
    noticeList.eq(noticeShowIndex).css({
        top: 0
    });

    // 새로 시작할 때마다 반복함수 만들기
    function noticeSlide() {
        // 지금 보여지고 있는 대상
        var oldA = noticeList.eq(noticeShowIndex);

        noticeShowIndex = noticeShowIndex + 1;
        if (noticeShowIndex >= noticeTotal) {
            noticeShowIndex = 0;
        }
        // 새로 보여주어야 할 번호는 정해졌다.
        var tempA = noticeList.eq(noticeShowIndex);
        // 자연스러운 모션을 위해서 z-index 를 상위로 준다.
        tempA.css({
            'z-index': noticeTotal
        });

        tempA.animate({
            top: 0
        }, 600, function() {
            // 이전에 보이던 대상은 top 이 100으로 돌아간다.
            oldA.css({
                top: 100
            });
            // 모션이 완료되었으므로 z-index를 낮게 준다.
            tempA.css({
                'z-index': 1
            });
        });
    }
    // 실제 타이머를 작동시킨다.
    noticeTimer = setInterval(noticeSlide, noticeReTime);

    // 사용자가 항목을 선택하는 경우 처리
    noticeList.mouseenter(function() {
        // 타이머 지워서 선택할 수 있도록 한다.
        clearInterval(noticeTimer);
    });

    noticeList.mouseleave(function() {
        // 타이머를 리셋한다.
        clearInterval(noticeTimer);
        noticeTimer = setInterval(noticeSlide, noticeReTime);
    });


    // 프로모션 펼치기 기능
    // 프로모션 div
    var promotion = $('.promotion');
    // 펼침/닫기 버튼
    var proToggleBt = $('.btn_prom');

    // 이미지를 바꿔줄 클래스 명
    var btnImg = $('.btn_img');
    // 펼침시 보여줄 이미지 경로
    var openImg = "images/btn_prom_up.png";

    // 닫힘시 보여줄 이미지 경로
    var closeImg = "images/btn_prom_down.png";

    // 현재 프로모션 상태(보이는가? 닫혔는가?)
    var promoState = "close"; // close, open

    //프로모션이 펼쳐졌을 때 높이값
    var promoH = 660;

    // 펼쳐지는 속도(1000은 1초)
    var promoSpeed = 200;

    // 버튼 클릭 시 프로모션을 처리한다.
    proToggleBt.click(function(event) {

        // 기본 a 태그 기능 막기
        event.preventDefault();

        // 만약 닫혀있으면 펼쳐라.
        if (promoState == "close") {
            
            promotion.stop().animate({
                height: promoH
            }, promoSpeed, function() {
                promoState = "open";

	            // 버튼 이미지를 변경하자
	            btnImg.attr('src', openImg);

	           	// 최초 상태로 swiper를 리셋한다.
	            swiper.slideTo(swiperIndex);
			    
			    // 자동 실행은 최초에 실행 한다.
	    		swiper.autoplay.start();
            });

        } else {

            promotion.stop().animate({
                height: 0
            }, promoSpeed, function() {
                promoState = "close";

                // 버튼 이미지를 변경하자
                btnImg.attr('src', closeImg);

	            // 최초 상태로 swiper를 리셋한다.
                swiper.slideTo(swiperIndex);

                // 이제 swiper를 멈춘다.
                swiper.autoplay.stop();
            });
        }
    });


    // swiperjs 관련 코드
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.bt_next',
            prevEl: '.bt_prev',
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function(index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        },
        on: {
            slideChangeTransitionEnd: function() {
                // 슬리이드 선명하게 하기
                // console.log(this.activeIndex);
                 // this.activeIndex 에 현재 슬라이드 번호가 들어있습니다

                // 선명하게 해야할 div 번호값 전달
                slideShowCon(this.activeIndex);
            },
        },
    });

    // 시작번호
    var swiperIndex = 3;
    
    // play/ stop 버튼 만들기 
    // html 코드를 동적으로 생성한다.
    // $(".swiper-pagination").prepend('<div class="swiper-bt"></div>');

    // swiperjs 콘트롤하기
    var swiperBt = $('.swiper-bt');
    // 현재 swiperjs 상태
    var swiperState = "play"; // play, stop

    // swiper 이미지 효과
    var swiperDiv = $('.swiper-slide');
    swiperDiv.eq(swiperIndex).css({
        opacity: 1.0
    });

    // 전달된 번호를 받아서 선명하게 하기
    function slideShowCon(_value) {
        // console.log("받은 값 : " + _value);
        $.each(swiperDiv, function(index, item) {
            var tempThis = $(this);
            if (index == _value) {
                tempThis.css({
                    opacity: 1.0
                });
            } else {
                tempThis.css({
                    opacity: 0.4
                });
            }
        });
    }

    swiperBt.click(function() {
        if (swiperState == "play") {
            swiperBt.css({
                background: "url(images/main_prom_play.png) no-repeat center"
            });

            swiperState = "stop";
            // 멈춤기능 부여하기
            swiper.autoplay.stop();

        } else {
            swiperBt.css({
                background: "url(images/main_prom_stop.png) no-repeat center"
            });

            swiperState = "play";
            // 자동실행 부여하기
            swiper.autoplay.start();
        }
    });

    // 모바일 펼침메뉴
    // 펼침버튼 span의 클래스
    var btM = $('.bt_m');
    // 펼침메뉴 내용 클래스 
    var mCategory = $('.gnb_m_category');
    // 모바일 메뉴 폋림 상태
    var mState = false;
    // 펼침 버튼 클릭
    btM.click(function(){
        if (mState == true)
        {

        } else
        {
            mState = true;
            mCategory.show();
            TweenMax.to(mCategory, 0.6, {
                left:0
            });
        }
    });
    // 임시로 화면을 터치하면 닫히는 컨셉
    mCategory.click(function(){
        mState = false;
        TweenMax.to(mCategory, 0.6, {
            left : '100%',
            onComplete : function(){
                mCategory.hide();
            }
        });
    });

    // 화면의 사이즈가 변할때 처리할 내용
    $(window).resize(function(){
        //화면의 너비
        var winWidth = $(window).outerWidth();
        if (winWidth >= 661)
        {
            mState = false;
            mCategory.css({
                left : '100%',
            });
            mCategory.hide();
        }
    });


});








// 전체 애니메이션!

// window.onload = function(){
// $('body').show(1000);
// };