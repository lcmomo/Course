function greeter(person) {
  return 'Hello,'+ person;
}

let user = "li";
console.log(greeter(user))


let value: any;
value = true;
value = 1;
value = "hello";
value = Symbol("type");
value = {};
value = [];
value.foo.bar;
value();    // [[call]]
new value(); //  [[constructor]]
value[0][1]; // 以上都是OK的


let value2: unknown;
value2 = true;
value2 = 1;
value2 = "hello";
value2 = Symbol("type");
value2 = {};
value2 = [];

value2.foo.bar;  
value2();    
new value2(); 
value2[0][1]; // 以上不ok ERROR


