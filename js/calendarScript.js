$(document).ready(function($) {
	function init(){
		$('#calendar').val(currentDateStringFirstT());
		$('#calendar').click(function(){
			saveDate();
			updateCaretType();
			setPos(caretPos);
		});

		$(document).keydown(function(){
			if ($('.calendar').length){
				if (typeNum == 0)  keybManageDay(event.keyCode,event);
				if (typeNum == 1)  keybManageMonth(event.keyCode,event);
				if (typeNum == 2)  keybManageYear(event.keyCode,event);
			}
		});

		$('#calendar').focusout(function(){
			saveDate(caretPos);
			if (autoCompliteOpen){
				autoCompliteOpen=false;
				$('.pseudoInput').remove();
				
				realValue = undefined;
				visibleValue = undefined;
			}
		});
		$('#calendar').keydown(function(event) {
			event.preventDefault();
			if (!$('.calendar').length){
				
				if (!autoCompliteOpen) {
					if (event.keyCode == 38) return upHandler();
					if (event.keyCode == 40) return downHandler();
					if (event.keyCode == 37) return leftHandler();
					if (event.keyCode == 39) return rightHandler();
				}
				else {
					var condition =
					(event.keyCode == 38) ||
					(event.keyCode == 40) ||
					(event.keyCode == 39);
					if (condition){
						$('.pseudoInput').remove();
						autoCompliteOpen=false;
						saveDate(5+visibleValue.split(' ')[1].length);
						realValue = undefined;
						visibleValue = undefined;
					}
					if (event.keyCode == 37) return leftHandler();
				}
				if (caretType == "day")   inputKeypressDay(event);
				if (caretType == "month") inputKeypressMonth(event);
				if (caretType == "year")  inputKeypressYear(event);
			}
			
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