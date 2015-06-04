$(document).ready(function($) {
	function init(){
		$('#calendar').val(currentDateStringFirstT());
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

	function slide(type) {
		$(".calendarMatrix").removeAttr('style');
		$(".calendarMatrix").css("right","auto");
		$(".calendarMatrix").css("left","auto");

		if (type == 'r')
			$(".calendarMatrix").animate({right:"350px"}, 150, function(){
				render();
				var widget = getWidget(types[typeNum%3]);
				render(widget,type);
			});
		else
			$(".calendarMatrix").animate({left:"350px"},  150, function(){
				render();
				var widget = getWidget(types[typeNum%3]);
				render(widget,type);
			});
	}

	function addListeners() {
		$('.calendarHeaderText').click(function(){
			$(".calendarMatrix").css('transition','0.15s')
								.css('transform','scale(0)')
								.css('opacity','0');
			setTimeout(function(){
				render();
				var widget = getWidget(types[(++typeNum)%3]);
				typeNum%=3;
				render(widget,'f');
			}, 150);

			
		});
		$('.right').click(function(){
			if (typeNum == 0) { 
				current.month++;
				if (current.month == 12){
					current.month = 0;
					current.year++;
				}
				current.monthDay = min(current.monthDay,daysInMonth(current.month,current.year));
				slide('r');
			};

			if (typeNum == 1) {
				current.year++;
				render();
				var widget = getWidget(types[typeNum%3]);
				render(widget);
			};

			if (typeNum == 2) {
				current.year+=15;
				slide('r');
			};
		});
		$('.left').click(function(){
			if (typeNum == 0) { 
				current.month--;
				if (current.month == -1){
					current.month = 11;
					current.year--;
				}
				current.monthDay = min(current.monthDay,daysInMonth(current.month,current.year));
				slide('l');
			};

			if (typeNum == 1) {
				current.year--;
				render();
				var widget = getWidget(types[typeNum%3]);
				render(widget);
			};

			if (typeNum == 2) {
				current.year-=15;
				slide('l');
			};
		});
		$('.calendarToday').click(function(){
			current = jQuery.extend({}, today)
			render();
			var widget = getWidget(types[typeNum]);
			render(widget);
		});
		$('.day, .month, .year').click(function(){
			var t = this;
			if (t.className == "year") {
				current.year = parseInt(t.innerText);
				current.monthDay = 1;
			}
			if (t.className == "month"){
				current.monthDay = 1;
				months.forEach(function(el, ind){
					if (el.substr(0,3) == t.innerText)
						current.month=ind;
				});
			}
			if (t.className == "day") current.monthDay = parseInt(t.innerText);
			render();
			var widget = getWidget(types[typeNum]);
			render(widget);
		});
	}

	function render(widget, slide) {
		if (!$('.calendar').length)
		{
			var offset = $('#calendar').offset();
			$('body').append(widget);
			addListeners();
			$('.calendar').offset({ top: offset.top + 55, left: offset.left});
			$('#calendar').val(currentDateStringFirstT());
			if (slide=='r'){
				$(".calendarMatrix").css("right","-350px");
				$(".calendarMatrix").animate({right:"0"},200);
			}
			if (slide=='l'){
				$(".calendarMatrix").css("left","-350px");
				$(".calendarMatrix").animate({left:"0"},200);
			}
			if (slide=='f'){

				$(".calendarMatrix").css('transform','scale(3)')
									.css('opacity','0');
				setTimeout(function(){
					$(".calendarMatrix").css('transition','0.15s')
									.css('transform','scale(1)')
									.css('opacity','1');
				}, 1);
				
			}
		}
		else
			$('.calendar').remove();
	};

	function generateWidgetHTML(calendarHeaderText, matrix){
		var widget = 
		"<div class = 'calendar'>" +
		"	<div class = 'calendarHeader'>" +
		"	<img src='images/arrow.png' class='arrow left'>" +
		"	<a class = 'calendarHeaderText'>" +
		calendarHeaderText +
		"	</a>" +
		"	<img src='images/arrow.png' class='arrow right'>" +
		"	</div>" +
		"	<div class = 'calendarMatrix'>" +
		matrix + 
		"	</div>" +
		"	<div class='calendarTodayContainer'>" +
		"		<span class='calendarToday'>Today</span>" +
		"	</div>" +
		"</div>";
		return widget;
	}

	function getWidget(type) {
		var matrix = generateMatrix(type);
		var calendarHeaderText;
		if (type == "day")   calendarHeaderText = GetMonthName(current.month) + " " + current.year.toString();
		if (type == "month") calendarHeaderText = current.year.toString();
		if (type == "year")  calendarHeaderText = (current.year - current.year%15).toString() + " - " + (current.year - current.year%15 + 15).toString();

		var widget = generateWidgetHTML(calendarHeaderText, matrix);
		return widget;
	}
	
	init();
});