import react, {createContext, useState} from 'react';

// A global error context to receive error message from children component 
// and for other children component to receive the message.
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
