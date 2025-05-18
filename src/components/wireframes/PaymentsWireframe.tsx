import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentsWireframe() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payments</h1>
        <div className="flex gap-2">
          <div className="w-32 h-8 bg-gray-800 rounded"></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="w-24 h-8 bg-gray-300 rounded mb-1"></div>
            <div className="w-32 h-3 bg-gray-100 rounded"></div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="w-24 h-8 bg-gray-300 rounded mb-1"></div>
            <div className="w-32 h-3 bg-gray-100 rounded"></div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="w-24 h-8 bg-gray-300 rounded mb-1"></div>
            <div className="w-32 h-3 bg-gray-100 rounded"></div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
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
                    <div className="w-12 h-4 bg-gray-200 rounded"></div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium">
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium">
                    <div className="w-16 h-4 bg-gray-200 rounded"></div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium">
                    <div className="w-16 h-4 bg-gray-200 rounded"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div className="w-16 h-4 bg-gray-300 rounded"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-24 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-16 h-6 bg-gray-100 rounded-full"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-20 h-8 bg-gray-100 rounded"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Processing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 border-b border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <div>
                      <div className="w-24 h-4 bg-gray-300 rounded mb-1"></div>
                      <div className="w-16 h-3 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-16 h-4 bg-gray-300 rounded mb-1"></div>
                    <div className="w-12 h-3 bg-gray-100 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 border rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                    <div>
                      <div className="w-32 h-4 bg-gray-300 rounded mb-1"></div>
                      <div className="w-24 h-3 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                    <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                  </div>
                </div>
              ))}

              <div className="mt-4">
                <div className="w-full h-10 bg-gray-100 rounded border-dashed border-2 border-gray-300 flex items-center justify-center">
                  <div className="w-32 h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
