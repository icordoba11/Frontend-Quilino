import React, { useCallback } from "react";
import PaginatedTable from "../../shared/components/table/table-paginated";
import CustomBreadcrumbs from "../../shared/components/breadcrumbs/bread-crums";
import { Container, TableBody } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";
import { User } from "../types/types";
import { paths } from "../../configs/constants/paths";
import { useRouter } from "../../hooks/use-router";
import UserTableRow from "../components/user-table-row";

const columns = [
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { field: "email", headerName: "Email" },
    { field: "role", headerName: "Role" },
    { field: "actions", headerName: "" },
];

const UsersList: React.FC = () => {
    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: () => userService.findAll(),
    });

    const router = useRouter();

    const handleEdit = useCallback(
        (id: string) => {
            router.push(paths.main.users.edit(id));
        },
        [router],

    );

    return (
        <Container>
            <CustomBreadcrumbs
                heading='User List'
                links={[{ name: 'User list' }]}
                sx={{ mb: { xs: 3, md: 5 } }}
            />
            <PaginatedTable columns={columns} data={data ?? []}>
                <TableBody>
                    {data?.map((user: User) => (
                        <UserTableRow
                            key={user.id}
                            row={user}
                            onEdit={() => handleEdit(user.id ?? '')}
                        />
                    ))}
                </TableBody>
            </PaginatedTable>
        </Container>
    );
};

export default UsersList;
