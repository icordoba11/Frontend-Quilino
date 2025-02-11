import { Empleado } from "../../employment/types/employee-types";

export interface HistoricListData {
    Id: number;
    NombreArchivo: string;
    FechaLiquidacion: string;
    EmpleadoId: number;
    Empleado?: Empleado;
  
}

