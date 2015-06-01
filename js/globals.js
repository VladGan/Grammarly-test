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
var today = jQuery.extend({}, current);

function GetMonthName(monthNumber) {
	return months[monthNumber];
}
function daysInMonth(month,year) {
	return new Date(year, month+1, 0).getDate();
}
function currentDateString() {
	var day=current.monthDay.toString();
	var month=(current.month+1).toString();
	var year=current.year.toString();
	if (day.length < 2) day = "0" + day;
	if (month.length < 2) month = "0" + month;
	return day + "." + month + "." + year;
}