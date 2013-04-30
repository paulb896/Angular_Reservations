'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Reservation System', function() {
  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });

  describe('Calendar', function() {
    beforeEach(function() {
      browser().navigateTo('#/calendar');
    });

    describe('calendar controls', function() {
      it('should change days shown based on month, day selection', function() {

        // Verify that app changes days shown for edge case
        input('month').enter("2");
        input('year').enter("2013");
        expect(repeater('input.day').count()).toEqual(28);
      });
    });

    describe('status modification', function() {
      it('should display a div with a status class', function() {
        expect(element('[ng-view] div.status').attr('class')).toMatch(/status/);
      });

      it('should toggle status states when clicked', function() {
        input('selectedDateStatus').enter("INVALID");
        element("div.status").click();
        expect(element('[ng-view] div.status').attr('class')).toMatch(/declined/);

        element("div.status").click();
        expect(element('[ng-view] div.status').attr('class')).toMatch(/pending/);

        element("div.status").click();
        expect(element('[ng-view] div.status').attr('class')).toMatch(/approved/);
      });
    });
  });
});
