module.exports = function() {
  'use strict';

  console.log('Calendar.js', arguments);

  return (function initialise() {
    var checkIn, checkOut, numberOfMonths = [2, 3],
        $calendar = $('.calendar').datepicker({
          numberOfMonths: [2, 3],
          prevText: '',
          nextText: '',
          beforeShowDay: function(date) {
            date = moment(date);

            var now = moment(),
                show = date.isAfter(now),
                css = '';

            if (checkIn && checkOut && date.isSameOrAfter(checkIn) && date.isSameOrBefore(checkOut)) {
              css = 'ui-datepicker-reserved';

              if (date.isSame(checkIn)) css += ' ui-datepicker-checkin';
              if (date.isSame(checkOut)) css += ' ui-datepicker-checkout';
            }

            return [show, css];
          },
          onSelect: function(value) {
            var date = moment($calendar.datepicker('getDate'));

            if (checkIn && !checkOut && date.isSameOrAfter(checkIn))
              checkOut = date;
            else {
              checkIn = date;
              checkOut = null;
            }

            $('#check-in-date').text(checkIn ? checkIn.format('DD/MM/YYYY') : 'Choose a date');
            $('#check-out-date').text(checkOut ? checkOut.format('DD/MM/YYYY') : 'Choose a date');
          },
          onChangeMonthYear: function() {
            $calendar.addClass('fade-in');
          }
        }).on('animationend', function() {
          $calendar.removeClass('fade-in');
        });

    return $calendar;
  })();
};