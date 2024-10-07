import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetPayments } from "@/lib/actions/payments";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";

export default async function PaymentsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [payments] = await Promise.all([
    GetPayments(searchQuery, page, items_per_page),
  ]);

  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Payments</CardTitle>
          <Link href="/payments">
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
              <TableHead className="table-cell">User email</TableHead>
              <TableHead className="table-cell">Client name</TableHead>
              <TableHead className="table-cell">Amount</TableHead>
              <TableHead className="table-cell">Gcash Ref no.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p className="font-normal">{item.user_id.email}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">
                    {item.billing_number.client_id.name}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">₱{item.amount}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.gcash_ref_no}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
