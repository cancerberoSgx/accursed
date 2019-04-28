import { Screen } from '../../../../src'

type Point = [number, string]
type Line = Point[]
type Image = Line[]
type Video = Image[]
interface Options {
  target: Screen | Element
  end: (er, video: Video) => void
  interval?: number
}

function record(o: Options) {
  o.interval = o.interval || 500
}

function play(video: Video, screen: Screen) {}
function screenshot(screen: Screen) {
  var lines = [],
    y,
    line,
    cx,
    x,
    cell,
    attr,
    ch

  for (y = 0; y < screen.lines.length; y++) {
    screen.program.getCursor((e, c) => c)
    line = []
    // if (y === tty.term.y
    //     && tty.term.cursorState
    //     && (tty.term.ydisp === tty.term.ybase || tty.term.selectMode)
    //     && !tty.term.cursorHidden) {
    //   cx = tty.term.x;
    // } else {
    // cx = -1;
    // }
    for (x = 0; x < screen.lines[y].length; x++) {
      cell = screen.lines[y][x]
      attr = cell[0]
      ch = cell[1]
      // if (x === cx) attr = (0x1ff << 9) | 15;
      line.push([attr, ch])
    }
    lines.push(line)
  }
  // frames.push(lines);
}
