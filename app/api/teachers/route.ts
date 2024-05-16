import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {

        const {userId} = auth();

        if(!userId) {
            return new NextResponse("unauthorized", {status : 401})
        }

        const teacher = await db.teacher.create({
            data: {
                userId,
            }
        });

        return NextResponse.json(teacher);

    }catch {
        console.log("[COURSES", error);
        return new NextResponse("internal erro", {status: 500});
    }
}