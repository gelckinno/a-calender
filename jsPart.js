(function(){
  /*
   * ���ڼ�¼���ڣ���ʾ��ʱ�򣬸���dateObj�е����ڵ�������ʾ
   */
  var dateObj = (function(){
    var _date = new Date();    // Ĭ��Ϊ��ǰϵͳʱ��
    return {
      getDate : function(){
        return _date;
      },
      setDate : function(date) {
        _date = date;
      }
    };
  })();
 
  // ����calendar div�е�html����
  renderHtml();
  // �������ʾ����
  showCalendarData();
  // ���¼�
  bindEvent();
 
  /**
   * ��Ⱦhtml�ṹ
   */
  function renderHtml() {
    var calendar = document.getElementById("calendar");
    var titleBox = document.createElement("div");  // ������� ������һ�� ��һ�� ����
    var bodyBox = document.createElement("div");  // ����� ��ʾ����
	
    // ���ñ�������е�html
    titleBox.className = 'calendar-title-box';
    titleBox.innerHTML = "<span class='prev-month' id='prevMonth'></span>" +
      "<span class='calendar-title' id='calendarTitle'></span>" +
      "<span id='nextMonth' class='next-month'></span>";
    calendar.appendChild(titleBox);    // ��ӵ�calendar div��
 
    // ���ñ������html�ṹ
    bodyBox.className = 'calendar-body-box';
    var _headHtml = "<tr>" + 
              "<th>��</th>" +
              "<th>һ</th>" +
              "<th>��</th>" +
              "<th>��</th>" +
              "<th>��</th>" +
              "<th>��</th>" +
              "<th>��</th>" +
            "</tr>";
    var _bodyHtml = "";
 
    // һ�������31�죬����һ�������ռ6�б��
    for(var i = 0; i < 6; i++) {  
      _bodyHtml += "<tr>" +
              "<td></td>" +
              "<td></td>" +
              "<td></td>" +
              "<td></td>" +
              "<td></td>" +
              "<td></td>" +
              "<td></td>" +
            "</tr>";
    }
    bodyBox.innerHTML = "<table id='calendarTable' class='calendar-table'>" +
              _headHtml + _bodyHtml +
              "</table>";
    // ��ӵ�calendar div��
    calendar.appendChild(bodyBox);
  }
 
  /**
   * �������ʾ���ݣ�����������
   */

  function showCalendarData() {
    var _year = dateObj.getDate().getFullYear();
    var _month = dateObj.getDate().getMonth() + 1;
    var _dateStr = getDateStr(dateObj.getDate());
 
    // ���ö����������е� �ꡢ����Ϣ
    var calendarTitle = document.getElementById("calendarTitle");
    var titleStr = _dateStr.substr(0, 4) + "��" + _dateStr.substr(4,2) + "��";
    calendarTitle.innerText = titleStr;
 
    // ���ñ���е���������
    var _table = document.getElementById("calendarTable");
    var _tds = _table.getElementsByTagName("td");
    var _firstDay = new Date(_year, _month - 1, 1);  // ��ǰ�µ�һ��
    for(var i = 0; i < _tds.length; i++) {
      var _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());
      var _thisDayStr = getDateStr(_thisDay);
      _tds[i].innerText = _thisDay.getDate();
      //_tds[i].data = _thisDayStr;
      _tds[i].setAttribute('data', _thisDayStr);
      if(_thisDayStr == getDateStr(new Date())) {    // ��ǰ��
        _tds[i].className = 'currentDay';
      }else if(_thisDayStr.substr(0, 6) == getDateStr(_firstDay).substr(0, 6)) {
        _tds[i].className = 'currentMonth';  // ��ǰ��
      }else {    // ������
        _tds[i].className = 'otherMonth';
      }
    }
  }
 
  /**
   * ���ϸ����¸����¼�
   */
  function bindEvent() {
    var prevMonth = document.getElementById("prevMonth");
    var nextMonth = document.getElementById("nextMonth");
    addEvent(prevMonth, 'click', toPrevMonth);
    addEvent(nextMonth, 'click', toNextMonth);
  }
 
  /**
   * ���¼�
   */
  function addEvent(dom, eType, func) {
    if(dom.addEventListener) {  // DOM 2.0
      dom.addEventListener(eType, function(e){
        func(e);
      });
    } else if(dom.attachEvent){  // IE5+
      dom.attachEvent('on' + eType, function(e){
        func(e);
      });
    } else {  // DOM 0
      dom['on' + eType] = function(e) {
        func(e);
      }
    }
  }
 
  /**
   * ����ϸ���ͼ�괥��
   */
  function toPrevMonth() {
    var date = dateObj.getDate();
    dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    showCalendarData();
  }
 
  /**
   * ����¸���ͼ�괥��
   */
  function toNextMonth() {
    var date = dateObj.getDate();
    dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    showCalendarData();
  }
 
  /**
   * ����ת��Ϊ�ַ����� 4λ��+2λ��+2λ��
   */
  function getDateStr(date) {
    var _year = date.getFullYear();
    var _month = date.getMonth() + 1;    // �´�0��ʼ����
    var _d = date.getDate();

    _month = (_month > 9) ? ("" + _month) : ("0" + _month);
    _d = (_d > 9) ? ("" + _d) : ("0" + _d);
    return _year + _month + _d;
  }
})();