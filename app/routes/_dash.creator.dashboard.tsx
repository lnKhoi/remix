import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from 'recharts';
import placeholder from '~/assets/placeholder.svg';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/components/ui/avatar';
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Separator } from '~/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '~/components/ui/tabs';

export default function CreatorDashboard() {

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <Card className="sm:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Connect Your Accounts</CardTitle>
              <CardDescription>
                Seamlessly connect your Instagram, TikTok, and Facebook accounts
                to import your content and metrics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center p-6 bg-background rounded-lg">
                  <InstagramIcon className="w-8 h-8 mb-4 text-[#e1306c]" />
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    Connected
                  </Button>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-background rounded-lg">
                  <TwitterIcon className="w-8 h-8 mb-4 text-[#69c9d0]" />
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    Connect
                  </Button>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-background rounded-lg">
                  <FacebookIcon className="w-8 h-8 mb-4 text-[#1877f2]" />
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Your Content</CardTitle>
              <CardDescription>
                View, filter, and manage your imported content from connected
                accounts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="instagram">Instagram</TabsTrigger>
                    <TabsTrigger value="tiktok">TikTok</TabsTrigger>
                    <TabsTrigger value="facebook">Facebook</TabsTrigger>
                  </TabsList>
                  <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 gap-1 text-sm"
                        >
                          <div className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only">Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Images
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Videos
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Reels
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Stories
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-sm"
                    >
                      <div className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Export</span>
                    </Button>
                  </div>
                </div>
                <TabsContent value="all">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <img
                          src={placeholder}
                          width={400}
                          height={400}
                          alt="Content"
                          className="object-cover aspect-square rounded-lg"
                        />
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage
                                src="/placeholder-user.jpg"
                                alt="@shadcn"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium">@shadcn</div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <HeartIcon className="w-4 h-4" />
                            <span>1.2K</span>
                            <MessageCircleIcon className="w-4 h-4" />
                            <span>120</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <img
                          src={placeholder}
                          width={400}
                          height={400}
                          alt="Content"
                          className="object-cover aspect-square rounded-lg"
                        />
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage
                                src="/placeholder-user.jpg"
                                alt="@jaredpalmer"
                              />
                              <AvatarFallback>JP</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium">
                              @jaredpalmer
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <HeartIcon className="w-4 h-4" />
                            <span>2.5K</span>
                            <MessageCircleIcon className="w-4 h-4" />
                            <span>250</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <img
                          src={placeholder}
                          width={400}
                          height={400}
                          alt="Content"
                          className="object-cover aspect-square rounded-lg"
                        />
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage
                                src="/placeholder-user.jpg"
                                alt="@maxleiter"
                              />
                              <AvatarFallback>ML</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium">
                              @maxleiter
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <HeartIcon className="w-4 h-4" />
                            <span>800</span>
                            <MessageCircleIcon className="w-4 h-4" />
                            <span>80</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <img
                          src={placeholder}
                          width={400}
                          height={400}
                          alt="Content"
                          className="object-cover aspect-square rounded-lg"
                        />
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage
                                src="/placeholder-user.jpg"
                                alt="@shuding_"
                              />
                              <AvatarFallback>SD</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium">@shuding_</div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <HeartIcon className="w-4 h-4" />
                            <span>1.5K</span>
                            <MessageCircleIcon className="w-4 h-4" />
                            <span>150</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="text-lg">Your Performance</CardTitle>
                <CardDescription>
                  View your content performance metrics at a glance.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center justify-center p-4 bg-background rounded-lg">
                    <div className="text-2xl font-bold">12.3K</div>
                    <div className="text-sm text-muted-foreground">
                      Followers
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-background rounded-lg">
                    <div className="text-2xl font-bold">2.5K</div>
                    <div className="text-sm text-muted-foreground">Likes</div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-background rounded-lg">
                    <div className="text-2xl font-bold">350</div>
                    <div className="text-sm text-muted-foreground">
                      Comments
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-background rounded-lg">
                    <div className="text-2xl font-bold">120</div>
                    <div className="text-sm text-muted-foreground">Shares</div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Content Performance</div>
                  <BarchartChart />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function BarchartChart(props:any) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="min-h-[200px]"
      >
        <BarChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

function FacebookIcon(props:any) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function HeartIcon(props:any) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
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



function MessageCircleIcon(props:any) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
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
