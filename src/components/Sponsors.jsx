import React from "react";

const sponsors = [
  { name: "SAP", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" },
  { name: "Siemens", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Siemens_AG_logo.svg/960px-Siemens_AG_logo.svg.png" },
  { name: "Cognizant", logo: "https://rigacoding.lv/wp-content/uploads/2019/06/cognizant-450x96.png" },
  { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" },
  { name: "Tieto", logo: "https://rigacoding.lv/wp-content/uploads/2019/06/tieto-450x151.png" },
  { name: "Deloitte", logo: "https://rigacoding.lv/wp-content/uploads/2019/06/deloitte-450x85.png" },
  { name: "Scandiweb", logo: "https://rigacoding.lv/wp-content/uploads/2019/07/scandiweb_logo-1.png" }
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