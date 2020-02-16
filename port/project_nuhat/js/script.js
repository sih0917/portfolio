$(document).ready(function() {
    // 전체 영역 div 
    var wrapDiv = $('#wrap');
    // 각 내용별 div 클래스
    var pages = $('.page');
    // gnb 버튼
    var btGnb = $('#bt_gnb');
    // gnb
    var gnbDiv = $('#gnb');
    // 메뉴 영역 너비값을 자동으로 계산
    var gnbW = gnbDiv.outerWidth();
    gnbW = parseInt(gnbW);
    // gnb 보이기 숨기기
    var gnbSpeed = 0.8; // 0.4초
    // 햄버거 버튼 인덱스
    var btnShowIndex = false;

    // gnb 클릭시 메뉴 오픈 ------------------------
    btGnb.click(function() {
        if (btnShowIndex == false) {
            // gnb 버튼 모양 변경
            btGnb.addClass('open');
            // 메뉴 팝업
            gnbDiv.fadeIn();
            btnShowIndex = true;
        } else {
            btGnb.removeClass('open');
            gnbDiv.fadeOut();
            btnShowIndex = false;
        }
    });

    // menu BOARD 클릭시 오픈
    var board = $('.board_btn')
    var board_sub = board.find('ul')
    board.click(function() {
        board_sub.stop().toggle(200);
    });

    // search 버튼 호버시 오픈
    var searchForm = $('#search-form');
    var stxt = $('.stxt');
    searchForm.mouseenter(function() {
        stxt.stop().animate({ width: '100px' }, 350);
    });
    searchForm.mouseleave(function() {
        stxt.stop().animate({ width: 0 }, 350);
    });


    // 휠 코딩 ----------------------------------------------
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

        // 만약에 스크롤이 아래 였는데 갑자기 방향이 반대라면 
        if (scrollDir == 'down' && distance > 0) {
            scrollDefence = false;
        } else if (scrollDir == 'up' && distance < 0) {
            scrollDefence = false;
        }

        // 연속 스크롤 막기
        if (scrollDefence == true) {
            return;
        }
        scrollDefence = true;

        if (distance < 0) {
            scrollDir = 'down';
        } else if (distance > 0) {
            scrollDir = 'up';
        }

        // 페이지를 움직이자.
        pageMove();


    });


    // 현재보이는 페이지 번호
    var pageShowIndex = 0;
    // 다음 보일 페이지 번호
    var pageNextIndex = 1;
    // 페이지의 이동속도 
    var pageMoveSpeed = 0.6; // 1.0 초
    // 페이지 총 개수
    var pageCount = pages.length;

    // 윈도우의 너비값
    var winW = $(window).height();
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
            tgPos[i] = i * winH
        }
        //
        wrapDiv.css('top', -1 * tgPos[pageShowIndex]);

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
                top: winH * index,
                height: winH
            });
        });

    }


    // 각각의 wrap div 가 스코롤 될때 마다.
    // 세로 상으로 이동해야 될 위치값.
    for (var i = 0; i < pageCount; i++) {
        tgPos[i] = i * winH
    }

    function pageMove() {

        if (scrollDir == "up") {
            // 위로 휠
            if (pageShowIndex == 0) {} else {
                pageShowIndex = pageShowIndex - 1;
                TweenMax.to(wrapDiv, pageMoveSpeed, {
                    top: -1 * tgPos[pageShowIndex],
                    onComplete: function() {
                        // 다시 스크롤을 받아들이겠다.
                        scrollDefence = false;
                    }
                });
            }
        } else {
            // 아래로 휠
            if (pageShowIndex == pageCount - 1) {} else {
                pageShowIndex = pageShowIndex + 1;
                TweenMax.to(wrapDiv, pageMoveSpeed, {
                    top: -1 * tgPos[pageShowIndex],
                    onComplete: function() {
                        // 다시 스크롤을 받아들이겠다.
                        scrollDefence = false;
                    }
                });
            }
        }

        // 2번 페이지에서 애니메이션 적용 -------------------
        var page2con = $('.page2con');
        // 적용할 애니메이션이 작성된 클래스의 이름
        var page2con_ani = "page2con_ani";
        if (pageShowIndex == 1) {
            page2con.addClass(page2con_ani);
        } else {
            page2con.removeClass(page2con_ani);
        }
        // 슬라이드 시 콩알 버튼 변경
        var on1 = $('.on1');
        var on2 = $('.on2');
        var on3 = $('.on3');
        if (pageShowIndex == 0) {
            on1.addClass("active");
            on2.removeClass("active");
            on3.removeClass("active");
        } else if (pageShowIndex == 1) {
            on1.removeClass("active");
            on2.addClass("active");
            on3.removeClass("active");
        } else if (pageShowIndex == 2) {
            on1.removeClass("active");
            on2.removeClass("active");
            on3.addClass("active");
        }
    }


    // 콩알 버튼 클릭시 슬라이드 작동
    var btTag = $('.slidebtn').find('a')
    // 2번 페이지에서 애니메이션 적용 -------------------
    var page2con = $('.page2con');
    // 적용할 애니메이션이 작성된 클래스의 이름
    var page2con_ani = "page2con_ani";
    
    $.each(btTag, function(index, item) {
        var aOn = $(this);
        aOn.click(function(event) {
            event.preventDefault();
            // 클릭시 모양 변경
            aOn.addClass("active");
            pageShowIndex = index;
            // 클릭시 두번째 페이지에서만 애니메이션 하기
            if (pageShowIndex == 1) {
                page2con.addClass(page2con_ani);
            } else {
                page2con.removeClass(page2con_ani);
            }
            btTag.not($(this)).removeClass("active");
            TweenMax.to(wrapDiv, pageMoveSpeed, {
                top: -1 * tgPos[index],
                onComplete: function() {
                    scrollDefence = false;
                    pageShowIndex = index;
                }
            });
            
        });
    });




    // 아직 해결 못한 것들

    // 메뉴 클릭 시에 이동하기 ------------ 필요 없어서 끔
    // 각각의 a 태그가 필요해요.
    /*  var aTag = gnbDiv.find('a');

      $.each(aTag, function(index, item) {
          var tempA = $(this);
          tempA.click(function(event) {
              event.preventDefault();
              TweenMax.to(wrapDiv, pageMoveSpeed, {
                  top: -1 * tgPos[index],
                  onComplete: function() {
                      scrollDefence = false;
                      pageShowIndex = index;
                  }
              });
          });
      });*/

    // 서브메뉴 클릭시 서브 제목 바뀜 ----------- 해결 못함
    /*var subMenu = $('.submenu a');
    var cate_title = $('.cate_title');
    var title;

    $.each(subMenu, function(index, item) {
        $(this).click(function(e) {
            console.log(this.text);
            // e.preventDefault();
            var title = this.text;
            cate_title.text(title);
        });
    });*/


});