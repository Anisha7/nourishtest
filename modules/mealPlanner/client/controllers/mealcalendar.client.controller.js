(function () {
  'use strict';

  angular
    .module('mealPlanner')
    .factory('alert',Factory)
    .controller('MealCalendarController', MealCalendarController);

  var modularDependencies = ['$scope', 'Authentication', 'moment', 'calendarConfig', 'alert', '$http'];
  MealCalendarController.$inject = modularDependencies;

  function Factory($uibModal){
       function show(action, event) {
         return $uibModal.open({
           templateUrl: 'modalContent.html',
           controller: function() {
             var vm = this;
             vm.action = action;
             vm.event = event;
           },
           controllerAs: 'vm'
         });
       }

       return {
         show: show
       };
     };

  function MealCalendarController($scope, Authentication, moment, calendarConfig, alert, $http) {
    var vm = this;
    vm.authentication = Authentication;
    // These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    var actions = [{
      label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
      onClick: function(args) {
        alert.show('Edited', args.calendarEvent);
      }
    }, {
      label: '<i class=\'glyphicon glyphicon-remove\'></i>',
      onClick: function(args) {
        alert.show('Deleted', args.calendarEvent);
      }
    }];
    initController();
    function initController(){
      $http.get('/api/mealPlanner').success(function(data){
        console.log(data);
        for (var x= 0;x<data.length;x++){
          console.log(data[x].user)
          vm.events.push(data[x]);
        }
      })
      .error(function(err){
        console.log(err);
      })

    }
    vm.events = [
      // {
      //   title: 'An event',
      //   color: calendarConfig.colorTypes.warning,
      //   startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
      //   endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
      //   draggable: true,
      //   resizable: true,
      //   actions: actions
      // }, {
      //   title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
      //   color: calendarConfig.colorTypes.info,
      //   startsAt: moment().subtract(1, 'day').toDate(),
      //   endsAt: moment().add(5, 'days').toDate(),
      //   draggable: true,
      //   resizable: true,
      //   actions: actions
      // }, {
      //   title: 'This is a really long event title that occurs on every year',
      //   color: calendarConfig.colorTypes.important,
      //   startsAt: moment().startOf('day').add(7, 'hours').toDate(),
      //   endsAt: moment().startOf('day').add(19, 'hours').toDate(),
      //   recursOn: 'year',
      //   draggable: true,
      //   resizable: true,
      //   actions: actions
      // }
    ];

    vm.cellIsOpen = true;

    vm.addEvent = function() {

      vm.events.push({
        title: 'New event',
        startsAt: moment().startOf('day').toDate(),
        endsAt: moment().endOf('day').toDate(),
        color: calendarConfig.colorTypes.important,
        draggable: true,
        resizable: true
      });
      console.log(vm.events);
    };

    $scope.saveEvent = function(event){
      console.log(event.dateStartsAt);
    }
    vm.eventClicked = function(event) {
      console.log();
      alert.show('Clicked', event);
    };

    vm.eventEdited = function(event) {
      alert.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
      alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      alert.show('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    vm.timespanClicked = function(date, cell) {

      if (vm.calendarView === 'month') {
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      }

    };
    $scope.completedMeal = function(index){
      
    }

  }
}());
