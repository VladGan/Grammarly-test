
function saveDate(pos){
	caretPos = getPos();
	var value = $('#calendar').val().split(' ');
	if (visibleValue) value=visibleValue.split(' ');
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
	if (visibleValue) value=visibleValue;
	value.split(" ").map(function(el, i){
		var pos = value.indexOf(el);
		if (pos<=caretPos) caretType=types[2-i];
	});
}

function validMonth(str){
	if (months.indexOf(str) != -1) return months.indexOf(str);
	return current.month;
}

function monthExist(str){
	if (str == '') {
		$('.pseudoInput').remove();
		autoCompliteOpen = false;
		return undefined;
	}
	for (var i = 0; i<12; i++)
		if (months[i].indexOf(str) != -1)
			return months[i].substr(str.length,months[i].length);
	return undefined;
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

function setAutocomplite(value, pos){
	var autocomp = monthExist(value.substring(5, pos));
	if (autocomp || autocomp=='') {
		$('.pseudoInput').remove();
		autoCompliteOpen = true;
		value = value.replace(/\s\s+/g, ' ');
		var offset = $('#calendar').offset();
		var valueOldPart = value.split(' ')[0] + ' ' + value.split(' ')[1];
		var valueNewPart = value.substring(0, pos) + sp.substr(0,autocomp.length +1);
		var str = 
		'<span class="inv">' + value.substring(0, 5) + '</span>' +
		'<span class="inv">' + value.substring(5, pos) + '</span>' +
		autocomp +
		' <span class="normal">' + value.split(' ')[2] + '</span>';
		realValue = value.replace(valueOldPart, valueNewPart).replace(/\s\s+/g, ' ');
		visibleValue = value.substring(0, 5) + value.substring(5, pos) + autocomp + ' ' +value.split(' ')[2];
		value = valueNewPart;
		
		$('body').append('<span class="pseudoInput">'+ str +'</span>');
		$('.pseudoInput').offset({ top: offset.top, left: offset.left + 20});
		$('#calendar').val(value);
		setPos(pos);
	}
}

function inputKeypressMonth(event){
	if (event.keyCode>="A".charCodeAt(0) && event.keyCode<="z".charCodeAt(0)){
		caretPos = getPos();
		var char = String.fromCharCode(event.keyCode);
		if (caretPos != 5)
			char=char.toLowerCase()
		var value = $('#calendar').val();
		if (realValue) value=realValue;
		if (value[caretPos]==' ') value = value.substring(0, caretPos) + char + value.substring(caretPos);
		else
			value = value.substring(0, caretPos) + char + value.substring(caretPos + 1);
		setAutocomplite(value,caretPos+1);
	}
	if (event.keyCode == 8) {
		var caretPos = getPos();
		var char = String.fromCharCode(event.keyCode);
		var value = $('#calendar').val();
		if (realValue) value=realValue;
		value = value.substring(0, caretPos-1) + value.substring(caretPos);
		if (value.split(' ').length == 3 ) {//&& validMonth(value.split(' ')[1])
			$('#calendar').val(value);
			setAutocomplite(value,caretPos-1);
			setPos(caretPos-1);
		}
	}
	if (event.keyCode == 46) {
		var caretPos = getPos();
		var char = String.fromCharCode(event.keyCode);
		var value = $('#calendar').val();
		if (realValue) value=realValue;
		value = value.substring(0, caretPos) + value.substring(caretPos+1);
		if (value.split(' ').length == 3) {// && validMonth(value.split(' ')[1])
			$('#calendar').val(value);
			setAutocomplite(value,caretPos);
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
		if (value.split(' ')[0].length==4) {
			$('#calendar').val(value);
			setPos(caretPos+1);
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