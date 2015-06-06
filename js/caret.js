
function saveDate(pos){
	caretPos = getPos();
	var value = $('#calendar').val().split(' ');
	current.year = parseInt(value[0]);
	current.month = validMonth(value[1]);
	current.monthDay = min(parseInt(value[2]),daysInMonth(current.month,current.year));
	$('#calendar').val(currentDateStringFirstT());
	if ($('.calendar').length!=0){
		render();
		var widget = getWidget(types[typeNum]);
		render(widget);
	}
	if (pos!=undefined)
		setPos(pos);
}

function updateCaretType(){
	var value = $('#calendar').val();
	value.split(" ").map(function(el, i){
		var pos = value.indexOf(el);
		if (pos<=caretPos) caretType=types[2-i];
	});
}

function validMonth(str){
	if (months.indexOf(str) != -1) return months.indexOf(str);
	return current.month;
}

function upHandler(){
	if (caretType == "day"){
		current.monthDay++;
		if (current.monthDay>daysInMonth(current.month,current.year)) {
			current.monthDay=1;
			current.month++;
			if (current.month==12) {
				current.month=0;
				current.year++;
			}
		}
	}
	if (caretType == "month"){
		current.month++;
		if (current.month==12) {
			current.month=0;
			current.year++;
		}
		caretPos = min(caretPos,5+months[current.month].length);
	}
	if (caretType == "year"){
		current.year++;
	}
	$('#calendar').val(currentDateStringFirstT());
	saveDate(caretPos);
}

function downHandler(){
	if (caretType == "day"){
		current.monthDay--;
		if (current.monthDay==0) {
			current.month--;
			if (current.month == -1) {
				current.month=11;
				current.year--;
			}
			current.monthDay=daysInMonth(current.month,current.year);
		}
	}
	
	if (caretType == "month"){
		current.month--;
		if (current.month==-1) {
			current.month=11;
			current.year--;
		}
		caretPos = min(caretPos,5+months[current.month].length);
	}
	if (caretType == "year"){
		current.year--;
	}
	$('#calendar').val(currentDateStringFirstT());
	saveDate(caretPos);
}

function inputKeypressDay(event){
	if (event.keyCode>="0".charCodeAt(0) && event.keyCode<="9".charCodeAt(0)){
		caretPos = getPos();
		var char = String.fromCharCode(event.keyCode);
		var value = $('#calendar').val();
		value = value.substring(0, caretPos) + char + value.substring(caretPos + 1);
		if (value.split(' ')[2].length<=2) {
			$('#calendar').val(value);
			setPos(caretPos+1);
		}
	}
	if (event.keyCode == 8) {
		caretPos = getPos();
		var char = String.fromCharCode(event.keyCode);
		var value = $('#calendar').val();
		value = value.substring(0, caretPos-1) + value.substring(caretPos);
		if (value.split(' ').length == 3) {
			$('#calendar').val(value);
			setPos(caretPos-1);
		}
	}
	if (event.keyCode == 46) {
		caretPos = getPos();
		var char = String.fromCharCode(event.keyCode);
		var value = $('#calendar').val();
		value = value.substring(0, caretPos) + value.substring(caretPos+1);
		if (value.split(' ').length == 3) {
			$('#calendar').val(value);
			setPos(caretPos);
		}
	}
}

function inputKeypressMonth(event){
	if (event.keyCode>="A".charCodeAt(0) && event.keyCode<="z".charCodeAt(0)){
		caretPos = getPos();
		var char = String.fromCharCode(event.keyCode);
		if (caretPos != 5)
			char=char.toLowerCase()
		var value = $('#calendar').val();
		if (value[caretPos]==' ') value = value.substring(0, caretPos) + char + value.substring(caretPos);
		else
			value = value.substring(0, caretPos) + char + value.substring(caretPos + 1);
		if (value.split(' ')[0].length<=4) {
			$('#calendar').val(value);
			setPos(caretPos+1);
		}
	}
	if (event.keyCode == 8) {
		var caretPos = getPos();
		var char = String.fromCharCode(event.keyCode);
		var value = $('#calendar').val();
		value = value.substring(0, caretPos-1) + value.substring(caretPos);
		if (value.split(' ').length == 3 && validMonth(value.split(' ')[1])) {
			$('#calendar').val(value);
			setPos(caretPos-1);
		}
	}
	if (event.keyCode == 46) {
		var caretPos = getPos();
		var char = String.fromCharCode(event.keyCode);
		var value = $('#calendar').val();
		value = value.substring(0, caretPos) + value.substring(caretPos+1);
		if (value.split(' ').length == 3 && validMonth(value.split(' ')[1])) {
			$('#calendar').val(value);
			setPos(caretPos);
		}
	}
}

function inputKeypressYear(event){
	if (event.keyCode>="0".charCodeAt(0) && event.keyCode<="9".charCodeAt(0)){
		caretPos = getPos();
		var char = String.fromCharCode(event.keyCode);
		var value = $('#calendar').val();
		if (value[caretPos]==' ') value = value.substring(0, caretPos) + char + value.substring(caretPos);
		else
			value = value.substring(0, caretPos) + char + value.substring(caretPos + 1);
		if (value.split(' ')[0].length<=4) {
			$('#calendar').val(value);
			setPos(caretPos+1);
		}
	}
	if (event.keyCode == 8) {
		caretPos = getPos();
		var char = String.fromCharCode(event.keyCode);
		var value = $('#calendar').val();
		value = value.substring(0, caretPos-1) + value.substring(caretPos);
		if (value.split(' ').length == 3) {
			$('#calendar').val(value);
			setPos(caretPos-1);
		}
	}
	if (event.keyCode == 46) {
		caretPos = getPos();
		var char = String.fromCharCode(event.keyCode);
		var value = $('#calendar').val();
		value = value.substring(0, caretPos) + value.substring(caretPos+1);
		if (value.split(' ').length == 3) {
			$('#calendar').val(value);
			setPos(caretPos);
		}
	}
}

function leftHandler(){
	setPos(caretPos-1);
	updateCaretType();
}

function rightHandler(){
	setPos(caretPos+1);
	updateCaretType();
}