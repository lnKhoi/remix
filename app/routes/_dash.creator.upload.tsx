import placeholder from '~/assets/placeholder.svg';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

export default function CreatorUpload() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 gap-4 md:gap-8">
        <div className="grid w-full gap-4 md:grid-cols-[minmax(200px,_1fr)_2fr]">
          <div className="rounded-lg border bg-background p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Campaigns</h2>
              <Button variant="secondary" size="sm">
                <PlusIcon className="h-4 w-4" />
                New Campaign
              </Button>
            </div>
            <div className="grid gap-2">
              <Card>
                <CardHeader>
                  <CardTitle>Summer Promotion</CardTitle>
                  <CardDescription>
                    Promote our summer product line
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <FilePenIcon className="h-4 w-4" />
                      <span className="sr-only">Edit campaign</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete campaign</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Holiday Deals</CardTitle>
                  <CardDescription>
                    Promote our holiday product line
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <FilePenIcon className="h-4 w-4" />
                      <span className="sr-only">Edit campaign</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete campaign</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Back to School</CardTitle>
                  <CardDescription>
                    Promote our back to school product line
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <Badge variant="outline">Paused</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <FilePenIcon className="h-4 w-4" />
                      <span className="sr-only">Edit campaign</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete campaign</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="rounded-lg border bg-background p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Content Library</h2>
              <Button variant="secondary" size="sm">
                <UploadIcon className="h-4 w-4" />
                Upload Content
              </Button>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <Input
                  type="search"
                  placeholder="Search content..."
                  className="flex-1 rounded-md bg-muted pl-8"
                />
                <SearchIcon className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                <Select>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="images">Images</SelectItem>
                    <SelectItem value="videos">Videos</SelectItem>
                    <SelectItem value="documents">Documents</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center pt-6">
                    <img
                      src={placeholder}
                      width="100"
                      height="100"
                      alt="Content thumbnail"
                      className="h-full w-full rounded-md object-cover"
                      style={{ aspectRatio: "100/100", objectFit: "cover" }}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <PlusIcon className="h-4 w-4" />
                      <span className="sr-only">Add to campaign</span>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center pt-6">
                    <img
                      src={placeholder}
                      width="100"
                      height="100"
                      alt="Content thumbnail"
                      className="h-full w-full rounded-md object-cover"
                      style={{ aspectRatio: "100/100", objectFit: "cover" }}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <PlusIcon className="h-4 w-4" />
                      <span className="sr-only">Add to campaign</span>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center pt-6">
                    <img
                      src={placeholder}
                      width="100"
                      height="100"
                      alt="Content thumbnail"
                      className="h-full w-full rounded-md object-cover"
                      style={{ aspectRatio: "100/100", objectFit: "cover" }}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <PlusIcon className="h-4 w-4" />
                      <span className="sr-only">Add to campaign</span>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center pt-6">
                    <img
                      src={placeholder}
                      width="100"
                      height="100"
                      alt="Content thumbnail"
                      className="h-full w-full rounded-md object-cover"
                      style={{ aspectRatio: "100/100", objectFit: "cover" }}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <PlusIcon className="h-4 w-4" />
                      <span className="sr-only">Add to campaign</span>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center pt-6">
                    <img
                      src={placeholder}
                      width="100"
                      height="100"
                      alt="Content thumbnail"
                      className="h-full w-full rounded-md object-cover"
                      style={{ aspectRatio: "100/100", objectFit: "cover" }}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <PlusIcon className="h-4 w-4" />
                      <span className="sr-only">Add to campaign</span>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center pt-6">
                    <img
                      src={placeholder}
                      width="100"
                      height="100"
                      alt="Content thumbnail"
                      className="h-full w-full rounded-md object-cover"
                      style={{ aspectRatio: "100/100", objectFit: "cover" }}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <PlusIcon className="h-4 w-4" />
                      <span className="sr-only">Add to campaign</span>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}



function FilePenIcon(props:any) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function PlusIcon(props:any) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SearchIcon(props :any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SettingsIcon(props :any) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TrashIcon(props:any) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function UploadIcon(props:any) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

// <Form className="mt-4" action="/logout" method="post">
//   <Button>Logout</Button>
// </Form>

// {videos.map((video) => (
//   <Card key={video.id}>
//     <CardHeader>
//       <CardTitle className="text-sm font-medium line-clamp-1">
//         {video.title}
//       </CardTitle>
//     </CardHeader>
//     <CardContent>
//       <img
//         src={video.cover_image_url}
//         alt={video.title}
//         className="w-full h-full object-cover rounded-md"
//       />
//       <p className="mt-2 text-xs text-gray-500">
//         Duration: {video.duration}s
//       </p>
//       <Button className="mt-2 w-full" size="sm" asChild>
//         <a
//           href={video.embed_link}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Watch Video
//         </a>
//       </Button>
//     </CardContent>
//   </Card>
// ))}
