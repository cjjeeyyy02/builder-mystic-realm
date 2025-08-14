import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FooterNavigation from "@/components/FooterNavigation";

export default function AI2AIMStore() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Business",
    "Finance",
    "Payments",
    "Development",
    "Design",
  ];

  const featuredApps = [
    {
      id: 1,
      name: "Pitch Deck Generator",
      category: "Business",
      description: "Create amazing pitch decks with AI-powered templates",
      price: "Install Now",
      icon: "📊",
    },
    {
      id: 2,
      name: "MVP Simulator",
      category: "Development",
      description: "Run comprehensive tests before development",
      price: "Install Now",
      icon: "⚡",
    },
    {
      id: 3,
      name: "Tax Calculator Pro",
      category: "Finance",
      description: "Advanced tax calculations and planning tools",
      price: "Install Now",
      icon: "🧮",
    },
  ];

  const allApps = [
    {
      id: 1,
      name: "Pitch Deck Generator",
      category: "Business",
      description: "Create amazing pitch decks with AI-powered templates",
      price: "Free",
      rating: 4.8,
      downloads: 1500,
      icon: "📊",
    },
    {
      id: 2,
      name: "MVP Simulator",
      category: "Development",
      description: "Run comprehensive tests before development",
      price: "$50/month",
      rating: 4.6,
      downloads: 890,
      icon: "⚡",
    },
    {
      id: 3,
      name: "Tax Calculator Pro",
      category: "Finance",
      description: "Advanced tax calculations and planning tools",
      price: "$10/month",
      rating: 4.8,
      downloads: 2100,
      icon: "🧮",
    },
    {
      id: 4,
      name: "PayPal Integration",
      category: "Payments",
      description: "Simplify PayPal payment integration for your workflows",
      price: "Free",
      rating: 4.7,
      downloads: 3200,
      icon: "💳",
    },
    {
      id: 5,
      name: "Razorpay Gateway",
      category: "Payments",
      description: "Indian payment gateway integration with advanced features",
      price: "$15/month",
      rating: 4.5,
      downloads: 1800,
      icon: "💰",
    },
    {
      id: 6,
      name: "Portfolio Builder",
      category: "Design",
      description: "Create stunning portfolios with drag-and-drop interface",
      price: "Free",
      rating: 4.8,
      downloads: 2700,
      icon: "🎨",
    },
  ];

  const stats = [
    {
      value: "50+",
      label: "Available Apps",
      color: "bg-green-500",
    },
    {
      value: "10K+",
      label: "Total Downloads",
      color: "bg-blue-500",
    },
    {
      value: "4.7★",
      label: "Average Rating",
      color: "bg-purple-500",
    },
    {
      value: "500+",
      label: "Active Users",
      color: "bg-orange-500",
    },
  ];

  const filteredApps =
    activeCategory === "All"
      ? allApps
      : allApps.filter((app) => app.category === activeCategory);

  const handleInstall = (app: any) => {
    console.log(`Installing ${app.name}`);
  };

  const handlePreview = (app: any) => {
    console.log(`Previewing ${app.name}`);
  };

  const AppCard = ({
    app,
    featured = false,
  }: {
    app: any;
    featured?: boolean;
  }) => (
    <Card
      className={`bg-white border border-gray-200 hover:shadow-md transition-shadow ${featured ? "h-32" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">{app.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  {app.name}
                </h4>
                <span className="text-xs text-gray-500">{app.category}</span>
              </div>
              {!featured && (
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <span className="text-xs text-yellow-500">⭐</span>
                    <span className="text-xs text-gray-600">{app.rating}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      {app.downloads}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <p
              className={`text-gray-600 mb-3 leading-relaxed ${featured ? "text-xs" : "text-sm"}`}
            >
              {app.description}
            </p>

            <div className="flex items-center space-x-2">
              <Button
                onClick={() => handleInstall(app)}
                size="sm"
                className={`text-xs px-3 py-1 h-7 ${
                  app.price === "Free" || featured
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {featured
                  ? app.price
                  : app.price === "Free"
                    ? "Install"
                    : "Install"}
              </Button>
              {!featured && (
                <Button
                  onClick={() => handlePreview(app)}
                  size="sm"
                  variant="outline"
                  className="text-xs px-3 py-1 h-7"
                >
                  Preview
                </Button>
              )}
            </div>

            {!featured && app.price !== "Free" && (
              <div className="mt-2">
                <span className="text-sm font-semibold text-gray-900">
                  {app.price}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 pb-footer">
        {/* Featured Section */}
        <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white px-6 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Featured This Week</h1>
            <p className="text-purple-100">
              Discover the most popular apps in our ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredApps.map((app) => (
              <AppCard key={app.id} app={app} featured={true} />
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex space-x-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                  activeCategory === category
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Apps Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white border border-gray-200">
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-3`}
                  >
                    <span className="text-white font-bold text-lg">
                      {stat.value.charAt(0)}
                    </span>
                  </div>
                  <div
                    className={`text-2xl font-bold ${stat.color.replace("bg-", "text-")} mb-1`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}
