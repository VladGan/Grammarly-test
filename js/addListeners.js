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