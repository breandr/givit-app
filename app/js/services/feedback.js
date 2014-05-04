'use strict';

angular.module('givitApp')
  .service('Feedback', function ($timeout) {
    this.feedbackEl = angular.element('.feedback');
    // this.feedbackEl.collapse();

    this.toggle = function () {
      return this;
    };

    this.setStyle = function (style) {
      style = 'alert-' + style;
      this.feedbackEl
        .removeClass('alert-primary alert-success alert-info alert-warning alert-danger')
        .addClass(style);

      return this;
    };

    this.show = function (millisecondsToShowFor) {
      this.feedbackEl
        .show()
        .addClass('fadeInUp')
        .removeClass('fadeOutDown');

      if (millisecondsToShowFor) {
        $timeout(this.hide.bind(this), millisecondsToShowFor);
      }


      return this;
    };

    this.show1 = function (millisecondsToShowFor) {
      this.feedbackEl
        .show()
        .addClass('fadeInUp')
        .removeClass('fadeOutDown');

      if (millisecondsToShowFor) {
        var callback = this.hide;
        $timeout(callback, millisecondsToShowFor);
      }


      return this;
    };

    this.show2 = function (millisecondsToShowFor) {
      this.feedbackEl
        .show()
        .addClass('fadeInUp')
        .removeClass('fadeOutDown');

      if (millisecondsToShowFor) {
        var callback = this.hide;
        $timeout(function () {
          callback();
        }, millisecondsToShowFor);
      }


      return this;
    };
    window.show = function (ms) {
      this.show(ms);
    }.bind(this);
    
    window.show1 = function (ms) {
      this.show1(ms);
    }.bind(this);
    
    window.show2 = function (ms) {
      this.show2(ms);
    }.bind(this);

    this.hide = function () {
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