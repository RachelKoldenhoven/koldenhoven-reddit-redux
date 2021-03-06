/**
 * Created by rachelkoldenhoven on 4/17/16.
 */
app.service('postDataService', ['$rootScope', 'crudService', function($rootScope, crudService) {

  return {
    getAllPosts: function() {
      return crudService.getAll('posts')
        .then(function(posts) {
          return posts;
        });
    },
    addPost: function(payload) {
      crudService.addOne('posts', payload)
        .then(function(post) {
          return post;
        });
    },
    editPost: function(post) {
      crudService.editOne('students', post)
        .then(function(post) {
          return post;
        });
    },
    removePost: function(postID) {
      crudService.removeOne('posts', postID)
        .then(function(post) {
          return post;
        });
    }
  };

}]);


app.service('crudService', ['$http', function($http) {

  return {
    getAll: function(resource) {
      return $http.get('/'+resource)
        .then(function(res){
          console.log(res);
          return res;
        })
        .catch(function(err){
          return err;
        });
    },
    addOne: function(resource, payload) {
      return $http.post('/'+resource, payload)
        .then(function(res){
          return res;
        })
        .catch(function(err){
          return err;
        });
    },
    editOne: function(resource, payload) {
      return $http.put('/'+resource+'/'+payload._id, payload)
        .then(function(res){
          return res;
        })
        .catch(function(err){
          return err;
        });
    },
    removeOne: function(resource, uuid) {
      return $http.delete('/'+resource+'/'+uuid)
        .then(function(res){
          return res;
        })
        .catch(function(err){
          return err;
        });
    }
  };

}]);

/**
 1. login
 2. logout
 3. register
 4. set user info into localstorage
 5. get user info from localstorage
 **/
app.service('authService', ['$http', '$window', function($http, $window) {
  var user = {};
  return {
    login: function(user) {
      return $http.post('/auth/login', user);
    },
    logout: function(user) {
      user = null;
      $window.localStorage.clear();
    },
    register: function(user) {
      return $http.post('/auth/register', user);
    },
    setUserInfo: function(userData) {
      $window.localStorage.setItem('user', JSON.stringify(userData.data.data.user));
      $window.localStorage.setItem('token', JSON.stringify(userData.data.data.token));
    },
    getUserInfo: function(userData) {
      return $window.localStorage.getItem('user');
    },
  };
}]);

app.service('authInterceptor', ['$window', function($window) {
  return {
    request: function(config) {
      // check for token in headers
      // config.headers['X-requested-with'] = XMLHttpRequest;
      var token = $window.localStorage.getItem('token');
      if(token) {
        config.headers.Authorization = "Bearer " + token;
        // return $q.resolve(config);
      }
      return config;
    }
  };
}]);