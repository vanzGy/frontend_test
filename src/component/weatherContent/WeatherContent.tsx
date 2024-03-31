import react from "react";
import { Box, Grid, Typography } from "@mui/material";
import type { WeatherInfo } from "../../Main";
import convertNumberToDateTime from "../../helpers/convertNumberToDateTime";
import { StylishTypographyComponent } from "../StylishTypography"
import sun from '../../theme/img/sun.png'

interface WeatherContentPropsInterface {
  WeatherInfoArr: Array<WeatherInfo>;
  selectWeatherInfoIndex: number;
}

export default function WeatherContent({
  WeatherInfoArr,
  selectWeatherInfoIndex,
}: WeatherContentPropsInterface) {
  const selectedWeatherInfo = WeatherInfoArr[selectWeatherInfoIndex];
    const convertTemperatureArrToString = (temperature: Array<number>) =>{
        return `H:${Math.round(temperature[0])+ '\u00B0'} L:${Math.round(temperature[1])+ '\u00B0'}`
    }
  return selectedWeatherInfo ? (
    <Grid
      container
      direction="row"
      sx={{
        paddingLeft: "8px",
      }}
    >
        <Grid container direction='row' position='relative'>
        <StylishTypographyComponent>Today's weather</StylishTypographyComponent>
        <Box component="img" src={sun} sx={{
            width:'200px',
            height:'200px',
            justifyContent:"flex-end",
            position: 'absolute',
            left:'70%',
            top:'-50px'
        }}/>
      </Grid>
      <Grid>
      <StylishTypographyComponent
      variant='h1'
      sx={{
        fontSize:'80px',
        fontWeight:'bold', 
      }}>{`${Math.round(selectedWeatherInfo.currentTemp) + '\u00B0'} `}</StylishTypographyComponent>
      </Grid>
      <Grid container>
        <StylishTypographyComponent variant='subtitle1'>{convertTemperatureArrToString(selectedWeatherInfo.temperature)}</StylishTypographyComponent>
      </Grid>
      <Grid container xs={12} direction='row'>
        <StylishTypographyComponent sx={{paddingRight:'8px'}} variant="subtitle2">{`${selectedWeatherInfo.cityName},${selectedWeatherInfo.countryName}`}</StylishTypographyComponent>
        <StylishTypographyComponent sx={{paddingRight:'8px'}} variant="subtitle2">{selectedWeatherInfo.weather}</StylishTypographyComponent>
        <StylishTypographyComponent sx={{paddingRight:'8px'}} variant="subtitle2">{selectedWeatherInfo.description}</StylishTypographyComponent>
        <StylishTypographyComponent sx={{paddingRight:'8px'}} variant="subtitle2">{`Humidity: ${selectedWeatherInfo.humidity}%`}</StylishTypographyComponent>
        <StylishTypographyComponent sx={{paddingRight:'8px'}} variant="subtitle2">{convertNumberToDateTime(selectedWeatherInfo.time)}</StylishTypographyComponent>
      </Grid>
    </Grid>
  ) : (
    <div />
  );
}
