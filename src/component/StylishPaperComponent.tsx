
import {Paper, PaperProps} from '@mui/material'
import { styled } from '@mui/system';

interface Props {
    children: JSX.Element | JSX.Element[],
}

const StylishPaper = styled(Paper)<PaperProps>({
    width: '48%',
    background: "rgb(0,0,0,0.8)",
    opacity:'0.6',
    alignItems:'left',
    padding:'16px',
    borderRadius:'40px',
    margin:'42px',
    justifyContent:'center'
}) 

export default function StylishPaperComponent({children}: Props) {
    return (
        <StylishPaper>{children}</StylishPaper>
        )
}