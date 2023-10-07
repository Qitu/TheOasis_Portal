import React, { useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
    loaderUrl: "/Build/TheOasis.loader.js", // public下目录
    dataUrl: "/Build/TheOasis.data",
    frameworkUrl: "/Build/TheOasis.framework.js",
    codeUrl: "/Build/TheOasis.wasm",
});

// 调用 Unity 的方法
function testFunc() {
unityContext.send("ConnectObject", "SpawnEnemies", "Some Message");
}

function App() {
    // 监听 Unity 事件
    useEffect(function () {
        unityContext.on("SetUpFinished", function () {
            console.log("Loaded.")
        });
    }, []);
    return <Unity style={{'width': '100%', 'height': '100%'}} unityContext={unityContext} />;
}

export default App;