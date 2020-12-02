
import React from "react";
import Loadable from 'react-loadable'

import { ConnectedRouter } from 'connected-react-router';
import {Route} from "react-router-dom";
import {history} from "../store/index"

function Loading(){
    return <div>loading...</div>
}

const Home=Loadable({
    loading:Loading,
    loader:()=>import("../pages/home/Home")
})

const About=Loadable({
    loading:Loading,
    loader:()=>import("../pages/about/About")
})

export default (
    <ConnectedRouter history={history}>
        <Route component={Home} path="/" exact strict={false} />
        <Route component={About}  path="/about" />
    </ConnectedRouter>
)