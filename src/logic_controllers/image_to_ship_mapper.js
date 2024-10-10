const imgToShipMapper = () => {
  const getPicFromType = function (type) {
    return `${type}.jpg`;
  };

  const getTypeFromPic = function (url) {
    return url.slice(-1, -2);
  };
};

module.exports = imgToShipMapper;
