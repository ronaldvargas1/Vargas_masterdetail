// Code goes here
angular.module('MasterDetailDemo', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/blog/list');
  var states = [
    {
      abstract: true,
      name: 'wrapper',
      url: '/blog',
      template: "<h1>NVidia RTX 30 Series</h1><ui-view></ui-view>",
      controller: 'wrapperController'
    },{
      name: 'wrapper.master',
      url: '/list',
      template: "<ol><li ng-repeat='post in data'><h2><a ui-sref='wrapper.detail({id: {{post.id}}})'>{{post.title}}</a></h2></li></ol>"
    },{
      name: 'wrapper.detail',
      url: '/{:id}',
      template: "<a ui-sref='wrapper.master'><- Back to list</a><br><h2>{{post.title}}</h2><p>{{post.body}}</p>",
      controller: 'detailController'
    }
  ];
  states.forEach((state) => $stateProvider.state(state));

}]).controller('wrapperController', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.data;
  //Mimic asyncronous GET request
  $timeout(() => {
    $scope.data = [
      {
        id: 0,
        title: 'GeForce RTX 3090 Ti',
        body: 'This graphics card has the highest specs of all the 30 series cards. There are 10752 NVIDIA CUDA Cores, A memory size of 24 GB, and GDDR6X Memory type'
      },{
        id: 1,
        title: 'GeForce RTX 3080',
        body: 'A step below the 3090, This graphics card still contains a lot of power. There are 8960/8704 NVIDIA CUDA Cores, A memory size of 12/10 GB, and GDDR6X Memory type'
      },{
        id: 2,
        title: 'GeForce RTX 3070',
        body: 'This graphics card is another great option within the 30 series. There are 5888 NVIDIA CUDA Cores, A memory size of 8 GB, and GDDR6 Memory type'
      }
    ];
  }, 3000);
  
}]).controller('detailController', ["$scope", "$stateParams", function($scope, $stateParams) {
  var post_id = $stateParams.id;

  if ($scope.data) {
    $scope.post = $scope.data[post_id];
  }
}]);