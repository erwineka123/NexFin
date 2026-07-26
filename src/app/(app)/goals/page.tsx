import { PageHeader } from "@/components/layout/page-header";
import { GoalList } from "@/features/goals/components/goal-list";
import { getGoalsPageData } from "@/features/goals/services/get-goals-page-data";

export default async function GoalsPage() {
  const data = await getGoalsPageData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Goals"
        title="Tujuan tabungan yang terasa hidup."
        description="Lacak target, deadline, dan kontribusi terakhir supaya progress tetap terlihat dari minggu ke minggu."
      />
      <GoalList goals={data.goals} />
    </div>
  );
}

