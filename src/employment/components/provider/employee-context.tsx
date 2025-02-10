import React, { createContext, useContext, useState } from "react";
import { Empleado } from "../../types/employee-types";


interface EmployeesContextType {
    employees: Empleado[];
    setEmployees: React.Dispatch<React.SetStateAction<Empleado[]>>;
    isLoading?: boolean;
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    selected: Set<number>;
    setSelected: React.Dispatch<React.SetStateAction<Set<number>>>;
    IsError?: boolean;
    setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
    openDialog: boolean;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}


const EmployeesContext = createContext<EmployeesContextType | undefined>(undefined);


export const EmployeesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [employees, setEmployees] = useState<Empleado[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState<Set<number>>(new Set());
    const [IsError, setIsError] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);


    return (
        <EmployeesContext.Provider value={{
            employees,
            setEmployees,
            isLoading,
            setIsLoading,
            selected,
            setSelected,
            IsError,
            setIsError,
            openDialog,
            setOpenDialog

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
