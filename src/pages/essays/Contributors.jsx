import { Header } from "../../components/site/Header";

const imgStyle = {
  border: "solid white 1px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

export function Contributors() {
  console.log(" You are on the correct page");
  const images = [
    {
      name: "Ruth Mostern",
      url: "https://www.history.pitt.edu/sites/default/files/person-images/May%202023%20Mostern%20headshot%20cropped%20%281%29.jpeg",
      description: "Project Manager",
    },
    {
      name: "Nathan Michalewicz",
      url: "https://www.worldhistory.pitt.edu/sites/default/files/nkm.jpg",
      description: "",
    },
    {
      name: "Ryan Horne",
      url: "/ryanhorne.jpg",
      description: "",
    },
    {
      name: "Sharon Zhang",
      url: "https://www.history.pitt.edu/sites/default/files/person-images/Zhang.jpg",
      description: "",
    },
  ];

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          gap: "2em",
        }}
      >
        <Header />
        <div
          style={{
            maxWidth: "950px",
            display: "flex",
            flexWrap: "wrap",
            gap: "1em",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {images.map((i, index) => (
            <div key={index} style={imgStyle}>
              <img src={i.url} width={325} />
              <p style={{ textAlign: "center" }}>{i.name}</p>{" "}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
