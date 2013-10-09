/*******************************************************************************
* This file used as sample only! Basing my work on some of its parts.
********************************************************************************/



function ListViewSampleOne(element, calendar)
{
   var t = this;


   // exports
   t.renderAgendaList = renderAgendaList;
   t.setHeight = setHeight;
   t.setWidth = setWidth;
   t.renderEvents = renderEvents;
   t.clearEvents = clearEvents;

   t.cellIsAllDay = function ()
   {
      return true
   };

   t.getColWidth = function ()
   {
      return colWidth
   };
   t.getDaySegmentContainer = function ()
   {
      return daySegmentContainer
   };


   // imports
   View.call(t, element, calendar, 'agendaOne');
   OverlayManager.call(t);
   SelectionManager.call(t);

   var opt = t.opt;
   var trigger = t.trigger;
   var renderOverlay = t.renderOverlay;
   var clearOverlays = t.clearOverlays;
   var daySelectionMousedown = t.daySelectionMousedown;
   var formatDate = calendar.formatDate;

   // locals
   var updateEvents = t.calendar.updateEvents;
   var table;
   var head;
   var headCells;
   var body;
   var bodyRows;
   var bodyCells;
   var bodyFirstCells;
   var bodyCellTopInners;
   var daySegmentContainer;

   var viewWidth;
   var viewHeight;
   var colWidth;
   var weekNumberWidth;

   var rowCnt, colCnt;
   var coordinateGrid;
   var hoverListener;
   var colContentPositions;

   var rtl, dis, dit;
   var firstDay;
   var nwe;
   var tm;
   var colFormat;
   var showWeekNumbers;
   var weekNumberTitle;
   var weekNumberFormat;
   var eventElementHandlers = t.eventElementHandlers;



   function renderAgendaList()
   {
      var firstTime = !body;
      if (firstTime)
      {
         buildTable();
      }
      else
      {
         clearEvents();
      }
   }


   function buildTable()
   {
      body = true;
   }


   function setHeight(height)
   {
      viewHeight = height;
      var bodyHeight = viewHeight;
   }

   function setWidth(width)
   {
      viewWidth = width;
   }

   //var reportEventClear = t.reportEventClear;
   var getDaySegmentContainer = t.getDaySegmentContainer;


   function renderEvents(events, modifiedEventId)
   {
      var EmptyMonth = true ;
      var html = $("<div class='fc-listcalendar'></div>");
      var ClassName = "";
      $("<ul class='listCalendar'></ul>").appendTo(html);
      var lMonth, lDay, lTime, lDate, lUrl, lTitle;
      var temp, i = 0;
      var vMonth = formatDate(t.visStart, 'MM');
      var arr = [];

      for (i in events)
      {
         z = i;
         eMonth = formatDate(events[i].start, 'MM');
      
         if (eMonth == vMonth)
         {
            EmptyMonth = false ;
            
            lMonth = formatDate(events[i].start, 'MMM');
            lDay = formatDate(events[i].start, 'dddd');
            lDate = formatDate(events[i].start, 'd MMM');
            lDDay = formatDate(events[i].start, 'dddd, d MMM');
            lTitle = events[i].title;
            allDay = events[i].allDay;
            ClassName = events[i].className;
            textColor = events[i].textColor;
            if (formatDate(events[i].start, 'd MMM') == formatDate(events[i].end, 'd MMM'))
            {
               lTime = formatDate(events[i].start, opt('timeFormat')) + ' - ' + formatDate(events[i].end, opt('timeFormat'))
            }
            else            
            { 
               //alert (events[i].end) ; 
               if ( events[i].end == null)
               {
                  lTime = formatDate(events[i].start, opt('timeFormat')) ;
               } 
               else
               {
                  lTime = '=> '+ formatDate(events[i].end, 'd MMM') ; 
               }
            }
            lUrl = events[i].url;
            if (lUrl != null)
            {
               lTitle = "<a href='" + htmlEscape(lUrl) + "'>" + lTitle + "</a>";
            }
            if (i != temp)
            {
               if (!dayHeaderExists(arr, lDDay))
               {
                  $("<li class='dayHeader ui-widget-header'>" + lDDay + "</li>").appendTo(html);
                  temp = z;
                  arr.push(lDDay);
               }
            }
            if (i % 2 == 0)
            {
               if (allDay)
               {
                  eventdisplay = $("<li style='color:" + textColor + ";' class='" + ClassName.join(' ') + " dayDetails even'>" + lTitle + "</a><span style='float:right'>" + opt('allDayText') + "</span></li>").appendTo(html);
               }
               else
               {
                  eventdisplay = $("<li style='color:" + textColor + ";' class='" + ClassName.join(' ') + " dayDetails even'>" + lTitle + "</a><span style='float:right'>" + lTime + "</span></li>").appendTo(html);
               }
            }
            else
            {
               if (allDay)
               {
                  eventdisplay = $("<li style='color:" + textColor + ";' class='" + ClassName.join(' ') + " dayDetails odd'>" + lTitle + "</a><span style='float:right'>" + opt('allDayText') + "</span></li>").appendTo(html);
               }
               else
               {
                  eventdisplay = $("<li style='color:" + textColor + ";' class='" + ClassName.join(' ') + " dayDetails odd'>" + lTitle + "</a><span style='float:right'>" + lTime + "</span></li>").appendTo(html);
               }
            }
            eventElementHandlers(events[i], eventdisplay);
         }
      }

      if (EmptyMonth == true)
      {
         $("<div>Aucun evenement</div>").appendTo(html)
      }
      else
      {    
         eventdisplay = $("<li class='listEndCap'> </li>").appendTo(html);
      }
       
      $(element).html(html);
      trigger('eventAfterAllRender');
   }

   function dayHeaderExists(arr, header)
   {
      for (var i = 0; i < arr.length; i++)
      {
         if (arr[i] == header) return true;
      }
      return false;
   }

   function clearEvents()
   {
      //reportEventClear();
   }
}