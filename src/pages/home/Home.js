import React from "react";

export default function Home(props){
    const onclick = ()=>{
        props.history.push(`/about-react`)
    }
    return <div onClick={onclick}>hello home qiankun</div>
}