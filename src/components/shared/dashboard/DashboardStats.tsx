import type { LucideIcon } from "lucide-react";

type DashboardStatsProps = {
  Icon: LucideIcon;
  title: string;
  count: number;
};

const DashboardStats = ({
  Icon,
  count = 0,
  title = "",
}: DashboardStatsProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-5 transition-colors hover:bg-accent/30">
      <div className="bg-accent p-2.5 rounded-lg w-fit">
        <Icon className="size-5 text-accent-foreground" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h2 className="font-bold text-2xl mt-1 text-card-foreground">
          {count}
        </h2>
      </div>
    </div>
  );
};

export default DashboardStats;
