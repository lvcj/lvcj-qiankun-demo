import React from "react";
import ReactDOM from "react-dom"
import {history} from "~/store/index"
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState} from "qiankun"
import Entry from "./entry"
ReactDOM.render(<Entry />, document.getElementById("root-main"))

function Render(props) {
    const { appContent, loading } = props;
    return <div dangerouslySetInnerHTML={{ __html: appContent }} />;
}
  
function render({ appContent, loading }) {
    const container = document.getElementById('subapp-viewport');
    ReactDOM.render(<Render appContent={appContent} loading={loading} />, container);
}


function genActiveRule(routerPrefix) {
  return (location) => {
    // '/foo'
    if (typeof routerPrefix === 'string') {
      if (routerPrefix[0] === '#') {
        return location.hash.startsWith(routerPrefix);
      }
      return location.pathname.startsWith(routerPrefix);
    }

    // /^\/(foo|bar|baz)/
    if (routerPrefix instanceof RegExp) {
      return routerPrefix.test(location.pathname);
    }
    // ['/foo', '/bar']
    if (Array.isArray(routerPrefix)) {
      return routerPrefix.some((prefix) => {
        if (prefix[0] === '#') {
          return location.pathname === '/' && location.hash.startsWith(prefix);
        }
        return location.pathname.startsWith(prefix);
      });
    }
  };
}

registerMicroApps(
    [
      {
        name: 'react16',
        entry: 'http://localhost:8088/',
        container: '#subapp-viewport',
        //render,
        activeRule: genActiveRule(['/mshop-about-react','/mshop-about-react1']),
        props: {
          name: 'kuitos',
          history: history,
        }
      }
    ],
    {
      beforeLoad: async (app) => console.log('[LifeCycle] before load %c%s', 'color: green;', app.name),
      beforeMount: async (app) => console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name),
      beforeUnmount: async (app) => console.log('[LifeCycle] before unmount %c%s', 'color: green;', app.name),
      afterMount: async (app) => console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name),
      afterUnmount: async (app) => console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name),
    },
  );

  const { onGlobalStateChange, setGlobalState } = initGlobalState({
    user: 'masters',
  });
  
  onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));
  
  setGlobalState({
    ignore: 'master',
    user: {
      name: 'master',
    },
  });
  
  /**
   * Step3 设置默认进入的子应用
   */
  //setDefaultMountApp('/react16');
  
  /**
   * Step4 启动应用
   */
  start({
    prefetch: [],
    sandbox: {strictStyleIsolation:true},
    singular: true,
    // getTemplate:function(template){
    //   console.log("template===>>>>", template)
    // }
  });
  
  runAfterFirstMounted(() => {
    console.log('[MainApp] first app mounted');
  });
