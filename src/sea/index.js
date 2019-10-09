/*
 *2. Решить архитектурную задачу. Представьте, что мы пишем онлайн игру,
где нужно показывать различных морских существ: акула, черепаха, медуза,
морская звезда.
Все они умеют плавать, даже морская звезда. Некоторые из них умеют
кусать (акула, черепаха), другие нет.
Для игры необходимо, чтобы мы могли создавать объекты каждого морского
существа, который бы имел методы display (для отображения), bite, swim.
 */
const types = require( "./types.js");

class Position {
  constructor(x = 0){
    this.x = x % 23;
  }
  get dices(){
    const d1 = (Math.random() * 6 + 1)|0;
    const d2 = (Math.random() * 6 + 1)|0;
    return [d1, d2];
  }
  set to(dices = [0,0]){
    this.x += dices[0]+ dices[1];
    this.x %= 23;
  }
  valueOf(){
    return this.x;
  }
}

class Sea {
   constructor(){
     this.board = Array(23);
     for(let i =0; i< 24;i++){
       this.board[i] = new Set();
     }
   }
   add(swimable){
     this.board[swimable.p|0].add(swimable);
   }
   remove(swimable){
     this.board[swimable.p|0].delete(swimable);
   }
   at(p,cb){
     this.board[p|0].forEach(cb);
   }
  // toJSON(){
  //   this.board.map((swimables)=>Array.from(swimables).map((swimable)=>swimable.toJSON()));
  // }
   print(){
     for(let i = 0; i< 24; i++){
       this.board[i].forEach((swimable)=>{
          console.log(swimable);
       });
     }
   }

   
}

function creator(Emitter, Sea){
var sea = new Sea();
class Swimable extends Emitter{
   constructor(color){
      super();
      this.color=color;
      this.p = new Position();
      this.bitten = 0;
      
   }
   swim (dices){
     this.p.to = dices;
     sea.add(this);
     this.emit(types.SEA_FISH__SWIM);
   }
   get dices(){
     const result = this.p.dices;
     sea.remove(this);
     this.emit(types.SEA_FISH__DICE, result);
     return result;
   }
   toString(){
     return 'bitten '+ this.bitten+ ' times';
   }
   display(){
     this.emit(types.SEA_FISH__DISP);
   }
   toJSON(){
     return {color: this.color, name: this.name, bitten: this.bitten, p: this.p|0 }
   }
   
}

class Biteable extends Swimable{
   constructor(color){
     super(color);
     this.bites = 0;
   }
   bite(){
     sea.at(this.p, 
       (x)=>{
       if(x!==this && x.name != this.name){
         x.bitten++;
         this.bites++;
         this.emit(types.SEA_FISH__BITE, {bitten: x})
         x.display();
         this.display();
                  
       }

    });
   
   }
   swim(dices){
      super.swim(dices);
      this.bite();
   }
   toString(){
     return 'bites '+ this.bites+ ' times'+ super.toString();
   }
   toJSON(){
     var js = super.toJSON();
     js.bites = this.bites|0;  
     return js;
   }
}

class Shark extends Biteable{
    get name (){
      return 'shark';
    }
    toString (){
       return 'Shark '+ super.toString()
    }
}

class Turtle extends Biteable{
    get name (){
      return 'turtle';
    }
    toString (){
       return 'Turtle '+ super.toString()
    }
}

class Jellyfish extends Swimable{
    get name () {
      return 'jellyfish';
    }
    toString (){
       return 'Jellyfish '+ super.toString()
    }
}

class Starfish extends Swimable{
    get name (){
      return 'starfish';
    }
    toString (){
       return 'Starfish '+ super.toString()
    }
}

return {Biteable, Swimable, sea, Shark, Turtle, Jellyfish, Starfish};
}


function deepSea(Emitter, Sea){
   
   const  {Biteable, Swimable, sea, Shark, Turtle, Jellyfish, Starfish} = creator(Emitter,Sea);

   let swimables =  [ new Starfish(),
    new Starfish(),
    new Starfish(),
    new Shark(),
    new Jellyfish(),
    new Turtle(),
  ];

  swimables.forEach((x)=>{
     x.on(types.SEA_FISH__DICE,function(e){
        console.log(types.SEA_FISH__DICE,e.target,e.data);
     });
     x.on(types.SEA_FISH__SWIM,function(e){
       console.log(types.SEA_FISH__SWIM,e.target);
     });
     x.on(types.SEA_FISH__BITE,function(e){
       console.log(types.SEA_FISH__BITE,e.target, e.data);
     });
     x.on(types.SEA_FISH__DISP,function(e){
       console.log(types.SEA_FISH__DISP,e.target);
     });
  });

  let n = 0;
  let tm;
  function run(i=0){
    if(i >= swimables.length){
     if(n >= 3000){
       clearTimeout(tm);
       return;
     }
     i = 0;
    }
    let x = swimables[i];
    const dices = x.dices;
    x.swim(dices);
    tm = setTimeout(run, 3000, ++i);
  }
  run();
}

module.exports = {creator, Sea, deepSea, types};


