"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LeftSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <section className="left_sidebar">
            <nav className="flex flex-col gap-6">
                <Link
                    href="/"
                    className="flex cursor-pointer items-center gap-1 pb-1 max-lg:justify-center"
                >
                    <Image
                        src="/icons/logo.svg"
                        width={23}
                        height={27}
                        alt="Logo app"
                    />
                    <h1 className="text-24 font-extrabold text-white-1 max-lg:hidden">
                        AI Podcast
                    </h1>
                </Link>

                {sidebarLinks.map(({ route, label, imgURL }) => {
                    const isActive =
                        pathname === route || pathname.startsWith(`${route}/`);

                    return (
                        <Link
                            href={route}
                            key={label}
                            className={cn(
                                "flex items-center justify-center gap-3 bg-nav-focus py-4 max-lg:px-4 lg:justify-start",
                                {
                                    "border-r-4 border-orange-1 bg-nav-focus":
                                        isActive,
                                },
                            )}
                        >
                            <Image
                                src={imgURL}
                                alt={label}
                                width={24}
                                height={24}
                            />
                            <p> {label} </p>
                        </Link>
                    );
                })}
            </nav>
        </section>
    );
};

export default LeftSidebar;
