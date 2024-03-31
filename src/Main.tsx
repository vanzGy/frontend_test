import react, { useContext, useState } from "react";
import { Grid, Typography, Box, Switch, FormControlLabel } from "@mui/material";
import SearchBarComponent from "./searchBar/SearchBarComponent";
import StylishPaperComponent from "./component/StylishPaperComponent";
import WeatherContent from "./component/weatherContent/WeatherContent";
import SearchHistory from "./component/searchHistory/SearchHistory";
import bgLight from './theme/img/bgLight.png'
import bgDark from './theme/img/bg-dark.png'
import "./App.css";
import { ErrorContext } from "./ErrorProvider";
import { ThemeContext } from "./theme/ThemeProvider";

export interface WeatherInfo {
  id: string,
  cityName: string;
  countryName: string;
  weather: string;
  description: string;
  currentTemp: number;
  temperature: Array<number>;
  humidity: number;
  time: number;
}

export default function Main() {
  const [weatherInfoTable, setWeatherInfoTable] = useState<WeatherInfo[]>([]);
  const [selectedWeatherInfoTableIndex, setSelectedWeatherInfoTableIndex] = useState<number>(-1);
  const {errMsg, errState} =useContext(ErrorContext)
  const {isDarkTheme} = useContext(ThemeContext);

  return (
    <Grid container sx={{ paddingTop:'16px', minHeight:'100vh',width:'100vw',backgroundPosition: "center", alignContent: "center", backgroundRepeat:'repeat-x', backgroundImage: `url('${isDarkTheme? bgDark:bgLight }')`}} direction="column" >

      <SearchBarComponent WeatherInfoArr={weatherInfoTable} setWeatherInfoArr={setWeatherInfoTable} setSelectedWeatherInfoTableIndex={setSelectedWeatherInfoTableIndex}/>
     
        {
          /*
          Show error message if there is an error.
           */
        }
        <Box
        sx={{
          display: errState ? "flex" : "none",
          borderColor: "red",
          borderStyle: "solid",
          background: "pink",
          borderRadius: 2,
          marginBottom:'24px',
          width:'46%',
          justifyContent:'center',
          alignSelf:'center'
        }}
      >
        <Typography id="error_msg" sx={{ color: "red"}}>
          {errMsg}
        </Typography>
      </Box>
      <StylishPaperComponent>
        <WeatherContent WeatherInfoArr={weatherInfoTable} selectWeatherInfoIndex={selectedWeatherInfoTableIndex}/>
        <SearchHistory WeatherInfoArr={weatherInfoTable} setWeatherInfoArr={setWeatherInfoTable} setSelectedWeatherInfoTableIndex={setSelectedWeatherInfoTableIndex}/>
      </StylishPaperComponent>
    </Grid>
  );
}
