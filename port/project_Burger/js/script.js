// html 문서가 준비되면 실행하라.
// $() 대상을 찾는다.
// document   : html 문서
// html 문서가 ready 가 되었는지 기다린다.
// 준비가 되었다면 기능을 실행한다.
$(document).ready(function() {

    // 목록이 열려있는지 닫혀있는지를 기록하는 값
    var isOpen = false;
    // 클래스 pyo 를 클릭하면 기능을 실행하라.
    $('.pyo, .title').click(function() {

        if (isOpen == true) {
            // 열려 있으면 닫히고
            // $('.show_list_wrap').slideUp();
            TweenMax.to($('.show_list_wrap'), 0.4, {
                height: 0,
                ease: Power4.easeIn,
                onComplete: function() {
                    // pyo 클래스의 배경 위치를 변경하자.
                    $('.pyo').css('background-position', '0px -7px');

                    // 모션이 완료되면 숨겨라.
                    $('.show_list_wrap').hide();
                }
            });
            // 닫혀있는 상태라고 변경하자.
            isOpen = false;
        } else {
            // 닫혀 있으면 열리고,
            // $('.show_list_wrap').slideDown();

            // pyo 클래스의 배경 위치를 변경하자.
            $('.pyo').css('background-position', '0px 0px');

            // 목록을 보여주자.
            $('.show_list_wrap').show();
            // 높이를 0으로 만들어주고, 모션을 대기하자.
            $('.show_list_wrap').css('height', 0);
            // 모션을 실행하자.
            TweenMax.to($('.show_list_wrap'), 1.2, {
                height: 190,
                // ease: Bounce.easeOut
                ease: Elastic.easeOut.config(1, 0.3)
            });
            // 열려있는 상태라고 변경하자.
            isOpen = true;
        }

    });

    // 목록을 클릭하는 경우에 대한 처리
    // 목록 리스트 저장
    var bgList = $('.show_list > li');
    var bgListTotal = bgList.length;
    // 각각의 목록을 클릭하면 처리하자.
    $.each(bgList, function(index, item) {
        $(this).click(function() {

            // 선택에 따른 현재 순서번호를 전달한다.
            changeView(index);

        });
    });

    // 랜덤 배경 생성
    var rand = Math.floor(Math.random() * bgListTotal);
    // 최초 포커스 및 배경을 세팅하자.
    changeView(rand);
    // 배경과 포커스와 타이틀을 바꾸어주는 기능(함수)
    function changeView(_index) {
        $.each(bgList, function(index, item) {
            if (_index == index) {

                // 포커스 색상 설정하자.
                $(this).addClass('select_list');
                // 배경으로 사용할 이름을 추출하자.
                var title = $(this).text();
                // 배경으로 사용할 이미지 경로
                var bgUrl = $(this).attr('data-bg');
                // 타이틀을 출력한다.
                $('.title').text(title);
                // 배경을 변경한다.
                $('#main').css({
                    'background': 'url(' + bgUrl + ') no-repeat',
                    'background-position': 'top 95px center',
                    'background-size': 'contain'
                });
            } else {
                // 포커스클래스를 제거한다.
                $(this).removeClass('select_list');
            }
        });
    }

});