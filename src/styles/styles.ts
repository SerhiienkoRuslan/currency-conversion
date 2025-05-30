export const typography = {
  h1: {
    fontFamily: "VT323",
  },
};

export const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        fontFamily: "VT323",
        border: "4px double",
        borderColor: "rgba(40,22,17)",
        boxShadow: "3px 3px 1px rgba(36,36,36,0.9)",
        color: "rgba(40,22,17)",
        backgroundColor: "transparent",
        fontSize: "1.5rem",
        textTransform: "none" as const,
        "&:active": {
          boxShadow: "none !important",
          transform: "translate(3px)",
        },
        "&:hover": {
          boxShadow: "3px 3px 1px rgba(36,36,36,0.9)",
        },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      select: {
        fontFamily: "VT323",
        fontSize: 25,
        background: "rgba(255,255,255,0.8)",
        color: "rgba(40,22,17)",
        minHeight: 0,
        padding: "23px 25px",
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        background: "rgba(255,255,255,0.8)",
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#656cb2",
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontFamily: "VT323",
        fontSize: 17,
        color: "rgba(40,22,17)",
        "&.Mui-focused": {
          color: "#656cb2",
        },
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        fontFamily: "VT323",
        fontSize: 25,
        color: "rgba(40,22,17)",
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        fontFamily: "VT323",
        color: "rgba(40,22,17)",
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 0,
      },
    },
  },
};

export const styledError = {
  style: {
    fontFamily: "VT323",
    fontSize: "20px",
    background: "rgba(255,255,255,0.7)",
    color: "rgba(40,22,17)",
    border: "5px solid #a81919",
    borderRadius: "0",
  },
};
