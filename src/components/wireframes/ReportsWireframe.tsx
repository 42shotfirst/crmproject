import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportsWireframe() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex gap-2">
          <div className="w-28 h-8 bg-gray-200 rounded"></div>
          <div className="w-28 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="mb-6">
        <div className="w-full h-10 bg-gray-200 rounded-md flex items-center p-1">
          <div className="w-1/3 h-8 bg-white rounded-md flex items-center justify-center">
            <div className="w-32 h-4 bg-gray-800 rounded"></div>
          </div>
          <div className="w-1/3 h-8 flex items-center justify-center">
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="w-1/3 h-8 flex items-center justify-center">
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <Card className="bg-white mb-6">
        <CardHeader>
          <CardTitle>Contact Activity Report</CardTitle>
          <div className="w-64 h-4 bg-gray-200 rounded"></div>
          <div className="w-48 h-3 bg-gray-100 rounded"></div>
        </CardHeader>
        <CardContent>
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="w-16 h-8 bg-gray-300 rounded mt-2"></div>
                  <div className="w-24 h-3 bg-green-200 rounded mt-1"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chart Area */}
          <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center mb-8">
            <div className="w-3/4 h-48 bg-gray-200 rounded"></div>
          </div>

          {/* Report Customization */}
          <div className="border rounded-lg p-6 bg-gray-50">
            <div className="w-48 h-5 bg-gray-300 rounded mb-4"></div>
            <div className="w-96 h-4 bg-gray-200 rounded mb-6"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-10 bg-white rounded border border-gray-200"></div>
              </div>
              <div>
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-10 bg-white rounded border border-gray-200"></div>
              </div>
              <div>
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-10 bg-white rounded border border-gray-200"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Detailed Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium">
                    <div className="w-16 h-4 bg-gray-200 rounded"></div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium">
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium">
                    <div className="w-16 h-4 bg-gray-200 rounded"></div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium">
                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium">
                    <div className="w-16 h-4 bg-gray-200 rounded"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-24 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-32 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
