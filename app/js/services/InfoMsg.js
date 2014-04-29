'use strict';

angular.module('givitApp')
  .service('InfoMsg', function () {
    this.infoMsgEl = angular.element('.info-msg');
    this.infoMsgEl.collapse();
    
    this.toggle = function () {
      this.infoMsgEl.collapse('toggle');

      return this;
    };

    this.show = function () {
      this.infoMsgEl.collapse('show');

      return this;
    };

    this.hide = function () {
      this.infoMsgEl.collapse('hide');

      return this;
    };

    this.setMessage = function (msg) {
      this.infoMsgEl.html(msg);

      return this;
    };
  });