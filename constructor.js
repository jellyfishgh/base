var value = 'global value'

function Hello() {
  this.value = 'hello Value'
  return this
}

Hello.prototype.sayMe = function() {
  return this.value
}

console.log(new Hello().sayMe())
console.log(Hello().value)