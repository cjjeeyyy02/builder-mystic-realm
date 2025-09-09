import Layout from "@/components/Layout";
import FilterTabs from "@/components/FilterTabs";

export default function Index() {
  return (
    <Layout>
      <div className="onboarding-corporate space-y-5">
        {/* Page Title */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Onboarding</h1>

        {/* Filter Tabs with Conditional Content */}
        <FilterTabs />
      </div>
    </Layout>
  );
}
