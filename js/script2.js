$(document).ready(function() {
  //---------------------------- 상단 주메뉴 클릭시 이동
  // PC 메뉴 목록 클릭시 천천히 슬라이딩
  var gnbA = $(".gnb a");
  $.each(gnbA, function(index, item) {
    $(this).click(function(event) {
      event.preventDefault();
      var posY = $(document).height();
      posY = posY * index * -1;

      // 현재 페이지 인덱스를 공유해야 한다.
      pageIndex = index;

      if (index == 1 || index == 0) {
        mainPageSlide();

        portShowIndex = 0;
        nextOne = portShowIndex + 1;
        nextTwo = portShowIndex + 2;
        nextThree = portShowIndex + 3;
        prevOne = portShowTotal - 1;
        prevTwo = portShowTotal - 2;
        prevThree = portShowTotal - 3;
        prevFour = portShowTotal - 4;

        reSetPortLi();
      }

      if (index == 3 || index == 4) {
        portShowIndex = 0;
        nextOne = portShowIndex + 1;
        nextTwo = portShowIndex + 2;
        nextThree = portShowIndex + 3;
        prevOne = portShowTotal - 1;
        prevTwo = portShowTotal - 2;
        prevThree = portShowTotal - 3;
        prevFour = portShowTotal - 4;

        // 새로운 값으로 갱신
        portShowIndex = portShowTotal - 1;

        for (var i = 0; i < portShowIndex; i++) {
          nextOne++;
          if (nextOne > portShowTotal - 1) {
            nextOne = 0;
          }
          nextTwo++;
          if (nextTwo > portShowTotal - 1) {
            nextTwo = 0;
          }
          nextThree++;
          if (nextThree > portShowTotal - 1) {
            nextThree = 0;
          }
          prevOne++;
          if (prevOne > portShowTotal - 1) {
            prevOne = 0;
          }
          prevTwo++;
          if (prevTwo > portShowTotal - 1) {
            prevTwo = 0;
          }
          prevThree++;
          if (prevThree > portShowTotal - 1) {
            prevThree = 0;
          }
          prevFour++;
          if (prevFour > portShowTotal - 1) {
            prevFour = 0;
          }
        }
        reSetPortLi();
      }
      mainPageSlide();
    });
  });

  //----------------------------------------------------
  // 전체 영역 div
  var wrapDiv = $("#wrap");
  // 섹션
  var section = $("section");
  // 섹션 갯수
  var sectionCount = section.length;
  // 휠 코딩 -----------------------------------
  var scrollDir = ""; // down, up
  var scrollDefence = false; // false면 적용, true면 막기

  // 초기 페이지 번호
  var pageIndex = 0;

  /*// 마우스 버튼 클릭시 화면 아래로 이동
    $('.mouse_next').click(function() {
        scrollDir = 'down';
        pageMove();
    });
    $('.mouse_prev').click(function() {
        scrollDir = 'up';
        pageMove();
    });
*/
  // 모바일 스와이프 -------------------------------------------
  let diff_left = "left",
    diff_right = "right",
    diff_top = "top",
    diff_bottom = "bottom",
    initialX = null,
    initialY = null;

  function initTouch(e) {
    initialX = `${e.touches ? e.touches[0].clientX : e.clientX}`;
    initialY = `${e.touches ? e.touches[0].clientY : e.clientY}`;
  }

  function swipeDirection(e) {
    var diffX = "",
      diffY = "";
    if (initialX !== null && initialY !== null) {
      const currentX = `${e.touches ? e.touches[0].clientX : e.clientX}`,
        currentY = `${e.touches ? e.touches[0].clientY : e.clientY}`;

      (diffX = initialX - currentX), (diffY = initialY - currentY);
      //방향 확인 콘솔
      var direction =
        Math.abs(diffX) > Math.abs(diffY)
          ? 0 < diffX
            ? diff_left
            : diff_right
          : 0 < diffY
          ? diff_top
          : diff_bottom;

      initialX = null;
      initialY = null;
    }

    // 기본 스크롤 방향
    if (direction == "top") {
      scrollDir = "down";
    } else if (direction == "bottom") {
      scrollDir = "up";
    } else if (direction == "left") {
      scrollDir = "left";
    } else if (direction == "right") {
      scrollDir = "right";
    }
    // 2번 페이지 포트폴리오의 텍스트를 돌려주는 모션 작업진행
    if (pageIndex == 2) {
      if (portWheelCheck == true) {
        rotateCount = 1;
        portScroll_Repeat();
      }
      return;
    }
    // 4번 페이지 works의 스크롤 막아줌
    if (pageIndex == 3) {
      workScroll();
      return;
    }
    // 연속 스크롤 막기
    if (scrollDefence == true) {
      return;
    }
    scrollDefence = true;
    // 페이지를 움직이자.
    pageMove();
  }

  window.addEventListener("touchstart", initTouch);
  window.addEventListener("touchmove", swipeDirection);
  window.addEventListener("mousedown", e => {
    initTouch(e), window.addEventListener("mousemove", swipeDirection);
  });
  window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", swipeDirection);
  });

  // 좌우 드래그 시 사이드바 열림 닫힘
  function openSideBar() {
    var gnbDiv = $(".gnb_m_box");
    var gnbM_btn = $(".gnb_m_btn");
    var gnbSpeed = 500;

    if (scrollDir == "left") {
      // 메뉴 슬라이딩
      gnbM_btn.addClass("open");
      gnbDiv.stop().animate(
        {
          right: 0
        },
        gnbSpeed
      );
    } else if (scrollDir == "right") {
      // 메뉴 사라짐
      gnbM_btn.removeClass("open");
      gnbDiv.stop().animate(
        {
          right: "-100%"
        },
        gnbSpeed
      );
    }
  }

  // 휠 체크---------------------------------------------------
  var canScroll = true,
      scrollController = null;
  $(this).bind("mousewheel DOMMouseScroll", function(e) {

    var distance = e.originalEvent.wheelDelta;
    // distance 가  120 이면 휠을 위로 드래그
    // distance 가  -120 이면 휠을 아래로 드래그
    // 만약 distance 가 없다면
    if (distance == null) {
      distance = e.originalEvent.detail * -1;
    }
    // 기본 스크롤 방향
    if (distance < 0) {
      scrollDir = "down";
    } else if (distance > 0) {
      scrollDir = "up";
    }

    // 2번 페이지 포트폴리오의 텍스트를 돌려주는 모션 작업진행
    if (pageIndex == 2) {
      if (portWheelCheck == true) {
        rotateCount = 1;
        portScroll_Repeat();
      }
      return;
    }
    // 4번 페이지 works의 스크롤 막아줌
    if (pageIndex == 3) {
      workScroll();
      return;
    }
    // 연속 스크롤 막기
    if (scrollDefence == true) {
      return;
    }
    scrollDefence = true;

    // 페이지를 움직이자.
    pageMove();
  });

  // 스크롤시 화면 인덱스 값 바뀜
  function pageMove() {
    if (scrollDir == "up") {
      pageIndex--;
      if (pageIndex < 0) {
        scrollDefence = false;
        pageIndex = 0;
      }
    } else if (scrollDir == "down") {
      pageIndex++;
      if (pageIndex >= sectionCount - 1) {
        scrollDefence = false;
        pageIndex = sectionCount - 1;
      }
    }
    openSideBar();
    mainPageSlide();
  }

  // 화면이동용 함수 ------------------------------
  function mainPageSlide() {
    var posY = $(document).height();
    posY = posY * pageIndex * -1;
    $("#main")
      .stop().animate({
          top: posY
        },1000,function() {
          // light mode 첫페이지 gnb color
          if (pageIndex == 0) {
            $(
              ".gnb>li>a, .mouse, .bg_click, .section_tag, .gnb_m_btn"
            ).removeClass("one");
          } else {
            $(
              ".gnb>li>a, .mouse, .bg_click, .section_tag, .gnb_m_btn"
            ).addClass("one");
          }
          if (pageIndex == 2) {
            portWheelCheck = true;
          } else if (scrollDir == "up") {
            portWheelCheck = false;
          }
          if (pageIndex == 4) {
            // 마우스모양 마지막페이지에서 없애기
            $(".mouse").fadeOut();
          } else if (scrollDir == "up") {
            $(".mouse").fadeIn();
          }
          // 모바일 gnb on 표시
          $.each($(".gnb_m > li"), function(index, item) {
            if (index == pageIndex) {
              $(this).addClass("on");
            } else {
              $(this).removeClass("on");
            }
          });
          scrollDefence = false;
        }
      );
  }

  //----------------------- 포트폴리오 LI 글자 회전하기
  // 포트폴리오 휠

  var portShowIndex = 0;
  var portShowLi = $(".pf_name > ul > li");
  var portShowTotal = portShowLi.length;
  var portShowImg = $(".pf_circle img");

  // 몇번 회전할 것인가를 계산해야 한다.
  var rotateCount = 0;
  var scrollTimer;
  var scrollTimerSpeed = 100;
  var scrollTimerSpeed_Now = scrollTimerSpeed;

  // 포트폴리오 li 클릭시 사진 및 내용 바꾸기 회전하기

  var port_1 = {
    imgUrl: "images/portfolio/srt.jpg",
    title: "SRT 반응형 사이트",
    desc: "반응형 WEB / Publish 100%",
    workLink: "port/project_srt/index.html",
    originLink: "https://etk.srail.co.kr/main.do"
  };

  var port_2 = {
    imgUrl: "images/portfolio/nuhat.jpg",
    title: "NUHAT 쇼핑몰",
    desc: "Full page / Publish 100%",
    workLink: "port/project_nuhat/index.html",
    originLink: "http://nuhat.kr/"
  };

  var port_3 = {
    imgUrl: "images/portfolio/orakai.jpg",
    title: "호텔 리디자인",
    desc: "Redesign & Publish 100%",
    workLink: "port/project_orakai/index.html",
    originLink: "http://songdo.orakaihotels.com/kr/default.asp"
  };

  var port_4 = {
    imgUrl: "images/portfolio/starbucks.jpg",
    title: "스타벅스",
    desc: "PC WEB / Publish 100%",
    workLink: "port/project_Starbucks/index.html",
    originLink: "https://www.istarbucks.co.kr/index.do"
  };

  var port_5 = {
    imgUrl: "images/portfolio/in&out.jpg",
    title: "인앤아웃 버거",
    desc: "Full page / Publish 100%",
    workLink: "port/project_Burger/index.html",
    originLink: "https://www.in-n-out.com/"
  };
  var port_6 = {
    imgUrl: "images/portfolio/dongsan.jpg",
    title: "계명대 동산병원",
    desc: "PC WEB / Publish 100%",
    workLink: "port/project_Dongsan/index.html",
    originLink: "http://dongsan.dsmc.or.kr/"
  };

  var port_7 = {
    imgUrl: "images/portfolio/seoul.jpg",
    title: "서울 시청",
    desc: "PC WEB / Publish 100%",
    workLink: "port/project_Seoul/index.html",
    originLink: "https://www.seoul.go.kr/main/index.jsp"
  };

  var port_8 = {
    imgUrl: "images/portfolio/dgsisul.jpg",
    title: "대구 시설 공단",
    desc: "PC WEB / Publish 100%",
    workLink: "port/project_Dosi/index.html",
    originLink: "http://dgsisul.or.kr/"
  };

  var port_9 = {
    imgUrl: "images/portfolio/wiset.jpg",
    title: "대경지역 계명대사업",
    desc: "PC WEB / Publish 100%",
    workLink: "port/project_wisetkmu/index.html",
    originLink: "http://wisetkmu.kr/"
  };

  var port_10 = {
    imgUrl: "images/portfolio/dohsh.jpg",
    title: "경동 수산",
    desc: "PC WEB / Publish 100%",
    workLink: "port/project_Dohsh/index.html",
    originLink: "http://dohsh.com/"
  };

  var portDataArr = [
    port_1,
    port_2,
    port_3,
    port_4,
    port_5,
    port_6,
    port_7,
    port_8,
    port_9,
    port_10
  ];

  var nextOne = portShowIndex + 1;
  var nextTwo = portShowIndex + 2;
  var nextThree = portShowIndex + 3;

  var prevOne = portShowTotal - 1;
  var prevTwo = portShowTotal - 2;
  var prevThree = portShowTotal - 3;
  var prevFour = portShowTotal - 4;

  var portWheelCheck = false;

  // 포트폴리오 스크롤 함수
  function portScroll_Repeat() {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(portScroll_Repeat_Timer, scrollTimerSpeed_Now);
  }

  function portScroll_Repeat_Timer() {
    clearTimeout(scrollTimer);
    if (rotateCount >= 0) {
      portScroll();
    }
  }

  function portScroll() {
    if (scrollDir == "down") {
      // 스크롤 아래로 내릴때 배경 변경
      var bgIndex = (portShowIndex + 1) * 10;
      bgPer = bgIndex + "%";
      $("#portfolio").css("background-position-y", bgPer);

      // 스크롤을 아래로 내릴시 인덱스 번호 변경
      if (portShowIndex >= portShowTotal - 1) {
        scrollDefence = true;
        scrollTimerSpeed_Now = scrollTimerSpeed;
        pageIndex++;
        mainPageSlide();
        return;
      }
      portShowIndex++;
      if (portShowIndex > portShowTotal - 1) {
        portShowIndex = 0;
      }
      nextOne++;
      if (nextOne > portShowTotal - 1) {
        nextOne = 0;
      }
      nextTwo++;
      if (nextTwo > portShowTotal - 1) {
        nextTwo = 0;
      }
      nextThree++;
      if (nextThree > portShowTotal - 1) {
        nextThree = 0;
      }
      prevOne++;
      if (prevOne > portShowTotal - 1) {
        prevOne = 0;
      }
      prevTwo++;
      if (prevTwo > portShowTotal - 1) {
        prevTwo = 0;
      }
      prevThree++;
      if (prevThree > portShowTotal - 1) {
        prevThree = 0;
      }
      prevFour++;
      if (prevFour > portShowTotal - 1) {
        prevFour = 0;
      }
    } else if (scrollDir == "up") {
      // 스크롤 위로 올릴때 배경 변경
      var bgIndex = (portShowIndex + 1) * 10 - 10;
      if (bgIndex < 0) {
        bgIndex = 0;
      }
      bgPer = bgIndex + "%";
      $("#portfolio").css("background-position-y", bgPer);

      // 스크롤을 위로 올릴시 인덱스 번호 변경
      if (portShowIndex == 0) {
        scrollDefence = true;

        pageIndex--;
        mainPageSlide();
        return;
      }

      portShowIndex--;
      if (portShowIndex < 0) {
        portShowIndex = portShowTotal - 1;
      }
      nextOne--;
      if (nextOne < 0) {
        nextOne = portShowTotal - 1;
      }
      nextTwo--;
      if (nextTwo < 0) {
        nextTwo = portShowTotal - 1;
      }
      nextThree--;
      if (nextThree < 0) {
        nextThree = portShowTotal - 1;
      }
      prevOne--;
      if (prevOne < 0) {
        prevOne = portShowTotal - 1;
      }
      prevTwo--;
      if (prevTwo < 0) {
        prevTwo = portShowTotal - 1;
      }
      prevThree--;
      if (prevThree < 0) {
        prevThree = portShowTotal - 1;
      }
      prevFour--;
      if (prevFour < 0) {
        prevFour = portShowTotal - 1;
      }
    }
    openSideBar();
    reSetPortLi();
    rotateCount--;
    if (rotateCount > 0) {
      portScroll_Repeat();
    }
  }
  // 스크롤 할때마다 Li 위치 변경하는 함수
  function reSetPortLi() {
    // 포트폴리오 화면에서 벗어날때 배경 변경
    var bgIndex;
    if (pageIndex == 0 || pageIndex == 1) {
      bgIndex = 0;
    } else if (pageIndex == 3 || pageIndex == 4) {
      bgIndex = 100;
    }
    bgPer = bgIndex + "%";
    $("#portfolio").css("background-position-y", bgPer);

    // 스크롤시 각 li 위치를 해당하는 인덱스로 바꿔준다
    $.each(portShowLi, function(index, item) {
      var port = $(this);
      if (index == portShowIndex) {
        port.removeClass();
        port.addClass("on");
      } else if (index == nextOne) {
        port.removeClass();
        port.addClass("next1");
      } else if (index == nextTwo) {
        port.removeClass();
        port.addClass("next2");
      } else if (index == nextThree) {
        port.removeClass();
        port.addClass("next3");
      } else if (index == prevOne) {
        port.removeClass();
        port.addClass("prev1");
      } else if (index == prevTwo) {
        port.removeClass();
        port.addClass("prev2");
      } else if (index == prevThree) {
        port.removeClass();
        port.addClass("prev3");
      } else if (index == prevFour) {
        port.removeClass();
        port.addClass("offtop");
      } else {
        port.removeClass();
        port.addClass("offbot");
      }
    });
    // 포트폴리오 넘어갈때 보여줄 사진
    // portShowImg.attr('src', 'images/circle_change.png');
    setTimeout(function() {
      portShowImg.attr("src", portDataArr[portShowIndex].imgUrl);
      $(".info > h3").text(portDataArr[portShowIndex].title);
      $(".info > span").text(portDataArr[portShowIndex].desc);
      $(".portlink").attr("href", portDataArr[portShowIndex].workLink);
      $(".originlink").attr("href", portDataArr[portShowIndex].originLink);
    }, 100);
  }

  // 클릭시에는 화면 이동 처리를 하지 말자.
  $.each(portShowLi, function(index, item) {
    $(this).click(function() {
      if (portShowIndex < index) {
        scrollDir = "down";
        // 몇번 회전할 것인가를 계산해야 한다.
        rotateCount = index - portShowIndex;
        portScroll_Repeat();
      } else if (portShowIndex > index) {
        scrollDir = "up";
        // 몇번 회전할 것인가를 계산해야 한다.
        rotateCount = portShowIndex - index;
        portScroll_Repeat();
      }
    });
  });
  //---------------------------------------------------- work
  const worksContainer = $(".works_container");
  const bigTxt = $(".big_txt");
  let workConPosY, worksConH, winH, Nextpage, worksBoxH;

  // 워크 스크롤 후 다음 슬라이드로 넘어가는 함수
  function workScroll() {
    workConPosY = worksContainer.offset().top;
    worksConH = worksContainer.outerHeight();
    winH = $(document).height();
    Nextpage = -(worksConH - winH) + 5; // 5은 슬라이드 보정 값

    openSideBar();
    if (workConPosY >= 0 && scrollDir == "up") {
      scrollDefence = true;
      pageIndex--;
      mainPageSlide();
    } else if (workConPosY <= Nextpage && scrollDir == "down") {
      scrollDefence = true;
      pageIndex++;
      mainPageSlide();
    }
  }
  //------------------------------ work 애니메이션
  // 워크 텍스트 물 채워지는 코드
  function water() {
    worksBoxH = $(".works_conbox").height();
    winH = $(document).height();

    $(".works_wrap").scroll(function() {
      workConPosY = worksContainer.offset().top;
      var iframeStart = -($(".codestart").position().top - winH + worksBoxH);

      if (workConPosY < -100) {
        bigTxt.addClass("txt-fill");
      } else if (workConPosY > -100) {
        bigTxt.before().removeClass("txt-fill");
      }

      if (workConPosY < iframeStart) {
        bigTxt.text("CODE");
        bigTxt.attr("data-text", "CODE");
      } else {
        bigTxt.text("DESIGN");
        bigTxt.attr("data-text", "DESIGN");
      }
    });
  }
  water();
  //------------------------------ Contact
  $(".big_txt2").draggable();

  //---------------------------- 상단 주메뉴 클릭시 이동
  // 모바일 메뉴목록 클릭시 천천히 슬라이딩해서 도착함!
  var gnbMA = $(".gnb_m a");
  $.each(gnbMA, function(index, item) {
    $(this).click(function(event) {
      event.preventDefault();
      var posY = $(document).height();
      posY = posY * index * -1;
      // 현재 페이지 인덱스를 공유해야 한다.
      pageIndex = index;

      // 페이지 3,4 클릭 시 스크롤 안되게 막아준다.
      if (index == 2) {
      }
      if (index == 3) {
      }

      mainPageSlide();
    });
  });

  // 윈도우 리사이즈 시
  $(window).resize(function() {
    workConPosY = worksContainer.offset().top;
    worksConH = worksContainer.height();
    winH = $(document).height();
    Nextpage = -(worksConH - winH);
    if (pageIndex == 3) {
      workScroll();
      water();
    }
    posY = $(document).height();
    posY = posY * pageIndex * -1;
    $("#main")
      .stop()
      .css({
        top: posY
      });
  });

  // contact 마우스 변경
  $("#contact").mousemove(function(e) {
    var pointer = $(".pointer");
    pointer.fadeIn();
    pointer.css({
      left: e.pageX,
      top: e.pageY
    });
    $("header").mouseenter(function() {
      pointer.fadeOut();
    });
    $("header").mouseleave(function() {
      pointer.fadeIn();
    });
  });

  //imageProgress
  function imagesProgress() {
    var $container = $("#progress"),
      $progressBar = $container.find(".progress-bar"),
      $progressText = $container.find(".progress-text"),
      imgLoad = imagesLoaded("body"),
      imgTotal = imgLoad.images.length,
      imgLoaded = 0,
      current = 0,
      progressTimer = setInterval(updateProgress, 2000 / 60);

    $progressText.css("display", "block");

    imgLoad.on("progress", function() {
      imgLoaded++;
    });

    function updateProgress() {
      var target = (imgLoaded / imgTotal) * 100;

      current += (target - current) * 0.1;
      $progressBar.css({ width: current + "%" });
      $progressText.text(Math.floor(current) + "%");

      if (current >= 100) {
        clearInterval(progressTimer);
        $container.addClass("progress-complete");
        $progressBar
          .add($progressText)
          .delay(300)
          .animate({ opacity: 0 }, 2000, function() {
            $container
              .animate({ opacity: "0" }, 1000, "easeInOutQuint")
              .animate({ top: "-100%" }, 1000, "easeInOutQuint");
            $("body").addClass("active");
            var bodyActive = $("body").hasClass("active");
            if (bodyActive) {
              $(".moon").hide().delay(1000).slideDown("slow");
              $(".txt").hide().delay(1500).fadeIn(2000);
            }
          });
      }
      if (current > 99.9) {
        current = 100;
      }
    }
  }
  window.setTimeout(imagesProgress, 740);
});
