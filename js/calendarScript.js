$(document).ready(function($) {
	function init(){
		$('#calendar').val(months[current.month] + " " + current.monthDay);
		$('body').append("<img src='images/select.png' id='icon'>");
		var offset = $('#calendar').offset();
		$('#icon').offset({ top: offset.top + 25, left: offset.left + 300});
		$('#icon').width('25px').css('cursor','pointer');

		$('#calendar, #icon').click(function() {
			var widget = getWidget("day");
			typeNum=0;
			$(document).on('click', function(event) {
				var condition = !$(event.target).closest('.calendar').length && $(event.target).attr('id')!="calendar" && $(event.target).attr('id')!="icon";
				if (condition)
					render();
			});
			render(widget);
		});
	}

	function addListeners() {
		$('.right').click(function(){
			render();
			var widget = getWidget(types[(++typeNum)%3]);
			typeNum%=3;
			render(widget);
		});
		$('.left').click(function(){
			render();
			typeNum+=2;
			var widget = getWidget(types[typeNum%3]);
			typeNum%=3;
			render(widget);
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
				current.year = t.innerText;
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

	function render(widget) {
		if (!$('.calendar').length)
		{
			var offset = $('#calendar').offset();
			$('body').append(widget);
			addListeners();
			$('.calendar').offset({ top: offset.top + 60, left: offset.left});
			$('#calendar').val(currentDateString());
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