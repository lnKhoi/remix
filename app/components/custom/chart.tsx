"use client";

import { RevenueChart } from '~/components/custom/revenueChart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { ChartContainer } from '~/components/ui/chart';

export default function Charts() {
  return (
    <div className="chart-wrapper flex flex-col flex-wrap items-start justify-center gap-6 sm:flex-row">
      <div className="w-full">
        <RevenueChart />
        <div className="flex flex-row justify-between my-6">
          <Card className="max-w-xs" x-chunk="charts-01-chunk-6">
            <CardHeader className="p-4 pb-0">
              <CardTitle>Total Reach</CardTitle>
              <CardDescription>
                You're total reach has increased by 40%. Good job!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
              <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
                80
                <span className="text-sm font-normal text-muted-foreground">
                  %
                </span>
              </div>
              <ChartContainer

                config={{
                  calories: {
                    label: "Calories",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="ml-auto w-[64px]"
              ></ChartContainer>
            </CardContent>
          </Card>
          <Card className="max-w-xs" x-chunk="charts-01-chunk-6">
            <CardHeader className="p-4 pb-0">
              <CardTitle>Total Engangment</CardTitle>
              <CardDescription>
                You're total reach has increased by 40%. Good job!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
              <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
                80
                <span className="text-sm font-normal text-muted-foreground">
                  %
                </span>
              </div>
              <ChartContainer
                config={{
                  calories: {
                    label: "Calories",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="ml-auto w-[64px]"
              ></ChartContainer>
            </CardContent>
          </Card>
          <Card className="max-w-xs" x-chunk="charts-01-chunk-6">
            <CardHeader className="p-4 pb-0">
              <CardTitle>Total Conversion</CardTitle>
              <CardDescription>
                You're total reach has increased by 40%. Good job!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
              <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
                80
                <span className="text-sm font-normal text-muted-foreground">
                  %
                </span>
              </div>
              <ChartContainer
                config={{
                  calories: {
                    label: "Calories",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="ml-auto w-[64px]"
              ></ChartContainer>
            </CardContent>
          </Card>
          <Card className="max-w-xs" x-chunk="charts-01-chunk-6">
            <CardHeader className="p-4 pb-0">
              <CardTitle>Total Clicks</CardTitle>
              <CardDescription>
                You're total reach has increased by 40%. Good job!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
              <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
                80
                <span className="text-sm font-normal text-muted-foreground">
                  %
                </span>
              </div>
              <ChartContainer
                config={{
                  calories: {
                    label: "Calories",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="ml-auto w-[64px]"
              ></ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
