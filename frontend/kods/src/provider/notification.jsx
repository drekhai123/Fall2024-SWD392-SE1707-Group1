import React, { useRef } from "react";
import { SnackbarProvider } from "notistack";
import { IconButton, ThemeProvider, createTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

// Define your Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

// Styled component for the close button
const StyledCloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));

const SnackbarProviders = ({ children }) => {
  const notistackRef = useRef();

  const handleDismiss = (key) => {
    if (notistackRef.current) {
      notistackRef.current.closeSnackbar(key);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        ref={notistackRef}
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        action={(key) => (
          <StyledCloseButton onClick={() => handleDismiss(key)}>
            <CloseIcon />
          </StyledCloseButton>
        )}
      >
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default SnackbarProviders;
