(function() {
  'use strict';

  angular.module('oms.orders')
    .controller('AddOrderController', addOrderCtrl);

  addOrderCtrl.$inject = ['$scope', '$uibModal', '$uibModalInstance', 'OrdersService', 'CustomersService'];

  function addOrderCtrl($scope, $uibModal, $uibModalInstance, OrdersService, CustomersService) {
    $scope.customers = CustomersService.customers;
    $scope.statuses = OrdersService.statuses;
    $scope.error = false;

    $scope.order = {
      customer: {},
      orderDate: new Date(),
      dueDate: new Date(),
      status: $scope.statuses[0].value,
      items: [],
      total: 0
    }

    $scope.selected = {
      customer: null
    }
    $scope.newListItem = {};

    $scope.save = function() {
      $scope.order.customer.id = $scope.selected.customer.id;
      $scope.order.customer.name = $scope.selected.customer.name;

      OrdersService.add($scope.order)
        .then(function success(order) {
          $uibModalInstance.close(order);
        }, function error(err) {
          $scope.error = true;
          throw err;
        });
    }

    $scope.addCustomer = function() {
      $uibModal.open({
				templateUrl: 'customers/templates/addnew-modal.template.html',
				size: 'lg',
				controller: 'AddCustomerController',
			});
    }

    //TODO clean up
    $scope.addItem = function(newListItem) {
      $scope.order.items.push(newListItem);
      $scope.order.total += newListItem.quantity * newListItem.unitPrice;
      $scope.newListItem = {};
    }

    $scope.clearItem = function() {
      $scope.newListItem = {};
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss();
    }
  }
})();