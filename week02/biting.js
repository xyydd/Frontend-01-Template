function Dog (name) {
  this.name = name
}
function Man (name) {
  this.name = name
  this.health = 10
}
Man.prototype.hurt = function(level) {
  this.health -= level
};
const wangcai = new Dog('旺财')
const lisi = new Man('李四')

const biting = {
  power: 0,
  time: 0,
  behavior: function (sbd1, sbd2, power = 2, time = 2) {
    this.power = power
    this.time = time
    console.log(`${sbd2.name}健康值：${sbd2.health}`)
    sbd2.hurt(this.power * this.time)
    console.log(`${sbd1.name}用${this.power}级力度咬了${sbd2.name}${this.time}s`)
    console.log(`${sbd2.name}健康值：${sbd2.health}`)
  }
}
biting.behavior(wangcai, lisi, 2, 2)
