'use strict';

angular.module('givitApp')
  .service('Feedback', function ($timeout) {
    this.feedbackEl = angular.element('.feedback');

    this.toggle = function () {
      return this.shown() ? this.hide() : this.show();
    };

    this.hidden = function () {
      return this.feedbackEl.hasClass('fadeOutDown');
    };

    this.shown = function () {
      return this.feedbackEl.hasClass('fadeInUp');
    };

    this.setStyle = function (style) {
      style = 'alert-' + style;
      this.feedbackEl
        .removeClass('alert-primary alert-success alert-info alert-warning alert-danger')
        .addClass(style);

      return this;
    };

    this.show = function (millisecondsToShowFor) {
      if (this.shown()) {
        return this;
      }

      this.feedbackEl
        .addClass('fadeInUp')
        .removeClass('fadeOutDown')
        .show();

      if (millisecondsToShowFor) {
        $timeout(this.hide, millisecondsToShowFor);
      }

      return this;
    };

    this.hide = function () {
      if (this.hidden()) {
        return this;
      }

      this.feedbackEl
        .addClass('fadeOutDown')
        .removeClass('fadeInUp')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
          angular.element(this).hide();
        });

      return this;
    }.bind(this);
    
    this.setMessage = function (msg) {
      this.feedbackEl.html(msg);

      return this;
    };
  });