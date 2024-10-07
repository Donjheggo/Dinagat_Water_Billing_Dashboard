import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetCustomers } from "@/lib/actions/customers";
import { MoveUpRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default async function CustomersTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [customers] = await Promise.all([
    GetCustomers(searchQuery, page, items_per_page),
  ]);

  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Customers</CardTitle>
          <Link href="/customers">
            <Button variant="outline" className="flex items-center">
              View More
              <MoveUpRight size={18} className="ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Name</TableHead>
              <TableHead className="table-cell">Contact Number</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p className="font-semibold text-lg">{item.name}</p>
                </TableCell>
                <TableCell className="font-normal">
                  {item.contact_number}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
