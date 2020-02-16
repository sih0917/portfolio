// html 이 완성되면 실행한다.
// html 에 <script src="js/script.js"></script> 로 연결완료
// </head> 바로 위에 있더라!
$(document).ready(function() {
	// 클래스 part_search 를 모두 찾아라.
	// html 에서 찾아보니 2개가 있더라.
    var search = $('.part_search');

    // 찾은 것들을 각각 따로 처리하겠다.
    // $.each 는 각각 처리한다는 의미입니다.
    $.each(search, function() {

    	// $(this) 는 개별적으로 접근한다.
    	// 각각의 label을 찾아라
        var label = $(this).find('label');
    	// 각각의 텍스트 필드 클래스 .stxt 를 찾아라
        var txt = $(this).find('.stxt');

        // 텍스트 필드를 클릭한다면 라벨을 숨겨라.
        txt.click(function() {
            label.hide();
        });
        // 텍스트 필드가 포커스가 된다면 라벨을 숨겨라.
        txt.focus(function() {
            label.hide();
        });
        // 텍스트 필드가 포커스가 해제된다면 처리하라.
        txt.blur(function() {
        	// 텍스트필드의 내용을 알아낸다.
            var step01 = $(this).val();
            // 읽어낸 내용에서 공백을 제거한다.
            // var step02 = step01.replace(/ /g, '');
            // 양쪽 끝에 있는 공백들만 제거하기 
            var step02 = step01.trim();
            // 공백을 제거한 내용을 다시 텍스트 필드에 보여준다.
            $(this).val(step02);

            // 최종 텍스트 필드의 내용을 읽어라
            var str = $(this).val();
            // 만약에 내용이 없다면 라벨을 보여주어라.
            // 그렇지 않다면 라벨을 숨겨라.
            if (str == '') {
                label.show();
            } else {
                label.hide();
            }
        });
    });   

});

//  토글 리스트 만들기
$(document).ready(function(){
    // 버튼
    var bt = $('.link_bt');
    // 목록
    var linkList = $('.link_site');
    // 버튼을 클릭하면 목록을 보여줘.
    bt.click(function(){
        linkList.stop().slideToggle('fast');
    });

});