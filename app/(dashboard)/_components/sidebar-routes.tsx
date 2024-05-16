"use client";

import { Award, BarChart, Compass, Layout, List, Mail, MessageCircle, SettingsIcon } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";
import twitterImage from "../../../public/twitter.svg";
import youtubeImage from "../../../public/youtube.svg";
import discordImage from "../../../public/discord.svg";
import Image from "next/image";
import Link from "next/link";


const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Compass,
        label: "Browser",
        href: "/search",
    },
    {
        icon: MessageCircle,
        label: "Messages",
        href: "/messages",
    },
    {
        icon: Award,
        label: "Leaderboard",
        href: "/leaderboard",
    },
    {
        icon: Mail,
        label: "Newsletter",
        href: "/newsletter",
    }
];


const SidebarRoutes = ({
    params
}:{params:{teacherId: string}}) => {
    

    const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: `/teachers/${params.teacherId}/courses`,
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: `/teachers/${params.teacherId}/analytics`,
    },
    {
        icon: SettingsIcon,
        label: "Account",
        href: `/teachers/${params.teacherId}/account`,
    },
]
    const pathname = usePathname();

    const isTeacherPage = pathname?.includes("/teachers");

    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    return (
        <div className="lg:relative flex flex-col justify-between">
            <div className=" flex flex-col justify-between w-full pb-28">
                {routes.map((route) => (
                    <SidebarItem
                        key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                        teacherId={params.teacherId}
                    />
                ))}
            </div>
            <div className="lg:absolute lg:-bottom-60">
                <div className=" rounded-lg border bg-card m-2 text-card-foreground shadow-none">
                    <div className="flex flex-col space-y-1.5 p-2 pt-0 md:p-4">
                        <h3 className="font-semibold tracking-tight text-base">Upgrade to Pro</h3>
                        <p className="text-muted-foreground text-sm">Unlock weekly workshops, access to all paid content, and more.</p>
                    </div>
                    <div className="p-2 pt-0 md:p-4 md:pt-0">
                        <a className="inline-flex items-center justify-center font-medium ring-offset-background
                 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-2 
                 w-full text-xs"
                            href="/pricing">
                            Upgrade
                        </a>
                    </div>
                </div>
                <div className="p-1 flex items-center justify-between">
                    <Link target="_blank" className="inline-flex items-center justify-center text-sm font-medium ring-offset-background 
                transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 w-full"
                        href="https://discord.gg/v2kNnzRt33">
                        <Image src={discordImage} width={30} height={30} alt="discord" />
                    </Link>
                    <Link target="_blank" className="inline-flex items-center justify-center text-sm font-medium
                     ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                      focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-11
                       rounded-md px-8 w-full" href="https://www.youtube.com/@codewithantonio">
                        <Image src={youtubeImage} width={30} height={30} alt="youtube" />
                    </Link>
                    <Link target="_blank" className="inline-flex items-center justify-center text-sm font-medium
                     ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                      focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-11
                       rounded-md px-8 w-full" href="https://www.twitter.com/@codewithantonio">
                        <Image src={twitterImage} width={30} height={30} alt="twitter" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SidebarRoutes;
