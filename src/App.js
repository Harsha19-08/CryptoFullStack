import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { makeStyles } from '@mui/styles'; // Corrected import
import Header from "./components/Header";
import Alert from "./components/Alert";
import { lazy, Suspense } from "react";

const Homepage= lazy(() => import("./components/Pages/HomePage"));
const Coinpage=lazy(() => import("./components/Pages/CoinPage"));

// Define the styles using makeStyles
const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  // Get the classes object
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/coins/:id" element={<Coinpage />} />
        </Routes>
        </Suspense>
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
