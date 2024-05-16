import { db } from "@/lib/db";

export const getProgress = async (
    userId: string,
    courseId: string,
): Promise<number> => {
    try {

        const publischedChapters = await db.chapter.findMany({
            where: {
                courseId: courseId,
                isPublished: true,
            },
            select: {
                id: true,
            }
        });

        const publischedChapterIds = publischedChapters.map((chapter) => chapter.id);

        const valideCompletedChapters = await db.userProgress.count({
            where: {
                userId: userId,
                chapterId: {
                    in: publischedChapterIds,
                },
                isCompleted: true,
            } 
        });

        const progressPercentage = (valideCompletedChapters / publischedChapterIds.length) *100;

        return progressPercentage;

    } catch (err) {
        console.log("[GET_PROGRESS]",err);
        return 0;
    }
}