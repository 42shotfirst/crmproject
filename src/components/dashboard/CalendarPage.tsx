import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar } from "../ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { CalendarEvent } from "./EventForm";
import EventForm from "./EventForm";
import CalendarView from "./CalendarView";
import { useToast } from "../ui/use-toast";
import { supabase } from "@/lib/supabase";

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("month");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<
    CalendarEvent | undefined
  >();
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const { toast } = useToast();

  // Load events from local storage on component mount
  useEffect(() => {
    const loadEvents = async () => {
      try {
        // In a real app, this would fetch from Supabase
        // For now, we'll use localStorage
        const savedEvents = localStorage.getItem("calendarEvents");
        if (savedEvents) {
          const parsedEvents = JSON.parse(savedEvents).map((event: any) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          }));
          setEvents(parsedEvents);
        }
      } catch (error) {
        console.error("Failed to load events:", error);
        toast({
          title: "Error",
          description: "Failed to load events",
          variant: "destructive",
        });
      }
    };

    loadEvents();
  }, [toast]);

  // Save events to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const handleAddEvent = (selectedDate: Date) => {
    setSelectedEvent(undefined);
    setDate(selectedDate); // Set the date picker to the selected date
    setIsEventFormOpen(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventFormOpen(true);
  };

  const handleSaveEvent = (event: CalendarEvent) => {
    if (selectedEvent) {
      // Update existing event
      setEvents(events.map((e) => (e.id === event.id ? event : e)));
      toast({
        title: "Event Updated",
        description: "Your event has been updated successfully.",
      });
    } else {
      // Add new event
      setEvents([...events, event]);
      toast({
        title: "Event Created",
        description: "Your event has been created successfully.",
      });
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter((e) => e.id !== selectedEvent.id));
      setIsEventFormOpen(false);
      setSelectedEvent(undefined);
      toast({
        title: "Event Deleted",
        description: "Your event has been deleted successfully.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/calendar/import-export")}
        >
          <Download className="mr-2 h-4 w-4" /> Import/Export
        </Button>
      </div>

      <Tabs
        defaultValue="month"
        value={view}
        onValueChange={(v) => setView(v as "day" | "week" | "month")}
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="day" className="mt-0">
          <CalendarView
            events={events}
            onEventClick={handleEditEvent}
            onAddEvent={handleAddEvent}
            view="day"
            date={date}
            onDateChange={setDate}
          />
        </TabsContent>

        <TabsContent value="week" className="mt-0">
          <CalendarView
            events={events}
            onEventClick={handleEditEvent}
            onAddEvent={handleAddEvent}
            view="week"
            date={date}
            onDateChange={setDate}
          />
        </TabsContent>

        <TabsContent value="month" className="mt-0">
          <CalendarView
            events={events}
            onEventClick={handleEditEvent}
            onAddEvent={handleAddEvent}
            view="month"
            date={date}
            onDateChange={setDate}
          />
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <p className="text-muted-foreground">
                No upcoming events. Create an event to get started.
              </p>
            ) : (
              <div className="space-y-4">
                {events
                  .filter((event) => new Date(event.start) >= new Date())
                  .sort(
                    (a, b) =>
                      new Date(a.start).getTime() - new Date(b.start).getTime(),
                  )
                  .slice(0, 5)
                  .map((event) => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-md cursor-pointer ${event.color === "blue" ? "bg-blue-50 border-l-4 border-blue-500" : event.color === "green" ? "bg-green-50 border-l-4 border-green-500" : event.color === "red" ? "bg-red-50 border-l-4 border-red-500" : event.color === "yellow" ? "bg-yellow-50 border-l-4 border-yellow-500" : event.color === "purple" ? "bg-purple-50 border-l-4 border-purple-500" : "bg-blue-50 border-l-4 border-blue-500"}`}
                      onClick={() => handleEditEvent(event)}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-gray-500">
                        {event.allDay
                          ? `All day - ${new Date(event.start).toLocaleDateString()}`
                          : `${new Date(event.start).toLocaleString()} - ${new Date(event.end).toLocaleTimeString()}`}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Date Picker</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border"
            />
            <div className="mt-4">
              <Button className="w-full" onClick={() => handleAddEvent(date)}>
                Add Event
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {isEventFormOpen && (
        <EventForm
          open={isEventFormOpen}
          onClose={() => setIsEventFormOpen(false)}
          onSave={handleSaveEvent}
          event={selectedEvent}
        />
      )}
    </div>
  );
}
