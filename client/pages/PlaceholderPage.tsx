import Layout from "@/components/Layout";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-medium mb-4">{title}</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          {description ||
            `This ${title.toLowerCase()} page is coming soon. Continue prompting to add content to this section.`}
        </p>
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </Layout>
  );
}
