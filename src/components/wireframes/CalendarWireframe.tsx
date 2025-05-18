import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CalendarWireframe() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <div className="flex gap-2">
          <div className="w-24 h-8 bg-gray-300 rounded"></div>
          <div className="w-32 h-8 bg-gray-800 rounded"></div>
        </div>
      </div>

      {/* Calendar Controls */}
      <Card className="bg-white mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
            </div>
            <div className="w-32 h-6 bg-gray-300 rounded"></div>
            <div className="flex gap-2">
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card className="bg-white mb-6">
        <CardContent className="p-0">
          {/* Days of Week */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div
                key={day}
                className="p-2 text-center font-medium text-sm border-r last:border-r-0 border-gray-200"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 grid-rows-5 h-[600px]">
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className="border-r border-b last:border-r-0 p-2 relative"
              >
                <div className="text-xs font-medium mb-2">{(i % 31) + 1}</div>
                {i % 7 === 2 && (
                  <div className="absolute top-8 left-1 right-1">
                    <div className="bg-blue-100 border-l-4 border-blue-500 p-1 text-xs mb-1 truncate rounded">
                      <div className="w-full h-3 bg-blue-200 rounded"></div>
                    </div>
                  </div>
                )}
                {i % 7 === 4 && (
                  <div className="absolute top-8 left-1 right-1">
                    <div className="bg-green-100 border-l-4 border-green-500 p-1 text-xs mb-1 truncate rounded">
                      <div className="w-full h-3 bg-green-200 rounded"></div>
                    </div>
                  </div>
                )}
                {i % 11 === 0 && (
                  <div className="absolute top-16 left-1 right-1">
                    <div className="bg-purple-100 border-l-4 border-purple-500 p-1 text-xs mb-1 truncate rounded">
                      <div className="w-full h-3 bg-purple-200 rounded"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`p-3 rounded-md border-l-4 ${i === 1 ? "border-blue-500 bg-blue-50" : i === 2 ? "border-green-500 bg-green-50" : "border-purple-500 bg-purple-50"}`}
                >
                  <div className="w-3/4 h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="w-1/2 h-3 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Date Picker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md p-4">
              {/* Month Navigation */}
              <div className="flex justify-between items-center mb-4">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-20 h-4 bg-gray-300 rounded"></div>
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              </div>

              {/* Calendar Mini */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                  <div key={d} className="text-xs font-medium">
                    {d}
                  </div>
                ))}
                {Array.from({ length: 35 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-xs ${i === 15 ? "bg-gray-800 text-white" : ""}`}
                  >
                    {(i % 31) + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full h-10 bg-gray-800 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
