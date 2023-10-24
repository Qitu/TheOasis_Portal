import { Button } from 'antd';
import { useEffect, useState } from 'react';
// Unity3D Core
import Unity, { UnityContext } from 'react-unity-webgl';
// Voice Core
import { SpeechToText } from './stt';
import { TextToSpeech } from './tts';
import VoiceRecorder from './VoiceRecorder';
import { quryMetahuman } from '../MetahumanDetail/api'
import { useParams, useNavigate } from 'react-router-dom'

// Base config of Unity project
const unityContext = new UnityContext({
  loaderUrl: '/Build/TheOasis.loader.js',
  dataUrl: '/Build/TheOasis.data',
  frameworkUrl: '/Build/TheOasis.framework.js',
  codeUrl: '/Build/TheOasis.wasm',
});

function Conversation() {
  const [openRecord, setOpenRecordg] = useState(false);
  const [recording, setRecording] = useState(false);
  const [resultText, setResultText] = useState('');
  const [metahuman, setMetahuman] = useState<any>({});

  const param = useParams<any>();
  const navigate = useNavigate();

  useEffect(() => {
    getMetahumanDetail(param.id || "");
  }, [name]);

	

  const getMetahumanDetail = async (id: string) => {
    const data:any = await quryMetahuman(parseInt(id));
    if (data.code === 200) {
      setMetahuman({
        ...data.object
      })
    } else {
      console.log(data.message);
      navigate('/404')
    }
  };

  const recordEnable = () => {
    SpeechToText(setRecording, setResultText);
  };
  const processRecordText = () => {
    if(resultText != '') {
      // Receive voice text and speak
      unityContext.send('EventSystem', 'voiceChat', resultText);
      setOpenRecordg(false);
      setResultText('')
    }
  }

  // Listen events from Unity.
  useEffect(function () {
    unityContext.on('InitFinished', function () {
      unityContext.send('EventSystem', 'loadPlayer', param.id);
    });
    unityContext.on('SetUpFinished', function () {
      console.log('Loaded.');
    });
    unityContext.on('RecordVoice', function () {
      console.log('Start record');
      setOpenRecordg(true);
      recordEnable();
    });
    unityContext.on('SpeakVoice', function (content: string) {
      console.log('Start speak' + content);
      TextToSpeech(unityContext, content, metahuman.speaker); // metahuman.speed, metahuman.pitch
    });
  }, []);

  return (
    metahuman && metahuman.name ? 
      <div>
        {/* WebGL by Unity */}
        <Unity
          style={{ width: '100%', height: '100vh' }}
          unityContext={unityContext}
        />
        {/* Voice record component */}
        <VoiceRecorder
          recording={recording}
          resultText={resultText}
          openRecord={openRecord}
          recordEnable={recordEnable}
          setOpenRecordg={setOpenRecordg}
          processRecordText={processRecordText}
        />
      </div>
    : ''
  );
}

export default Conversation;
