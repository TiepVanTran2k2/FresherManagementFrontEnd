export function ConvertDateTimeToDateOnly(date) {
    var yourdate = date.split("-").reverse();
    var tmp = yourdate[1];
    yourdate[0] = yourdate[1];
    yourdate[1] = tmp;
    yourdate = yourdate.join("/");
    return yourdate;
  }