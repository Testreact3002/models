const mocha = require("mocha");
const {assert} =require("chai");
const {creator, types, Sea} = require("./index.js");
const Emitter = require("emmett");

const {Swimable, Starfish, Shark, Turtle, Jellyfish, sea} = creator(Emitter,Sea);

describe("Swimable",()=>{
  it("Shark is Swimable", ()=>{
     const shark = new Shark();
     assert.instanceOf(shark, Swimable);
  });
  it("Starfish is Swimable", ()=>{
     const seafish = new Starfish();
     assert.instanceOf(seafish, Swimable);
  });
  it("Turtle is Swimable", ()=>{
     const turtle = new Turtle();
     assert.instanceOf(turtle, Swimable);
  });
  it("Jellyfish is Swimable", ()=>{
     const jellyfish  = new Jellyfish();
     assert.instanceOf(jellyfish, Swimable);
  });
  it("Shark name", ()=>{
     const shark = new Shark();
     assert.equal(shark.name, 'shark');
  });
  it("Starfish name", ()=>{
     const seafish = new Starfish();
     assert.equal(seafish.name, 'starfish');
  });
  it("Turtle name", ()=>{
     const turtle = new Turtle();
     assert.equal(turtle.name, 'turtle');
  });
  it("Jellyfish name", ()=>{
     const jellyfish  = new Jellyfish();
     assert.equal(jellyfish.name, 'jellyfish');
  });
 it("Turtle color",()=>{
   const turtle = new Turtle("green");
   assert.equal(turtle.color,"green");
})
 it("Shark color",()=>{
   const shark = new Shark("white");
   assert.equal(shark.color,"white");
})
 it("Jellyfish color",()=>{
   const jf = new Jellyfish("yellow");
   assert.equal(jf.color,"yellow");
})
 it("Starfish color",()=>{
   const jf = new Starfish("red");
   assert.equal(jf.color,"red");
})

 it("Starfish dices sync", ()=>{
     const sf = new Shark("orange");
     var  dice = sf.dices;
     assert.isArray(dice);
     assert.lengthOf(dice,2);
 })
 it("Starfish dices", (done)=>{
     const sf = new Shark("orange");
     var dice; 
     sf.on(types.SEA_FISH__DICE, function (e){
        assert.instanceOf(e.target,Shark);
        assert.isArray(e.data);
        assert.lengthOf(e.data,2);
        done();
     });
     dice = sf.dices;
     
 })
 it("Starfish swim", (done)=>{
     const sf = new Starfish("orange");
     sf.on(types.SEA_FISH__SWIM, (e)=>{
        assert.instanceOf(e.target,Starfish);
        assert.equal(e.target.p|0,3);
        done();
     });
     sf.swim([1,2]);
     sea.remove(sf);
 })
 it("Shark bite Jellyfish",(done)=>{
    const shark = new Shark("green");
    const jellyfish = new Jellyfish("white");
    shark.on(types.SEA_FISH__BITE,function(e){
      assert.equal(e.target.bites,1);
      assert.equal(e.data.bitten.bitten,1);
      assert.equal(e.data.bitten.bites,undefined);
      assert.equal(e.target.bitten,0);
      sea.remove(shark);
      sea.remove(jellyfish);
      done();
    });
    sea.add(shark);
    sea.add(jellyfish);
    shark.bite();
    
 }) 
});



describe("sea", ()=>{
})
