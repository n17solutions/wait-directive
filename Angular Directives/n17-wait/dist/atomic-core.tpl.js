(function(module) {
try {
  module = angular.module('n17-wait');
} catch (e) {
  module = angular.module('n17-wait', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/atomic-core.tpl.html',
    '<div class="n17-wait-atomic-core">\n' +
    '	<div class="inner one"></div>\n' +
    '	<div class="inner two"></div>\n' +
    '	<div class="inner three"></div>\n' +
    '</div>');
}]);
})();
