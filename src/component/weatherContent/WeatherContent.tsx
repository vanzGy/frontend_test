import react, { useContext } from "react";
import { Box, Grid } from "@mui/material";
import type { WeatherInfo } from "../../Main";
import convertNumberToDateTime from "../../helpers/convertNumberToDateTime";
import { StylishTypographyComponent } from "../StylishTypography";
import sun from "../../theme/img/sun.png";
import { ThemeContext } from "../../theme/ThemeProvider";
import { WeatherContentTypography } from "./WeatherContentTypography";

interface WeatherContentPropsInterface {
  WeatherInfoArr: Array<WeatherInfo>;
  selectWeatherInfoIndex: number;
}

export default function WeatherContent({
  WeatherInfoArr,
  selectWeatherInfoIndex,
}: WeatherContentPropsInterface) {
  const { isDarkTheme } = useContext(ThemeContext);
  const selectedWeatherInfo = WeatherInfoArr[selectWeatherInfoIndex];
  const convertTemperatureArrToString = (temperature: Array<number>) => {
    return `H:${Math.round(temperature[0]) + "\u00B0"} L:${
      Math.round(temperature[1]) + "\u00B0"
    }`;
  };
  return selectedWeatherInfo ? (
    <Grid
      container
      direction="row"
      sx={{
        paddingLeft: "8px",
      }}
    >
      <Grid
        container
        direction="column"
        position="relative"
        sx={{
          width: "100%",
        }}
      >
        <Grid container>
          <StylishTypographyComponent>
            Today's weather
          </StylishTypographyComponent>
        </Grid>
        <Grid container justifyContent='flex-end'>
          <Box
            component="img"
            src={sun}
            sx={{
              minWidth: "120px",
              minHeight: "120px",
              width: "240px",
              height: "240px",
              justifyContent: "flex-end",
              position: "absolute",
              left: "140px",
              top: "-60px",
            }}
          />
        </Grid>
      </Grid>
      <Grid>
        <StylishTypographyComponent
          variant="h1"
          sx={{
            fontSize: "80px",
            fontWeight: "bold",
            color: isDarkTheme ? "white" : "purple",
          }}
        >{`${
          Math.round(selectedWeatherInfo.currentTemp) + "\u00B0"
        } `}</StylishTypographyComponent>
      </Grid>
      <Grid container>
        <StylishTypographyComponent variant="subtitle1">
          {convertTemperatureArrToString(selectedWeatherInfo.temperature)}
        </StylishTypographyComponent>
      </Grid>
      <Grid container xs={12} direction="row">
        <WeatherContentTypography variant="subtitle2">{`${selectedWeatherInfo.cityName},${selectedWeatherInfo.countryName}`}</WeatherContentTypography>
        <WeatherContentTypography variant="subtitle2">
          {selectedWeatherInfo.weather}
        </WeatherContentTypography>
        <WeatherContentTypography variant="subtitle2">
          {selectedWeatherInfo.description}
        </WeatherContentTypography>
        <WeatherContentTypography variant="subtitle2">{`Humidity: ${selectedWeatherInfo.humidity}%`}</WeatherContentTypography>
        <WeatherContentTypography variant="subtitle2">
          {convertNumberToDateTime(selectedWeatherInfo.time)}
        </WeatherContentTypography>
      </Grid>
    </Grid>
  ) : (
    <div />
  );
}
