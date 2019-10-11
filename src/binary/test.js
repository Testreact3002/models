const mocha = require("mocha");
const {assert} =require("chai");
const {bin2dec} = require("./index.js");
const Emitter = require("emmett");
const zeros =  {
    "10": "1024",
    "20": "1048576",
    "30": "1073741824",
    "40": "1099511627776",
    "50": "1125899906842624",
    "60": "1152921504606846976",
    "70": "1180591620717411303424",
    "80": "1208925819614629174706176"
  };
const units = {
    "3": "7",
    "5": "31",
    "53": "9007199254740991",
    "31": "2147483647",
    };
function unit(i){
  return "1".repeat(i|0);
}
function zero(i){
  return "1"+("0".repeat(i|0));
}
SaveBigInt = BigInt;
describe("Numbers",()=>{
  it("2^3-1", function(){
    BigInt = undefined;
    assert.equal(bin2dec(unit(3)),units['3']);
  }) 
  it("2^5-1", function(){
    BigInt = undefined;
    assert.equal(bin2dec(unit(5)),units['5']);
  }) 
  it("2^31-1", function(){
    BigInt = undefined;
    assert.equal(bin2dec(unit(31)),units['31']);
  }) 
  it("2^53-1", function(){
    BigInt = undefined;
    assert.equal(bin2dec(unit(53)),units['53']);
  }) 
  it("Numbers 2^10", function(){
     BigInt = undefined;
     assert.equal(bin2dec(zero(10)),zeros['10']);
  })
  it("Numbers 2^20", function(){
     BigInt = undefined;
     assert.equal(bin2dec(zero(20)),zeros['20']);
  })
  it("Numbers 2^30", function(){
     BigInt = undefined;
     assert.equal(bin2dec(zero(30)),zeros['30']);
  })
  it("Numbers 2^40", function(){
     BigInt = undefined;
     assert.equal(bin2dec(zero(40)),zeros['40']);
  })
  it("Numbers 2^50", function(){
     BigInt = undefined;
     assert.equal(bin2dec(zero(50)),zeros['50']);
  })
  it("Numbers 2^60", function(){
    BigInt = undefined;
    assert.throws(()=>bin2dec(zero(60)), 'Number overflow'); 
  })
  it("Numbers 2^70", function(){
     BigInt = undefined;
     assert.throws(()=>bin2dec(zero(70)), 'Number overflow');;
  })
  it("Numbers 2^80", function(){
     BigInt = undefined;
     assert.throws(()=>bin2dec(zero(80)), 'Number overflow');
  })
});
describe("BigInt",()=>{
  it("2^3-1", function(){
    BigInt = SaveBigInt;
    assert.equal(bin2dec(unit(3)),units['3']);
  }) 
  it("2^5-1", function(){
    BigInt = SaveBigInt;
    assert.equal(bin2dec(unit(5)),units['5']);
  }) 
  it("2^31-1", function(){
    BigInt = SaveBigInt;
    assert.equal(bin2dec(unit(31)),units['31']);
  }) 
  it("2^53-1", function(){
    BigInt = SaveBigInt;
    assert.equal(bin2dec(unit(53)),units['53']);
  }) 
  it("2^10", function(){
     BigInt = SaveBigInt;
     assert.equal(bin2dec(zero(10)),zeros['10']);
  })
  it("2^20", function(){
     BigInt = SaveBigInt;
     assert.equal(bin2dec(zero(20)),zeros['20']);
  })
  it("2^30", function(){
     BigInt = SaveBigInt;
     assert.equal(bin2dec(zero(30)),zeros['30']);
  })
  it("2^40", function(){
     BigInt = SaveBigInt;
     assert.equal(bin2dec(zero(40)),zeros['40']);
  })
  it("2^50", function(){
     BigInt = SaveBigInt;
     assert.equal(bin2dec(zero(50)),zeros['50']);
  })
  it("2^60", function(){
    BigInt = SaveBigInt;
    assert.equal(bin2dec(zero(60)),zeros['60']);
  })
  it("2^70", function(){
     BigInt = SaveBigInt;
     assert.equal(bin2dec(zero(70)),zeros['70']);
  })
  it("2^80", function(){
     BigInt = SaveBigInt;
     assert.equal(bin2dec(zero(80)),zeros['80']);
  })
});

















