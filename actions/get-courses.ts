import { Category, Course } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: {id: string}[];
    progress: number | null;
};

type GetCourses = {
    userId: string;
    title?: string;
    categoryId?: string
};

export const GetCourses = async ({
    userId,
    title,
    categoryId
}:GetCourses): Promise<CourseWithProgressWithCategory[]> => {
    try {

        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                },
                categoryId,
            },
            include: {
                muxDataPreview: true,
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    }
                },
                purchases: {
                    where: {
                        userId,
                    }
                }
            },
            orderBy: {
                createdAt: "desc",
            }
        });

        const  CourseWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
            courses.map(async course => {
                if (course.purchases.length === 0) {
                    return {
                        ...course,
                        progress: null,
                    }
                }

                const progressPercentage = await getProgress(userId, course.id);

                return {
                    ...course,
                    progress: progressPercentage,
                };
            })
        );

        return CourseWithProgress;

    } catch (err) {
        console.log("[GET_COURSES]",err);
        return [];
    }
}