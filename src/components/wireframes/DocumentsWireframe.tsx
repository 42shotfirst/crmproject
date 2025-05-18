import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocumentsWireframe() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Documents</h1>
        <div className="flex gap-2">
          <div className="w-32 h-8 bg-gray-800 rounded"></div>
        </div>
      </div>

      {/* Documents Card */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-4">
            <CardTitle className="text-lg">Files</CardTitle>
            <div className="flex gap-1">
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="relative w-64">
            <div className="absolute left-3 top-2 w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="w-full h-8 bg-gray-100 rounded pl-8"></div>
          </div>
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
                    <div className="w-12 h-4 bg-gray-200 rounded"></div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium">
                    <div className="w-12 h-4 bg-gray-200 rounded"></div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium">
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium">
                    <div className="w-8 h-4 bg-gray-200 rounded"></div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium">
                    <div className="w-12 h-4 bg-gray-200 rounded"></div>
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
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-200 rounded"></div>
                        <div className="w-32 h-4 bg-gray-300 rounded"></div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-12 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-24 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        <div className="w-16 h-6 bg-gray-100 rounded-full"></div>
                        <div className="w-16 h-6 bg-gray-100 rounded-full"></div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                        <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                        <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <div className="mt-6">
        <Card className="bg-white border-dashed border-2 border-gray-300">
          <CardContent className="p-8 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
            <div className="w-48 h-5 bg-gray-300 rounded mb-2"></div>
            <div className="w-64 h-4 bg-gray-200 rounded mb-6"></div>
            <div className="w-32 h-10 bg-gray-800 rounded"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
