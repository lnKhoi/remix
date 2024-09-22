import placeholder from '~/assets/placeholder.svg';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardDescription,
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

import {
  Link,
  useNavigate,
} from '@remix-run/react';

export default function Campaign() {
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate("/manager/creator/1");
  };
  return (
    <div className="grid min-h-screen w-full grid-cols-1 gap-6 p-4 sm:p-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="#">Campaigns</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>001</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="grid gap-1">
              <CardDescription>Total Clicks</CardDescription>
              <CardTitle className="text-4xl">12,345</CardTitle>
            </div>
            <div className="grid gap-1">
              <CardDescription>Conversion Rate</CardDescription>
              <CardTitle className="text-4xl">15.2%</CardTitle>
            </div>
            <div className="grid gap-1">
              <CardDescription>Cost per Conversion</CardDescription>
              <CardTitle className="text-4xl">$4.50</CardTitle>
            </div>
            <div className="grid gap-1">
              <CardDescription>Total Cost</CardDescription>
              <CardTitle className="text-4xl">$2,500</CardTitle>
            </div>
            <div className="grid gap-1">
              <CardDescription>Total Product Cost</CardDescription>
              <CardTitle className="text-4xl">$5,000</CardTitle>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>Influencer Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Influencer</TableHead>
                  <TableHead>Click Rate</TableHead>
                  <TableHead>Conversion Rate</TableHead>
                  <TableHead>Cost per Conversion</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Posted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow onClick={() => handleRowClick()}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>I1</AvatarFallback>
                      </Avatar>
                      <div>Influencer 1</div>
                    </div>
                  </TableCell>
                  <TableCell>12.5%</TableCell>
                  <TableCell>8.2%</TableCell>
                  <TableCell>$3.75</TableCell>
                  <TableCell>
                    <Link to="#" className="underline">
                      View Content
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">Yes</Badge>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick()}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>I2</AvatarFallback>
                      </Avatar>
                      <div>Influencer 2</div>
                    </div>
                  </TableCell>
                  <TableCell>9.7%</TableCell>
                  <TableCell>6.5%</TableCell>
                  <TableCell>$4.25</TableCell>
                  <TableCell>
                    <Link to="#" className="underline">
                      View Content
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">No</Badge>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick()}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>I3</AvatarFallback>
                      </Avatar>
                      <div>Influencer 3</div>
                    </div>
                  </TableCell>
                  <TableCell>14.3%</TableCell>
                  <TableCell>10.1%</TableCell>
                  <TableCell>$3.25</TableCell>
                  <TableCell>
                    <Link to="#" className="underline" >
                      View Content
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">Yes</Badge>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick()}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>I4</AvatarFallback>
                      </Avatar>
                      <div>Influencer 4</div>
                    </div>
                  </TableCell>
                  <TableCell>11.8%</TableCell>
                  <TableCell>7.9%</TableCell>
                  <TableCell>$4.00</TableCell>
                  <TableCell>
                    <Link to="#" className="underline">
                      View Content
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">No</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>Instagram Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <img
                src={placeholder}
                width={300}
                height={300}
                alt="Instagram Post 1"
                className="aspect-square rounded-md object-cover"
              />
              <img
                src={placeholder}
                width={300}
                height={300}
                alt="Instagram Post 2"
                className="aspect-square rounded-md object-cover"
              />
              <img
                src={placeholder}
                width={300}
                height={300}
                alt="Instagram Post 3"
                className="aspect-square rounded-md object-cover"
              />
              <img
                src={placeholder}
                width={300}
                height={300}
                alt="Instagram Post 4"
                className="aspect-square rounded-md object-cover"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
