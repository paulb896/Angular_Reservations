'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Reservation System', function() {
  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });

  describe('Calendar', function() {
    describe('calendar controls', function() {
      it('should change days shown based on month, day selection', function() {

        // Verify that app reflects days shown when user changes calendar restraints
        input('selectedDate.month').enter("2");
        input('selectedDate.year').enter("2013");
        expect(repeater('input.day').count()).toEqual(28);
      });
    });

    describe('status modification', function() {
      it('should display a div with a status class', function() {
        expect(element('div.status').attr('class')).toMatch(/status/);
      });

      it('should toggle status states when clicked', function() {
        input('selectedDate.status').enter("INVALID");
        element("div.status").click();
        expect(element('div.status').attr('class')).toMatch(/declined/);

        element("div.status").click();
        expect(element('div.status').attr('class')).toMatch(/pending/);

        element("div.status").click();
        expect(element('div.status').attr('class')).toMatch(/approved/);
      });
    });
  });
});



      /*
      $http({method: 'GET', url: 'localhost:1896'}).
        success(function(data, status, headers, config) {
          console.log("SUCCESS MOFO");
        }).
        error(function(data, status, headers, config) {
          console.log("THATS A NO-GO MOFO");
      });
      */
