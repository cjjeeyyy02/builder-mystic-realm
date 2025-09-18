import Layout from "@/components/Layout";
import FilterTabs from "@/components/FilterTabs";

export default function HiringPipeline() {
  return (
    <Layout>
      <div className="hiring-pipeline space-y-5">
        {/* Page Title */}
        <h1 className="text-3xl font-semibold text-foreground">Recruitment Pipeline</h1>

        {/* Filter Tabs with Conditional Content */}
        <FilterTabs />
      </div>
    </Layout>
  );
}
