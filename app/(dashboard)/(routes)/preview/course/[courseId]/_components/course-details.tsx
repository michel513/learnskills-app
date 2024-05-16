import { Description } from "@radix-ui/react-dialog";
import { Book } from "lucide-react";

interface CourseDetailsProps {
    title?: string;
    chaptersLength: number;
    id: string;
    price : number;
    category : string,
    Description: string;
}

const CourseDetails = async ({
    id,
    title,
    chaptersLength,
    Description,
    price,
    category,
}: CourseDetailsProps) => {

    const totalChapters = <span>
                             {chaptersLength} {chaptersLength === 1 ? "chapter" : "chapters"}
                          </span>;
    return ( 
        <div className="flex items-center justify-between mt-5 p-5 rounded-lg border">
           <div>
            <h2 className="text-[20px] font-medium">{title}</h2>
            <div className="flex itmes-center gap-2 mt-2">
                    <Book
                        className="h-6 w-6 text-purple-600 rounded-full bg-purple-100 p-1"
                    />
                    <h2 className="text-[12px] text-gray-400">
                        {totalChapters}
                    </h2>
            </div>
                <p className="line-clamp-4 mt-3 text-gray-500">
                    {Description}
                </p>
            </div>
            <div className="flex flex-col items-end justify-between gap-6">
                <p>{price} $</p>
              <p>{category}</p>
            </div>
        </div>
     );
}
 
export default CourseDetails;