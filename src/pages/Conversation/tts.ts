import { UnityContext } from "react-unity-webgl";
import { 
    SpeechConfig, 
    AudioConfig, 
    ResultReason,
    SpeechSynthesizer,
    PullAudioOutputStream,
    SpeechSynthesisOutputFormat
} from 'microsoft-cognitiveservices-speech-sdk';


// Init global config (Independent)
const [identityKey, region] = ['77d12aff83c544caa8a59063aa877f87', 'eastasia']
const speechConfig = SpeechConfig.fromSubscription(identityKey, region)

export function TextToSpeech(unityContext: UnityContext, content = "Hello world, I am trying to test new features.") {
    // Customize speak fomat.
    speechConfig.speechSynthesisOutputFormat = SpeechSynthesisOutputFormat["Riff16Khz16BitMonoPcm"];
    // No voice output, leave this to unity.
    const pullStream = PullAudioOutputStream.createPullStream();
    const audioConfig = AudioConfig.fromStreamOutput(pullStream);

    // TODO: Get data config.
    speechConfig.speechSynthesisVoiceName = "en-GB-RyanNeural"; 


    // Create the speech synthesizer.
    var synthesizer: any = new SpeechSynthesizer(speechConfig, audioConfig);
    synthesizer.speakTextAsync(
        content,
        async (result: any) => {
            if (result.reason === ResultReason.SynthesizingAudioCompleted) {
                const audioData = result.audioData;  // ArrayBuffer format

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
                    unityContext.send("AudioControl", "ReceiveChunk", chunkString);
                }
                // Mark as completed.
                setTimeout(() => {
                    unityContext.send("AudioControl", "ReceiveChunk", "Complete");
                }, 100);
                synthesizer.close();
            }
        },
        (error: any) => {
            console.error("Error:", error);
            synthesizer.close();
        }
    );
};
