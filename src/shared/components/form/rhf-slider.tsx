import { Controller, useFormContext } from 'react-hook-form';

import Slider, { SliderProps } from '@mui/material/Slider';
import FormHelperText from '@mui/material/FormHelperText';

interface RHFSliderProps extends Omit<SliderProps, 'name'> {
  name: string;
  helperText?: string;
}

export default function RHFSlider({ name, helperText, ...other }: RHFSliderProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Slider {...field} valueLabelDisplay="auto" {...other} />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </>
      )}
    />
  );
}