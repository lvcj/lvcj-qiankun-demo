import React, { useEffect, useState } from "react"
import configureStore from "./store/index"
import routers from "./router/router"
import { Provider } from "react-redux";

import "./index.scss";

const store = configureStore()
export default function Entry(){
    return <Provider store={store}>
        {routers}
    </Provider>
}

