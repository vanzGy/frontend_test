import react, { useContext } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
} from "@mui/material";
import type { WeatherInfo } from "../../Main";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import convertNumberToTime from "../../helpers/convertNumberToTime";
import countryCodes from "../../helpers/countryCode.json";
import openWeatherQuery from "../../helpers/openWeatherQuery";
import { StylishTypographyComponent } from "../StylishTypography";
import { ErrorContext } from "../../ErrorProvider";
import {SearchHistoryIconButtonBox} from './SearchHistoryIconButtonBox'
import { SearchHistoryBodyGrid } from "./SearchHistoryBodyGrid";
import { SearchHistoryRowGrid } from "./SearchHistoryRowGrid";
interface SearchHistoryPropsInterface {
  WeatherInfoArr: Array<WeatherInfo>;
  setWeatherInfoArr: react.Dispatch<react.SetStateAction<WeatherInfo[]>>;
  setSelectedWeatherInfoTableIndex: react.Dispatch<
    react.SetStateAction<number>
  >;
  //selectWeatherInfoIndex: number;
}

export default function SearchHistory({
  WeatherInfoArr,
  setWeatherInfoArr,
  setSelectedWeatherInfoTableIndex,
}: SearchHistoryPropsInterface) {
  const { setErrorMessage, changeErrorState } = useContext(ErrorContext);
  const removeSearchHistory = (id: string) => {
    const removedSearchHistory = WeatherInfoArr.filter(
      (weatherInfo) => weatherInfo.id !== id
    );

    setWeatherInfoArr(removedSearchHistory);
  };

  const returnCountryCode = (countryName: String): String => {
    // Translate the country name from the selected search history into country code.
    const translatedCountryCodeIndex = countryCodes.findIndex(
      (countryCode) =>
        countryName.toLocaleLowerCase() === countryCode.name.toLocaleLowerCase()
    );
    if (translatedCountryCodeIndex !== -1) {
      return countryCodes[translatedCountryCodeIndex].code;
    }
    return "failed";
  };

  const selectSearchHistory = (id: string) => { 
    // select search history will query the openweather api for weather again using the same city and country information.
    const selectedSearchHistoryIndex = WeatherInfoArr.findIndex(
      (weatherInfo) => weatherInfo.id === id
    );
    const selectedSearchHistoryInfo =
      WeatherInfoArr[selectedSearchHistoryIndex];
    const countryCode = returnCountryCode(
      selectedSearchHistoryInfo.countryName
    );
    const openWeatherApiQuery = openWeatherQuery(
      selectedSearchHistoryInfo.cityName,
      countryCode
    );
    openWeatherApiQuery.then((result) => {
      const cityName = result.name;
      const countryName = result.sys.country;
      const { description, main } = result.weather[0];
      const { temp_min, temp_max, humidity, temp } = result.main;
      const timeStamp = result.dt;
      const updatedWeatherInfo = {
        id: selectedSearchHistoryInfo.id,
        cityName,
        countryName,
        weather: main,
        currentTemp: temp,
        description,
        temperature: [temp_min, temp_max],
        humidity,
        time: timeStamp,
      };
      WeatherInfoArr[selectedSearchHistoryIndex] = updatedWeatherInfo;
      //   const updatedWeatherInfoArr = [
      //     ...WeatherInfoArr,
      //     updatedWeatherInfo,
      //   ];
      setErrorMessage("");
      changeErrorState(false);
      setWeatherInfoArr(WeatherInfoArr);
      setSelectedWeatherInfoTableIndex(selectedSearchHistoryIndex);
    });
    // setSelectedWeatherInfoTableIndex(selectedSearchHistoryIndex);
  };

  return (
    <SearchHistoryBodyGrid
      container
      direction="row"
    >
      <StylishTypographyComponent sx={{ padding: "16px" }}>
        Search History
      </StylishTypographyComponent>
      {WeatherInfoArr.length !== 0?
      <Table>
        <TableBody>
          {WeatherInfoArr.map((weatherInfo, index) => (
            <TableRow
              id={weatherInfo.id}
              sx={{
                borderStyle: "none",
              }}
            >
              <TableCell
                sx={{
                  borderStyle: "none",
                }}
              >
                <SearchHistoryRowGrid
                  container
                  direction="row"
                >
                  <Grid
                    container
                    direction="row"
                    sx={{
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "50%",
                      padding: "8px",
                    }}
                  >
                    <StylishTypographyComponent>
                      {`${index + 1}.`}
                    </StylishTypographyComponent>
                    <StylishTypographyComponent>{`${weatherInfo.cityName},${weatherInfo.countryName}`}</StylishTypographyComponent>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    sx={{
                      justifyContent: "flex-end",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <StylishTypographyComponent
                      sx={{
                        paddingRight: "8px",
                      }}
                    >
                      {convertNumberToTime(weatherInfo.time)}
                    </StylishTypographyComponent>
                    <SearchHistoryIconButtonBox>
                      <IconButton
                        onClick={() => selectSearchHistory(weatherInfo.id)}
                        size="small"
                      >
                        <SearchIcon sx={{ color: "white" }} />
                      </IconButton>
                    </SearchHistoryIconButtonBox>
                    <SearchHistoryIconButtonBox
                    >
                      <IconButton
                        onClick={() => removeSearchHistory(weatherInfo.id)}
                        size="small"
                      >
                        <ClearIcon sx={{ color: "white" }} />
                      </IconButton>
                    </SearchHistoryIconButtonBox>
                  </Grid>
                </SearchHistoryRowGrid>
              </TableCell>
              {/* <TableCell>
                
              </TableCell>
              <TableCell>
                
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table> : 
      <Grid container
      sx={{
        justifyContent:'center'
      }} >
        <StylishTypographyComponent>No Record</StylishTypographyComponent>
        </Grid>
      }
    </SearchHistoryBodyGrid>
  );
}
