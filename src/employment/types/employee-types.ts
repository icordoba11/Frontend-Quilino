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
  id: number;
  nombre: string;
}

interface AreaAdministrativa {
  id: number;
  nombre: string;
}

interface Categoria {
  id: number;
  nombre: string;
}

interface UbicacionTrabajo {
  id: number;
  nombre: string;
  geolocalizacion: string | null;
}

interface Responsabilidad {
  id: number;
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
  fechaLiquidacion: string;
  empleadosEnviar?: EmployeeId[];
}

type EmployeeId = {
  id: number;
}

export interface updateEmployeeSchema {

  Identificadores: {
    Id: number;
    Legajo: number | null;
    IdentificadorUnico: null;
    IdentificadorUnicoLaboral: null;
  },
  Repetibles: {
    Nombre: string | null;
    Apellido: string | null;
    Genero: string | null;
    CondicionImpositiva: string | null;
    HorasDiarias: number | null;
    FechaNacimiento: string | null;
    FuncionId: number | null;
    FechaIngreso: string | null;
    TipoEmpleadoId: number | null;
    AreaAdministrativaId: number | null;
    CategoriaId: number | null;
    UbicacionTrabajoId: number | null;
    ResponsabilidadId: number | null;
  },
  Unicos: {
    Celular: string | null;
    Email: string | null;
    NumeroJubilacion: number | null;
  }

};


//Areas

export type areaType = {
  id: string;
  nombre: string;
}

export type areaTypeResponsabilidad = {
  id: string;
  categoria: string;
  cantidadPersonas: number | string;
}


export interface FormValues {
  nombre: string | null;
  apellido: string | null;
  genero: string | null;
  fechaNacimiento: string | null;
  celular: string | null;
  email: string | null;
  horasDiarias: number | null;
  fechaIngreso: string | null;
  condicionImpositiva: string | null;
  funcion: number | null;
  tipo: number | null;
  categoria: number | null;
  areaAdministrativa: number | null;
  ubicacionTrabajo: number | null;
  responsabilidad: number | null
}

