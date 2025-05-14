import { useState, useEffect } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { CalendarEvent } from "./EventForm";
import { cn } from "@/lib/utils";

interface CalendarViewProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onAddEvent: (date: Date) => void;
  view: "day" | "week" | "month";
  date: Date;
  onDateChange: (date: Date) => void;
}

export default function CalendarView({
  events,
  onEventClick,
  onAddEvent,
  view,
  date,
  onDateChange,
}: CalendarViewProps) {
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);

  useEffect(() => {
    let days: Date[] = [];

    if (view === "day") {
      days = [date];
    } else if (view === "week") {
      const start = startOfWeek(date, { weekStartsOn: 1 }); // Start on Monday
      const end = endOfWeek(date, { weekStartsOn: 1 });
      days = eachDayOfInterval({ start, end });
    } else if (view === "month") {
      const start = startOfMonth(date);
      const end = endOfMonth(date);
      days = eachDayOfInterval({ start, end });
    }

    setCalendarDays(days);
  }, [date, view]);

  const navigate = (direction: "prev" | "next") => {
    if (view === "day") {
      onDateChange(direction === "prev" ? subDays(date, 1) : addDays(date, 1));
    } else if (view === "week") {
      onDateChange(
        direction === "prev" ? subWeeks(date, 1) : addWeeks(date, 1),
      );
    } else if (view === "month") {
      onDateChange(
        direction === "prev" ? subMonths(date, 1) : addMonths(date, 1),
      );
    }
  };

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);

      // For all-day events or multi-day events
      if (event.allDay) {
        return day >= eventStart && day <= eventEnd;
      }

      // For same-day events
      return isSameDay(day, eventStart);
    });
  };

  const renderDayView = () => {
    const dayEvents = getEventsForDay(date);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="h-[600px] overflow-y-auto">
        <div className="grid grid-cols-1 divide-y">
          {hours.map((hour) => {
            const hourEvents = dayEvents.filter((event) => {
              const eventStart = new Date(event.start);
              return eventStart.getHours() === hour;
            });

            return (
              <div key={hour} className="min-h-[60px] relative">
                <div className="absolute left-0 w-16 text-xs text-gray-500 py-1">
                  {format(new Date().setHours(hour, 0), "h a")}
                </div>
                <div className="ml-16 pl-2 py-1">
                  {hourEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => onEventClick(event)}
                      className={`mb-1 p-1 rounded text-xs cursor-pointer bg-${event.color || "blue"}-100 border-l-4 border-${event.color || "blue"}-500`}
                    >
                      {format(new Date(event.start), "h:mm a")} - {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="h-[600px] overflow-y-auto">
        <div className="grid grid-cols-8 divide-x">
          <div className="sticky top-0 bg-white z-10"></div>
          {calendarDays.map((day) => (
            <div
              key={day.toString()}
              className="sticky top-0 bg-white z-10 p-2 text-center"
            >
              <div className="font-medium">{format(day, "EEE")}</div>
              <div
                className={cn(
                  "text-sm",
                  isSameMonth(day, date) ? "" : "text-gray-400",
                  isSameDay(day, new Date())
                    ? "bg-primary text-white rounded-full w-7 h-7 flex items-center justify-center mx-auto"
                    : "",
                )}
              >
                {format(day, "d")}
              </div>
            </div>
          ))}

          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <div className="text-xs text-gray-500 p-1 h-[60px] sticky left-0 bg-white">
                {format(new Date().setHours(hour, 0), "h a")}
              </div>

              {calendarDays.map((day) => {
                const dayEvents = getEventsForDay(day).filter((event) => {
                  const eventStart = new Date(event.start);
                  return eventStart.getHours() === hour;
                });

                return (
                  <div
                    key={`${day}-${hour}`}
                    className="h-[60px] border-t relative"
                  >
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        onClick={() => onEventClick(event)}
                        className={`absolute top-0 left-0 right-0 m-1 p-1 rounded text-xs cursor-pointer truncate bg-${event.color || "blue"}-100 border-l-4 border-${event.color || "blue"}-500`}
                      >
                        {format(new Date(event.start), "h:mm")} - {event.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    // Get start of first week of month (including days from previous month)
    const firstDayOfMonth = startOfMonth(date);
    const startDate = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });

    // Get end of last week of month (including days from next month)
    const lastDayOfMonth = endOfMonth(date);
    const endDate = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 });

    // Get all days to display
    const allDays = eachDayOfInterval({ start: startDate, end: endDate });

    // Group days into weeks
    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];

    allDays.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    return (
      <div className="h-[600px] overflow-y-auto">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {/* Day headers */}
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="bg-white p-2 text-center font-medium">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {weeks.flatMap((week) =>
            week.map((day) => {
              const dayEvents = getEventsForDay(day);
              const isToday = isSameDay(day, new Date());
              const isCurrentMonth = isSameMonth(day, date);

              return (
                <div
                  key={day.toString()}
                  className={cn(
                    "bg-white min-h-[100px] p-1",
                    !isCurrentMonth && "text-gray-400 bg-gray-50",
                  )}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={cn(
                        "text-sm font-medium w-6 h-6 flex items-center justify-center",
                        isToday && "bg-primary text-white rounded-full",
                      )}
                    >
                      {format(day, "d")}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => onAddEvent(day)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        onClick={() => onEventClick(event)}
                        className={`px-1 py-0.5 text-xs rounded truncate cursor-pointer bg-${event.color || "blue"}-100 border-l-2 border-${event.color || "blue"}-500`}
                      >
                        {event.allDay
                          ? "All day"
                          : format(new Date(event.start), "h:mm a")}{" "}
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-500 px-1">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            }),
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-white">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => onDateChange(new Date())}>
              Today
            </Button>
          </div>

          <h2 className="text-xl font-bold">
            {view === "day" && format(date, "MMMM d, yyyy")}
            {view === "week" &&
              `${format(calendarDays[0], "MMM d")} - ${format(calendarDays[calendarDays.length - 1], "MMM d, yyyy")}`}
            {view === "month" && format(date, "MMMM yyyy")}
          </h2>

          <Button onClick={() => onAddEvent(date)}>
            <Plus className="h-4 w-4 mr-2" /> Add Event
          </Button>
        </div>

        {view === "day" && renderDayView()}
        {view === "week" && renderWeekView()}
        {view === "month" && renderMonthView()}
      </div>
    </Card>
  );
}
