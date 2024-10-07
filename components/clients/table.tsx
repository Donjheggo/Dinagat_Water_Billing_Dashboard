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
import { GetClients, GetTotalClients } from "@/lib/actions/clients";
import { TablePagination } from "./pagination";
import UpdateButton from "./update-button";
import DeleteButton from "./delete-button";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default async function ClientsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [totalClients, clients] = await Promise.all([
    GetTotalClients(),
    GetClients(searchQuery, page, items_per_page),
  ]);

  const totalPages = Math.ceil(totalClients / items_per_page);
  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Clients</CardTitle>
        <CardDescription>Manage clients.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Meter no.</TableHead>
              <TableHead className="table-cell">Name</TableHead>
              <TableHead className="table-cell">Contact No.</TableHead>
              <TableHead className="table-cell">Address</TableHead>
              <TableHead className="table-cell">Connection Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p className="font-normal">{item.meter_number}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.name}</p>
                </TableCell>
                <TableCell className="font-normal">
                  {item.contact_number}
                </TableCell>
                <TableCell className="font-normal">{item.address}</TableCell>
                <TableCell className="font-normal">
                  {item.is_connected ? (
                    <Badge variant="default">Connected</Badge>
                  ) : (
                    <Badge variant="outline">Not connected</Badge>
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
          <strong>{Math.min(page * items_per_page, totalClients)}</strong> of{" "}
          <strong>{totalClients}</strong>
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
