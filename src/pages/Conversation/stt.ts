import {
  AudioConfig,
  CancellationDetails,
  CancellationReason,
  ResultReason,
  SpeechConfig,
  SpeechRecognizer,
} from 'microsoft-cognitiveservices-speech-sdk';

// Init global config (Independent)
const [identityKey, region] = ['77d12aff83c544caa8a59063aa877f87', 'eastasia'];
const speechConfig = SpeechConfig.fromSubscription(identityKey, region);

// Customize detection settings
speechConfig.speechRecognitionLanguage = 'en-US';
try{
  navigator.mediaDevices.getUserMedia({ audio: true }) // Disabled for lower performance cost
} catch(e) {

}
let audioConfig = AudioConfig.fromDefaultMicrophoneInput();

export function SpeechToText(setRecording: any, setResultText: any) {
  setRecording(true);
  setResultText('');
  const speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);
  speechRecognizer.recognizeOnceAsync((result) => {
    let cancellation: any = {};
    switch (result.reason) {
      case ResultReason.RecognizedSpeech:
        console.log(`RECOGNIZED: Text=${result.text}`);
        setResultText(result.text);
        break;
      case ResultReason.NoMatch:
        setResultText('');
        console.log('NOMATCH: Speech could not be recognized.');
        break;
      case ResultReason.Canceled:
        cancellation = CancellationDetails.fromResult(result);
        console.log(`CANCELED: Reason=${cancellation.reason}`);
        setResultText('');
        if (cancellation.reason === CancellationReason.Error) {
          console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
          console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
        }
        break;
      default:
        setResultText('');
    }
    setRecording(false);
    speechRecognizer.close();
  });
}
