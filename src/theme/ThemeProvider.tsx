import react, {createContext, useState} from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { red } from '@mui/material/colors';

interface Props {
    children: JSX.Element | JSX.Element[],
}


export const ThemeContext = createContext({
    isDarkTheme: false,
    toggleTheme: () => {}
})

// const theme = createTheme({
//     palette: {
//       primary: {
//         main: red[500],
//       },
//     },
//   });

export const ThemeProvider:React.FC<Props>  = ({children}: Props) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const toggleTheme = () : void => {
        setIsDarkTheme(!isDarkTheme)
    }

    return (
        <ThemeContext.Provider value={{isDarkTheme,toggleTheme }}>
            {children}
        </ThemeContext.Provider>    )

}
