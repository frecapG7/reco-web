const getUrl = (providerName) => {
  switch (providerName) {
    case "SoundCloud":
      return "https://cdn-icons-png.flaticon.com/512/49/49336.png";
    case "Spotify":
      return "https://cdn-icons-png.flaticon.com/512/174/174872.png";
    case "YouTube":
      return "https://cdn-icons-png.flaticon.com/512/174/174883.png";
    case "Wikipedia":
      return "https://cdn-icons-png.flaticon.com/512/733/733579.png";
    case "IMDb":
      return "https://cdn-icons-png.flaticon.com/512/174/174836.png";
    default:
      return "";
  }
};

export const ProviderIcon = ({ providerName }) => {
  return (
    <img
      src={getUrl(providerName)}
      alt={providerName}
      style={{
        width: "40px",
        height: "40px",
      }}
    />
  );
};
