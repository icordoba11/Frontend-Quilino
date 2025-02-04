import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

interface UseCustomMutationOptions<TData, TError, TVariables, TContext>
    extends UseMutationOptions<TData, TError, TVariables, TContext> {
    onSuccessMessage?: string;
    onErrorMessage?: string;
}

export function useCustomMutation<TData, TError, TVariables, TContext = unknown>(
    options: UseCustomMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> {
    const { enqueueSnackbar } = useSnackbar();

    const mutation = useMutation({
        ...options,
        onSuccess: (data, variables, context) => {
            if (options.onSuccessMessage) {
                enqueueSnackbar(options.onSuccessMessage, { variant: 'success' });
            }
            options.onSuccess?.(data, variables, context);
        },
        onError: (error, variables, context) => {
            if (options.onErrorMessage) {
                enqueueSnackbar(options.onErrorMessage, { variant: 'error' });
            }
            options.onError?.(error, variables, context);
        },
    });

    return mutation;
}
