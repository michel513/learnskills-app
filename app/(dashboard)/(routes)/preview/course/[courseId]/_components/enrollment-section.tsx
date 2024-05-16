"use client";

import { useRouter} from "next/navigation";

interface EnrollementSectionProps {
    courseId: string;
}

const EnrollementSection =  ({
        courseId
}:EnrollementSectionProps) => {
    const router = useRouter();

    const OnClickRediction = async () => {
       return router.push(`/courses/${courseId}/`);
    }

    
    return ( 
        <div>
            <div className="mt-5 border rounded-lg p-2 text-center">
                <h2 className="text-gray-500">Learn and Build Project, Access Source Code and Track your Progress for free</h2>
                <button  onClick={OnClickRediction}  className="p-2 w-full bg-sky-700 text-white rounded-lg text-[14px] mt-2 hover:bg-sky-600">Enroll Now</button>
            </div>
            <div className="mt-5 border rounded-lg p-2 text-center">
                <h2 className="text-gray-500">Buy Monthly membership and get acces to all courses, code and track you progress</h2>
                <button
                    className="p-2 w-full bg-sky-700 text-white rounded-lg text-[14px] mt-2 hover:bg-sky-600"
                >Buy Membership $4,99/Month</button>
            </div>
        </div>
     );
}
 
export default EnrollementSection;