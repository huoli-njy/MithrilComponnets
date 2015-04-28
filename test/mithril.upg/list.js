window.app = {};
app.list = (function() {

  var list = {};


  list.vm = function() {
    var vm = {};
    vm.init = function() {
      vm.newsList = [{title: 'title1', detail: 'detail1'}, {title: 'title2', detail: 'detail2'}];
      return vm;
    };
    return vm;
  };
  list.controller = function() {
    return list.vm().init();
  };
  list.view = function(ctrl) {
    return m('ul', ctrl.newsList.map(function(news, index) {
      return m('li', [
        m('a', {config: m.route, href: 'detail/' + index}, [
          m('span', news.title),
          m('span', news.detail)
        ])
      ]);
    }));
  };


  return list;

})();