import React, { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import AudioPlayer from "./components/AudioPlayer";
import defaultImage from "./assets/radio.jpg";
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css'; 


// Header Component
const Header = () => {
  return (
    <header className="header">
      <h1>
        <div className="spinner">
          <Spinner animation="grow" variant="danger" />
        </div>
      </h1>
    </header>
  );
};
// Spinner Component
const VariantsExample = () => {
  return (
    <div className="spinner">
      <Spinner animation="grow" variant="danger" />
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 BH-BIBI-RADIO .  SCRIPTED  BY  AMMAR  ALKHALIDI .</p>
    </footer>
  );
};

export default function Radio() {
  const [stations, setStations] = useState([]);
  const [stationFilter, setStationFilter] = useState("all");

  useEffect(() => {
    setupApi(stationFilter).then(setStations);
  }, [stationFilter]);

  const setupApi = async (stationFilter) => {
    const api = new RadioBrowserApi(fetch.bind(window), "My Radio App");
    const stations = await api.searchStations({
      language: "english",
      tag: stationFilter,
      limit: 12,
    });
    return stations;
  };

  const filters = [
    "all",
    "classical",
    "country",
    "dance",
    "disco",
    "house",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
  ];

  const setDefaultSrc = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <div className="radio">
      <Header />

      <div className="filters">
        {filters.map((filter) => (
          <span
            key={filter}
            className={stationFilter === filter ? "selected" : ""}
            onClick={() => setStationFilter(filter)}
          >
            {filter}
          </span>
        ))}
      </div>

      <div className="stations">
        {stations.map((station, index) => (
          <div className="station" key={index}>
            <div className="stationName">
              <img
                className="logo"
                src={station.favicon}
                alt="station logo"
                onError={setDefaultSrc}
              />
              <div className="name">{station.name}</div>
            </div>
            <AudioPlayer
              className="player"
              src={station.urlResolved}
              showJumpControls={false}
              layout="stacked"
              customProgressBarSection={[]}
              customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
              autoPlayAfterSrcChange={false}
            />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
