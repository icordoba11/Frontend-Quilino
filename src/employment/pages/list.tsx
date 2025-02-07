import TableEmployees from "../components/table-employees";
import { EmployeesProvider } from "../components/provider/employee-context";

const EmployeesList = () => {

    return (
        <EmployeesProvider>
            <TableEmployees />
        </EmployeesProvider>
    );
};

export default EmployeesList;


