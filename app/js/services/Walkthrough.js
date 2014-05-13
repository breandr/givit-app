'use strict';

angular.module('givitApp')
  .service('Walkthrough', function ($rootScope, $localStorage) {

    this.$storage = $localStorage;
    this.$storage.$default({
      showWalkthrough: true
    });

    this.tour = new Tour({
      name: 'navigation-walkthrough',
      storage: false,
      // backdrop: true,
      onEnd: function () {
        console.log(this);
        // $rootScope.$broadcast('navDrawer.hide');
        this.$storage.showWalkthrough = false;
      }.bind(this),
      template: [
        '<div class="popover tour">',
        ' <div class="arrow"></div>',
        ' <div class="popover-title clearfix"></div>',
        ' <div class="popover-content"></div>',
        '</div>'
      ].join('\n'),
      steps: [{
        backdrop: true,
        element: '.navbar .navbar-toggle',
        title: '<h4 class="pull-left">Welcome to GIVIT!</h4> <button class="btn btn-default pull-right" data-role="next">»</button>',
        content: 'Let\'s take a quick look at the app\'s navigation, accessible here.',
        placement: 'right',
        reflex: true,
        onNext: function () {
          $rootScope.$broadcast('navDrawer.show');
        }
      }, {
        element: '#navigation-drawer .nav-givit-list',
        title: '<h4 class="pull-left">Givit List</h4> <button class="btn btn-default pull-right" data-role="next">»</button>',
        content: 'See what items charities have requested for people in need.',
        placement: 'bottom',
        reflex: true
      }, {
        element: '#navigation-drawer .nav-donate-item',
        title: '<h4 class="pull-left">Donate Item</h4> <button class="btn btn-default pull-right" data-role="next">»</button>',
        content: 'Tell us of items you have that could help someone through rough times.',
        placement: 'bottom',
        reflex: true
      }, {
        element: '#navigation-drawer .nav-user-details',
        title: '<h4 class="pull-left">My Details</h4> <button class="btn btn-default pull-right" data-role="next">»</button>',
        content: 'Before you can <strong>Donate Item</strong>s or <strong>Give</strong> on the <strong>Givit List</strong>, please enter your details so we can contact you regarding the pickup of items.',
        placement: 'top',
        reflex: true,
        onNext: function () {
          $rootScope.$broadcast('navDrawer.hide');
        }
      }, {
        element: 'body',
        title: '<h4 class="pull-left">Thanks!</h4> <button class="btn btn-default pull-right" data-role="end">»</button>',
        content: 'Thank you for choosing to GIVIT!',
        placement: 'top',
        reflex: true
      }, {}]
    });

    this.start = function () {
      this.tour.init();
      this.tour.start();
    };
  });