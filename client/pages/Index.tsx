import Layout from "@/components/Layout";
import StatsCards from "@/components/StatsCards";
import FilterTabs from "@/components/FilterTabs";

export default function Index() {
  return (
    <Layout>
      <div className="space-y-5">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Onboarding</h1>

        {/* Stats Cards */}
        <StatsCards />

        {/* Filter Tabs with Conditional Content */}
        <FilterTabs />
      </div>
    </Layout>
  );
}
