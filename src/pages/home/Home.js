import React from "react";
import "./index.scss"

export default function Home(props){
    const onclick = ()=>{
        props.history.push(`/mshop-about-react`)
    }
    return <div onClick={onclick} styleName="home-wrap">hello home qiankun</div>
}