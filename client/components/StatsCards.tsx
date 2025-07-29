interface StatCard {
  title: string;
  value: string;
}

const stats: StatCard[] = [
  { title: "Hiring", value: "1000" },
  { title: "Screening", value: "500" },
  { title: "Activation", value: "200" },
  { title: "Hired", value: "100" },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-muted p-6 rounded-lg">
          <h3 className="text-xl font-medium mb-2">{stat.title}</h3>
          <p className="text-3xl font-medium">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
