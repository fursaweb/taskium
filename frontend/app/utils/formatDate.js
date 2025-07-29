const moment = require("moment");

const formatDate = (date) => {
  if (date) {
    return moment(date).format("DD.MM.YYYY");
  } else {
    return moment(new Date()).format("YYYY-MM-DD");
  }
};

export default formatDate;
