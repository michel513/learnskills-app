import { cn } from "@/lib/utils";

type Props = {
  value: number;
  variant: "points" | "hearts";
};

export const ResultCard = ({ value, variant }: Props) => {

  return (
    <div className={cn(
      "rounded-2xl border-2 w-full",
      variant === "points" && "bg-slate-400 border-slate-400",
    )}>
      <div className={cn(
        "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
        variant === "points" && "bg-slate-400"
      )}>
        {variant === "hearts" ? "Hearts Left" : "Total XP"}
      </div>
      <div className={cn(
        "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg",
        variant === "points" && "text-slate-400"
      )}>
        {value}
      </div>
    </div>
  );
};
