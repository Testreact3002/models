/*
 * 1. Реализовать функцию перевода числа из двоичной системы счисления в
десятичную.
*/

function bin2dec(str = '0'){
  var arr = str.split('');
  var l = arr.length;
  var one;
  var n;
  var start = 0;
  for(;start<l && arr['start'] === '0' ;start++);
  if(typeof BigInt === 'function'){
    n = 0n;
    one = 1n;
  }else{
    if(l-start>53){
      throw Error('Number overflow')
    }
    n = 0;
    one = 1; 
  }
  for (let i = start; i < l; i++){
    n = n << one;
    if(arr[i]==='1'){
      n++;
    }
  }
  return n;
}


module.exports = {bin2dec};


