import "./App.css";
import Navbar from "./components/Navbar.tsx";
import ProgresDataTable from "./components/ProgresDataTable.tsx";
import { useTranslation } from "react-i18next";
import DetailsSection from "./components/DetailsSection.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { getShipmentTrackingDetails } from "./network/api-handler.ts";
import { ShipmentContext } from "./Context/ShipmentNumStore.js";

const theme = createTheme({
  typography: {
    fontFamily: ["Cairo", "sans-serif"].join(","),
  },
});

function App() {
  // const { t, i18n } = useTranslation();
  const [data, setData] = useState();
  let { shipment } = useContext(ShipmentContext);
  // const [number, setNumber] = useState(shipment);

  useEffect(() => {
    // setNumber(shipment)
    const fetchData = async () => {
      const res = await getShipmentTrackingDetails(shipment);
      await setData(res);
    };

    shipment ? fetchData() : setData({});
  }, [shipment]);

  return (
    <ThemeProvider theme={theme}>
      {data ? (
        <>
          <Navbar />
          <ProgresDataTable transitEvents={data?.TransitEvents} {...data} />
          <DetailsSection transitEvents={data?.TransitEvents} {...data} />
        </>
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
}

export default App;

// Networking layer
// fetch, axios, react-query

// State management layer
// redux, redux-toolkit
