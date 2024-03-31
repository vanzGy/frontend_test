import react from 'react'
import {Typography, TypographyProps} from '@mui/material'
import { StylishTypographyComponent } from '../StylishTypography';
import { styled } from '@mui/system';

interface Props {
    children: JSX.Element | JSX.Element[] | String,
    sx?: any
}

export const WeatherContentTypography = styled(StylishTypographyComponent)<TypographyProps>({
    paddingRight:'8px'
})

// export default function StylishTypographyComponent({children, sx}: Props) {
//     return (
//         <StylishTypography sx={sx}>{children}</StylishTypography>
//         )

//     }
