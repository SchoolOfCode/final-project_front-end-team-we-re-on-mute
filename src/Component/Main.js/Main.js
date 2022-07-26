import React from "react";
import HomeBanner from "../HomeBanner/HomeBanner";
import HomeButtons from "../HomeButtons/HomeButtons";

import "./Main.css";

const suitcase = "ep:suitcase";
const thermometer = "carbon:temperature-hot";
const euro = "ic:baseline-euro-symbol";
const telephone = "bi:telephone";

function Main() {
  return (
    <div className="main-container">
      <div className="homebanner">
        <HomeBanner />
      </div>
      <div className="homebuttons">
        <div className="homebuttons1">
          <HomeButtons
            iconName={suitcase}
            title="Packing List"
            path="/packing-list"
          />
          <HomeButtons
            iconName={euro}
            title="Exchange Rates"
            path="/exchange"
          />
        </div>
        <div className="homebuttons2">
          <HomeButtons
            iconName={thermometer}
            title="Weather Forecast"
            path="/weather"
          />
          <HomeButtons
            iconName={telephone}
            title="Emergency Contact"
            path="/contacts"
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
