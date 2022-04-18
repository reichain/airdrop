import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { SnackbarProvider, useSnackbar } from 'notistack'

const SnackbarCloseButton = ({ id }) => {
    const { closeSnackbar } = useSnackbar()

    return (
        <IconButton onClick={() => closeSnackbar(id)} className="_pd-8px">
            <CloseIcon />
        </IconButton>
    )
}
const SnackbarProviderWrapper = ({ children }) => {
    return (
        <SnackbarProvider
            maxSnack={3}
            action={(id) => <SnackbarCloseButton id={id} />}
        >
            {children}
        </SnackbarProvider>
    )
}

export default SnackbarProviderWrapper
