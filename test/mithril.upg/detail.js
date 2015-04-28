app.detail = (function() {

  var detail = {};

  detail.controller = function() {};

  detail.view = function(ctrl) {
    return m('div', m.route.param('newsId'));
  };


  return detail;


})();