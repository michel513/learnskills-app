import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { CircleDollarSign, LayoutDashboard, ListChecks, File, ArrowLeft, Video } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";
import Link from "next/link";
import { PreviewVideoForm } from "./_components/preview-video-form";

const CourseIdPage = async ({
    params
}:{
    params:{courseId: string, teacherId: string}
}) => {
    const {userId} = auth();

    if (!userId) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where:{
            id: params.courseId,
            userId
        },
        include: {
            muxDataPreview: true,
            chapters: {
                orderBy:{
                    position: "asc",
                }
            },
            attachments: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    console.log(categories);

    if (!course) {
        return redirect("/");
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.videoUrl,
        course.chapters.some(chapter => chapter.isPublished),
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    

    return ( 
        <>
            {!course.isPublished && (
                <Banner
                    label="This course is unpublished. It will not be visible to the students."
                />
            )}
            <div className="p-6 lg:px-12">
            <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                    <Link
                        href={`/teachers/${params.teacherId}/courses`}
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2"/>
                        Back to Liste of courses
                    </Link>
                        <h1 className="text-2xl font-medium">
                            Course Setup
                        </h1>
                        <span className="text-sm text-slate-700">
                                Complete all fields {completionText}
                        </span>
                    </div>
                    <Actions
                        disabled={!isComplete}
                        courseId={params.courseId}
                        teacherId={params.teacherId}
                        isPublished={course.isPublished}
                    />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">
                            Customize your Course
                        </h2>
                    </div>
                    <TitleForm
                        initialData = {course}
                        courseId = {course.id}                        
                        teacherId={params.teacherId}
                    />
                    <DescriptionForm
                        initialData = {course}
                        courseId = {course.id}
                        teacherId={params.teacherId}
                    />
                    <ImageForm
                        initialData = {course}
                        courseId = {course.id}
                        teacherId={params.teacherId}
                    />
                    <CategoryForm
                        initialData = {course}
                        courseId = {course.id}
                        teacherId={params.teacherId}
                        options={categories.map((category) =>({
                            label: category.name,
                            value: category.id
                        }))}
                    />
                </div>
                <div className="space-y-6 ">
                   
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={ListChecks}/>
                                <h2 className="text-xl">
                                    Course chapters
                                </h2>
                            </div>
                            <ChaptersForm
                                initialData = {course}
                                courseId = {course.id}
                                teacherId={params.teacherId}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Video}/>
                                <h2 className="text-xl">
                                        Course Preview Video
                                </h2>
                            </div>
                            <PreviewVideoForm
                                initialData={course}
                                courseId={params.courseId}
                                teacherId={params.teacherId}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge  icon={CircleDollarSign}/>
                                <h2 className="text-xl">
                                    Sell your course
                                </h2>
                            </div>
                            <PriceForm 
                                initialData={course}
                                courseId={course.id}
                                teacherId={params.teacherId}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge  icon={File}/>
                                <h2 className="text-xl">
                                    Ressources & Attachements
                                </h2>
                            </div>
                            <AttachmentForm
                                initialData = {course}
                                courseId = {course.id}
                                teacherId={params.teacherId}
                            />
                        </div>
                </div>
            </div>
            </div>
        </>
     );
}
 
export default CourseIdPage;