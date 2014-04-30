'use strict';

angular.module('givitApp')
  .service('Feedback', function () {
    this.feedbackEl = angular.element('.feedback');
    // this.feedbackEl.collapse();

    this.toggle = function () {
      return this;
    };

    this.setStyle = function (style) {
      style = 'alert-' + style;
      this.feedbackEl.removeClass('alert-primary alert-success alert-info alert-warning alert-danger').addClass(style);

      return this;
    };

    this.show = function (millisecondsToShowFor) {
      this.feedbackEl.addClass('fadeInUp').removeClass('fadeOutDown');

      if (millisecondsToShowFor) {
        setTimeout(this.hide.bind(this), millisecondsToShowFor); // <-- time in milliseconds
      }


      return this;
    };

    this.hide = function () {
      this.feedbackEl.addClass('fadeOutDown').removeClass('fadeInUp');

      return this;
    };

    this.setMessage = function (msg) {
      this.feedbackEl.html(msg);

      return this;
    };
  });