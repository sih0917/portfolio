$(document).ready(function() {

        var lis = $('.hd_menu > li');

        $.each(lis, function(index, item) {

            $(this).mouseenter(function() {
                $(this).find('.hd_submenu').stop().slideDown();
            });

            $(this).mouseleave(function() {
                $(this).find('.hd_submenu').stop().slideUp();
            });
        });
    });