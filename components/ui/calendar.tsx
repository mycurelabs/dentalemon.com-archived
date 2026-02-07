"use client"

import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center relative items-center w-full h-10 px-10",
        caption_label: "text-sm font-semibold",
        nav: "flex items-center",
        button_previous: cn(
          "absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 z-10",
          "inline-flex items-center justify-center rounded-md",
          "text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
        ),
        button_next: cn(
          "absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 z-10",
          "inline-flex items-center justify-center rounded-md",
          "text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "",
        weekday:
          "text-muted-foreground font-normal text-[0.8rem] pb-2 text-center",
        week: "",
        day: cn(
          "relative p-0.5 text-center text-sm",
          "focus-within:relative focus-within:z-20"
        ),
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal cursor-pointer",
          "hover:bg-accent hover:text-accent-foreground",
          "aria-selected:opacity-100"
        ),
        selected:
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground [&>button]:focus:bg-primary [&>button]:focus:text-primary-foreground",
        today: "[&>button]:bg-accent [&>button]:text-accent-foreground",
        outside:
          "text-muted-foreground opacity-50 [&>button]:text-muted-foreground [&>button]:opacity-50",
        disabled: "[&>button]:text-muted-foreground [&>button]:opacity-50 [&>button]:cursor-not-allowed",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...props }) => {
          if (orientation === "left") {
            return <ChevronLeftIcon className="h-4 w-4" {...props} />
          }
          return <ChevronRightIcon className="h-4 w-4" {...props} />
        },
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
