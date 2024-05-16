import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/video-player";
import { ChaptersList } from "./_components/chapter-list";
import { db } from "@/lib/db";
import EnrollementSection from "./_components/enrollment-section";
import OptionSection from "./_components/option-section";
import { getCourse } from "@/actions/get-course";


const ChapterIdPage = async ({
    params,
}: {
    params: {courseId: string; chapterId: string}
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    try {
        const {
            course,
            chapters,
            muxDataPreview,
        } = await getCourse({
            userId,
            courseId: params.courseId,
        });

        const categorie = await db.category.findUnique({
            where: {
                id: course?.categoryId ?? undefined,
            },
        });

        
        return (
            <div className="lg:pl-10">
                <div className="grid grid-cols-1 md:grid-cols-3 ml-4 mt-4">
                    <div className="col-span-2">
                        <VideoPlayer
                            courseId={params.courseId}
                            title={course?.title || "Untitled Chapter"}
                            playbackId={muxDataPreview?.playbackId!}
                        />
                        <ChaptersList
                            id={course?.id!}
                            Description={course?.description!}
                            title={course?.title!}
                            chaptersLength={chapters!}      
                            category={categorie?.name || 'No category'}   
                            price ={course?.price!}             
                        />
                    </div>
                    <div className="mx-5">
                        <OptionSection/>
                        <EnrollementSection
                           courseId={course?.id!}
                        />
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching chapter data:", error);
        return <div>Error fetching chapter data</div>;
    }
};

export default ChapterIdPage;