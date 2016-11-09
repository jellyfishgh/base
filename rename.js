// 驼峰命名与横线命名的相互转换

function camel2lineOne(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

function camel2lineTwo(str) {
    return str.replace(/[a-z][A-Z]/g, function(r) {
        return `${r[0]}-${r[1].toLowerCase()}`
    })
}

function line2camel(str) {
    return str.replace(/-\w/g, function(r) {
        return r[1].toUpperCase()
    })
}

console.log(camel2lineOne('toLowerCase'))
console.log(camel2lineTwo('toLowerCase'))
console.log(line2camel('to-lower-case'))