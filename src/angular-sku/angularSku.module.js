(function () {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('angularSku.config', [])
      .value('angularSku.config', {
          debug: true
      });

  // Modules
  angular.module('angularSku',
      [
          'angularSku.config'
      ]);

})();
