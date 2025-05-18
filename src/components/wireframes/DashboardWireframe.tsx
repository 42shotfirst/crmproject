import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardWireframe() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">CRM Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-white">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="w-20 h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="w-16 h-6 bg-gray-300 rounded"></div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mt-1"></div>
                    <div className="flex-1">
                      <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="w-3/4 h-3 bg-gray-100 rounded"></div>
                    </div>
                    <div className="w-16 h-3 bg-gray-100 rounded"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center">
                <div className="w-3/4 h-40 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-200"></div>
                    <div className="flex-1">
                      <div className="w-full h-4 bg-gray-200 rounded mb-1"></div>
                      <div className="w-1/2 h-3 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <div className="flex-1">
                      <div className="w-24 h-4 bg-gray-200 rounded mb-1"></div>
                      <div className="w-32 h-3 bg-gray-100 rounded"></div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gray-100"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
