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
  DropdownMenuSeparator,
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
import UpdateButton from "./update-button";
import DeleteButton from "./delete-button";
import { TablePagination } from "./pagination";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { GetBills, GetTotalBills } from "@/lib/actions/bills";

export default async function BillsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [totalBills, bills] = await Promise.all([
    GetTotalBills(),
    GetBills(searchQuery, page, items_per_page),
  ]);

  console.log(bills)
  
  const totalPages = Math.ceil(totalBills / items_per_page);
  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Bills</CardTitle>
        <CardDescription>Manage bills.</CardDescription>
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
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
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
                        <UpdateButton id={item.id} />
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
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
          <strong>{Math.min(page * items_per_page, totalBills)}</strong> of{" "}
          <strong>{totalBills}</strong>
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
