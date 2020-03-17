$(document).ready(function(){
    
        // 예약 인원 변경 가능 코드
        const adultNumb = $('.adult-numb');
        const childNumb = $('.child-numb');
        const adultPlus = $('.adult-plus');    
        const adultMinus = $('.adult-minus');    
        const childPlus = $('.child-plus');    
        const childMinus = $('.child-minus');    
        let adult_i = adultNumb.text();
        let child_i = childNumb.text();
        
        adultPlus.click(function(e){
            e.preventDefault();
            adult_i++;
            adultNumb.text(adult_i);
        });
        adultMinus.click(function(e){
            e.preventDefault();
            adult_i--;
            if (adult_i <= 0) {
                adult_i = 1;
            } else{
                adultNumb.text(adult_i);
            }
        });

        childPlus.click(function(e){
            e.preventDefault();
            child_i++;
            childNumb.text(child_i);
        });
        childMinus.click(function(e){
            e.preventDefault();
            child_i--;
            if (child_i <= 0) {
                child_i = 0;
                childNumb.text(child_i);
            } else{
                childNumb.text(child_i);
            }
        });

});