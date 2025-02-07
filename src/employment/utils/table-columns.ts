export const columnsFirstTable = [
    { key: 'nombre', label: 'Nombre', field: 'nombre' },
    { key: 'apellido', label: 'Apellido', field: 'apellido' },
    { key: 'legajo', label: 'Legajo', field: 'legajo' },
    { key: 'area', label: 'Área Administrativa', field: 'areaAdministrativa.nombre' },
    { key: 'fechaLiquidacion', label: 'Fecha de Liquidación', field: 'sueldos[0].fechaLiquidacion' },
    { key: 'acciones', label: '', field: 'acciones' },
];


export const columnsSelectedEmployees = [
    { key: "nombre", label: "Nombre" },
    { key: "apellido", label: "Apellido" },
    { key: "legajo", label: "Legajo" },
    { key: "area", label: "Área" },
    { key: "ultimaLiquidacion", label: "Última Liquidación" },
];
