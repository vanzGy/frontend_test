import react, {createContext, useState} from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { red } from '@mui/material/colors';

interface Props {
    children: JSX.Element | JSX.Element[],
}


export const ErrorContext = createContext({
    errMsg: '',
    setErrorMessage: (ErrorMsg: string = '')=>{},
    errState: false,
    changeErrorState: (errorState: boolean) => {}
})

// const theme = createTheme({
//     palette: {
//       primary: {
//         main: red[500],
//       },
//     },
//   });

export const ErrorProvider:React.FC<Props>  = ({children}: Props) => {
    const [errMsg, setErrMsg] = useState<string>("");
    const [errState, setErrState] = useState<boolean>(false);
    console.log('in context', errMsg,errState)
    const changeErrorState = (errorState: boolean) : void => {
        setErrState(errorState)
    }

    const setErrorMessage = (errMessage: string = '') : void => {
        setErrMsg(errMessage)
    }

    return (
        <ErrorContext.Provider value={{errMsg, setErrorMessage, errState, changeErrorState }}>
            {children}
        </ErrorContext.Provider>    )

}
