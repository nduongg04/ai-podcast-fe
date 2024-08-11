"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const formSchema = z.object({
    podcastTitle: z.string().min(1, "Podcast title is required"),
    podcastDescription: z.string().min(1, "Podcast description is required"),
});

export function CreatePodcast() {
    const [imagePrompt, setImagePrompt] = useState("");
    const [imageStorageId, setImageStorageId] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState("");

    const [audioUrl, setAudioUrl] = useState("");
    const [audioStorageId, setAudioStorageId] = useState<string | null>(null);
    const [audioDuration, setAudioDuration] = useState(0);

    const [voiceType, setVoiceType] = useState<string | null>(null);
    const [voicePrompt, setVoicePrompt] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            podcastTitle: "",
            podcastDescription: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    const voiceCategories = [
        "alloy",
        "shimmer",
        "nova",
        "echo",
        "fable",
        "onyx",
    ];

    return (
        <section className="mt-10 flex flex-col">
            <h1 className="text-20 font-bold text-white-1"></h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-12 flex w-full flex-col"
                >
                    <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
                        <FormField
                            control={form.control}
                            name="podcastTitle"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="text-16 font-bold text-white-1">
                                        Username
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="input-class focus-visible:ring-orange-1 focus-visible:ring-offset-0"
                                            placeholder="Podcast Title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500 font-medium" />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-2.5">
                            <Label className="text-16 font-bold text-white-1">
                                Select AI Voice
                            </Label>
                            <Select
                                onValueChange={(value) => setVoiceType(value)}
                            >
                                <SelectTrigger className="text-16 w-full border-none bg-black-1 text-gray-1 focus:ring-orange-1 focus:ring-offset-0">
                                    <SelectValue
                                        placeholder="Select AI Voice"
                                        className="text-gray-1"
                                    />
                                </SelectTrigger>
                                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                                    {voiceCategories.map((category) => (
                                        <SelectItem
                                            value={category}
                                            key={category}
                                            className="capitalize focus:bg-orange-1"
                                        >
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                                {voiceType && (
                                    <audio
                                        src={`/${voiceType}.mp3`}
                                        autoPlay
                                        className="hidden"
                                    />
                                )}
                            </Select>
                        </div>

                        <FormField
                            control={form.control}
                            name="podcastDescription"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="text-16 font-bold text-white-1">
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="input-class focus-visible:ring-orange-1 focus-visible:ring-offset-0"
                                            placeholder="Write a short description about your podcast"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500 font-medium" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col pt-10">
                        <GeneratePodcast
                            setAudioStorageId={setAudioStorageId}
                            setAudio={setAudioUrl}
                            voiceType={voiceType}
                            audio={audioUrl}
                            voicePrompt={voicePrompt}
                            setVoicePrompt={setVoicePrompt}
                            setAudioDuration={setAudioDuration}
                        />
                        <GenerateThumbnail />

                        <div className="mt-10 w-full">
                            <Button
                                type="submit"
                                className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1"
                            >
                                {isSubmitting ? (
                                    <>
                                        Submitting
                                        <Loader
                                            size={20}
                                            className="ml-2 animate-spin"
                                        />
                                    </>
                                ) : (
                                    "Submit & Publish Podcast"
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </section>
    );
}

export default CreatePodcast;
