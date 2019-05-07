// class C1 {
//   private _a: number = 1
// }
// const c = new C1()
// console.log(c)
// // C1 { _a: 1 }
// Object.assign(c, {_a: 2})
// console.log(c)
// // C1 { _a: 1 }

// console.log({...new C1()})
// class C {
//   constructor() {
//     Object.defineProperty(this, "_a", {
//       enumerable: false,
//       writable: true
//     })
//   }
//   private _a: number = 1
// }
// console.log(new C())

// const c =  new C()
// interface T{}
// function f(t: T){}
// const d = {...c, b: ''}
// f({...c})

// class C {
//   constructor() {
//     Object.defineProperty(this, "age", {
//       enumerable: false,
//       writable: true
//     })
//   }
//   private _a: number = 1
//   public get a(): number {
//     return this._a;
//   }
//   public set a(value: number) {
//     this._a = value;
//   }
// }
// const c = new C()

// const d = { ...c, f: 0 }
// console.log(d, Object.keys(c));

// https://codepen.io/ghthree/pen/WWRBdd

// (function (root, factory) {
//   root.waterfall = factory();
// }(this, function () {
//   function style(el) {
//     return window.getComputedStyle(el)
//   }

//   function margin(position, el) {
//     return parseFloat(style(el)['margin' + position]) || 0
//   }

//   function px(n) { return parseFloat(n) + 'px' }
//   function top(el) { return parseFloat(el.style.top) }
//   function left(el) { return parseFloat(el.style.left) }
//   function width(el) { return parseFloat(style(el).width) }
//   function height(el) { return parseFloat(style(el).height) }
//   function bottomDistance(el) { return top(el) + height(el) + margin('Bottom', el) }
//   function rightDistance(el) { return left(el) + width(el) + margin('Right', el) }

//   function placeEl(el, top, left) {
//     el.style.position = 'absolute'
//     el.style.top = px(top)
//     el.style.left = px(left)
//   }

//   function thereIsSpaceOnRight(prevEl, el, container) {
//     return rightDistance(prevEl) + width(el) <= width(container)
//   }

//   function sortEls(els) {
//     els = els.sort(function (a, b) {
//       return bottomDistance(b) - bottomDistance(a) || left(b) - left(a)
//     })
//   }

//   function Boundary(firstLineEls) {

//     var els = firstLineEls
//     sortEls(els)

//     this.add = function (el) {
//       els.push(el)
//       sortEls(els)
//       els.pop()
//     }
//     this.minEl = function () { return els[els.length - 1] }
//     this.maxEl = function () { return els[0] }

//   }

//   function waterfall(container) {
//     if (typeof container === 'string') {
//       container = document.querySelector(container)
//     }
//     container.style.position = 'relative'

//     var elements = container.children
//     // 放置第一行元素
//     if (elements.length) {
//       var i = 0
//       // 第一个元素
//       var firstEl = elements[i]
//       placeEl(firstEl, 0, margin('Left', firstEl))
//       // 第一行后续元素
//       for (i++; i < elements.length && thereIsSpaceOnRight(elements[i - 1], elements[i], container); i++) {
//         placeEl(elements[i], 0, rightDistance(elements[i - 1]) + margin('Left', elements[i]))
//       }
//       var firstLineEls = [].slice.call(elements, 0, i)
//       var boundary = new Boundary(firstLineEls)
//       // 第一行以下的元素，依次放在高度最小的列中
//       for (; i < elements.length; i++) {
//         var minEl = boundary.minEl()
//         placeEl(elements[i], bottomDistance(minEl) + margin('Top', elements[i]), left(minEl))
//         boundary.add(elements[i])
//       }
//     }

//     // 调整容器的大小
//     var maxEl = boundary.maxEl()
//     container.style.height = px(bottomDistance(maxEl) + margin('Bottom', maxEl))
//   }
//   return waterfall
// }));

// window.onload = waterfall('.waterfall');
// window.onresize = function() {
//   waterfall('.waterfall');
// }
