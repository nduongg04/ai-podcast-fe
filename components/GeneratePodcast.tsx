import { Label } from "./ui/label";
import { Dispatch, SetStateAction, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Flashlight, Loader } from "lucide-react";

interface GeneratePodcastProps {
    voiceType: string | null;
    setAudio: Dispatch<SetStateAction<string>>;
    audio: string;
    setAudioStorageId: Dispatch<SetStateAction<string | null>>;
    voicePrompt: string;
    setVoicePrompt: Dispatch<SetStateAction<string>>;
    setAudioDuration: Dispatch<SetStateAction<number>>;
}

const useGeneratePodcast = ({
    setAudio,
    voiceType,
    voicePrompt,
    setAudioStorageId,
}: GeneratePodcastProps) => {
    // Logic for podcast generation
    const [isGenerating, setIsGenerating] = useState(false);

	

    const generatePodcast = async () => {
        setIsGenerating(true);

        setAudio("");
    };

    if (!voicePrompt) {
        // todo: show error message
        return setIsGenerating(false);
    }

    try {
    } catch (error) {
        console.log("Error generating podcast", error);
        // TODO show error message
		
        setIsGenerating(false);
    }

    return { isGenerating, generatePodcast };
};

const GeneratePodcast = (props: GeneratePodcastProps) => {
    // const { isGenerating, generatePodcast } = useGeneratePodcast(props);
	const isGenerating = false;

    return (
        <div>
            <div className="flex flex-col gap-2.5">
                <Label className="text-16 font-bold text-white-1">
                    AI prompt to generate Podcast
                </Label>
                <Textarea
                    className="input-class font-light focus-visible:ring-orange-1 focus-visible:ring-offset-0"
                    placeholder="Provide text to generate audio"
                    rows={5}
                    value={props.voicePrompt}
                    onChange={(e) => props.setVoicePrompt(e.target.value)}
                />
            </div>
            <div className="mt-5 w-full max-w-[200px]">
                <Button
                    type="submit"
                    className="text-16 bg-orange-1 py-4 font-bold text-white-1"
                >
                    {isGenerating ? (
                        <>
                            Generating
                            <Loader size={20} className="ml-2 animate-spin" />
                        </>
                    ) : (
                        "Generate"
                    )}
                </Button>
            </div>
            {props.audio && (
                <audio
                    controls
                    src={props.audio}
                    autoPlay
                    className="mt-5"
                    onLoadedMetadata={(e) =>
                        props.setAudioDuration(e.currentTarget.duration)
                    }
                />
            )}
        </div>
    );
};
export default GeneratePodcast;
