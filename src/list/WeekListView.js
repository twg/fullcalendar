
fcViews.weekList = WeekListView;

// Store defaults here so we don't have to modify defaults.js
defaults.titleFormat.weekList = "MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}";
defaults.columnFormat.weekList = 'MMM d, yyyy';
defaults.buttonText.weekList = 'week';

function WeekListView(element, calendar) {
  var t = this;
  
  // exports
  t.render = render;

  // imports
  ListView.call(t, element, calendar, 'weekList');
  var opt = t.opt;
  var renderList = t.renderList;
  var skipHiddenDays = t.skipHiddenDays;
  var getCellsPerWeek = t.getCellsPerWeek;
  var formatDates = calendar.formatDates;
  
  
  function render(date, delta) {

    if (delta) {
        addDays(date, delta * 7);
    }

    var start = addDays(cloneDate(date), -((date.getDay() - opt('firstDay') + 7) % 7));
    var end = addDays(cloneDate(start), 7);

    var visStart = cloneDate(start);
    skipHiddenDays(visStart);

    var visEnd = cloneDate(end);
    skipHiddenDays(visEnd, -1, true);

    var rowCnt = getCellsPerWeek();

    t.start = start;
    t.end = end;
    t.visStart = visStart;
    t.visEnd = visEnd;

    t.title = formatDates(
      visStart,
      addDays(cloneDate(visEnd), -1),
      opt('titleFormat')
    );

    renderList(rowCnt);
  }

}




 