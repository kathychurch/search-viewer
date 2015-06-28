(function(){
  'use strict';
  
  
  angular.module('searchapp-main.services',[])
    .service('wikipediaService', function($http, $q){
      return({
        search: search,
      });
      
      function search(searchTerm) {
        var request = $http({
          method: "get",
          url: "http://en.wikipedia.org/w/api.php",
          params: {"action": "query",
                   "prop": "extracts",
                   "exintro": "",
                   "explaintext": "",
                   "format": "json",
                   "titles": searchTerm,
                  }
        });
        
        return(request.then(handleSuccess, handleError));
      }
      
      function handleError(response){
        if(!angular.isObject(response.data) ||
           !response.data.message){
          return($q.reject("An error occurred searching wikipedia"));
        }
        
        return($q.reject(response.data.message));
      }
      
      function handleSuccess(response){
        return(response.data);
      }
    });
})();
                         
