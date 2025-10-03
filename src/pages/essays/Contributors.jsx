import { Header } from "../../components/site/Header";
import { useState } from "react";

const imgStyle = {
  position: "relative",
  border: "solid white 1px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  width: "300px", // unified card width
};

const imgFrameStyle = {
  width: "300px", // same as card width
  height: "300px", // fixed height to normalize
  overflow: "hidden",
  borderRadius: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#111",
};

const imgTagStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover", // crop to fill frame uniformly
};

const buttonStyle = {
  color: "blue",
  textDecoration: "underline",
  cursor: "pointer",
  border: "none",
  background: "none",
  padding: 0,
  font: "inherit",
};

const dynamicTextStyle = { overflowAnchor: "none" }; // prevent scroll jump on expand

export function Contributors() {
  const images = [
    {
      name: "Ruth Mostern",
      url: "https://www.history.pitt.edu/sites/default/files/person-images/May%202023%20Mostern%20headshot%20cropped%20%281%29.jpeg",
      description: "Project Manager",
      info: "Ruth Mostern is Professor of History and Director of the Institute for Spatial History Innovation at the University of Pittsburgh, and Vice President and President Elect of the World History Association. She directed the Pitt World History Center from 2018 to 2025. She is the author of two single-authored books: Dividing the Realm in Order to Govern: The Spatial Organization of the Song State, 960-1276 CE (Harvard Asia Center, 2011), and The Yellow River: A Natural and Unnatural History (Yale University Press, 2021), winner of the Joseph Levenson Prize from the Association for Asian Studies in 2022.  She is also co-editor of Placing Names: Enriching and Integrating Gazetteers (Indiana University Press, 2016), and of a special issue of Open Rivers Journal (2017).  She is the author or co-author of over thirty articles published in books and peer reviewed journals.  Ruth is Principal Investigator and Project Director of the World Historical Gazetteer, a prize-winning digital infrastructure platform for integrating databases of historical place name information. ",
    },
    {
      name: "Nathan Michalewicz",
      url: "https://www.worldhistory.pitt.edu/sites/default/files/nkm.jpg",
      description: "Web Atlas Designer",
      info: "Nathan Michalewicz is an Assistant Professor of History at Queens University of Charlotte. He received his Ph.D. at George Mason University, specializing in early modern Europe and digital history. He held a post doctoral position at the University of Pittsburgh, working on the World Historical Gazetteer and teaching courses on geo-spatial history. His research interests focus on Christian-Muslim interactions as well as the intersection of data analytics, information management, and history.",
    },
    {
      name: "Ryan Horne",
      url: "/ryanhorne.jpg",
      description: "Data Manager",
      info: "Ryan Horne is a Digital Research Specialist in the Office of Advanced Research Computing at the University of California, Los Angeles. A former software engineer, Ryan holds a Ph.D. in ancient history from UNC Chapel Hill. He is an expert in leveraging Linked Open Data for digital humanities research, with particular attention on geospatial and network analysis. In addition to working on dozens of digital projects, Ryan serves as a managing editor for the Pleiades project, was an awardee of a NEH/Mellon grant for digital publication, and has worked with the Digital Ethnic Futures Consortium, the Black Lunchtable oral history archive, the Ancient Itineraries Institute, Pelagios Network, and served as the director of the Ancient World Mapping Center at UNC.",
    },
    {
      name: "Sharon Zhang",
      url: "https://www.history.pitt.edu/sites/default/files/person-images/Zhang.jpg",
      description: "Chinese Data Expert",
      info: "Sharon Zhang is a Ph.D. candidate in History at the University of Pittsburgh. Her dissertation investigates material and cultural exchanges involved in gift-giving rituals between China and the wider world, particularly Europe, during the Mongol-Yuan era of the 13th-14th centuries. Her research examines how the circulation of tributary gifts facilitated the formation of transregional networks and influenced power dynamics in the global medieval world. Sharon’s broader academic interests extend to Sino-foreign interactions during China’s middle period (circa 800-1400), the experiences of medieval Eurasian travelers along both overland and maritime Silk Routes, and spatial and digital approaches for premodern history studies.",
    },
  ];
  const [extendedInfoVisible, setExtendedInfoVisible] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  const toggleExtendedInfo = (index) => {
    setExtendedInfoVisible((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Header />
        <div
          id="div1"
          style={{
            position: "relative",
            flex: 1,
            padding: "1em",
            width: "100%",
            overflowY: "scroll", // always show scrollbar
            scrollbarGutter: "stable", // reserve space to avoid shift
            display: "flex",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          <div
            id="div2"
            style={{
              marginTop: 45,
              position: "relative",
              maxWidth: "950px",
              display: "flex",
              flexWrap: "wrap",
              gap: "1em",
              justifyContent: "center",
            }}
          >
            <h1 style={{ textAlign: "center", width: "100%" }}>Contributors</h1>
            {images.map((i, index) => (
              <div key={index} style={imgStyle} id="image-div">
                <div style={imgFrameStyle}>
                  <img
                    src={i.url}
                    alt={i.name}
                    style={{
                      ...imgTagStyle,
                      objectPosition:
                        i.objectPosition || imgTagStyle.objectPosition,
                    }}
                  />
                </div>
                <p style={{ textAlign: "center" }}>
                  {i.name} <br />
                  {i.description}
                </p>

                {extendedInfoVisible[index] ? (
                  <p style={dynamicTextStyle}>
                    {i.info}{" "}
                    <span
                      style={buttonStyle}
                      role="button"
                      onClick={() => toggleExtendedInfo(index)}
                    >
                      Read less
                    </span>
                  </p>
                ) : (
                  <p style={dynamicTextStyle}>
                    {i.info.slice(0, 100) + "... "}
                    <span
                      style={buttonStyle}
                      role="button"
                      onClick={() => toggleExtendedInfo(index)}
                    >
                      Read more
                    </span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
