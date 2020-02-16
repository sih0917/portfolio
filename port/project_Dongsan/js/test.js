$(document).ready(function() {
    //검색 폼을 찾아라!~
    var label = $('.part_search label');
    var txt = $('.part_search .stxt');
    //클릭을 하면 라벨을 숨겨라.
    txt.click(function() {
        label.hide();
    });
    // 텍스트필드에 포커스가 가면 라벨을 숨겨라.
    // $('part_search .stxt:focus')
    txt.focus(function() {
        label.hide();
    });
    //텍스트필드에 내용이 있다면 라벨을 숨겨라.
    //텍스트필드에 내용이 없다면 라벨을 보여줘라 .
    txt.blur(function() {
        //먼저 텍스트 필드의 내용을 읽어온다.
        var step01 = txt.val();
        //공백을 제거한다.
        var step02 = step01.replace(/ /g, '');
        //다시 텍스트 필드에 값을 입력한다.
        txt.val(step02);
        //텍스트 내용을 알아낸다.
        var str = txt.val();

        if (str == '') {
            label.show();
        } else {
            label.hide();
        }

    });

});