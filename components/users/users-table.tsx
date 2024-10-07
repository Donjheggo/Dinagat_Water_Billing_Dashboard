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
import { GetUsers, TotalUsers } from "@/lib/actions/users";
import { TablePagination } from "./pagination";
import DeleteButton from "./delete-button";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

export default async function UsersTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [totalUsers, users] = await Promise.all([
    TotalUsers(),
    GetUsers(searchQuery, page, items_per_page),
  ]);

  const totalPages = Math.ceil(totalUsers / items_per_page);
  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>Manage users.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Email</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold">{item.email}</TableCell>

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
          Showing <strong>{(page - 1) * items_per_page + 1}</strong>-
          <strong>{Math.min(page * items_per_page, totalUsers)}</strong> of{" "}
          <strong>{totalUsers}</strong> users
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
