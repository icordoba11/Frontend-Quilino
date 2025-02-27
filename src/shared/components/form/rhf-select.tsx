import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';


import { useInput } from '../../../hooks/use-input';


import { SxProps } from '@mui/system';

interface RHFSelectProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  defaultValue?: string;
  format?: (value: any) => any;
  parse?: (value: any) => any;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rules?: RegisterOptions;
  native?: boolean;
  maxHeight?: number;
  PaperPropsSx?: SxProps;
  helperText?: React.ReactNode;
  isClearable?: boolean;
}

export function RHFSelect(props: RHFSelectProps) {
  const {
    name,
    defaultValue,
    format,
    parse,
    onBlur,
    onChange,
    rules,
    native,
    maxHeight = 220,
    children,
    PaperPropsSx,
    helperText,
    isClearable = true,
    ...other
  } = props;

  const {
    field,
    fieldState: { error },
  } = useInput({
    name,
    defaultValue,
    format,
    parse,
    onBlur,
    onChange,
    rules,
  });

  return (
    <TextField
      {...field}
      select
      fullWidth
      SelectProps={{
        native,
        MenuProps: {
          PaperProps: {
            sx: {
              ...(!native && {
                maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
              }),
              ...PaperPropsSx,
            },
          },
        },
        sx: { textTransform: 'capitalize' },
        // endAdornment:
        //   isClearable && field?.value ? (
        //     <IconButton
        //       size="small"
        //       sx={{ marginRight: 2 }}
        //       onClick={() => {
        //         field.onChange({ target: { value: '' } });
        //       }}
        //     >
        //       <Iconify icon="solar:close-circle-bold" className="icon" />
        //     </IconButton>
        //   ) : null,
      }}
      error={!!error}
      helperText={error ? error?.message : helperText}
      {...other}
    >
      {children}
    </TextField>
  );
}

interface Option {
  value: string | number;
  label: string;
}

interface RHFMultiSelectProps extends Omit<FormControlProps, 'name'> {
  name: string;
  chip?: boolean;
  label?: string;
  options: Option[];
  checkbox?: boolean;
  placeholder?: string;
  helperText?: React.ReactNode;
}

export function RHFMultiSelect({
  name,
  chip,
  label,
  options,
  checkbox,
  placeholder,
  helperText,
  ...other
}: RHFMultiSelectProps) {
  const { control } = useFormContext();

  const renderValues = (selectedIds: unknown[]) => {
    const selectedItems = options.filter((item) => selectedIds.includes(item.value));

    if (!selectedItems.length && placeholder) {
      return <Box sx={{ color: 'text.disabled' }}>{placeholder}</Box>;
    }

    if (chip) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selectedItems.map((item) => (
            <Chip key={item.value} size="small" label={item.label} />
          ))}
        </Box>
      );
    }

    return selectedItems.map((item) => item.label).join(', ');
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error} {...other}>
          {label && <InputLabel id={name}> {label} </InputLabel>}

          <Select
            {...field}
            multiple
            displayEmpty={!!placeholder}
            id={`multiple-${name}`}
            labelId={name}
            label={label}
            renderValue={renderValues}
          >
            {options.map((option) => {
              const selected = field.value.includes(option.value);

              return (
                <MenuItem key={option.value} value={option.value}>
                  {checkbox && <Checkbox size="small" disableRipple checked={selected} />}

                  {option.label}
                </MenuItem>
              );
            })}
          </Select>

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}