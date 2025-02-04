import { PropsWithChildren } from 'react';
import { FieldValues, FormProvider as Form, UseFormReturn } from 'react-hook-form';

interface FormProviderProps<TFieldValues extends FieldValues = FieldValues> extends PropsWithChildren {
    onSubmit: () => void;
    methods: UseFormReturn<TFieldValues>;
}

export default function FormProvider<TFieldValues extends FieldValues = FieldValues>({
    children,
    onSubmit,
    methods,
}: FormProviderProps<TFieldValues>) {
    return (
        <Form {...methods}>
            <form onSubmit={onSubmit}>{children}</form>
        </Form>
    );
}
