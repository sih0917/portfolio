//html 문서가 준비가 되면 바로 실행하라.

$(document).ready(function() {
    // 상단배너 없애기 코드
    var topBanner = $('#top_banner')
    var topBanner_close_btn =  $('#top_banner img')
    topBanner_close_btn.click(function(){
        topBanner.slideUp();
    });
    
    // ****************하단배너 슬라이드 코드
    // 하단 배너의 Div
    var bannerSlide = $('#banner_slide');
    // 배너의 슬라이드 이미지 목록
    var bannerList = $('#banner_slide > ul > li')
    // 총 배너이미지의 개수
    var bannerTotalCount = bannerList.length;
    // 배너 이미지의 가로 너비
    var bannerWidth = 355;
    // 배너  이미지 사이의 간격
    var bannerSpace = 42;
    // 최초 가로로 배치 한다.
    $.each(bannerList, function(index, item) {
        // 가로위치
        var tempX = index * bannerWidth + index * bannerSpace;
        $(this).css('left', tempX);
    });

    // 최소 가로 위치값
    var minX = -(bannerWidth + bannerSpace);
    // 최대 가로 위치값
    var maxX = (bannerWidth + bannerSpace) * (bannerTotalCount - 1);
    // 모션 함수 실행 ->확인함
    // moveBanner();
    // 타이머를 만들자.
    var bannerTimer;
    //대기 시간을 세팅하자. (1000 은 1초)
    var bannerDelayTime = 1000;
    //애니메이션 속도를 세팅하자. (1000은 1초)
    var bannerSpeed = 1000;
    // 클릭에 의한 이동 속도 세팅
    var clickSpeed = 300;
    // 현재 적용된 이동 속도
    var nowSpeed = bannerSpeed;

    // 최초 방향을 설정한다.
    var bannerDir = 'next'; // 'prev', 'next'가 될 수도 있다.
    // 최초 애니메이션 타이머를 만들자.
    clearInterval(bannerTimer); //타이머 죽이기
    bannerTimer = setInterval(makeBannerTimer, bannerDelayTime);

    // 타이머 설정 함수 만들기
    function makeBannerTimer() {
        // 만약 자동실행이 아니라면 실행 취소 한다!!
        if (isAuto == false) {
            return;
        }

        if (bannerDir == 'prev') {
            moveBanner_Prev();
        } else {
            moveBanner_Next();
        }
    }

    // 모션 함수 만들기
    function moveBanner_Prev() {

        // 클릭을 막는다.
        isClick = false;

        clearInterval(bannerTimer);
        $.each(bannerList, function(index, item) {
            var tempX = $(this).css('left');
            tempX = parseInt(tempX);
            //만약에 현재 위치가 최대 위치값과 같거나 크다면
            if (tempX >= maxX) {
                $(this).css('left', minX);
                tempX = minX;
            }
            tempX += bannerWidth;
            tempX += bannerSpace;
            $(this).animate({
                left: tempX
            }, nowSpeed, function() {

                // 모션이 완료되었으니 버튼의 기능을 풀어주자.
                isClick = true;

                // 만약에 isMotion 이라는 것이 false 가 된다면
                if (isMotion == false) {
                    // 아래 부분을 실행하지 않겠다.
                    return;
                }

                clearInterval(bannerTimer);
                bannerTimer = setInterval(makeBannerTimer, bannerDelayTime);
            });
        });
    }

    function moveBanner_Next() {

        // 클릭을 막는다.
        isClick = false;

        clearInterval(bannerTimer); //타이머 지우기
        $.each(bannerList, function(index, item) {
            // 현재의 위치에서 이동할 위치를 세팅하자
            var tempX = $(this).css('left');
            tempX = parseInt(tempX);
            // 만약에 최소 위치값 보다 작다면 모션하기 전에
            // 새로운 위치값(최대값)으로 세팅하고 이동한다.
            if (tempX <= minX) {
                $(this).css('left', maxX);
                tempX = maxX;
            }

            tempX -= bannerWidth;
            tempX -= bannerSpace;

            $(this).animate({
                left: tempX
            }, nowSpeed, function() {

                // 모션이 완료되었으니 버튼의 기능을 풀어주자.
                isClick = true;

                // 만약에 isMotion 이라는 것이 false 가 된다면
                if (isMotion == false) {
                    // 아래 부분을 실행하지 않겠다.
                    return;
                }

                // 마지막 모션이 완료되면
                if (index == bannerTotalCount - 1) {
                    // 새롭게 타이머 만든다.
                    clearInterval(bannerTimer);
                    bannerTimer = setInterval(makeBannerTimer, bannerDelayTime);
                }
            });
        });
    }

    // -------------------버튼 콘트롤러-------------------------
    // 새로운 타이머가 생성할지 말지를 결정하는 플래그
    var isMotion = true; // true, false
    // 연속 버튼 기능을 막자
    var isClick = true;
    // 이전 버튼에 마우스가 롤오버가 되면 처리
    $('.banner_prev').mouseenter(function() {
        // 새로운 이동 모션을 막는다.
        // 새로운 타이머 생성을 죽인다.
        clearInterval(bannerTimer);
        // 새로운 모션도 막았다.
        isMotion = false;
    });
    // 이전 버튼에 마우스가 롤아웃이 되면 처리
    $('.banner_prev').mouseleave(function() {
        // 기본 모션방식으로 돌아간다.
        isMotion = true;
        nowSpeed = bannerSpeed;

        // 새롭게 타이머를 만들어주자.
        clearInterval(bannerTimer);
        bannerTimer = setInterval(makeBannerTimer, bannerDelayTime);
    });
    // 이전 버튼에 마우스를 클릭한다면 처리
    $('.banner_prev').click(function() {
        // 방향을 바꾼다.
        bannerDir = 'prev';
        // 모션 한번 실행
        nowSpeed = clickSpeed;
        // 만약에 클릭이 가능하다면 모션실행
        if (isClick == true) {
            isClick = false;
            moveBanner_Prev();
        }
    });

    $('.banner_next').mouseenter(function() {
        isMotion = false;
        clearInterval(bannerTimer);
    });
    $('.banner_next').mouseleave(function() {
        isMotion = true;
        nowSpeed = bannerSpeed;

        clearInterval(bannerTimer);
        bannerTimer = setInterval(makeBannerTimer, bannerDelayTime);
    });
    $('.banner_next').click(function() {
        bannerDir = 'next';
        nowSpeed = clickSpeed;

        if (isClick == true) {
            isClick = false;
            moveBanner_Next();
        }
    });

    // 자동 플레이 기능 활성화 여부
    var isAuto = true;

    $('.banner_pause').mouseenter(function() {
        isMotion = false;
        clearInterval(bannerTimer);
    });
    $('.banner_pause').mouseleave(function() {
        isMotion = true;
        nowSpeed = bannerSpeed;
        clearInterval(bannerTimer);
        bannerTimer = setInterval(makeBannerTimer, bannerDelayTime);
    });
    $('.banner_pause').click(function() {
        if (isAuto == true) {
            isAuto = false;
            $(this).text('재실행');
            $(this).css({
                background: 'url(image/icon_set_common.png) no-repeat',
                'background-position' : '-102px -44px'
            });
        } else {
            isAuto = true;
            $(this).text('멈춤');
                        $(this).css({
                background: 'url(image/icon_set_common.png) no-repeat',
                'background-position' : '-65px -44px'
            });
        }
    });

});