import react, { useContext } from "react";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Box,
} from "@mui/material";
import type { WeatherInfo } from "../../Main";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import convertNumberToTime from "../../helpers/convertNumberToTime";
import countryCodes from "../../helpers/countryCode.json";
import openWeatherQuery from "../../helpers/openWeatherQuery";
import { StylishTypographyComponent } from "../StylishTypography";
import { ErrorContext } from "../../ErrorProvider";

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
    const translatedCountryCodeIndex = countryCodes.findIndex(
      (countryCode) =>
        countryName.toLocaleLowerCase() === countryCode.name.toLocaleLowerCase()
    );
    if (translatedCountryCodeIndex !== -1) {
      return countryCodes[translatedCountryCodeIndex].code;
    }
    return "failed";
  };

  const selectSearchHistoryIndex = (id: string) => {
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
    <Grid
      container
      direction="row"
      sx={{
        margin: "8px",
        paddingLeft: "8px",
        paddingRight: "8px",
        backgroundColor: "rgb(0,0,0,0.8)",
        borderRadius: 4,
      }}
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
                <Grid
                  container
                  direction="row"
                  sx={{
                    background: "rgb(0,0,0)",
                    borderRadius: 4,
                    outline: "1px solid",
                    paddingBottom: "8px",
                    height: "120%",
                  }}
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
                    <Box
                      sx={{
                        borderRadius: "50%",
                        borderStyle: "solid",
                        borderColor: "white",
                        marginRight:'8px'
                      }}
                    >
                      <IconButton
                        onClick={() => selectSearchHistoryIndex(weatherInfo.id)}
                        sx={{
                          borderRadius: "5px",
                          borderStyle: "solid",
                          borderColor: "white",
                        }}
                        size="small"
                      >
                        <SearchIcon sx={{ color: "white" }} />
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        borderRadius: "50%",
                        borderStyle: "solid",
                        borderColor: "white",
                        marginRight:'8px'
                      }}
                    >
                      <IconButton
                        onClick={() => removeSearchHistory(weatherInfo.id)}
                        sx={{
                          borderRadius: "50%",
                          borderStyle: "solid",
                          borderColor: "grey",
                        }}
                        size="small"
                      >
                        <ClearIcon sx={{ color: "white" }} />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
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
    </Grid>
  );
}
