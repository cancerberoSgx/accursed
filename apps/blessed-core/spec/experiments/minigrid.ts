
//   function extend(a: { [x: string]: any; }, b: { [x: string]: any; container?: any; nodeList?: any; hasOwnProperty?: any; }) {
//     for (var key in b) {
//       if (b.hasOwnProperty(key)) {
//         a[key] = b[key];
//       }
//     }
//     return a;
//   }
// export  function Minigrid(props: { container: any; item: any; }) {
//     var containerEle = props.container instanceof Node ? (
//       props.container
//     ) : (
//       document.querySelector(props.container)
//     );

//     var itemsNodeList = props.item instanceof NodeList ?
//       props.item : containerEle.querySelectorAll(props.item);

//     this.props = extend(props, {
//       container: containerEle,
//       nodeList: itemsNodeList
//     });

//   }

//   Minigrid.prototype.mount = function() {
//     // if (!this.props.container) {
//     //   return false;
//     // }
//     // if (!this.props.nodeList || this.props.nodeList.length === 0) {
//     //   return false;
//     // }
//     var gutter = (
//       typeof this.props.gutter === 'number' &&
//       isFinite(this.props.gutter) &&
//       Math.floor(this.props.gutter) === this.props.gutter
//     ) ? this.props.gutter : 0;

//     var done = this.props.done;
//     var containerEle = this.props.container;
//     var itemsNodeList = this.props.nodeList;

//     containerEle.style.width = '';

//     var forEach = Array.prototype.forEach;
//     var containerWidth = containerEle.getBoundingClientRect().width;
//     var firstChildWidth = itemsNodeList[0].getBoundingClientRect().width + gutter;
//     var cols = Math.max(Math.floor((containerWidth - gutter) / firstChildWidth), 1);
//     var count = 0;

//     containerWidth = (firstChildWidth * cols + gutter) + 'px';
//     containerEle.style.width = containerWidth;
//     containerEle.style.position = 'relative';

//     var itemsGutter: number[] = [];
//     var itemsPosX: number[] = []

//     for ( var g = 0 ; g < cols ; ++g ) {
//       itemsPosX.push(g * firstChildWidth + gutter);
//       itemsGutter.push(gutter);
//     }

//     // RTL support
//     if (this.props.rtl) {
//       itemsPosX.reverse();
//     }

//     forEach.call(itemsNodeList, function (item: { style: { position: string; webkitBackfaceVisibility: string; backfaceVisibility: string; transformStyle: string; transform: string; }; getBoundingClientRect: () => { height: string | number; }; }) {
//       var itemIndex = itemsGutter
//         .slice(0)
//         .sort(function (a, b) {
//           return a - b;
//         })
//         .shift();
//       itemIndex = itemsGutter.indexOf(itemIndex!);

//       var posX = parseInt(itemsPosX[itemIndex]+'');
//       var posY = parseInt(itemsGutter[itemIndex]+'');

//       item.style.position = 'absolute';
//       item.style.webkitBackfaceVisibility = item.style.backfaceVisibility = 'hidden';
//       item.style.transformStyle = 'preserve-3d';
//       item.style.transform = 'translate3D(' + posX + 'px,' + posY + 'px, 0)';

//       itemsGutter[itemIndex] += item.getBoundingClientRect().height + gutter;
//       count = count + 1;

//     });

// 		containerEle.style.display = '';

//     var containerHeight = itemsGutter
//       .slice(0)
//       .sort(function (a, b) {
//         return a - b;
//       })
//       .pop();

//     containerEle.style.height = containerHeight + 'px';

//     if (typeof done === 'function') {
//       done(itemsNodeList);
//     }
//   }

//   return Minigrid;