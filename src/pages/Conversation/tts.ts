import {
  AudioConfig,
  PullAudioOutputStream,
  ResultReason,
  SpeechConfig,
  SpeechSynthesisOutputFormat,
  SpeechSynthesizer,
} from 'microsoft-cognitiveservices-speech-sdk';
import { UnityContext } from 'react-unity-webgl';

// Init global config (Independent)
const [identityKey, region] = ['77d12aff83c544caa8a59063aa877f87', 'eastasia'];
const speechConfig = SpeechConfig.fromSubscription(identityKey, region);

export const TextToSpeech = (
  unityContext: UnityContext,
  content: string,
  speaker: string,
  speed: number,
  pitch: number
) => {
  // Customize speak fomat.
  speechConfig.speechSynthesisOutputFormat = SpeechSynthesisOutputFormat['Riff16Khz16BitMonoPcm'];
  // No voice output, leave this to unity.
  const pullStream = PullAudioOutputStream.createPullStream();
  const audioConfig = AudioConfig.fromStreamOutput(pullStream);

  // Create the speech synthesizer.
  const synthesizer: any = new SpeechSynthesizer(speechConfig, audioConfig);
  synthesizer.speakSsmlAsync(
    ssmGenerator(content, speaker, speed, pitch),
    async (result: any) => {
      console.log(result);
      if (result.reason === ResultReason.SynthesizingAudioCompleted) {
        const audioData = result.audioData; // ArrayBuffer format

        // Do the stream data sharding.
        const uint8Array = new Uint8Array(audioData);
        const chunkSize = 2048; // sharding size
        const numChunks = Math.ceil(uint8Array.length / chunkSize);

        for (let i = 0; i < numChunks; i++) {
          const start = i * chunkSize;
          const end = start + chunkSize;
          const chunkArray = uint8Array.slice(start, end);
          const chunkString = Array.from(chunkArray).join(',');
          // Deliver the sharded data to unity.
          unityContext.send('AudioPlayer', 'ReceiveChunk', chunkString);
          console.log('send')
        }
        // Mark as completed.
        setTimeout(() => {
          unityContext.send('AudioPlayer', 'ReceiveChunk', 'Complete');
        }, 1000);
        synthesizer.close();
      }
    },
    (error: any) => {
      console.error('Error:', error);
      synthesizer.close();
    },
  );
}

const ssmGenerator = (content: string, speaker:string, speed: number, pitch: number) => {
  return `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
      <voice name="${speaker}">
        <prosody rate="${speed > 0 ? '+' + speed: speed}%" pitch="${pitch > 0 ? '+' + pitch: pitch}%">${content}</prosody>
      </voice>
    </speak>`;
}

export const TestSpeech = (name:string, speaker:string, speed: number, pitch: number) => {

  const audioConfig = AudioConfig.fromDefaultSpeakerOutput();
  // Create the speech synthesizer.
  const synthesizer: any = new SpeechSynthesizer(speechConfig, audioConfig);
  
  synthesizer.speakSsmlAsync(
    ssmGenerator(`Hi, I am ${name}, nice to meet you in the Oasis.`, speaker, speed, pitch),
    // `Hi, I am ${name}, nice to meet you in the Oasis.`,
    () => {
      console.log('Test voice start.')
    }
  )
}
