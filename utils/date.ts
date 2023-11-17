
function getDay(){
    const date = new Date();
    return date.getDate();
}
function getDayOfTheWeek() {
    const date = new Date();
    return date.getDay();
}
export {
    getDay,
    getDayOfTheWeek
}