var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var types = ['day', 'month', 'year'];
var typeNum = 0;
var currentDate = new Date();
var caretType, caretPos;
var current = {
	monthDay:currentDate.getDate(),
	month:currentDate.getMonth(),
	year:currentDate.getFullYear()
};
var today = jQuery.extend({}, current);

function min(a,b){
	if (a<b) return a;
	return b;
}

function getPos(){
	return $('#calendar')[0].selectionStart;
}
function setPos(newPos){
	$('#calendar')[0].setSelectionRange(newPos, newPos);
	caretPos = getPos();
}

function GetMonthName(monthNumber) {
	return months[monthNumber];
}

function daysInMonth(month,year) {
	return new Date(year, month+1, 0).getDate();
}

function currentDateStringFirstT() {
	var year = current.year;
	var month = months[current.month];
	var day = current.monthDay;
	if (day<10) day="0"+day;

	return year + " " + month + " " + day;
}