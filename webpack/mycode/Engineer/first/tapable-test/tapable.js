class hooks {
  constructor() {
    this.taps = [];
  }
  tap(callback) {
    this.taps.push(callback)
  }
  call(options) {
    this.taps.forEach((callback) => {
      callback(options)
    })
  }
}

let a = new hooks();
a.tap(() => {
  console.log(121212)
})

a.call();
