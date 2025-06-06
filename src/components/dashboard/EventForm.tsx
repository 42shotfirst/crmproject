import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";

interface EventFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  event?: CalendarEvent;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  allDay: boolean;
  color?: string;
}

export default function EventForm({
  open = true,
  onClose,
  onSave,
  event,
}: EventFormProps) {
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [startDate, setStartDate] = useState<Date | undefined>(
    event?.start || new Date(),
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    event?.end || new Date(),
  );
  const [startTime, setStartTime] = useState(
    event?.start ? format(event.start, "HH:mm") : "09:00",
  );
  const [endTime, setEndTime] = useState(
    event?.end ? format(event.end, "HH:mm") : "10:00",
  );
  const [allDay, setAllDay] = useState(event?.allDay || false);
  const [color, setColor] = useState(event?.color || "blue");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceFrequency, setRecurrenceFrequency] = useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("weekly");
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [recurrenceEndType, setRecurrenceEndType] = useState<
    "never" | "on" | "after"
  >("never");
  const [recurrenceEndDate, setRecurrenceEndDate] = useState<Date | undefined>(
    undefined,
  );
  const [recurrenceCount, setRecurrenceCount] = useState(10);

  const handleSave = () => {
    if (!startDate || !endDate || !title) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!allDay) {
      const [startHours, startMinutes] = startTime.split(":").map(Number);
      const [endHours, endMinutes] = endTime.split(":").map(Number);

      start.setHours(startHours, startMinutes);
      end.setHours(endHours, endMinutes);
    }

    onSave({
      id: event?.id || Math.random().toString(36).substring(2, 9),
      title,
      description,
      start,
      end,
      allDay,
      color,
    });

    onClose();
  };

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      timeOptions.push(format(new Date().setHours(hour, minute), "HH:mm"));
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "Create Event"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event description"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="all-day" checked={allDay} onCheckedChange={setAllDay} />
            <Label htmlFor="all-day">All day</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="recurring"
              checked={isRecurring}
              onCheckedChange={setIsRecurring}
            />
            <Label htmlFor="recurring">Recurring event</Label>
          </div>

          {isRecurring && (
            <div className="grid gap-4 border p-4 rounded-md">
              <div className="grid gap-2">
                <Label>Frequency</Label>
                <Select
                  value={recurrenceFrequency}
                  onValueChange={(value) =>
                    setRecurrenceFrequency(value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Repeat every</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    max="99"
                    value={recurrenceInterval}
                    onChange={(e) =>
                      setRecurrenceInterval(parseInt(e.target.value) || 1)
                    }
                    className="w-20"
                  />
                  <span>
                    {recurrenceFrequency === "daily"
                      ? "day(s)"
                      : recurrenceFrequency === "weekly"
                        ? "week(s)"
                        : recurrenceFrequency === "monthly"
                          ? "month(s)"
                          : "year(s)"}
                  </span>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Ends</Label>
                <Select
                  value={recurrenceEndType}
                  onValueChange={(value) => setRecurrenceEndType(value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select end type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="on">On date</SelectItem>
                    <SelectItem value="after">After occurrences</SelectItem>
                  </SelectContent>
                </Select>

                {recurrenceEndType === "on" && (
                  <div className="mt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !recurrenceEndDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {recurrenceEndDate ? (
                            format(recurrenceEndDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={recurrenceEndDate}
                          onSelect={setRecurrenceEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}

                {recurrenceEndType === "after" && (
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      type="number"
                      min="1"
                      max="999"
                      value={recurrenceCount}
                      onChange={(e) =>
                        setRecurrenceCount(parseInt(e.target.value) || 1)
                      }
                      className="w-20"
                    />
                    <span>occurrences</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {!allDay && (
              <div className="grid gap-2">
                <Label>Start Time</Label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      format(endDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {!allDay && (
              <div className="grid gap-2">
                <Label>End Time</Label>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Color</Label>
            <div className="flex gap-2">
              {["blue", "green", "red", "yellow", "purple"].map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`w-6 h-6 rounded-full ${c === "blue" ? "bg-blue-500" : c === "green" ? "bg-green-500" : c === "red" ? "bg-red-500" : c === "yellow" ? "bg-yellow-500" : c === "purple" ? "bg-purple-500" : "bg-blue-500"} ${color === c ? "ring-2 ring-offset-2 ring-black" : ""}`}
                  onClick={() => setColor(c)}
                  aria-label={`${c} color`}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
