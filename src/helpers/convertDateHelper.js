const formatDateToMMDDYYYY = (date) => {
    var resultDay = new Date(date),
        month = '' + (resultDay.getMonth() + 1),
        day =  '' +resultDay.getDate(),
        year = '' + resultDay.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [ month,day , year].join('/');
}
const formatDateToDDMMYYYY = (date) => {
    var resultDay = new Date(date),
        month = '' + (resultDay.getMonth() + 1),
        day =  '' +resultDay.getDate(),
        year = '' + resultDay.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day,month, year].join('/');
}
export { formatDateToMMDDYYYY  , formatDateToDDMMYYYY}
 