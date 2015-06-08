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
		if (slide=='b'){
			$(".calendarMatrix").css('transform','scale(0)')
								.css('opacity','1');
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