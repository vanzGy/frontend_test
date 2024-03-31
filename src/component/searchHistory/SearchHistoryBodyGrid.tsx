import react from 'react'
import {
    Grid, GridProps
  } from "@mui/material";
import { styled } from '@mui/system';


export const SearchHistoryBodyGrid = styled(Grid)<GridProps>({
  margin: "8px",
  paddingLeft: "8px",
  paddingRight: "8px",
  backgroundColor: "rgb(0,0,0,0.4)",
  borderRadius:16,
  width:'96%'
})

