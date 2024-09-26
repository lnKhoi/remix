import tiktokCover from '~/assets/tiktok-cover.jpeg';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '~/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

import { Link } from '@remix-run/react';

export default function ContentManagment() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Card className="overflow-hidden">
        <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-muted/40">
          <Link
            to="#"
            className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
          
          >
            <span className="sr-only">Social Media Dashboard</span>
          </Link>
          <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
            <Link to="#" className="font-bold" >
              Instagram
            </Link>
            <Link to="#" className="text-muted-foreground" >
              TikTok
            </Link>
            <Link to="#" className="text-muted-foreground" >
              Facebook
            </Link>
            <Link to="#" className="text-muted-foreground" >
              Twitter
            </Link>
          </nav>
        </header>
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
          <div className="max-w-6xl mx-auto w-full flex items-center gap-4 justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 justify-between max-w-60"
                >
                  <span>Filter by Campaign</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-full">
                <DropdownMenuLabel>Select Campaign</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Summer Collection
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Holiday Promo
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Back to School
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 justify-between max-w-60"
                >
                  <span>Filter by Influencer</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-full">
                <DropdownMenuLabel>Select Influencer</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  @jaredpalmer
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>@shadcn</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>@maxleiter</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>@shuding_</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl w-full mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={tiktokCover}
                  width={400}
                  height={400}
                  alt="Image"
                  className="object-cover w-full aspect-auto"
                />
              </CardContent>
              <CardFooter className="grid gap-2 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <EyeIcon className="w-4 h-4" />
                    <span>1.2K views</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <HeartIcon className="w-4 h-4" />
                    <span>250 likes</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Summer Collection</Badge>
                  <Badge variant="outline">@jaredpalmer</Badge>
                </div>
              </CardFooter>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={tiktokCover}
                  width={400}
                  height={400}
                  alt="Image"
                  className="object-cover w-full aspect-auto"
                />
              </CardContent>
              <CardFooter className="grid gap-2 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <EyeIcon className="w-4 h-4" />
                    <span>800 views</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <HeartIcon className="w-4 h-4" />
                    <span>180 likes</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Holiday Promo</Badge>
                  <Badge variant="outline">@shadcn</Badge>
                </div>
              </CardFooter>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={tiktokCover}
                  width={400}
                  height={400}
                  alt="Image"
                  className="object-cover w-full aspect-auto"
                />
              </CardContent>
              <CardFooter className="grid gap-2 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <EyeIcon className="w-4 h-4" />
                    <span>1.5K views</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <HeartIcon className="w-4 h-4" />
                    <span>300 likes</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Back to School</Badge>
                  <Badge variant="outline">@maxleiter</Badge>
                </div>
              </CardFooter>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={tiktokCover}
                  width={400}
                  height={400}
                  alt="Image"
                  className="object-cover w-full aspect-auto"
                />
              </CardContent>
              <CardFooter className="grid gap-2 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <EyeIcon className="w-4 h-4" />
                    <span>2.1K views</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <HeartIcon className="w-4 h-4" />
                    <span>400 likes</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Summer Collection</Badge>
                  <Badge variant="outline">@shuding_</Badge>
                </div>
              </CardFooter>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={tiktokCover}
                  width={400}
                  height={400}
                  alt="Image"
                  className="object-cover w-full"
                />
              </CardContent>
              <CardFooter className="grid gap-2 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <EyeIcon className="w-4 h-4" />
                    <span>900 views</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <HeartIcon className="w-4 h-4" />
                    <span>150 likes</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Holiday Promo</Badge>
                  <Badge variant="outline">@jaredpalmer</Badge>
                </div>
              </CardFooter>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={tiktokCover}
                  width={400}
                  height={400}
                  alt="Image"
                  className="object-cover w-full aspect-auto"
                />
              </CardContent>
              <CardFooter className="grid gap-2 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <EyeIcon className="w-4 h-4" />
                    <span>1.1K views</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <HeartIcon className="w-4 h-4" />
                    <span>220 likes</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Back to School</Badge>
                  <Badge variant="outline">@shadcn</Badge>
                </div>
              </CardFooter>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={tiktokCover}
                  width={400}
                  height={400}
                  alt="Image"
                  className="object-cover w-full aspect-auto"
                />
              </CardContent>
              <CardFooter className="grid gap-2 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <EyeIcon className="w-4 h-4" />
                    <span>1.1K views</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <HeartIcon className="w-4 h-4" />
                    <span>220 likes</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Back to School</Badge>
                  <Badge variant="outline">@shadcn</Badge>
                </div>
              </CardFooter>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={tiktokCover}
                  width={400}
                  height={400}
                  alt="Image"
                  className="object-cover w-full aspect-auto"
                />
              </CardContent>
              <CardFooter className="grid gap-2 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <EyeIcon className="w-4 h-4" />
                    <span>1.1K views</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <HeartIcon className="w-4 h-4" />
                    <span>220 likes</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Back to School</Badge>
                  <Badge variant="outline">@shadcn</Badge>
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </Card>
    </div>
  );
}

function ChevronDownIcon(props:any) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function EyeIcon(props:any) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
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
