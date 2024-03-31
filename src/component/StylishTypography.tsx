import react from 'react'
import {Typography, TypographyProps} from '@mui/material'
import { styled } from '@mui/system';

interface Props {
    children: JSX.Element | JSX.Element[] | String,
    sx?: any
}

export const StylishTypographyComponent = styled(Typography)<TypographyProps>({
    color:'white',
})

// export default function StylishTypographyComponent({children, sx}: Props) {
//     return (
//         <StylishTypography sx={sx}>{children}</StylishTypography>
//         )

//     }
