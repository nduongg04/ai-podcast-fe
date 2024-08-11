import Image from "next/image";

type PodcastCardProps = {
    imgUrl: string;
    title: string;
    description: string;
    podcastId: number;
};

const PodcastCard = ({
    imgUrl,
    title,
    description,
    podcastId,
}: PodcastCardProps) => {
    return (
        <div className="cursor-pointer">
            <figure className="flex flex-col gap-2">
                <Image
                    draggable={false}
                    src={imgUrl}
                    width={174}
                    height={174}
                    alt={title}
                    className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
                />
                <figcaption className="flex flex-col">
                    <h1 className="text-16 truncate font-bold text-white-1">
                        {title}
                    </h1>
                    <h2 className="text-12 truncate font-normal capitalize text-white-4">
                        {description}
                    </h2>
                </figcaption>
            </figure>
        </div>
    );
};
export default PodcastCard;
