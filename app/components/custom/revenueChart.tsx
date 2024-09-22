import * as React from 'react';

import { format } from 'date-fns';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from 'recharts';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '~/components/ui/chart';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { cn } from '~/lib/utils';

import { CalendarIcon } from '@radix-ui/react-icons';

export const description = "An interactive bar chart";

const chartData = [
  { date: "2024-04-01", total: 222, MRR: 150 },
  { date: "2024-04-02", total: 97, MRR: 180 },
  { date: "2024-04-03", total: 167, MRR: 120 },
  { date: "2024-04-04", total: 242, MRR: 260 },
  { date: "2024-04-05", total: 373, MRR: 290 },
  { date: "2024-04-06", total: 301, MRR: 340 },
  { date: "2024-04-07", total: 245, MRR: 180 },
  { date: "2024-04-08", total: 409, MRR: 320 },
  { date: "2024-04-09", total: 59, MRR: 110 },
  { date: "2024-04-10", total: 261, MRR: 190 },
  { date: "2024-04-11", total: 327, MRR: 350 },
  { date: "2024-04-12", total: 292, MRR: 210 },
  { date: "2024-04-13", total: 342, MRR: 380 },
  { date: "2024-04-14", total: 137, MRR: 220 },
  { date: "2024-04-15", total: 120, MRR: 170 },
  { date: "2024-04-16", total: 138, MRR: 190 },
  { date: "2024-04-17", total: 446, MRR: 360 },
  { date: "2024-04-18", total: 364, MRR: 410 },
  { date: "2024-04-19", total: 243, MRR: 180 },
  { date: "2024-04-20", total: 89, MRR: 150 },
  { date: "2024-04-21", total: 137, MRR: 200 },
  { date: "2024-04-22", total: 224, MRR: 170 },
  { date: "2024-04-23", total: 138, MRR: 230 },
  { date: "2024-04-24", total: 387, MRR: 290 },
  { date: "2024-04-25", total: 215, MRR: 250 },
  { date: "2024-04-26", total: 75, MRR: 130 },
  { date: "2024-04-27", total: 383, MRR: 420 },
  { date: "2024-04-28", total: 122, MRR: 180 },
  { date: "2024-04-29", total: 315, MRR: 240 },
  { date: "2024-04-30", total: 454, MRR: 380 },
  { date: "2024-05-01", total: 165, MRR: 220 },
  { date: "2024-05-02", total: 293, MRR: 310 },
  { date: "2024-05-03", total: 247, MRR: 190 },
  { date: "2024-05-04", total: 385, MRR: 420 },
  { date: "2024-05-05", total: 481, MRR: 390 },
  { date: "2024-05-06", total: 498, MRR: 520 },
  { date: "2024-05-07", total: 388, MRR: 300 },
  { date: "2024-05-08", total: 149, MRR: 210 },
  { date: "2024-05-09", total: 227, MRR: 180 },
  { date: "2024-05-10", total: 293, MRR: 330 },
  { date: "2024-05-11", total: 335, MRR: 270 },
  { date: "2024-05-12", total: 197, MRR: 240 },
  { date: "2024-05-13", total: 197, MRR: 160 },
  { date: "2024-05-14", total: 448, MRR: 490 },
  { date: "2024-05-15", total: 473, MRR: 380 },
  { date: "2024-05-16", total: 338, MRR: 400 },
  { date: "2024-05-17", total: 499, MRR: 420 },
  { date: "2024-05-18", total: 315, MRR: 350 },
  { date: "2024-05-19", total: 235, MRR: 180 },
  { date: "2024-05-20", total: 177, MRR: 230 },
  { date: "2024-05-21", total: 82, MRR: 140 },
  { date: "2024-05-22", total: 81, MRR: 120 },
  { date: "2024-05-23", total: 252, MRR: 290 },
  { date: "2024-05-24", total: 294, MRR: 220 },
  { date: "2024-05-25", total: 201, MRR: 250 },
  { date: "2024-05-26", total: 213, MRR: 170 },
  { date: "2024-05-27", total: 420, MRR: 460 },
  { date: "2024-05-28", total: 233, MRR: 190 },
  { date: "2024-05-29", total: 78, MRR: 130 },
  { date: "2024-05-30", total: 340, MRR: 280 },
  { date: "2024-05-31", total: 178, MRR: 230 },
  { date: "2024-06-01", total: 178, MRR: 200 },
  { date: "2024-06-02", total: 470, MRR: 410 },
  { date: "2024-06-03", total: 103, MRR: 160 },
  { date: "2024-06-04", total: 439, MRR: 380 },
  { date: "2024-06-05", total: 88, MRR: 140 },
  { date: "2024-06-06", total: 294, MRR: 250 },
  { date: "2024-06-07", total: 323, MRR: 370 },
  { date: "2024-06-08", total: 385, MRR: 320 },
  { date: "2024-06-09", total: 438, MRR: 480 },
  { date: "2024-06-10", total: 155, MRR: 200 },
  { date: "2024-06-11", total: 92, MRR: 150 },
  { date: "2024-06-12", total: 492, MRR: 420 },
  { date: "2024-06-13", total: 81, MRR: 130 },
  { date: "2024-06-14", total: 426, MRR: 380 },
  { date: "2024-06-15", total: 307, MRR: 350 },
  { date: "2024-06-16", total: 371, MRR: 310 },
  { date: "2024-06-17", total: 475, MRR: 520 },
  { date: "2024-06-18", total: 107, MRR: 170 },
  { date: "2024-06-19", total: 341, MRR: 290 },
  { date: "2024-06-20", total: 408, MRR: 450 },
  { date: "2024-06-21", total: 169, MRR: 210 },
  { date: "2024-06-22", total: 317, MRR: 270 },
  { date: "2024-06-23", total: 480, MRR: 530 },
  { date: "2024-06-24", total: 132, MRR: 180 },
  { date: "2024-06-25", total: 141, MRR: 190 },
  { date: "2024-06-26", total: 434, MRR: 380 },
  { date: "2024-06-27", total: 448, MRR: 490 },
  { date: "2024-06-28", total: 149, MRR: 200 },
  { date: "2024-06-29", total: 103, MRR: 160 },
  { date: "2024-06-30", total: 446, MRR: 400 },
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
  MRR: {
    label: "MRR",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function RevenueChart() {
  const [date, setDate] = React.useState<Date>();
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("total");

  const total = React.useMemo(
    () => ({
      total: chartData.reduce((acc, curr) => acc + curr.total, 0),
      MRR: chartData.reduce((acc, curr) => acc + curr.MRR, 0),
    }),
    []
  );

  const className = "datetimeRange";
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Revenue</CardTitle>
          <CardDescription>
            <div className={cn("grid gap-2", className)}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                  // @ts-ignore
                    initialFocus
                    mode="range"
                    // @ts-ignore
                    defaultMonth={date?.from as any}
                    selected={date as any}
                    onSelect={setDate as any}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardDescription>
        </div>
        <div className="flex">
          {["total", "MRR"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
