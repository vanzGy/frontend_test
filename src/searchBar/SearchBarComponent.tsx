import react, { useContext, useState } from "react";
import _ from "lodash";
import {
  Grid,
  TextField,
  IconButton,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { ThemeContext } from "../theme/ThemeProvider";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import type { WeatherInfo } from "../Main";
import countryCodes from "../helpers/countryCode.json";
import openWeatherQuery from "../helpers/openWeatherQuery";
import { ErrorContext } from "../ErrorProvider";
import {SearchBarComponentTextField} from './SearchBarComponentTextField'

interface SearchBarComponentPropsInterface {
  WeatherInfoArr: Array<WeatherInfo>;
  setWeatherInfoArr: react.Dispatch<react.SetStateAction<WeatherInfo[]>>;
  setSelectedWeatherInfoTableIndex: react.Dispatch<
    react.SetStateAction<number>
  >;
}

// Search bar have both country and city textbox to allow user to key the country and the city they want to search.
export default function SearchBarComponent({
  WeatherInfoArr,
  setWeatherInfoArr,
  setSelectedWeatherInfoTableIndex,
}: SearchBarComponentPropsInterface) {
  const [searchCountry, setSearchCountry] = useState<string>("");
  const [searchCity, setSearchCity] = useState<string>("");
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const returnThemeLabel = () => {
    if (isDarkTheme) {
      return "Dark";
    }
    return "Light";
  };

  const { setErrorMessage, changeErrorState } = useContext(ErrorContext);

  const returnErrMsg = (errMsg: string = ""): string => {
    //return error message, this function can check for error if there is missing city or country name. There is a optional parameter for custom error message.
    if (searchCountry.length === 0 && searchCity.length === 0) {
      return "Both Country and City text field are empty.";
    }
    if (searchCountry.length === 0) {
      return "Country text field is empty.";
    }
    if (searchCity.length === 0) {
      return "City text field is empty.";
    }
    if (errMsg.length > 0) {
      return errMsg;
    }
    return "";
  };

  const returnCountryCode = (countryName: string): string => {
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
  return (
    <Grid>
      <Grid
        container
        sx={{
          height: "inherit",
          justifyContent: "center",
          width: "100%",
          marginBottom: "16px",
          paddingLeft: "60px",
        }}
        direction="row"
      >
        <SearchBarComponentTextField
          id="country_input"
          label="Country"
          variant="filled"
          fullWidth
          value={searchCountry}
          onChange={(e) => {
            const searchCountryText = e.target.value;
            setSearchCountry(searchCountryText);
          }}
        />
        <SearchBarComponentTextField
          id="city_input"
          label="City"
          value={searchCity}
          fullWidth
          variant="filled"
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
                // Countrty and city text must have string
                const countryCode = returnCountryCode(searchCountry);
                if (countryCode === "failed") {
                  // If country code is not found. It will return error.
                  changeErrorState(true);
                  setErrorMessage("Unable to find the country");
                } else {

                  const openWeatherApiQuery = openWeatherQuery(
                    searchCity,
                    countryCode
                  );
                  openWeatherApiQuery
                    .then((result) => {
                      if (result.cod !== 200) {
                        // If the openWeatherApi return error, it will show in error message.
                        const errorMsg = returnErrMsg(result.message);
                        changeErrorState(true);
                        setErrorMessage(errorMsg);
                      } else {
                        // If the openWeatherApi have no error, it will poplute the data and return back to the parent component.
                        const cityName = result.name;
                        const countryName = result.sys.country;

                        const { description, main } = result.weather[0];
                        const { temp_min, temp_max, humidity, temp } =
                          result.main;

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
                        setErrorMessage("");
                      }
                    })
                    .catch((err: Error) => {
                      console.log("err", err);
                    });
                }
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
          <FormControlLabel
            control={
              <Switch
                onChange={() => {
                  toggleTheme();
                }}
              />
            }
            label={returnThemeLabel()}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
