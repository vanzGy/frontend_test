export default function convertNumberToTime (unixTime: number) {
    var date = new Date(unixTime * 1000);
    return date.toLocaleString("en-SG");
}