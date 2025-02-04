import {Controller, useFormContext} from 'react-hook-form';

import Switch from '@mui/material/Switch';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';

interface RHFSwitchProps
  extends Omit<FormControlLabelProps, 'control' | 'name'> {
  name: string;
  helperText?: string;
}

export default function RHFSwitch({
  name,
  helperText,
  ...other
}: RHFSwitchProps) {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <div>
          <FormControlLabel
            control={<Switch {...field} checked={field.value} />}
            {...other}
          />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
