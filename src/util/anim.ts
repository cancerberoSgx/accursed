import { isObject } from 'misc-utils-of-mine-generic';

type Timing = (n:number, c?: number, d?:number)=>number

export function animate({duration ,draw, timing, lapse}: {duration: number, draw: (n:number)=>void, timing: Timing, lapse?: number}) {
  if(isObject(timing)){
    timing = (timing as any).fn(duration)
  }
  let start = Date.now() 
  let progress =0
  requestAnimationFrame(function anim(time) {
      let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
   progress = timing(timeFraction, time - start, duration)
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

var c = 1, b = 0
export const easeInQuad = ()=>({fn:d=>  (x, t) =>  c*(t/=d)*t + b }as any)

  
export const 	easeOutQuad = ()=>({ fn: d=>(x, t)=> -c *(t/=d)*(t-2) + b} as any)
export const 	easeInOutQuad = ()=>({ fn: d=>(x, t)=> {
  		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
}} as any)
export const 	easeInElastic = ()=>({ fn: d=>(x, t)=> {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
}} as any)

export const swing = p=> 0.5 - Math.cos( p * Math.PI ) / 2;

export const 	easeOutBounce = ()=>({ fn: d=>(x, t)=> {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
}} as any)


export const 	easeInCubic = ()=>({ fn: d=>(x, t)=> {
  return c*(t/=d)*t*t + b;
}} as any)

export const 	easeOutCubic = ()=>({ fn: d=>(x, t)=> {
		return c*((t=t/d-1)*t*t + 1) + b;
}} as any)

export const 	easeInOutCubic = ()=>({ fn: d=>(x, t)=> {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
}} as any)

export const 	easeInQuart = ()=>({ fn: d=>(x, t)=> {
		return c*(t/=d)*t*t*t + b;
}} as any)

export const 	easeInOutQuart = ()=>({ fn: d=>(x, t)=> {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
}} as any)

export const 	easeInQuint = ()=>({ fn: d=>(x, t)=> {
return c*(t/=d)*t*t*t*t + b;
}} as any)

export const 	easeOutQuint = ()=>({ fn: d=>(x, t)=> {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
}} as any)

export const 	easeInExpo = ()=>({ fn: d=>(x, t)=> {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
}} as any)

export const 	easeInOutQuint = ()=>({ fn: d=>(x, t)=> {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
}} as any)

export const 	easeInSine = ()=>({ fn: d=>(x, t)=> {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
}} as any)
export const 	easeInOutElastic = ()=>({ fn: d=>(x, t)=> {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
}} as any)

export const 	easeOutElastic = ()=>({ fn: d=>(x, t)=> {
  var s=1.70158;var p=0;var a=c;
  if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
  if (a < Math.abs(c)) { a=c; var s=p/4; }
  else var s = p/(2*Math.PI) * Math.asin (c/a);
  return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
}} as any)
export const 	easeInOutExpo = ()=>({ fn: d=>(x, t)=> {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
}} as any)

export const 	easeInOutBack = ()=>({ fn: d=>(x, t)=> {
  // //@ts-ignore
  // 	if (s == undefined) s = 1.70158; 
  var  s = 1.70158;
  //@ts-ignore
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
  //@ts-ignore
  return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
}} as any)

export const 	easeOutBack = ()=>({ fn: d=>(x, t, d)=> {
  // //@ts-ignore
  // 	if (s == undefined) s = 1.70158;
  var s = 1.70158;
  
  return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;

  // // @ts-ignore
	// 	return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
}} as any)

export const 	easeInBounce = ()=>({ fn: d=>(x, t, d)=> {
		return c - easeOutBounce().fn(d)(x, d-t, 0, c, d) + b;
}} as any)

export const 	easeInOutBounce = ()=>({ fn: d=>(x, t, d)=> {
		if (t < d/2) return  easeInBounce().fn(d) (x, t*2, 0, c, d) * .5 + b;
		return  easeOutBounce().fn(d) (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
}} as any)



export const easing = {
   easeOutBounce, easeInElastic, easeOutQuad, easeInOutQuad, bounceEaseInOut, bounceEasyOut,  easeInQuad, easeInOutCubic, easeOutCubic, easeInQuart, easeInOutQuart, easeOutQuint, easeInExpo, easeInOutQuint, easeInSine, easeInOutElastic, easeOutElastic, easeInOutBack, easeInOutExpo, easeOutBack, easeInBounce, easeInOutBounce
}

// animate({
//   duration: 2000,
//   timing: easeInQuad(),
//   lapse: 20,
//   draw(progress) {
//   console.log(progress * 100 + '%');
  //   }
// });

//TODO: 
	// easeInOutSine: function (x, t, b, c, d) {
	// 	return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	// },
	// easeOutExpo: function (x, t, b, c, d) {
	// 	return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	// },
	// easeInCirc: function (x, t, b, c, d) {
	// 	return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	// },
	// easeOutCirc: function (x, t, b, c, d) {
	// 	return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	// },
	// easeInOutCirc: function (x, t, b, c, d) {
	// 	if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
	// 	return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	// },
	// easeInBack: function (x, t, b, c, d, s) {
	// 	if (s == undefined) s = 1.70158;
	// 	return c*(t/=d)*t*((s+1)*t - s) + b;
	// },
	// easeInBounce: function (x, t, b, c, d) {
	// 	return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	// },
	// easeInOutBounce: function (x, t, b, c, d) {
	// 	if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
	// 	return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	// }





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
