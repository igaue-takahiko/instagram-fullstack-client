export const imagesShow = (src, theme) => (
  <img
    className="img-thumbnail"
    style={{ filter: theme ? "invert(1)" : "invert(0)" }}
    src={src}
    alt="images"
  />
);

export const videoShow = (src, theme) => (
  <video
    className="img-thumbnail"
    controls
    style={{ filter: theme ? "invert(1)" : "invert(0)" }}
    src={src}
    alt="images"
  />
);
