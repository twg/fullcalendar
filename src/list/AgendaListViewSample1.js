/*******************************************************************************
* This file used as sample only! Basing my work on some of its parts.
********************************************************************************/

// new view and its button
fcViews.agendaOne = agendaListViewOne;

defaults.titleFormat.agendaOne = 'MMMM yyyy';
defaults.columnFormat.agendaOne = 'MMMM yyyy';
defaults.buttonText.agendaOne = 'AgendaOne';


defaults.agendaDisType = true;

function agendaListViewOne(element, calendar)
{
   var t = this;


   // exports
   t.render = render;

   // imports
   ListViewSampleOne.call(t, element, calendar);
   var opt = t.opt;
   var renderAgendaList = t.renderAgendaList;
   var formatDate = calendar.formatDate;


   function render(date, delta)
   {
      if (delta)
      {
         addMonths(date, delta);
         date.setDate(1);
      }
      var start, end, visStart, visEnd;
      start = cloneDate(date, true);
      start.setDate(1);
      end = addMonths(cloneDate(start), 1);
      visStart = cloneDate(start);
      visEnd = cloneDate(end);
      // I will keep all params and discuss with the group about the header 
      // as well as if we should use June 1st or start of the calendar view date
      t.title = formatDate(start, opt('titleFormat'));
      t.start = start;
      t.end = end;
      t.visStart = visStart;
      t.visEnd = visEnd;
      renderAgendaList(false);
   }
}

;;