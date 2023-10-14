import React, { useEffect, useState } from "react";
import { Button } from 'antd';
// Unity3D Core
import Unity, { UnityContext } from "react-unity-webgl";
// Voice Core
import { SpeechToText } from "./stt";
import { TextToSpeech } from "./tts";
import VoiceRecorder from "./VoiceRecorder";

// Base config of Unity project
const unityContext = new UnityContext({
    loaderUrl: "/Build/TheOasis.loader.js",
    dataUrl: "/Build/TheOasis.data",
    frameworkUrl: "/Build/TheOasis.framework.js",
    codeUrl: "/Build/TheOasis.wasm",
});

function Conversation() {
    const [openRecord, setOpenRecordg] = useState(false);
    const [recording, setRecording] = useState(false);
    const [resultText, setResultText] = useState('');
    
    // Listen events from Unity.
    useEffect(function () {
        unityContext.on("SetUpFinished", function () {
            console.log("Loaded.")
        })
        unityContext.on("RecordVoice", function () {
            console.log("Start record")
            setOpenRecordg(true)
            recordEnable()
        })
        unityContext.on("SpeakVoice", function (content: string) {
            console.log("Start speak")
            TextToSpeech(unityContext, content)
        })
    }, [])

    const recordEnable = () => {
        SpeechToText(setRecording, setResultText)
    }

    return <div>
        {/* WebGL by Unity */}
        <Unity style={{'marginTop': '30px', 'width': '100%', 'height': '650px'}} unityContext={unityContext} />
        {/* Voice record component */}
        <VoiceRecorder 
            recording={recording} 
            resultText={resultText} 
            openRecord={openRecord} 
            recordEnable={recordEnable}
            setOpenRecordg={setOpenRecordg}
        />
        <Button type="primary" onClick={() => {
            TextToSpeech(unityContext)
        }}>Test Speak</Button>
        </div>;
}


export default Conversation;