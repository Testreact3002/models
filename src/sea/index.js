/*
 *2. Решить архитектурную задачу. Представьте, что мы пишем онлайн игру,
где нужно показывать различных морских существ: акула, черепаха, медуза,
морская звезда.
Все они умеют плавать, даже морская звезда. Некоторые из них умеют
кусать (акула, черепаха), другие нет.
Для игры необходимо, чтобы мы могли создавать объекты каждого морского
существа, который бы имел методы display (для отображения), bite, swim.
 */
const Emitter = require("emmett");
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
class Swimable extends Emitter{
   constructor(color){
      super();
      this.color=color;
      this.p = new Position();
      this.bitten = 0;
      
   }
   swim (dices){
     sea.remove(this);
     this.p.to = dices;
     sea.add(this);
     this.emit(types.SEA_FISH__SWIM);
   }
   get dices(){
     const result = this.p.dices;
     this.emit(types.SEA_FISH__DICE, result);
     return result;
   }
   toString(){
     return 'bitten '+ this.bitten+ ' times';
   }
   display(){
     this.emit(types.SEA_FISH__DISP);
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


var sea = new Sea();

function deepSea(){
   let swimables =  [ new Starfish(),
    new Starfish(),
    new Starfish(),
    new Shark(),
    new Jellyfish(),
    new Turtle(),
  ];
  let n = 0;
  let tm;
  function run(){
    swimables.forEach((x)=>{
      const dices = x.p.dices;
      x.swim(dices);
      //sea.print();
      
    });
    if(n < 3000){ 
      tm = setTimeout(run,1000);
    }else{
      clearTimeout(tm);
    }

  }
  
  run();
   
}

module.exports = {Biteable, Swimable, sea, Shark, Turtle, Jellyfish, Starfish, deepSea, types};


