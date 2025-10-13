import React from "react";

const sponsors = [
  { name: "SAP", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" },
  { name: "Siemens", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Siemens_AG_logo.svg/960px-Siemens_AG_logo.svg.png" },
  { name: "Ericsson", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Ericsson_logo.svg" },
  { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" },
  { name: "Nokia", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Nokia_wordmark.svg" },
  { name: "Accenture", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Accenture.svg" },
  { name: "Capgemini", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Capgemini_2017_logo.svg" }
];

export default function Sponsors() {
  return (
    <section id="sponsors" className="sponsors-section">
      <div className="container">
        <h2 className="sponsors-title">Our Sponsors</h2>
        <div className="sponsors-marquee">
          <div className="sponsors-track">
            {sponsors.concat(sponsors).map((sponsor, index) => (
              <div key={index} className="sponsor-logo">
                <img src={sponsor.logo} alt={sponsor.name} title={sponsor.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}