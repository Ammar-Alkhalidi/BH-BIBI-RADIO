import React, { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api"; // Importing the radio browser API for fetching radio station data.
import AudioPlayer from "./components/AudioPlayer"; // Importing a custom audio player component.
import defaultImage from "./assets/radio.jpg"; // Importing a default image for stations without a logo.
import Spinner from "react-bootstrap/Spinner"; // Importing Spinner for loading visuals.
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS for styling.

// Header Component
const Header = () => {
  return (
    <header className="header">
      {/* Spinner for visual feedback */}
      <div className="spinner">
        <Spinner animation="grow" variant="danger" />
      </div>
      {/* Spacer divs for styling purposes */}
      <div>
        <br />
      </div>
      <div>
        <br />
      </div>
    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      {/* Footer content with copyright information */}
      <p>© 2025 BH-BIBI-RADIO . SCRIPTED BY AMMAR ALKHALIDI .</p>
    </footer>
  );
};

// Main Radio Component
export default function Radio() {
  const [stations, setStations] = useState([]); // State to hold the list of radio stations.
  const [stationFilter, setStationFilter] = useState("all"); // State to hold the currently selected filter.

  // useEffect hook to fetch stations whenever the filter changes.
  useEffect(() => {
    setupApi(stationFilter).then(setStations); // Calls the API setup function and sets stations.
  }, [stationFilter]);

  // Function to set up the API and fetch stations based on the selected filter.
  const setupApi = async (stationFilter) => {
    const api = new RadioBrowserApi(fetch.bind(window), "My Radio App"); // Initializing the API.
    const stations = await api.searchStations({
      language: "english", // Fetching English language stations.
      tag: stationFilter, // Applying the filter.
      limit: 12, // Limiting results to 12 stations.
    });
    return stations; // Returning the fetched stations.
  };

  // List of filters for station genres.
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

  // Function to set a default image if station logo is missing or fails to load.
  const setDefaultSrc = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <div className="radio">
      {/* Rendering the Header */}
      <Header />

      {/* Filters section for selecting station genres */}
      <div className="filters">
        {filters.map((filter) => (
          <span
            key={filter} // Unique key for each filter.
            className={stationFilter === filter ? "selected" : ""} // Highlight the selected filter.
            onClick={() => setStationFilter(filter)} // Update the filter on click.
          >
            {filter}
          </span>
        ))}
      </div>

      {/* Displaying the list of stations */}
      <div className="stations">
        {stations.map((station, index) => (
          <div className="station" key={index}>
            <div className="stationName">
              {/* Display station logo or default image */}
              <img
                className="logo"
                src={station.favicon}
                alt="station logo"
                onError={setDefaultSrc} // Fallback to default image on error.
              />
              <div className="name">{station.name}</div> {/* Station name */}
            </div>
            {/* Custom AudioPlayer component for playing the station */}
            <AudioPlayer
              className="player"
              src={station.urlResolved} // Station stream URL.
              showJumpControls={false} // Disabling jump controls.
              layout="stacked" // Vertical layout for controls.
              customProgressBarSection={[]} // Customizing progress bar.
              customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]} // Main controls and volume.
              autoPlayAfterSrcChange={false} // Prevent auto-play after changing the source.
            />
          </div>
        ))}
      </div>

      {/* Rendering the Footer */}
      <Footer />
    </div>
  );
}
