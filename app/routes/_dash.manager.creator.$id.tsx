import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
} from 'recharts';
import avatar from '~/assets/avatar.jpeg';
import placeholder from '~/assets/placeholder.svg';
import { AudienceChart } from '~/components/custom/audienceChart';
import { Badge } from '~/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '~/components/ui/chart';

import { Link } from '@remix-run/react';

export default function Profile() {
  return (
    <div>
      <Breadcrumb className="hidden md:flex mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="#">Creators</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>001</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="overflow-hidden">
        <div className="w-full bg-background">
          <header className="bg-muted px-4 py-6 md:px-6 md:py-8">
            <div className="container mx-auto flex max-w-6xl items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 md:h-24 md:w-24">
                  <img
                    src={avatar}
                    alt="Influencer Profile"
                    className="rounded-full"
                    width={96}
                    height={96}
                  />
                  <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-medium"></div>
                </div>
                <div className="grid gap-1">
                  <h1 className="text-2xl font-bold md:text-3xl">
                    Amelia Williamson
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPinIcon className="h-4 w-4" />
                    <span>Los Angeles, CA</span>
                  </div>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary"
               
                  >
                    <InstagramIcon className="h-6 w-6" />
                  </Link>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary"
               
                  >
                    <TwitterIcon className="h-6 w-6" />
                  </Link>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary"
               
                  >
                    <YoutubeIcon className="h-6 w-6" />
                  </Link>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary"
               
                  >
                    <TwitterIcon className="h-6 w-6" />
                  </Link>
                </div>
                <div className="flex gap-2">
                  <Button>Collaborate</Button>
                  <Button variant="outline">Message</Button>
                </div>
              </div>
            </div>
          </header>
          <main className="container mx-auto max-w-6xl py-8 md:py-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="col-span-1 md:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="flex flex-col">
                    <CardHeader>
                      <CardDescription>Followers</CardDescription>
                      <CardTitle>345K</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUpIcon className="h-4 w-4 text-green-500" />
                        <span>+12.5% this month</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="flex flex-col">
                    <CardHeader>
                      <CardDescription>Engagement Rate</CardDescription>
                      <CardTitle>5.6%</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <TrendingDownIcon className="h-4 w-4 text-red-500" />
                        <span>-1.2% this month</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="flex flex-col">
                    <CardHeader>
                      <CardDescription>Audience Age</CardDescription>
                      <CardTitle>25-34 years</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <UsersIcon className="h-4 w-4" />
                        <span>65% female, 35% male</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="flex flex-col">
                    <CardHeader>
                      <CardDescription>Audience Location</CardDescription>
                      <CardTitle>United States</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPinIcon className="h-4 w-4" />
                        <span>Top cities: Los Angeles, New York, Chicago</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="col-span-1">
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Influence Score</CardTitle>
                    <CardDescription>
                      Estimated influence based on followers, engagement, and
                      content.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex items-center justify-center">
                    <div className="text-6xl font-bold">87</div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3">
              <div className="col-span-1 md:col-span-2">
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Engagement Metrics</CardTitle>
                    <CardDescription>
                      Average engagement rate, likes, comments, and shares.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <LinechartChart className="aspect-[9/4]" />
                  </CardContent>
                </Card>
              </div>
              <div className="col-span-1">
                <AudienceChart />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 mt-8">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Portfolio</CardTitle>
                  <CardDescription>
                    Past collaborations and sponsored content.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <img
                      src={placeholder}
                      width={400}
                      height={225}
                      alt="Portfolio Item"
                      className="rounded-lg object-cover aspect-video"
                    />
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Sponsored Post</div>
                      <Badge variant="secondary">Skincare</Badge>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <img
                      src={placeholder}
                      width={400}
                      height={225}
                      alt="Portfolio Item"
                      className="rounded-lg object-cover aspect-video"
                    />
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Collaboration</div>
                      <Badge variant="secondary">Fashion</Badge>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <img
                      src={placeholder}
                      width={400}
                      height={225}
                      alt="Portfolio Item"
                      className="rounded-lg object-cover aspect-video"
                    />
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">
                        Sponsored Content
                      </div>
                      <Badge variant="secondary">Travel</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </Card>
    </div>
  );
}

function InstagramIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinechartChart(props:any) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-3a))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

function MapPinIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}


function TrendingDownIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  );
}

function TrendingUpIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function TwitterIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function UsersIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}


function YoutubeIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}
