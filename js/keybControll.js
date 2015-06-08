function setNewPos(newPos,pos,key){
if (key == 38) {
		newPos.i = pos.i-1;
		newPos.j = pos.j;
	}
	if (key == 40) {
		newPos.i = pos.i+1;
		newPos.j = pos.j;
	}
	if (key == 37) {
		newPos.i = pos.i;
		newPos.j = pos.j-1;
	}
	if (key == 39) {
		newPos.i = pos.i;
		newPos.j = pos.j+1;
	}
}

function keybManageDay(key){
	var pos = {}, newPos = {};
	var days = $('.day');
	for (var i = 0; i<days.length; i++)
		if (days[i].className == 'day today') {
			pos.i = i/7|0;
			pos.j = i%7;
		}
	setNewPos(newPos,pos,key)
	if (newPos.i == undefined) return;
	var type = '';
	if (newPos.j > 6) {
		newPos.i++;
		newPos.j=0;
		if (newPos.i==7){
			newPos.i=6;
			newPos.j=6;
		}
	}
	
	if (newPos.j < 0) {
		newPos.i--;
		newPos.j=6;
		if (newPos.i==0){
			newPos.i=1;
			newPos.j=0;
		}
	}
	newPos.i = min(6,newPos.i);
	newPos.i = max(1,newPos.i);
	var num = newPos.i*7+newPos.j;
	current.monthDay = parseInt(days[num].innerHTML);
	if (days[num].className == 'day dark'){
		if (parseInt(days[num].innerHTML)>20){
			current.month--;
			if (current.month<0){
				current.month=11;
				current.year--;
			}
			type='l';
		}
		else{
			current.month++;
			if (current.month==12){
				current.month=0;
				current.year++;
			}
			type='r';
		}
	}
	
	if (type)
		slide(type);
	else {
		var widget = getWidget("day");
		render();
		render(widget);
	}
}
function keybManageMonth(key){
	var pos = {}, newPos = {};
	var days = $('.month');
	for (var i = 0; i<days.length; i++)
		if (days[i].className == 'month today') {
			pos.i = i/3|0;
			pos.j = i%3;
		}
	setNewPos(newPos,pos,key)
	if (newPos.i == undefined) return;
	if (newPos.j > 2) {
		newPos.i++;
		newPos.j=0;
		if (newPos.i>3){
			newPos.i=3;
			newPos.j=2;
		}
	}
	if (newPos.j < 0) {
		newPos.i--;
		newPos.j=2;
		if (newPos.i<0){
			newPos.i=0;
			newPos.j=0;
		}
	}
	newPos.i = min(3,newPos.i);
	newPos.i = max(0,newPos.i);
	var num = newPos.i*3+newPos.j;
	current.month = num;
	var widget = getWidget("month");
	render();
	render(widget);
}
function keybManageYear(key){
	var pos = {}, newPos = {};
	var days = $('.year');
	for (var i = 0; i<days.length; i++)
		if (days[i].className == 'year today') {
			pos.i = i/4|0;
			pos.j = i%4;
		}
	setPos(newPos,pos,key)
	if (newPos.i == undefined) return;
	var type = '';
	if (newPos.j == 3 && newPos.i == 3) {
		type='r';
	}
	if (newPos.j < 0) {
		newPos.i--;
		newPos.j=3;
		if (newPos.i<0){
			newPos.i=0;
			newPos.j=0;
			current.year--;
			type='l';
		}
	}
	newPos.i = min(3,newPos.i);
	newPos.i = max(0,newPos.i);
	var num = newPos.i*4+newPos.j;
	if (type!='l')
		current.year = parseInt(days[num].innerHTML);
	if (type)
		slide(type);
	else {
		var widget = getWidget("year");
		render();
		render(widget);
	}
}