var app = angular.module("app", []);

    app.service('alerts', function() {
        this.sort_success = function(sorted_by) {
        console.log('Successfully retrieved and sorted');
          $('.FetchCtrl').append('<div data-alert class="alert-box">'
                                                    + 'Successfully, sorted by'
                                                    + sorted_by
                                                    + '<a href="#" class="close">&times;</a>'
                                                    + '</div>') };
    }); 

        app.controller('FetchCtrl', function($scope, $http, alerts) {
      //initializers
      $scope.records = [];
      $scope.sort_by = 'lastname';

      $scope.getTable = function(sort_by) {
        $scope.sort_by = sort_by;

        $http.jsonp("http://localhost:5000/v1/records/" + sort_by + "?callback=JSON_CALLBACK")
                    .success(function(data){
                      console.log('success');
                        console.log(data);
                        $scope.records = data;
                    })
                    .error(function(data){
                        console.log('error');
                    });
        alerts.sort_success(sort_by);

            };


            $scope.sort_table = function (sort_by){
        $scope.getTable(sort_by);
            }

            $scope.headers = ["LastName", "FirstName", "Gender", "FavoriteColor", "DateOfBirth"];
      //$scope.getTable($scope.sort_by);            
        });