const mocha = require("mocha");
const {assert} =require("chai");
const {Swimable, Starfish, Shark, Turtle, Jellyfish} = require("./index.js");
describe("Swimable",()=>{
  it("Shark is Swimable", ()=>{
     const shark = new Shark();
     assert.instanceOf(shark, Swimable);
     const json = shark.toJSON();
     assert.equal(json.name, 'shark');
     assert.equal(shark.name, 'shark');
  });
  it("Starfish is Swimable", ()=>{
     const seafish = new Starfish();
     const json = seafish.toJSON();
     assert.equal(json.name, 'starfish');
     assert.equal(seafish.name, 'starfish');
     assert.instanceOf(seafish, Swimable);
  });
  it("Turtle is Swimable", ()=>{
     const turtle = new Turtle();
     const json = turtle.toJSON();
     assert.equal(json.name, 'turtle');
     assert.equal(turtle.name, 'turtle');
     assert.instanceOf(turtle, Swimable);
  });
  it("Jellyfish is Swimable", ()=>{
     const jellyfish  = new Jellyfish();
     const json = jellyfish.toJSON();
     assert.equal(json.name, 'jellyfish');
     assert.equal(jellyfish.name, 'jellyfish');
     assert.instanceOf(jellyfish, Swimable);
  });
 it("Turtle color",()=>{
   const turtle = new Turtle("red");
   assert.equal(turtle.color,"red");
})
 it("Shark color",()=>{
   const shark = new Shark("red");
   assert.equal(shark.color,"red");
})
 it("Jellyfish color",()=>{
   const jf = new Jellyfish("red");
   assert.equal(jf.color,"red");
})
 it("Starfish color",()=>{
   const jf = new Starfish("red");
   assert.equal(jf.color,"red");
})
});
