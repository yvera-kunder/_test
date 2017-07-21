angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
    $scope.toIMG = function () {
        var node = document.getElementById('testIMG');

          html2canvas(node, {
          onrendered: function(canvas) {
            console.log(canvas);
            
            var a = document.createElement('a');
            // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
            a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
            a.download = 'somefilename4.jpg';
            a.click();
            // window.open(a.href+'/'+a.download,'_system');
            var targetPath = cordova.file.externalDataDirectory + a.download;
            var ft = new FileTransfer();
            ft.download(a.href,targetPath,
            function(entry) {
                console.log("download complete: " + entry.toURL());
            },
            function(error) {
                console.log("download error source " + error.source);
                console.log("download error target " + error.target);
                console.log("download error code" + error.code);
            },
            false,
            {
                headers: {
                    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                }
            })
            // $cordovaFileTransfer.download(a.href, targetPath, options, trustHosts)
            //   .then(function(result) {
            //     // Success!
            //   }, function(err) {
            //     // Error
            //   }, function (progress) {
            //     $timeout(function () {
            //       $scope.downloadProgress = (progress.loaded / progress.total) * 100;
            //     });
            //   });
          }
        });
  }
})


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
