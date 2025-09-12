import Layout from "@/components/Layout";
import FilterTabs from "@/components/FilterTabs";

export default function HiringPipeline() {
  return (
    <Layout>
      <div className="hiring-pipeline space-y-5">
        {/* Page Title */}
        <h1 className="text-3xl font-semibold text-foreground">Hiring Pipeline</h1>
        <p className="text-muted-foreground">
          Manage your entire hiring workflow from screening to activation. Track candidates through each stage of the recruitment process.
        </p>

        {/* Filter Tabs with Conditional Content */}
        <FilterTabs />
      </div>
    </Layout>
  );
}
