import React, { useCallback } from "react";
import PaginatedTable from "../../shared/components/table/table-paginated";
import CustomBreadcrumbs from "../../shared/components/breadcrumbs/bread-crums";
import { Box, Button, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";
import { User } from "../types/types";
import { paths } from "../../configs/constants/paths";
import { useRouter } from "../../hooks/use-router";
import UserTableRow from "../components/user-table-row";
import AddIcon from "@mui/icons-material/Add";



const UsersList: React.FC = () => {

    const columns = [
        { field: "nombreUsuario", headerName: "Nombre de usuario" },
        { field: "email", headerName: "Email" },
        { field: "rol", headerName: "Rol" },
        { field: "fechaRegistro", headerName: "Fecha de registro" },
        {
            field: "actions",
            headerName: "",
            renderCell: (user: User) => (
                <UserTableRow
                    key={user.id}
                    row={user}
                    onEdit={() => handleEdit(user.id ?? "")}
                />
            ),
        },
    ];

    const { data } = useQuery({
        queryKey: ["users"],
        queryFn: userService.findAll,
    });

    const router = useRouter();

    const handleEdit = useCallback((id: string) => {
        router.push(paths.main.users.edit(id));
    }, [router]);

    return (
        <Container maxWidth="md">
            <CustomBreadcrumbs
                heading="Lista de usuarios"
                links={[{ name: "Lista de usuarios" }]}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="text"
                    sx={{ m: 2, borderRadius: 4, height: 10 }}
                    startIcon={<AddIcon />}
                    onClick={() => router.replace(paths.main.users.new)}
                >
                    Crear usuario
                </Button>
            </Box>
            <PaginatedTable
                columns={columns}
                data={data ?? []}

            />
        </Container>
    );
};

export default UsersList;
