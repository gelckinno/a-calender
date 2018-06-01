  function startTime(){ 
  var today= new Date();
    var _hour=today.getHours();
    var _minute=today.getMinutes();
    var _second=today.getSeconds();
    // add a zero in front of numbers<10
    _minute=checkTime(_minute);
    _second=checkTime(_second);
    document.getElementById('calendarTime').innerHTML=_hour+":"+_minute+":"+_second;
    var t=setTimeout(startTime,100);
	
	var _year = today.getFullYear();
    var _month = today.getMonth() + 1;
	var _day=today.getDate();
	var weekday=new Array(7)
   weekday[0]="星期日";
   weekday[1]="星期一";
   weekday[2]="星期二";
   weekday[3]="星期三";
   weekday[4]="星期四";
   weekday[5]="星期五";
   weekday[6]="星期六";
    document.getElementById('calendarDateWeek').innerHTML=_year+"年"+_month+"月"+_day+"日"+","+weekday[today.getDay()];
   }
   
   function checkTime(time){
   if (time<10) {
	   time="0" + time;
	   }
    return time;
   }
   