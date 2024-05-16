import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getAnalytics } from "@/actions/get-analytics";
import DataCard from "./_components/data-card";
import Chart from "./_components/chart";


const AnalyticsPage = async ({
    params
}: { params: {teacherId: string}}) => {
    const {userId} = auth();

    if (!userId) {
       return redirect("/");
    }

    const {
        data,
        totalRevenue,
        totalSales,
    } = await getAnalytics(userId, params.teacherId);

    return (
         <div className="p-6 lg:pl-12">
            <div className="grid gri-cols-1 md:grid-cols-2 gap-4 mb-4">
                <DataCard
                    label="total Revenue"
                    value={totalRevenue}
                    shouldFormat
                />
                 <DataCard
                    label="total sales"
                    value={totalSales}
                />
            </div>
            <Chart
                    data={data}
                />
         </div>
     );
}
 
export default AnalyticsPage;