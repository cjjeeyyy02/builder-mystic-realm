import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import FooterNavigation from "@/components/FooterNavigation";
import { useDarkMode } from "@/components/DarkModeProvider";

export default function Meetings() {
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <Layout>
        <div className={`min-h-screen p-6 overflow-y-auto pb-footer transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900'
            : 'bg-gradient-to-br from-gray-50 via-white to-purple-50'
        }`}>
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Meetings</h1>
            <p className="text-gray-600">Manage your meetings and appointments</p>
          </div>

          {/* Coming Soon Card */}
          <Card className={`transition-all duration-300 ${
            isDarkMode
              ? 'bg-gradient-to-br from-purple-900/20 to-indigo-800/30 border border-purple-700/30'
              : 'bg-gradient-to-br from-purple-50 to-indigo-100 border border-purple-200'
          }`}>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Meetings Feature Coming Soon
              </h2>
              <p className={`max-w-md mx-auto transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                We're working on bringing you a comprehensive meetings management system.
                Stay tuned for updates!
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
      <FooterNavigation />
    </>
  );
}
