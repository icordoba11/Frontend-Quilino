import {
  FieldValues,
  UseControllerProps,
  UseControllerReturn,
  useController,
} from 'react-hook-form';

type FormatFunction = (value: any) => any;
type ParseFunction = (value: any) => any;

const defaultFormat: FormatFunction = value => (value == null ? '' : value);
const defaultParse: ParseFunction = value => (value === '' ? null : value);

interface UseInputProps<TFieldValues extends FieldValues = FieldValues>
  extends UseControllerProps<TFieldValues> {
  format?: FormatFunction;
  parse?: ParseFunction;
  onBlur?: (...event: any[]) => void;
  onChange?: (...event: any[]) => void;
  type?: string;
}

interface UseInputReturn<TFieldValues extends FieldValues = FieldValues>
  extends Omit<UseControllerReturn<TFieldValues>, 'field'> {
  field: {
    name: string;
    value: any;
    onChange: (...event: any[]) => void;
    onBlur: (...event: any[]) => void;
    ref: React.Ref<any>;
  };
}

export const useInput = <TFieldValues extends FieldValues = FieldValues>(
  props: UseInputProps<TFieldValues>,
): UseInputReturn<TFieldValues> => {
  const {
    name,
    defaultValue,
    format = defaultFormat,
    parse = defaultParse,
    onBlur: initialOnBlur,
    onChange: initialOnChange,
    rules,
    shouldUnregister = true,
  } = props;

  const {
    field: controllerField,
    fieldState,
    formState,
  } = useController({
    name,
    defaultValue,
    rules,
    shouldUnregister,
  });

  const onBlur = (...event: any[]) => {
    if (initialOnBlur) {
      initialOnBlur(...event);
    }
    controllerField.onBlur();
  };

  const onChange = (...event: any[]) => {
    if (initialOnChange) {
      initialOnChange(...event);
    }
    const eventOrValue =
      props.type === 'checkbox'
        ? event[0].target.checked
        : event[0]?.target?.value ?? event[0];
    controllerField.onChange(parse ? parse(eventOrValue) : eventOrValue);
  };

  const field = {
    ...controllerField,
    value: format ? format(controllerField.value) : controllerField.value,
    onBlur,
    onChange,
  };

  return {
    field,
    fieldState,
    formState,
  };
};