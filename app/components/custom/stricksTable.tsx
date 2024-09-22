"use client";

import * as React from 'react';

import { CsvImporter } from '~/components/custom/csvImporter';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';

export const dataConfig = {
  users: [
    {
      id: "2793478372",
      name: "Alice Johnson",
      platform: "Instagram",
      email: "alice.johnson@example.com",
      country: "USA",
      score: 95,
    },
    {
      id: "2793478372",
      name: "Bob Smith",
      platform: "YouTube",
      email: "bob.smith@example.com",
      country: "Canada",
      score: 88,
    },
    {
      id: "2793478372",
      name: "Charlie Brown",
      platform: "TikTok",
      email: "charlie.brown@example.com",
      country: "UK",
      score: 92,
    },
    {
      id: "2793478372",
      name: "Diana Prince",
      platform: "Twitter",
      email: "diana.prince@example.com",
      country: "Australia",
      score: 85,
    },
    {
      id: "2793478372",
      name: "Ethan Hunt",
      platform: "Facebook",
      email: "ethan.hunt@example.com",
      country: "Germany",
      score: 89,
    },
    {
      id: "2793478372",
      name: "Fiona Gallagher",
      platform: "LinkedIn",
      email: "fiona.gallagher@example.com",
      country: "Ireland",
      score: 91,
    },
    {
      id: "2793478372",
      name: "George Clooney",
      platform: "Instagram",
      email: "george.clooney@example.com",
      country: "Italy",
      score: 87,
    },
    {
      id: "2793478372",
      name: "Hannah Montana",
      platform: "YouTube",
      email: "hannah.montana@example.com",
      country: "Spain",
      score: 90,
    },
    {
      id: "2793478372",
      name: "Isaac Newton",
      platform: "TikTok",
      email: "isaac.newton@example.com",
      country: "Netherlands",
      score: 93,
    },
    {
      id: "2793478372",
      name: "Julia Roberts",
      platform: "Twitter",
      email: "julia.roberts@example.com",
      country: "France",
      score: 86,
    },
    {
      id: "2793478372",
      name: "Kevin Hart",
      platform: "Facebook",
      email: "kevin.hart@example.com",
      country: "Brazil",
      score: 94,
    },
    {
      id: "2793478372",
      name: "Linda Carter",
      platform: "LinkedIn",
      email: "linda.carter@example.com",
      country: "Sweden",
      score: 84,
    },
    {
      id: "2793478372",
      name: "Michael Jordan",
      platform: "Instagram",
      email: "michael.jordan@example.com",
      country: "USA",
      score: 97,
    },
    {
      id: "2793478372",
      name: "Nina Simone",
      platform: "YouTube",
      email: "nina.simone@example.com",
      country: "South Africa",
      score: 89,
    },
    {
      id: "2793478372",
      name: "Oscar Wilde",
      platform: "TikTok",
      email: "oscar.wilde@example.com",
      country: "Ireland",
      score: 92,
    },
    {
      id: "2793478372",
      name: "Pablo Picasso",
      platform: "Twitter",
      email: "pablo.picasso@example.com",
      country: "Spain",
      score: 90,
    },
  ],
};

export function TricksTable() {
  const [data, setData] = React.useState(dataConfig.users);

  return (
    <div className="flex flex-col gap-4">
      <CsvImporter
        fields={[
          { label: "Name", value: "name", required: true },
          { label: "Platform", value: "platform" },
          { label: "Email", value: "email" },
          { label: "Country", value: "country" },
          { label: "Score", value: "score" },
        ]}
        onImport={(parsedData) => {
          const formattedData = parsedData.map((item) => ({
            id: crypto.randomUUID(),
            name: String(item.name ?? ""),
            platform: String(item.platform ?? ""),
            email: String(item.email ?? ""),
            country: String(item.country ?? ""),
            score: Number.isNaN(Number(item.score)) ? 0 : Number(item.points),
          }));

          setData((prev) => [...prev, ...formattedData]);
        }}
        className="self-end"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Name</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <span className="line-clamp-1">{item.name}</span>
                </TableCell>
                <TableCell>
                  <span className="line-clamp-1">{item.platform}</span>
                </TableCell>
                <TableCell>
                  <span className="line-clamp-1">{item.email}</span>
                </TableCell>
                <TableCell>
                  <span className="line-clamp-1">{item.country}</span>
                </TableCell>
                <TableCell>
                  <span className="line-clamp-1">{item.score}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
