
// 대상의 너비를 계산한다. $(대상).outerWidth();
$(document).ready(function(){

	var slideLi = $('.rollbanner > ul > li');
	var sliderLiW = slideLi.outerWidth();
	var sliderTotalCount = slideLi.length;
	
	$.each(slideLi, function(index, item){
		
		$(this).css({ 
			position: 'absolute', 
			left: index * sliderLiW,
			top: 0
		});
	// 최소 가로 위치값
	var minX = -sliderLiW;
	// 최대 가로 위치값
	var maxX = sliderLiW * (sliderTotalCount -1);

	var sliderTimer;
	var sliderDelayTime = 1000;
	var sliderSpeed = 1000;
	var clickSpeed = 300;
	var nowSpeed = sliderSpeed;

	var sliderDir = 'next';

	clearInterval(sliderTimer);
	sliderTimer = setInterval(makeSliderTimer, sliderDelayTime);

	function makeSliderTimer() {

		if (sliderDir == 'prev') {
			moveSlider_Prev();
		} else {
			moveSlider_Next();
		}
	}

	function moveSlider_Prev() {

		clearInterval(sliderTimer);
		$.each(sliderLi, function(index, item) {

			var tempX = $(this).css('left');
			tempX = parseInt(tempX);

			if(tempX >= maxX) {
				$(this).css('left', minX);
				tempX = minX;
			}

			tempX += sliderLiW;

			$(this).animate({
				left: tempX
			}, nowSpeed, function(){

				clearInterval(sliderTimer);
				sliderTimer = setInterval(makeSliderTimer, sliderDelayTime);
			});

		});
	}

		function moveSlider_Next() {

		clearInterval(sliderTimer);
		$.each(sliderLi, function(index, item) {

			var tempX = $(this).css('left');
			tempX = parseInt(tempX);

			if(tempX <= minX) {
				$(this).css('left', maxX);
				tempX = maxX;
			}

			tempX -= sliderLiW;

			$(this).animate({
				left: tempX
			}, nowSpeed, function(){

				clearInterval(sliderTimer);
				sliderTimer = setInterval(makeSliderTimer, sliderDelayTime);
			});

		});
	}

	});

});