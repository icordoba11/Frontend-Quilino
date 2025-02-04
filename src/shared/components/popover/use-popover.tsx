import { useState, useCallback, MouseEvent } from 'react';

interface UsePopoverResult {
    open: HTMLElement | null;
    onOpen: (event: MouseEvent<HTMLElement>) => void;
    onClose: () => void;
    setOpen: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}


export default function usePopover(): UsePopoverResult {
    const [open, setOpen] = useState<HTMLElement | null>(null);

    const onOpen = useCallback((event: MouseEvent<HTMLElement>) => {
        setOpen(event.currentTarget);
    }, []);

    const onClose = useCallback(() => {
        setOpen(null);
    }, []);

    return {
        open,
        onOpen,
        onClose,
        setOpen,
    };
}
