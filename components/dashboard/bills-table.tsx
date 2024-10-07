import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { GetBills } from "@/lib/actions/bills";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";

export default async function BillsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [bills] = await Promise.all([
    GetBills(searchQuery, page, items_per_page),
  ]);

  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Bills</CardTitle>
          <Link href="/bills">
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
              <TableHead className="table-cell">Billing no.</TableHead>
              <TableHead className="table-cell">Client name</TableHead>
              <TableHead className="table-cell">Due date</TableHead>
              <TableHead className="table-cell">Penaly date</TableHead>
              <TableHead className="table-cell">Penalty</TableHead>
              <TableHead className="table-cell">Amount</TableHead>
              <TableHead className="table-cell">Payment Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bills?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p className="font-normal">{item.billing_number}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.client_id.name}</p>
                </TableCell>
                <TableCell className="font-normal">
                  {new Date(item.due_date).toDateString()}
                </TableCell>
                <TableCell className="font-normal">
                  {new Date(item.penalty_date).toDateString()}
                </TableCell>
                <TableCell className="font-normal">₱{item.penalty}</TableCell>
                <TableCell className="font-normal">₱{item.amount}</TableCell>
                <TableCell className="font-normal">
                  {item.is_paid ? (
                    <Badge variant="default">Paid</Badge>
                  ) : (
                    <Badge variant="outline">Pending</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
