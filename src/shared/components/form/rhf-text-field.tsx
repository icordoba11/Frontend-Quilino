import TextField, { TextFieldProps } from '@mui/material/TextField';

import { useInput } from '../../../hooks/use-input';
import { RegisterOptions } from 'react-hook-form';

interface RHFTextFieldProps extends Omit<TextFieldProps, 'name' | 'type'> {
    name: string;
    type?: 'text' | 'number' | string;
    defaultValue?: string | number;
    format?: (value: any) => any;
    parse?: (value: any) => any;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rules?: RegisterOptions;
    helperText?: string
}

export default function RHFTextField(props: RHFTextFieldProps) {
    const { name, type = 'text', defaultValue, format, parse, onBlur, onChange, rules, helperText, ...other } =
        props;

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
        type,
    });

    return (
        <TextField
            {...field}
            fullWidth
            type={type}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={(event) => {
                if (type === 'number') {
                    field.onChange(Number(event.target.value));
                } else {
                    field.onChange(event.target.value);
                }
            }}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
        />
    );
}