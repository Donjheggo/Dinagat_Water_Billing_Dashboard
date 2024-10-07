import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteButton from "./delete-button";
import { TablePagination } from "./pagination";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { GetPayments, GetTotalPayments } from "@/lib/actions/payments";

export default async function PaymentsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [totalPayments, payments] = await Promise.all([
    GetTotalPayments(),
    GetPayments(searchQuery, page, items_per_page),
  ]);

  const totalPages = Math.ceil(totalPayments / items_per_page);
  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Payments</CardTitle>
        <CardDescription>Manage payments.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">User email</TableHead>
              <TableHead className="table-cell">Client name</TableHead>
              <TableHead className="table-cell">Amount</TableHead>
              <TableHead className="table-cell">Gcash Ref no.</TableHead>
              <TableHead className="table-cell">Created At</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p className="font-normal">{item.user_id.email}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.billing_number.client_id.name}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">₱{item.amount}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.gcash_ref_no}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">
                    {new Date(item.created_at).toDateString()}
                  </p>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <DeleteButton id={item.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          <strong>{(page - 1) * items_per_page + 1}</strong>-
          <strong>{Math.min(page * items_per_page, totalPayments)}</strong> of{" "}
          <strong>{totalPayments}</strong>
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
