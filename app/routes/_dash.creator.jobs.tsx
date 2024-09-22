import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';

import { Link } from '@remix-run/react';

export default function CreatorJobs() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Client</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Blog Content Creation</div>
                    </TableCell>
                    <TableCell>
                      <div>2023-06-30</div>
                    </TableCell>
                    <TableCell>
                      <div>Acme Inc</div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Social Media Graphics</div>
                    </TableCell>
                    <TableCell>
                      <div>2023-07-15</div>
                    </TableCell>
                    <TableCell>
                      <div>Globex Corp</div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Product Photography</div>
                    </TableCell>
                    <TableCell>
                      <div>2023-08-01</div>
                    </TableCell>
                    <TableCell>
                      <div>Stark Industries</div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Completed Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Completed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Website Design</div>
                    </TableCell>
                    <TableCell>
                      <div>Stark Industries</div>
                    </TableCell>
                    <TableCell>
                      <div>2023-04-15</div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Video Production</div>
                    </TableCell>
                    <TableCell>
                      <div>Globex Corp</div>
                    </TableCell>
                    <TableCell>
                      <div>2023-05-01</div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Branding Guidelines</div>
                    </TableCell>
                    <TableCell>
                      <div>Acme Inc</div>
                    </TableCell>
                    <TableCell>
                      <div>2023-06-01</div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Available Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>
                      <span className="sr-only">Apply</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Graphic Designer</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        Create visually appealing graphics for social media and
                        marketing materials.
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>Acme Inc</div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Apply
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Content Writer</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        Write engaging and informative blog posts and website
                        content.
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>Globex Corp</div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Apply
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Videographer</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        Capture high-quality video footage for product
                        demonstrations and marketing campaigns.
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>Stark Industries</div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Apply
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Favorite Brands</h2>
              <Link
              to='#'
                className="text-primary hover:underline"
                prefetch={false as any}
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Acme Inc.</h3>
                      <p className="text-sm text-muted-foreground">Lifestyle</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <HeartIcon className="w-5 h-5 fill-primary" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Acme Inc. is a leading lifestyle brand known for their
                    high-quality products and innovative marketing campaigns.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Widgets Co.</h3>
                      <p className="text-sm text-muted-foreground">
                        Technology
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <HeartIcon className="w-5 h-5 fill-primary" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Widgets Co. is a tech startup known for their innovative
                    products and cutting-edge design.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Gizmos Inc.</h3>
                      <p className="text-sm text-muted-foreground">
                        Technology
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <HeartIcon className="w-5 h-5 fill-primary" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Gizmos Inc. is a leading technology company known for their
                    high-quality gadgets and electronics.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Fashions Unlimited
                      </h3>
                      <p className="text-sm text-muted-foreground">Fashion</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <HeartIcon className="w-5 h-5 fill-primary" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Fashions Unlimited is a fashion brand known for their trendy
                    and affordable clothing lines.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
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
