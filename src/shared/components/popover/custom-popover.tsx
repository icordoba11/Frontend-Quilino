import Popover, { PopoverProps } from '@mui/material/Popover';
import { menuItemClasses } from '@mui/material/MenuItem';

import { ArrowPosition, getPosition } from './utils';
import { StyledArrow } from './style-arrow';

interface CustomPopoverProps extends Omit<PopoverProps, 'open' | 'anchorEl'> {
    open: boolean;
    children: React.ReactNode;
    arrow?: ArrowPosition;
    hiddenArrow?: boolean;
    anchorEl: HTMLElement | null;
}

export default function CustomPopover({
    open,
    children,
    arrow = 'top-left',
    hiddenArrow,
    anchorEl,
    ...other
}: CustomPopoverProps) {
    const { style, anchorOrigin, transformOrigin } = getPosition(arrow);

    return (
        <Popover
            open={Boolean(open)}
            anchorEl={anchorEl}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            slotProps={{
                paper: {
                    sx: {
                        width: 'auto',
                        overflow: 'inherit',
                        ...style,
                        [`& .${menuItemClasses.root}`]: {
                            '& svg': {
                                mr: 2,
                                flexShrink: 0,
                            },
                        },
                    },
                },
            }}
            {...other}
        >
            {!hiddenArrow && <StyledArrow arrow={arrow} />}

            {children}
        </Popover>
    );
}

