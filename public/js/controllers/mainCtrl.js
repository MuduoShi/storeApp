/**
 * Created by muduoshi on 5/10/16.
 */
angular.module('storeApp')
    .controller('mainCtrl',['$scope','$http',function($scope,$http){
        $scope.items=[];

        function getItems () {
            $http.get('http://localhost:3000/products')
                .success(function(data){
                    console.info(data);
                    $scope.items=data;
                })
                .error(function(err){
                    console.error(err);
                });

        }


        $scope.addItem=function(){
            var validPrice=isNaN($scope.newItem.price);
            if(validPrice){
                alert("please type valid price")
            }
            else if($scope.newItem.name && $scope.newItem.description && $scope.newItem.price){
                $http.post('http://localhost:3000/products/',$scope.newItem)
                    .success(function(){
                        console.log('succeed!');
                        $scope.newItem="";
                        getItems();
                    });
            }
            else{
                alert("Please type content!")
            }



        };
        $scope.deleteItem=function(index){
            console.log(index);
            $http.delete('http://localhost:3000/products/'+$scope.items[index].id)
                .success(function(){
                    getItems();
                    console.log("deleted!");
                });
        };

        //activate();
        getItems();

    }]);
