$(document).ready(function() {
    // 랭귀지 클릭시 목록 나옴
    $('#language').click(function() {
        $('.language').toggle();
    });

    // 랭귀지 이외의 곳 이동시 목록 사라짐	
    $('.language').mouseleave(function() {
        $('.language').hide();
    });

    // 랭귀지 눌렸을시 글자 바뀜
    var langTitle = $('.lang_title');
    var lang = $('.language > li > a');
    var langTxt;
    $.each(lang, function(index, item) {
        $(this).click(function() {
            langTxt = $(this).attr('lang-data');
            langTitle.text(langTxt);
        });
    });

    // 메뉴 호버시 
    var menu = $('.menu');
    var submenu = $('.submenu');
    var gnbBg = $('.gnb_bg');
    menu.mouseenter(function() {
        submenu.stop().show();
        gnbBg.stop().show();
    });
    menu.mouseleave(function() {
        submenu.stop().hide();
        gnbBg.stop().hide();
    });

    //quick 호버시 아이콘 모양 변경
    var quickA = $('.quick>ul>li>a');
    $.each(quickA, function(index, item){
    	$(this).mouseenter(function(){
    		quickA.find('img').attr('src',function(i,src){
    			return src.replace('_on.png','.png');
    		});
    		$(this).find('img').attr('src',function(i,src){
    			return src.replace('.png','_on.png');
    		});
    	});
    	$(this).mouseleave(function(){
    		quickA.find('img').attr('src',function(i,src){
    			return src.replace('_on.png','.png');
    		});
    		quickA.eq(0).find('img').attr('src',function(i,src){
    			return src.replace('.png','_on.png');
    		});
    	});
    });

    // bxslider
    $('.slider').bxSlider({
        auto: true,
        autoControls: true,
        stopAutoOnClick: true,
        pager: true,
        mode: 'fade',
        speed: 100,
        pause: 3500,
    });

    // 슬라이드 시작 일시정지 버튼 토글
    $('.bx-start').hide();

    $('.bx-start').click(function(){
    	$(this).hide();
    	$('.bx-stop').show();
    });
    $('.bx-stop').click(function(){
    	$(this).hide();
    	$('.bx-start').show();
    });
    $('.bx-next').click(function(){
    	$('.bx-start').show();
    	$('.bx-stop').hide();
    });
    $('.bx-prev').click(function(){
    	$('.bx-start').show();
    	$('.bx-stop').hide();
    });

    // day버튼 클릭시 모달창 열고 닫기
    var day = $('.day');
    day.click(function(){
    	$('#modal').show();
    });
    $('.modal_close').click(function(){
    	$('#modal').hide();
    });

    // 모바일 gnb 설정
    var mGnb = $('.m_gnb');
    var burger = $('.burger');
    var mBg = $('.m_bg');
    var mClose = $('.m_menu_close');
    var mGnbH = $('body').outerHeight();

    // mGnb 높이값 설정
    mGnb.css('height',mGnbH);
    // 버거 클릭시 메뉴 보여주기
    burger.click(function(){
        mGnb.css('right','0');
        mBg.show();
    });
    mClose.click(function(){
        mGnb.css('right','-270px');
        mBg.hide();
    });
    // 모바일 메뉴 클릭시 서브메뉴 나오기
    var mMenuLi = $('.m_menu > li');
    var mSubmenu = $('.m_submenu');
    mMenuLi.click(function(){
        $(this).find('.m_submenu').toggle();
    });
});