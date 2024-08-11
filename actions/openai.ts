import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function generateAudioPodcast(input: string, voice: string) {
    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: voice as SpeechCreateParams["voice"],
        input: input,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    return buffer;
}
