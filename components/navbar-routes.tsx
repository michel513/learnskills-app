"use client";

import { UserButton} from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogInIcon, LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { ConfirmModal } from "./modals/confirm-modal";
import axios from "axios";

interface NavbarRoutesProps {
    teacherId: string;
    isCreate: boolean;
}

const NavbarRoutes = ({
    teacherId,
    isCreate
}: NavbarRoutesProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/course");
    const isCreateTeacher = pathname?.includes("/create");
    const isSearchPage = pathname === "/search";


    const onClick = async () => {
        const response = await axios.post("/api/teachers");
        router.push(`/create/teacher/${response.data.id}`);
    };

    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
            <div className="flex gap-x-2 ml-auto">
            {isTeacherPage || isCoursePage || isCreateTeacher ? (
                    <Link href="/">
                        <Button size="sm" variant="ghost">
                            <LogOut className="h-4 w-4 mr-2" />
                            Exit
                        </Button>
                    </Link>
                ) : (
                    isCreate === false && !teacherId ? (
                        <ConfirmModal onConfirm={onClick}>
                            <Button size="sm" variant="ghost">
                                Teacher mode
                            </Button>
                        </ConfirmModal>
                    ) : (
                        
                            <Button onClick={() => router.push(`/teachers/${teacherId}/courses`)}  size="sm" variant="ghost">
                                <LogInIcon className="h-4 w-4 mr-2" />
                                Log in as a teacher
                            </Button>
                    )
                )}
                <UserButton
                    afterSignOutUrl="/"
                />
            </div>
        </>
    );
}

export default NavbarRoutes;
