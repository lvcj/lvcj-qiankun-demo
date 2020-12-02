import React from "react";
import ReactDOM from "react-dom"

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

registerMicroApps(
    [
      {
        name: 'react16',
        entry: '//localhost:8088/',
        container: '#subapp-viewport',
        render,
        activeRule: '/about-react',
      }
    ],
    {
      beforeLoad: [
        app => {
          console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
        },
      ],
      beforeMount: [
        app => {
          console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
        },
      ],
      afterUnmount: [
        app => {
          console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
        },
      ],
    },
  );

  const { onGlobalStateChange, setGlobalState } = initGlobalState({
    user: 'qiankun',
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
    sandbox: true,
    singular: true,
  });
  
  runAfterFirstMounted(() => {
    console.log('[MainApp] first app mounted');
  });
