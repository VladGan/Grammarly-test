$(document).ready(function($) {
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	var types = ['day', 'month', 'year'];
	var typeNum = 0;

	var currentDate = new Date();
	var current = {
		monthDay:currentDate.getDate(),
		month:currentDate.getMonth(),
		year:currentDate.getFullYear()
	};
	today = jQuery.extend({}, current)

	function GetMonthName(monthNumber) {
		return months[monthNumber];
	}

	function daysInMonth(month,year) {
		return new Date(year, month+1, 0).getDate();
	}

	function currentDateString(){
		var day=current.monthDay.toString();
		var month=(current.month+1).toString();
		var year=current.year.toString();
		if (day.length < 2) day = "0" + day;
		if (month.length < 2) month = "0" + month;

		return day + "." + month + "." + year;w
	}

	function addListeners(){

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
		$('.Day, .Month, .Year').click(function(){
			var t = this;
			if (t.className == "Year") {
				current.year = t.innerText;
				current.monthDay = 1;
			}
			if (t.className == "Month"){
				current.monthDay = 1;
				months.forEach(function(el, ind){
					if (el.substr(0,3) == t.innerText)
						current.month=ind;
				});
			}
			if (t.className == "Day") current.monthDay = parseInt(t.innerText);
			render();
			var widget = getWidget(types[typeNum]);
			render(widget);
		});
		$('.calendar').on('blur', function(){
			console.log(1233);
		});
	}

	function generateMatrix(type) {
		var matrix = [];
		for(var x = 0; x < 10; x++)
			matrix[x] = [];

		var nowDay = {};

		if (type == "day"){
			var start,end;

			var calendarDayNumber = 1;
			var j = new Date(current.year,current.month,1).getDay();
			var i = 0;

			start = j;
			while (calendarDayNumber<=daysInMonth(current.month,current.year))
			{

				if (calendarDayNumber == current.monthDay) {nowDay.i = i; nowDay.j = j;}

				matrix[i][j] = calendarDayNumber;
				calendarDayNumber++;
				j++;
				if (j == 7){
					j = 0;
					i++;
				}
			}
			end = j;

			var x;
			x = (current.month!=0)? daysInMonth(current.month-1,current.year) : daysInMonth(11,current.year-1);
			for (j = start-1; j>=0; j--)
				matrix[0][j]=-(x--);
			x = 1;
			if (end!=0)
				for (j = end; j<7; j++)
					matrix[i][j]=-(x++);
		}


		if (type == "month"){
			nowDay.i = (current.month / 3) |0;
			nowDay.j = current.month % 3;
			for (var i = 0; i<4; i++)
				for (var j = 0; j<3; j++)
					matrix[i][j] = months[i*3+j].substring(0, 3);
		}


		if (type == "year"){
			var start = current.year - current.year%15;
			nowDay.i = (current.year - start)/4 |0;
			nowDay.j = (current.year - start)%4;

			for (var i = 0; i<4; i++)
				for (var j = 0; j<4; j++)
					matrix[i][j] = start++;
		}

		var answer = "";
		var vortex = "";

		if (type == "day")
		{
			vortex = "<span class='Day'>";
			vortexD = "<span class='Day dark'>";
			vortexT = "<span class='Day today'>";

			answer = "<div class = 'line'>";
			for (var i = 0; i<7; i++)
				answer+="<span class='Day DayW'>" + days[i].substring(0,2).toUpperCase() + "</span>";
			answer += "</div>";
		}
		if (type == "year")
		{
			vortex = "<span class='Year'>";
			vortexT = "<span class='Year today'>";
		}
		if (type == "month")
		{
			vortex = "<span class='Month'>";
			vortexT = "<span class='Month today'>";
		}

		var last = 0;
		for (var i = 0; i<10; i++)
			if (matrix[i].length != 0)
			{
				answer+="<div class='line'>";
				for (var j = 0; j<matrix[i].length; j++)
				{
					if (i==nowDay.i && j==nowDay.j)
						answer+=vortexT+matrix[i][j];
					else{
						if (matrix[i][j]<0)
							answer+=vortexD+(-matrix[i][j]);
						else
							answer+=vortex+matrix[i][j];
					}
					answer += "</span>";
				}
				answer+="</div>";
			}

		return answer;
	}

	var render = function(widget){
		if (!$('.calendar').length)
		{
			$('body').append(widget);
			addListeners();

			var offset = $('#calendar').offset();
			$('.calendar').offset({ top: offset.top + 60, left: offset.left});

			$('#calendar')[0].value = currentDateString();
		}
		else
			$('.calendar').remove();
	};

	var getWidget = function(type){
		var matrix = generateMatrix(type);
		var calendarHeaderText;
		if (type == "day") calendarHeaderText = GetMonthName(current.month) + " " + current.year.toString();
		if (type == "month") calendarHeaderText = current.year.toString();
		if (type == "year") calendarHeaderText = (current.year - current.year%15).toString() + " - " + (current.year - current.year%15 + 15).toString();

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
	$('#calendar').val('Select date');

	var widget = getWidget("day");
	$('#calendar').click(function(){
		typeNum=0;
		$(document).on('click', function(event) {
			if (!$(event.target).closest('.calendar').length && $(event.target)[0].id!="calendar") {
				render();
			}
		});
		render(widget);


	});
});