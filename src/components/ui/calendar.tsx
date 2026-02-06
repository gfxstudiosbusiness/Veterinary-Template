"use client";

import { useState, useEffect } from "react";
import { CaretLeft, CaretRight } from "@/components/icons";
import { cn } from "@/lib/utils";

interface CalendarProps {
  value: string;
  onChange: (date: string) => void;
  availableDays?: number[]; // 0 = Sunday, 1 = Monday, etc.
  blockedDates?: string[]; // "YYYY-MM-DD"
  minDate?: string; // "YYYY-MM-DD"
  maxDate?: string; // "YYYY-MM-DD"
  className?: string;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

export function Calendar({
  value,
  onChange,
  availableDays = [0, 1, 2, 3, 4, 5, 6],
  blockedDates = [],
  minDate,
  maxDate,
  className
}: CalendarProps) {
  // Initialize view date based on selected value or today
  const [viewDate, setViewDate] = useState(() => {
    return value ? new Date(value) : new Date();
  });

  // Effect to update view if value changes externally and is valid
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setViewDate(date);
      }
    }
  }, [value]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth(); // 0-11

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const checkIsDisabled = (day: number) => {
    const currentStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dateObj = new Date(year, month, day);
    const dayOfWeek = dateObj.getDay();

    // Check available days (weekly schedule)
    if (!availableDays.includes(dayOfWeek)) return true;

    // Check blocked dates (specific holidays/closures)
    if (blockedDates.includes(currentStr)) return true;

    // Check min date
    if (minDate && currentStr < minDate) return true;

    // Check max date
    if (maxDate && currentStr > maxDate) return true;

    return false;
  };

  const handleDateClick = (day: number) => {
    if (checkIsDisabled(day)) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(dateStr);
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Generate calendar grid
  const days = [];
  
  // Empty spaces for previous month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
  }

  // Actual days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isDisabled = checkIsDisabled(d);
    const isSelected = value === dateStr;
    const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();

    days.push(
      <button
        key={`day-${d}`}
        type="button"
        onClick={() => handleDateClick(d)}
        disabled={isDisabled}
        className={cn(
          "h-10 w-10 flex items-center justify-center rounded-lg text-sm transition-all duration-200",
          isSelected 
            ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30 font-bold scale-110" 
            : isDisabled 
              ? "text-slate-300 cursor-not-allowed bg-slate-50 opacity-50" 
              : "text-slate-700 hover:bg-teal-50 hover:text-teal-600 font-medium",
          isToday && !isSelected && "border border-teal-200 text-teal-600",
        )}
      >
        {d}
      </button>
    );
  }

  return (
    <div className={cn("p-4 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50", className)}>
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={handlePrevMonth}
          className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-teal-600 transition-colors"
        >
          <CaretLeft className="w-5 h-5" />
        </button>
        <div className="font-bold text-slate-800 text-lg">
          {MONTHS[month]} <span className="text-teal-500">{year}</span>
        </div>
        <button 
          onClick={handleNextMonth}
          className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-teal-600 transition-colors"
        >
          <CaretRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(day => (
          <div key={day} className="h-10 flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 justify-items-center">
        {days}
      </div>
      
      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex gap-4 justify-center text-[10px] text-slate-400 uppercase tracking-wide font-medium">
         <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-teal-500" />
            Selected
         </div>
         <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full border border-teal-200" />
            Today
         </div>
         <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-100" />
            Unavailable
         </div>
      </div>
    </div>
  );
}
