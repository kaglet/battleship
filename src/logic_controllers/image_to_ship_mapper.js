const imgToShipMapper = (() => {
  const getPicFromType = function (type) {
    return `${type}.jpg`;
  };

  const getTypeFromPic = function (url) {
    const lastForwardSlash = url.lastIndexOf("/");
    // TODO: Find the position of the last occurence of a symbol from the end
    // For a url of this form: "url(\"http://localhost:8080/battleship.jpg\")"
    let newUrl = url.slice(lastForwardSlash + 1, -6);
    return newUrl;
  };

  return { getPicFromType, getTypeFromPic };
})();

module.exports = imgToShipMapper;
