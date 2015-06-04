function v(clas) {
	return "<span class='" + clas + "'>";
}
function generateMatrixDay(matrix, type) {
	var answer = "";
	var nowDay = {};
	var total = 0;
	var x, start, end, calendarDayNumber=1, i=0;
	var j = new Date(current.year,current.month,1).getDay();
	start = j;
	while (calendarDayNumber<=daysInMonth(current.month,current.year))
	{
		if (calendarDayNumber == current.monthDay) {nowDay.i = i; nowDay.j = j;}
		matrix[i][j] = calendarDayNumber;
		total++;
		calendarDayNumber++;
		j++;
		if (j == 7){
			j = 0;
			i++;
		}
	}
	end = j;
	x = (current.month!=0)? daysInMonth(current.month-1,current.year) : daysInMonth(11,current.year-1);
	for (j = start-1; j>=0; j--)
		matrix[0][j]=-(x--),total++;
	x = 1;
	while (total!=42)
	{
		for (j = end; j<7; j++)
			matrix[i][j]=-(x++),total++;
		i++,end=0;
	}
		
	answer = "<div class = 'line'>";
		for (var i = 0; i<7; i++)
			answer+="<span class='day DayW'>" + days[i].substring(0,2).toUpperCase() + "</span>";
	answer += "</div>";
	return fillMatrix(matrix, nowDay, answer, type);
}

function generateMatrixMonth(matrix, type) {
	var answer = "";
	var nowDay = {};
	nowDay.i = (current.month / 3) |0;
	nowDay.j = current.month % 3;
	for (var i = 0; i<4; i++)
		for (var j = 0; j<3; j++)
			matrix[i][j] = months[i*3+j].substring(0, 3);
	return fillMatrix(matrix, nowDay, answer, type);
}

function generateMatrixYear(matrix, type) {
	var answer = "";
	var nowDay = {};
	var start = current.year - current.year%15;
	nowDay.i = (current.year - start)/4 |0;
	nowDay.j = (current.year - start)%4;
	for (var i = 0; i<4; i++)
		for (var j = 0; j<4; j++)
			matrix[i][j] = start++;
	return fillMatrix(matrix, nowDay, answer, type);
}

function fillMatrix(matrix, nowDay, answer, type) {
	var last = 0;
	for (var i = 0; i<10; i++)
		if (matrix[i].length != 0)
		{
			answer+="<div class='line'>";
			for (var j = 0; j<matrix[i].length; j++)
			{
				if (i==nowDay.i && j==nowDay.j)
					answer+=v(type+" today") + matrix[i][j];
				else {
					if (matrix[i][j]<0)
						answer+=v(type+" dark") + (-matrix[i][j]);
					else
						answer+=v(type) + matrix[i][j];
				}
				answer += "</span>";
			}
			answer+="</div>";
		}
	return answer;
}

function generateMatrix(type) {
	var matrix = [];
	for(var x = 0; x < 10; x++)
		matrix[x] = [];
	if (type == "day")   return generateMatrixDay(matrix, type);
	if (type == "month") return generateMatrixMonth(matrix, type);
	if (type == "year")  return generateMatrixYear(matrix, type);
}