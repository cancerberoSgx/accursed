type Timing = (n:number)=>number

export function animate({duration ,draw, timing, lapse}: {duration: number, draw: (n:number)=>void, timing: Timing, lapse?: number}) {
  let start = Date.now()
  requestAnimationFrame(function anim(time) {
      let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
    let progress = timing(timeFraction)
    draw(progress)
    if (timeFraction < 1) {
      requestAnimationFrame(anim, lapse);
    }
  });
}

function requestAnimationFrame(f, lapse=0){
  setTimeout(()=>f(Date.now()), lapse)
}

function makeEaseOut(timing: Timing) {
  return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}

function bounceFn(timeFraction:number) {
  for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
}

/** Imagine we are dropping a ball. It falls down, then bounces back a few times and stops. The bounce function does the same, but in the reverse order: “bouncing” starts immediately. */
export const bounceEasyOut = ()=>makeEaseOut(bounceFn);


/** parabolic curve */
export function quad(timeFraction) {
  return Math.pow(timeFraction, 2)
}

/**
 * “bow shooting”. First we “pull the bowstring”, and then “shoot”.
 * @param x “elasticity coefficient”. The distance of “bowstring pulling” is defined by it. Default value 1.5.
 */
export const  back = (x = 1.5) => timeFraction => Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
/**
 * @param x “initial range” 
 */
export const elastic = (x=1.5)=>timeFraction => Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)


function makeEaseInOut(timing) {
  return function(timeFraction) {
    if (timeFraction < .5)
      return timing(2 * timeFraction) / 2;
    else
      return (2 - timing(2 * (1 - timeFraction))) / 2;
  }
}


export const bounceEaseInOut = ()=> makeEaseInOut(bounceFn)


// animate({
//   duration: 1000,
//   timing(timeFraction) {
//     return timeFraction;
//   },
//   draw(progress) {
//   console.log(progress * 100 + '%');
  
//   }
// });

// setImmediate((t)=>{
//   console.log(t);
  
// })


// function requestAnimationFrame(f){
//   setImmediate(()=>f(Date.now()))
// }

// function animate({duration, draw, timing}) {

//   let start = performance.now();

//   requestAnimationFrame(function animate(time) {
//     let timeFraction = (time - start) / duration;
//     if (timeFraction > 1) timeFraction = 1;

//     let progress = timing(timeFraction)

//     draw(progress);

//     if (timeFraction < 1) {
//       requestAnimationFrame(animate);
//     }

//   });
// }
// The code for it:
