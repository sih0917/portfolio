$(document).ready(function() {
       // 햄버거 메뉴
    var gnbDiv = $('.gnb_m_box');
    var gnbM = $('.gnb_m');
    var gnbM_btn = $('.gnb_m_btn');
    var gnbSpeed = 500;
    gnbM_btn.click(function(event) {
        // 햄버거 누를시 gnb 슬라이딩 
        var gnbMPos = $('.gnb_m_box').css('right')
        gnbMPos = parseInt(gnbMPos);

        if (gnbMPos < 0) {
            // 햄버거 버튼 모양 바꾸기
            $(this).addClass('open');
            // 메뉴 슬라이딩
            gnbDiv.animate({
                right: 0
            }, gnbSpeed);
        } else {
            // 햄버거 버튼 모양 바꾸기
            $(this).removeClass('open');
            // 메뉴 사라짐
            gnbDiv.animate({
                right: '-100%'
            }, gnbSpeed);

        }
    });
    // 메뉴 버튼 눌렸을 때 메뉴 사라짐   
    gnbM.click(function(event) {
        // 햄버거 버튼 모양 바꾸기
        gnbM_btn.removeClass('open');
        // 메뉴 사라짐
        gnbDiv.animate({
            right: '-100%'
        }, gnbSpeed);
    });
    // 바탕 화면 눌렸을 때 메뉴 사라짐
    $('#wrap').click(function(event) {
        // 햄버거 버튼 모양 바꾸기
        gnbM_btn.removeClass('open');
        // 메뉴 사라짐
        gnbDiv.animate({
            right: '-100%'
        }, gnbSpeed);
    });
    
});