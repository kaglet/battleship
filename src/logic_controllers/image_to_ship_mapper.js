const imgToShipMapper = (() => {
  const getPicFromType = function (type) {
    return `${type}.jpg`;
  };

  const getTypeFromPic = function (url) {
    let newUrl = url.slice(0, -4);
    return newUrl;
  };

  return { getPicFromType, getTypeFromPic };
})();

module.exports = imgToShipMapper;
