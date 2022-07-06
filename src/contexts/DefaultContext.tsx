/** @jsxImportSource @emotion/react */
import {
  createTheme,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  LinearProgress,
  ThemeProvider,
} from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { DarkThemeOptions, Globals, LightThemeOptions } from "../theme";

import { DebugModeContextProvider } from "./DebugModeContext";

interface IDefaultContext {
  group: "G42" | "B33";
  setGroup: React.Dispatch<React.SetStateAction<"G42" | "B33">>;
  openAddDevice: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DefaultContext = createContext<IDefaultContext>(
  {} as IDefaultContext
);

export const useDefault = () => useContext(DefaultContext);

const darkTheme = createTheme(DarkThemeOptions);
const lightTheme = createTheme(LightThemeOptions);

export function DefaultContextProvider({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) {
  const [theme, setTheme] = useState(darkTheme);

  const [group, setGroup] = useState<"G42" | "B33">("G42");

  const [addDevice, setAddDevice] = useState(false);

  useEffect(() => {
    // @ts-ignore
    document.title = `${group} | IoT Sandbox`;
  }, [group]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "d" && e.ctrlKey) {
        setTheme((t) => {
          if (t.palette.mode === "dark") {
            return lightTheme;
          }
          return darkTheme;
        });
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Globals />
      <DefaultContext.Provider
        value={{ group, setGroup, openAddDevice: setAddDevice }}
      >
        <DebugModeContextProvider>
          {children}
          <AddDeviceDialog addDevice={addDevice} setAddDevice={setAddDevice} />
        </DebugModeContextProvider>
      </DefaultContext.Provider>
    </ThemeProvider>
  );
}

function AddDeviceDialog({
  addDevice,
  setAddDevice,
}: {
  addDevice: boolean;
  setAddDevice: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleClickOpen = () => {
    setAddDevice(true);
  };

  const handleClose = () => {
    setAddDevice(false);
  };

  const [loading, setLoading] = useState(false);
  const [helper, setHelper] = useState("");
  return (
    <Dialog open={addDevice}>
      <DialogTitle>Add New Device</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Creating Device...</DialogContentText> */}
      </DialogContent>
      <Fab sx={{ m: 2 }} color="primary" variant="extended">
        Create
      </Fab>
      {/* <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={async () => {
            setLoading(true);

            setLoading(false);
            setHelper("Link sent");
          }}
        >
          Send
        </Button>
      </DialogActions> */}
      {loading && <LinearProgress />}
    </Dialog>
  );
}
