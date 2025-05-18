import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactsWireframe() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <div className="flex gap-2">
          <div className="w-24 h-8 bg-gray-300 rounded"></div>
          <div className="w-32 h-8 bg-gray-800 rounded"></div>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="bg-white mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="w-full h-10 bg-gray-100 rounded"></div>
              <div className="absolute left-3 top-3 w-4 h-4 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex gap-2">
              <div className="w-32 h-10 bg-gray-100 rounded"></div>
              <div className="w-32 h-10 bg-gray-100 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">All Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 py-3 border-b border-gray-200">
            <div className="col-span-1">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="col-span-3">
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="col-span-3">
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="col-span-2">
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="col-span-2">
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="col-span-1">
              <div className="w-6 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Table Rows */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100 hover:bg-gray-50"
            >
              <div className="col-span-1 flex items-center">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="col-span-3 flex items-center">
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="col-span-2 flex items-center">
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="col-span-2 flex items-center">
                <div className="w-16 h-6 bg-gray-100 rounded"></div>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <div className="w-8 h-8 rounded-full bg-gray-100"></div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="w-40 h-4 bg-gray-100 rounded"></div>
            <div className="flex gap-1">
              <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
