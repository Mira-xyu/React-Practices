import { useState } from "react";
import HolidayList from "./components/HolidayList";
import CountrySelector from "./components/CountrySelector";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [country, setCountry] = useState("NL");

  return (
    <div className="paper">
      {" "}
      <div className="topbar">
        <h1 className="title">Public Holiday List</h1>
        <CountrySelector selectedCountry={country} onChange={setCountry} />
      </div>
      <HolidayList countryCode={country} />
    </div>
  );
}

export default App;
