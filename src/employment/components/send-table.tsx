import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, RadioGroup, FormControlLabel, Radio, Stack, Button } from '@mui/material';
import { useEmployeesContext } from './provider/employee-context';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import employeeService from '../services/employee';
import RHFTextField from '../../shared/components/form/rhf-text-field';
import FormProvider from '../../shared/components/form/form-provider';
import { useForm } from 'react-hook-form';
import { SendEmployeesDate } from '../types/employee-types';
import CircularProgress from '@mui/material/CircularProgress';


interface TableProps {
  columns: { key: string; label: string }[];
  selectedEmployeeIds: number[];
}

const SendTable: React.FC<TableProps> = ({ columns, selectedEmployeeIds }) => {
  const { employees, setSelected, setOpenDialog } = useEmployeesContext();
  const { enqueueSnackbar } = useSnackbar();
  const [sendOption, setSendOption] = useState("sendNow");
  const [isLoading, setIsLoading] = useState(false);
  const fechaActual = new Date();

  const methods = useForm<SendEmployeesDate>({
    defaultValues: {
      fechaEnviaSueldos: fechaActual.toISOString().split('.')[0],
      fechaLiquidacionSueldos: '',
      employeeLits: selectedEmployeeIds.map(id => ({ id })),
    },
  });


  const { handleSubmit, setValue, reset, formState: { isValid } } = methods;

  const filteredEmployees = employees.filter(employee =>
    selectedEmployeeIds.includes(employee.id)
  );

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    const areaA = a.areaAdministrativa?.nombre || '';
    const areaB = b.areaAdministrativa?.nombre || '';
    return areaA.localeCompare(areaB);
  });

  const sendMutation = useMutation({
    mutationFn: employeeService.programarEnvioRecibosSueldo,
    onSuccess: () => {
      enqueueSnackbar("¡Envío exitoso!", { variant: 'success' });
      reset();
      setSelected(new Set());
      setIsLoading(false);
      setOpenDialog(false);
    },
    onError: () => {
      enqueueSnackbar("Hubo un error al enviar los datos. Por favor, inténtalo nuevamente.", { variant: 'error' });
      setIsLoading(false);
    },
  });

  const handleSendOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSendOption(value);
    if (value === "sendNow") {
      setValue("fechaEnviaSueldos", new Date().toISOString().split('T')[0]);
    }
  };

  const onSubmit = (data: SendEmployeesDate) => {
    const payload = {
      fechaEjecucion: data.fechaEnviaSueldos,
      fechaLiquidacion: data.fechaLiquidacionSueldos,
      empleadosEnviar: data.employeeLits,
    };
    setIsLoading(true);
    sendMutation.mutate(payload);
  };



  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#e7e7e7', boxShadow: 30 }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEmployees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: '0.8rem', width: '150px' }}>{employee.nombre}</TableCell>
                <TableCell sx={{ fontSize: '0.8rem', width: '150px' }}>{employee.apellido}</TableCell>
                <TableCell sx={{ fontSize: '0.8rem' }}>{employee.legajo}</TableCell>
                <TableCell sx={{ fontSize: '0.8rem', width: 500 }}>{employee.areaAdministrativa?.nombre || 'Área no disponible'}</TableCell>
                <TableCell sx={{ fontSize: '0.8rem', width: '150px' }}>{employee.sueldos?.[0]?.fechaLiquidacion || 'Fecha de liquidación no disponible'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          marginTop={5}
          marginBottom={5}
        >
          <RadioGroup
            name="sendOption"
            value={sendOption}
            onChange={handleSendOptionChange}
            row
          >
            <FormControlLabel
              value="sendNow"
              control={<Radio color="primary" />}
              label="Enviar ahora"
            />
            <FormControlLabel
              value="scheduleSend"
              control={<Radio color="primary" />}
              label="Programar envío"
              disabled
            />
          </RadioGroup>
        </Stack>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={5}>
            {sendOption === "scheduleSend" && (
              <RHFTextField
                name="fechaEnviaSueldos"
                label="Fecha de Envío "
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: new Date().toISOString().split("T")[0] }}
                required
              />
            )}

            <RHFTextField
              name="fechaLiquidacionSueldos"
              label="Fecha de Liquidación de sueldos"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />

            <Button
              type='submit'
              variant='contained'
              loading={isLoading}
              disabled={!isValid || isLoading}
            >
              {isLoading ? <CircularProgress /> : 'Confirmar'}
            </Button>
          </Stack>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default SendTable;
