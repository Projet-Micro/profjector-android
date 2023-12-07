
function getDay() : number{
    const date = new Date();
    return date.getDate();
}
function getDayOfTheWeek() : number {
    const date = new Date();
    return date.getDay();
}
export {
    getDay,
    getDayOfTheWeek
}