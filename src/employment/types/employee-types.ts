export interface Empleado {
  id: number;
  legajo: number;
  nombre: string;
  apellido: string;
  identificadorUnico: number;
  identificadorUnicoLaboral?: string;
  numeroJubilacion?: number;
  genero?: string;
  fechaNacimiento?: string;
  celular?: string;
  email?: string;
  condicionImpositiva?: string;
  fechaIngreso?: string;
  horasDiarias?: number;
  funcion: Funcion;
  tipo: Tipo;
  areaAdministrativa: AreaAdministrativa;
  categoria: Categoria;
  ubicacionTrabajo: UbicacionTrabajo;
  responsabilidad: Responsabilidad;
  estudiosAcademicos?: any[];
  objetivos?: any[];
  sueldos: ReciboDeSueldo[];
}


interface Funcion {
  id: number;
  nombre: string;
}

interface Tipo {
  nombre: string;
}

interface AreaAdministrativa {
  nombre: string;
}

interface Categoria {
  nombre: string;
}

interface UbicacionTrabajo {
  nombre: string;
}

interface Responsabilidad {
  categoria?: string;
  cantidadPersonas?: string;
}

interface ReciboDeSueldo {
  fechaLiquidacion: string;
  fechaPago: string;
  items: any[];
}

export type SendEmployeesDate = {
  fechaEnviaSueldos: string;
  fechaLiquidacionSueldos: string;
  employeeLits?: EmployeeId[];
}
export type SendEmployeesDateConvert = {
  fechaEjecucion: string;
  PeriodoLiquidacion: string;
  EmpleadosEnviar?: EmployeeId[];
}

type EmployeeId = {
  id: number;
}

export interface updateEmployeeSchema {

  Identificadores: {
    Id: number;
    Legajo: null;
    IdentificadorUnico: null;
    IdentificadorUnicoLaboral: null;
  },
  Repetibles: {
    Nombre: null;
    Apellido: null;
    Genero: null;
    CondicionImpositiva: null;
    HorasDiarias: null;
    FechaNacimiento: null;
    FechaIngreso: null;
    TipoEmpleadoId: null;
    AreaAdministrativaId: null;
    CategoriaId: null;
    UbicacionTrabajoId: null;
    ResponsabilidadId: null;
  },
  Unicos: {
    Celular: string | null;
    Email: string | null;
    NumeroJubilacion: null;
  }

};


