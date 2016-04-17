//app.controller('allStudentController', ['$scope', 'studentDataService',
//  function($scope, studentDataService) {
//
//    studentDataService.getAllPosts()
//      .then(function(posts) {
//        $scope.allPosts = posts.data.data;
//      });
//
//  }]);


app.controller("RedditController", ['$scope', 'postDataService', function($scope, postDataService) {
  $scope.view = {};
  $scope.view.greeting = "Redditcontroller is working";
  postDataService.getAllPosts()
    .then(function(posts) {
      console.log(posts);
      $scope.view.allPosts = posts.data.data;
    });
  $scope.viewNewPostForm = false;
  $scope.newVolcano = {};
  $scope.newUserComment = {};
  $scope.upVote = function(post) {
    post.votes +=1;
  };

  $scope.downVote = function(post) {
    post.votes -=1;
  };

  $scope.voteClass = function(post) {
    if(post.votes === 0) {
      return "black";
    }
    if(post.votes > 0) {
      return "green";
    }
    else {
      return "red";
    }
  };

  $scope.viewPostForm = function(){
    $scope.viewNewPostForm = !$scope.viewNewPostForm;
  };

  $scope.newPost = function(post) {
    post.date =  new Date();
    post.votes = 0;
    post.comments = [
      {}
    ];
    $scope.view.posts.push(post);
    $scope.viewPostForm();
    $scope.newVolcano = {};
    $scope.newPostForm.$setUntouched();
  };

  $scope.toggleComments = function(post){
    post.showComments = !post.showComments;
  };

  $scope.viewCommentForm = function(post) {
    post.viewNewCommentForm = !post.viewNewCommentForm;
  };

  $scope.newComment = function(comment, post) {
    post.comments.push(comment);
    $scope.viewCommentForm(post);
    $scope.newUserComment = {};
    $scope.newCommentForm.$setUntouched();
  };

}]);

app.controller('removeStudentController', ['$scope', '$window', 'studentDataService',
  function($scope, $window, studentDataService) {

    $scope.removeStudent = function(student) {
      studentDataService.removeStudent(student._id);
      $window.location.reload(); // refactor!
    };

  }]);

app.controller('editStudentController', ['$scope', '$window', 'studentDataService',
  function($scope, $window, studentDataService) {

    $scope.show = false;

    $scope.makeEditable = function () {
      this.show = true;
    };

    $scope.editStudent = function(student) {
      studentDataService.editStudent(student);
      this.show = false;
      $window.location.reload(); // refactor!
    };

  }]);

app.controller('registerController', ['$scope', '$location', 'authService',
  function($scope, $location, authService) {
    $scope.user = {};
    $scope.register = function() {
      authService.register($scope.user)
        .then(function(user) {
          authService.setUserInfo(user);
          $location.path('/');
        })
        .catch(function(err) {
          // check status code, send appropriate message
          console.log(err);
        });
    };
  }]);

app.controller('loginController', ['$rootScope', '$scope', '$location', 'authService',
  function($rootScope, $scope, $location, authService) {
    $scope.user = {};
    $scope.login = function() {
      authService.login($scope.user)
        .then(function(user) {
          authService.setUserInfo(user);
          $location.path('/');
          $rootScope.currentUser = authService.getUserInfo();
        })
        .catch(function(err) {
          // check status code, send appropriate message
          console.log(err);
        });
    };
  }]);

app.controller('navController', ['$rootScope', '$scope', 'authService',
  function($rootScope, $scope, authService){
    $rootScope.currentUser = authService.getUserInfo();
  }]);


