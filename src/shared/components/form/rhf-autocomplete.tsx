import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

interface Option {
  value: string | number;
  label: string;
}

interface RHFAutocompleteProps
  extends Omit<AutocompleteProps<Option, false, false, false>, 'renderInput'> {
  name: string;
  label: string;
  helperText?: string;
  placeholder?: string;
}

export default function RHFAutocomplete({
  name,
  label,
  helperText,
  placeholder,
  ...other
}: RHFAutocompleteProps) {
  const { control, setValue } = useFormContext();

  const getOptionLabel = (option: Option) => {
    return option.label ?? ''; // Aseguramos que label sea el campo usado
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...other}
          value={other.options.find(opt => opt.value === field.value) || null}
          onChange={(_, newValue) => {
            const value = newValue ? newValue.value : null;
            setValue(name, value, { shouldValidate: true });
          }}
          getOptionLabel={getOptionLabel}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error.message : helperText}
              InputProps={{
                ...params.InputProps,
                autoComplete: 'new-password', // Evita el autocompletado no deseado
              }}
            />
          )}
        />
      )}
    />
  );
}
