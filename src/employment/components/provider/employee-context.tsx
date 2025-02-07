import React, { createContext, useContext, useState } from "react";
import { Empleado } from "../../types/employee-types";


interface EmployeesContextType {
    employees: Empleado[];
    setEmployees: React.Dispatch<React.SetStateAction<Empleado[]>>;
    isLoading?: boolean;
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}


const EmployeesContext = createContext<EmployeesContextType | undefined>(undefined);


export const EmployeesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [employees, setEmployees] = useState<Empleado[]>([]);
    const [isLoading, setIsLoading] = useState(false);


    return (
        <EmployeesContext.Provider value={{
            employees,
            setEmployees,
            isLoading,
            setIsLoading
        }}>
            {children}
        </EmployeesContext.Provider>
    );
};

export const useEmployeesContext = () => {
    const context = useContext(EmployeesContext);
    if (!context) {
        throw new Error("useEmployeesContext debe usarse dentro de un EmployeesProvider");
    }
    return context;
};
