import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  '& .MuiSnackbarContent-root': {
    backgroundColor: theme.palette.error.main,
  },
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props{
    open: boolean,
    close: ()=> void;
    msg: string,
    severity: boolean;
}

export default function AlertComponent({open, close, msg, severity}: Props) {
  return (
    <StyledSnackbar open={open} autoHideDuration={6000} onClose={close}>
          <div>
          <Alert onClose={close} severity={severity ? "error": "success"} elevation={6} variant="filled">
            {msg}
          </Alert>
          </div>
    </StyledSnackbar>
  )
}
