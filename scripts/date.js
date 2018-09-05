var makeDate =function() {
    var date = new Date();

    //starts as empty string
    var dateFormat = "";

    //add month date and year to string
    // +1 to getMonth b/c counts months at 0-index
    dateFormat += (date.getMonth() + 1) + "_";
    dateFormat += date.getDate() + "_";
    dateFormat += date.getFullYear();

    return dateFormat;
};

module.exports = makeDate;