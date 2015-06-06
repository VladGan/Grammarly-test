$(document).ready(function($) {
	function init(){
		$('#calendar').val(currentDateStringFirstT());
		$('#calendar').click(function(){
			saveDate();
			updateCaretType();
			setPos(caretPos);
		});

		$('#calendar').focusout(function(){
			saveDate();
		});

		$('#calendar').keydown(function(event){
			event.preventDefault();

			if (event.keyCode == 38) return upHandler();
			if (event.keyCode == 40) return downHandler();
			if (event.keyCode == 37) return leftHandler();
			if (event.keyCode == 39) return rightHandler();

			if (caretType == "day")   inputKeypressDay(event);
			if (caretType == "month") inputKeypressMonth(event);
			if (caretType == "year")  inputKeypressYear(event);
		});

		$('body').append('<div id="icon1"></div>');
		$('body').append('<div id="icon2"></div>');

		var offset = $('#calendar').offset();

		$('#icon1').offset({ top: offset.top + 11, left: offset.left + 300});
		$('#icon2').offset({ top: offset.top + 16, left: offset.left + 302});

		$('#icon2, #icon1').hover(function(){
				$("#icon1").css('background-color','rgba(234, 102, 97, 0.5)');
			}, function(){
				$("#icon1").css('background-color','#d5d5d6')
			});

		$('#icon1, #icon2').click(function() {
			var widget = getWidget("day");
			typeNum=0;
			$(document).on('click', function(event) {
				var condition = !$(event.target).closest('.calendar').length 
								&& $(event.target).attr('id')!="icon1" 
								&& $(event.target).attr('id')!="icon2"
								&& $(event.target).attr('id')!="calendar";
				if (condition)
					render();
			});
			render(widget);
		});
	}
	init();
});