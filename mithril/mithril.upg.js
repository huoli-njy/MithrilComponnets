;(function() {

  function loadScript(src, callback) {
    var script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  }

  // 路由加载启动器
  function moduleLoader(key, value) {
    var module = {
      controller: function() {
        // mithril的redraw机制
        m.startComputation();

        // 加载真实路由
        loadScript(baseDir + routesCache[key] + '.js', function() {
          // 保留真是路由，当第二次使用到该路由的时候，不会再次加载，而是直接使用保存好的路由
          realRoutes[key] = window[namespace][routesCache[key]];

          // mithril的redraw机制
          m.endComputation();
        });
      },
      view: function() {
        // 手动启动路由模块（该方法只会调用一次）
        var ctrl = realRoutes[key].controller();
        return realRoutes[key].view(ctrl);
      }
    };
    return module;
  }

  // 记录定义的路由
  var routesCache = null;
  // 真正的路由
  var realRoutes = window.__realRoutes = {};
  // 命名空间
  var namespace = null;
  // 源文件根目录
  var baseDir = null;


  // 入口
  m.route2 = function(dom, home, routes, config) {
    routesCache = routes;
    namespace = config.namespace;
    baseDir = config.baseDir;

    // 创建命名空间
    window[namespace] = {};

    // 加载默认路由
    loadScript(config.baseDir + routes[home] + '.js', function() {
      // 保留默认路由
      realRoutes[home] = window[namespace][routes[home]];

      // 为路由指定路由加载启动器
      for(var key in routes) {
        if(key === home) {
          continue;
        } else {
          realRoutes[key] = moduleLoader(key, routes[key]);
        }
      }

      // 启动mithril（在此时，只有默认路由是真实路由，剩余都是路由加载启动器，在真正使用到的时候才会加载。）
      m.route(dom, home, realRoutes);
    });
  };

})();