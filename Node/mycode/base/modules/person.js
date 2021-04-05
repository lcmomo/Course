// const person = {
//   name: 'lc',
//   age: 25
// }

// module.exports = person;


class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greeting() {
    console.log(`name: ${this.name}, age: ${this.age} `);
  }
}

module.exports = Person;

// 模块包装函数

(function(exports, require, module, __filename, __dirname){
  
})