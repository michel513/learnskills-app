import Mux from '@mux/mux-node';
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_TOKEN_SECRET!,
);

export async function DELETE (
    req: Request,
    {params}: {params: {courseId: string}}
) {
    try {

        const { userId } = auth();
        
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findUnique({
            where:{
                id: params.courseId,
                userId: userId,
            },
            include: {
                chapters: {
                    include:{
                        muxData: true,
                        quiz: {
                            include: {
                                questions: {
                                    include: {
                                        answers: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!course) {
            return new NextResponse("Not found", { status: 404 });
        }

        for(const chapter of course.chapters) {
            if(chapter.muxData?.assetId) {
                await Video.Assets.del(chapter.muxData.assetId);
            }
        }

        if(course.videoUrl) {
            const existingMuxData = await db.muxPreview.findFirst({
                where: {
                    id: params.courseId,
                }
            });

            if(existingMuxData){
                await Video.Assets.del(existingMuxData.assetId);
                await db.muxData.delete({
                    where : {
                        id: existingMuxData.id,
                    }
                });
            }
        }
        
        const deletedCourse = await db.course.delete({
            where: {
                id: params.courseId,
            }
        });

        return  NextResponse.json(deletedCourse);

    } catch(err) {
        console.log("[COURSE_ID_DELETE]", err);
        return new NextResponse("Internal Error", {status: 500});
    }
}

export async function PATCH(
    req: Request,
    {params}: {params: {courseId: string}}
)  {
    try {

        const { userId } = auth();
        const { courseId } = params;
        const {...values} = await req.json();
        
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.update({
            where:{
                id: courseId,
                userId
            },
            data: {
                ...values,
            }
        });


        if(values.videoUrl) {
            const existingMuxDataPreview = await db.muxPreview.findFirst({
                where: {
                    courseId: params.courseId,
                }
            });

            if(existingMuxDataPreview){
                await Video.Assets.del(existingMuxDataPreview.assetId);
                await db.muxData.delete({
                    where : {
                        id: existingMuxDataPreview.id,
                    }
                });
            }

            const asset = await Video.Assets.create({
                input: values.videoUrl,
                playback_policy: "public",
                test: false,
            });

            await db.muxPreview.create({
                data: {
                    courseId: params.courseId,
                    assetId: asset.id,
                    playbackId: asset.playback_ids?.[0]?.id,
                }
            });
       }

        return NextResponse.json(course);

    } catch (err) {
        console.log("[COURSE_ID]", err)
        return new NextResponse("Internal Server Error", {status: 500});
    }
}