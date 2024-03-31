import react, { useContext, useState } from "react";
import _ from "lodash";
import { Grid, Box, TextField, IconButton, Typography } from "@mui/material";
import { ThemeContext } from "../theme/ThemeProvider";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import type { WeatherInfo } from "../Main";
import countryCodes from "../helpers/countryCode.json";
import openWeatherQuery from "../helpers/openWeatherQuery";
import { ErrorContext } from "../ErrorProvider";

interface SearchBarComponentPropsInterface {
  WeatherInfoArr: Array<WeatherInfo>;
  setWeatherInfoArr: react.Dispatch<react.SetStateAction<WeatherInfo[]>>;
  setSelectedWeatherInfoTableIndex: react.Dispatch<
    react.SetStateAction<number>
  >;
}

// const openWeatherApi = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=a47dbbf97c6a91c4ca699a474c295f48'

export default function SearchBarComponent({
  WeatherInfoArr,
  setWeatherInfoArr,
  setSelectedWeatherInfoTableIndex,
}: SearchBarComponentPropsInterface) {
  const [searchCountry, setSearchCountry] = useState<string>("");
  const [searchCity, setSearchCity] = useState<string>("");
  // const [errMsg, setErrMsg] = useState<String>("");
  // const [errState, setErrState] = useState<Boolean>(false);
  const {setErrorMessage, changeErrorState} =useContext(ErrorContext)

  const returnErrMsg = (errMsg: string = ""): string => {
  
      if (searchCountry.length === 0 && searchCity.length === 0) {
        return "Both Country and City text field are empty.";
      }
      if (searchCountry.length === 0) {
        return "Country text field is empty.";
      }
      if (searchCity.length === 0) {
        return "City text field is empty.";
      }
      if(errMsg.length > 0) {
        return errMsg;
      }
      return "";
    
    
  };

  const returnCountryCode = (countryName: string): string => {
    const translatedCountryCodeIndex = countryCodes.findIndex(
      (countryCode) =>
        countryName.toLocaleLowerCase() === countryCode.name.toLocaleLowerCase()
    );
    if (translatedCountryCodeIndex !== -1) {
      return countryCodes[translatedCountryCodeIndex].code;
    }
    return "failed";
  };
  return (
    <Grid>
      <Grid
        container
        sx={{
          height: "inherit",
          justifyContent: "center",
          width: "100%",
          marginBottom:'16px',
          paddingLeft:'34px'
        }}
        direction="row"
      >
        <TextField
          id="country_input"
          label="Country"
          variant="filled"
          sx={{
            height: "10%",
            width: "40%",
            paddingRight:'8px',
            input:{
              color:'white',
              borderRadius:'10px',
              backgroundColor:"rgb(0,0,0,0.6)",
            },
            label:{
              color:'white',
            }
          }}
          fullWidth
          value={searchCountry}
          onChange={(e) => {
            const searchCountryText = e.target.value;
            setSearchCountry(searchCountryText);
          }}
        />
        <TextField
          id="city_input"
          label="City"
          value={searchCity}
          fullWidth
          variant="filled"
          sx={{
            height: "10%",
            width: "40%",
            paddingRight:'8px',
            borderStyle:'none',

            color:'white',
            input:{
              color:'white',
              borderRadius:'10px',
              backgroundColor:"rgb(0,0,0,0.6)",
            },
            label:{
              color:'white',
            }
          }}
          
          color="primary"
          onChange={(e) => {
            const searchCityText = e.target.value;
            setSearchCity(searchCityText);
          }}
        />
        <Grid>
          <IconButton
            sx={{
              height: "10%",
              opacity: 1,
              zIndex: 100,
            }}
            onClick={() => {
              if (searchCity.length !== 0 && searchCountry.length !== 0) {
                const countryCode = returnCountryCode(searchCountry);
                const openWeatherApiQuery = openWeatherQuery(
                  searchCity,
                  countryCode
                );
                openWeatherApiQuery
                  .then((result) => {
                    console.log("result", result);
                    if (result.cod !== 200) {
                      
                      const errorMsg = returnErrMsg(result.message);
                      changeErrorState(true);
                      setErrorMessage(errorMsg);
                    } else {
                      const cityName = result.name;
                      const countryName = result.sys.country;

                      const { description, main } = result.weather[0];
                      const { temp_min, temp_max, humidity, temp } = result.main;

                      const timeStamp = result.dt;
                      const updatedWeatherInfo = {
                        id: _.uniqueId(),
                        cityName,
                        countryName,
                        weather: main,
                        description,
                        currentTemp: temp,
                        temperature: [temp_min, temp_max],
                        humidity,
                        time: timeStamp,
                      };
                      const updatedWeatherInfoArr = [
                        ...WeatherInfoArr,
                        updatedWeatherInfo,
                      ];
                      setWeatherInfoArr(updatedWeatherInfoArr);
                      setSelectedWeatherInfoTableIndex(
                        updatedWeatherInfoArr.length - 1
                      );
                      changeErrorState(false);
                      setErrorMessage('');
                    }
                  })
                  .catch((err: Error) => {
                    console.log("err", err);
                  });
              } else {
                const errorMsg = returnErrMsg();
                changeErrorState(true);
                setErrorMessage(errorMsg);
              }
            }}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            sx={{
              height: "10%",
              opacity: 1,
              zIndex: 100,
            }}
            onClick={() => {
              setSearchCountry("");
              setSearchCity("");
            }}
          >
            <ClearIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
