function localTime(time) {
    var publishDateTime = new Date(time),
        hours = publishDateTime.getHours(),
        minutes = publishDateTime.getMinutes(),
        year = publishDateTime.getFullYear(),
        now = new Date(),
        passedTime = now - publishDateTime,
        dayTime = 24 * 60 * 60 * 1000,
        t = hours + ":" + minutes,
        d = (publishDateTime.getMonth()+1) + "月" + publishDateTime.getDate()+"日";
    if (passedTime > 0 && passedTime < dayTime) {
        return t;
    } else if (passedTime > dayTime && passedTime < 2 * dayTime) {
        return "昨天 " + t;
    } else if (year === now.getFullYear()) {
        return d + " " + t;
    } else {
        return year + "年" + d + " " + t;
    }
}
console.log(localTime("2015.8.11 08:20"));
console.log(localTime("2015.8.10 08:20"));
console.log(localTime("2015.8.09 08:20"));
console.log(localTime("2015.7.11 08:20"));
console.log(localTime("2014.7.11 08:20"));
console.log(localTime(1437998341*1000));//秒到毫秒
var date = new Date(1437998341);
console.log(date.toLocaleString());
console.log(date.getMonth());
