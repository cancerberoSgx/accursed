#!/usr/bin/env python3
# encoding: utf-8

# xterm-color-chooser - an interactive ANSI color code picker
# (c) 2012-2016 Mantas Mikulėnas <grawity@gmail.com>
# Released under the MIT License <https://spdx.org/licenses/MIT>

import os
import sys
import termios
import json

modes = {
    "rgb": "256-color pallette – 6*6*6 RGB subset",
    "gray": "256-color pallette – grayscale subset",
    "sys": "256-color pallette – ansicolor subset",
    "iso": "ISO 8-color pallette",
    "rgb888": "True-color RGB mode",
}

properties = {
    "mode": (list, ["rgb", "gray", "sys", "iso", "rgb888"]),
    "flags": (None, set),
    "red": (0, 5),
    "green": (0, 5),
    "blue": (0, 5),
    "color": (0, 15),
    "gray": (0, 23),
    "tcred": (0, 255),
    "tcgreen": (0, 255),
    "tcblue": (0, 255),
    "barfill": (list, "#█"),
}

xdg_config_dir = os.environ.get("XDG_CONFIG_HOME", os.path.expanduser("~/.config"))

older_state_path = os.path.join(xdg_config_dir, "xterm-color-chooser.json")

old_state_dir = os.path.join(xdg_config_dir, "nullroute")
old_state_path = os.path.join(old_state_dir, "xterm-color-chooser.json")

state_dir = os.path.join(xdg_config_dir, "nullroute.eu.org")
state_path = os.path.join(state_dir, "xterm-color-chooser.json")

older_state_found = False
old_state_found = False

def screen_init(mode):
    if mode:
        sys.stdout.write("\033[?47h") # enable alternate buffer
        sys.stdout.write("\033[?25l") # hide cursor
        sys.stdout.write("\033]0;%s\007" % "xterm-color-chooser")
    else:
        sys.stdout.write("\033[?25h") # show cursor
        sys.stdout.write("\033[?47l") # disable alternate buffer
    sys.stdout.flush()

def screen_clear():
    sys.stdout.write("\033[H" + "\033[2J")
    sys.stdout.flush()

class State(dict):
    def copy(self):
        return State(self)

    def init(self):
        self["mode"] = "rgb"
        self["flags"] = set()
        self["favcolors"] = []
        self["favstates"] = {}
        self.reset("red", "green", "blue",
                   "tcred", "tcgreen", "tcblue",
                   "color", "gray", "barfill")

    def load(self, data, recurse=True):
        self.init()
        for prop in properties:
            self[prop] = data[prop]
        self["flags"] = set(data["flags"])
        if "favstates" in data:
            self["favcolors"] = data["favcolors"][:]
            self["favstates"] = {st: State().load(data["favstates"][st])
                                for st in data["favstates"]}
        return self

    def save(self, recurse=True):
        data = {}
        for prop in properties:
            data[prop] = self[prop]
        data["flags"] = list(self["flags"])
        if recurse:
            data["favcolors"] = self["favcolors"][:]
            data["favstates"] = {st: self["favstates"][st].save(False)
                                 for st in self["favstates"]}
        return data

    def load_persistent(self):
        global old_state_found
        try:
            with open(state_path, "r") as fh:
                self.load(json.load(fh))
        except FileNotFoundError:
            try:
                with open(old_state_path, "r") as fh:
                    self.load(json.load(fh))
                    old_state_found = True
            except FileNotFoundError:
                try:
                    with open(older_state_path, "r") as fh:
                        self.load(json.load(fh))
                        older_state_found = True
                except FileNotFoundError:
                    pass

    def save_persistent(self):
        with open(state_path, "w") as fh:
            json.dump(self.save(), fh)

        if old_state_found:
            try:
                os.unlink(old_state_path)
            except FileNotFoundError:
                pass

        if older_state_found:
            try:
                os.unlink(older_state_path)
            except FileNotFoundError:
                pass

    def incr(self, *props):
        for prop in props:
            minval, maxval = properties[prop]
            if minval is list:
                cur = maxval.index(self[prop])
                next = (cur + 1) % len(maxval)
                self[prop] = maxval[next]
            else:
                if self[prop] < maxval:
                    self[prop] += 1

    def decr(self, *props):
        for prop in props:
            minval, maxval = properties[prop]
            if minval is list:
                cur = maxval.index(self[prop])
                next = (cur - 1) % len(maxval)
                self[prop] = maxval[next]
            else:
                if self[prop] > minval:
                    self[prop] -= 1

    def incr_carry(self, *props):
        for prop in props:
            minval, maxval = properties[prop]
            if self[prop] < maxval:
                self[prop] += 1
                break
            else:
                self[prop] = 0

    def decr_carry(self, *props):
        for prop in props:
            minval, maxval = properties[prop]
            if self[prop] > minval:
                self[prop] -= 1
                break
            else:
                self[prop] = maxval

    def reset(self, *props):
        for prop in props:
            minval, maxval = properties[prop]
            if minval is None:
                self[prop] = maxval()
            elif minval is list:
                self[prop] = maxval[0]
            else:
                self[prop] = int((minval+maxval)/2.0)

    def toggle(self, *flags):
        for flag in flags:
            if flag in self["flags"]:
                self["flags"].remove(flag)
            else:
                self["flags"].add(flag)

    def toggle_fav(self):
        col = str(self.getcolor())
        if col in self["favstates"]:
            del self["favstates"][col]
            self["favcolors"].remove(col)
        else:
            self["favstates"][col] = self.copy()
            self["favcolors"].append(col)

    def load_fav(self, pos):
        try:
            col = self["favcolors"][pos]
        except IndexError:
            return

        for prop in properties:
            if prop == "flags":
                continue
            self[prop] = self["favstates"][col][prop]

    def getcolor(self, iso=False):
        if iso and self["mode"] == "iso":
            return self["color"]
        elif self["mode"] == "sys":
            return self["color"]
        elif self["mode"] == "rgb":
            return 16 + self["red"]*36 + self["green"]*6 + self["blue"]
        elif self["mode"] == "gray":
            return 232 + self["gray"]
        elif self["mode"] == "rgb888":
            return 0xFF000000 \
                + self["tcred"]*0x10000 \
                + self["tcgreen"]*0x100 \
                + self["tcblue"]
        else:
            return None

    def get256color(self):
        r, g, b = 0, 0, 0

        if self["mode"] in {"iso", "sys"}:
            if self["color"] < 8:
                r = 0xAA if self["color"] & 1 else 0x00
                g = 0xAA if self["color"] & 2 else 0x00
                b = 0xAA if self["color"] & 4 else 0x00
            else:
                r = 0xFF if self["color"] & 1 else 0x55
                g = 0xFF if self["color"] & 2 else 0x55
                b = 0xFF if self["color"] & 4 else 0x55
        elif self["mode"] == "rgb":
            r = self["red"]   * 85 / 2
            g = self["green"] * 85 / 2
            b = self["blue"]  * 85 / 2
        elif self["mode"] == "gray":
            r = g = b = self["gray"] * 10 - 2312
        elif self["mode"] == "rgb888":
            r = self["tcred"]
            g = self["tcgreen"]
            b = self["tcblue"]

        return r * 0x10000 + g * 0x100 + b

    def setcolor(self, color):
        if color <= 15:
            self["mode"] = iso
            self["color"] = color
        elif color <= 231:
            self["mode"] = "rgb";       color -= 16
            self["blue"] = color % 6;   color = (color - self["blue"]) / 6
            self["green"] = color % 6;  color = (color - self["green"]) / 6
            self["red"] = color
        elif color <= 255:
            self["mode"] = "gray"
            self["gray"] = color - 232
        elif color <= 0xFFFFFFFF:
            self["mode"] = "rgb888";        color -= 0xFF000000
            self["tcblue"] = color % 256;   color >>= 8
            self["tcgreen"] = color % 256;  color >>= 8
            self["tcred"] = color

    def fmt(self, flags=True, bg=False):
        out = ""

        # output basic SGR

        sgr = []

        if flags:
            sgr += self["flags"]

        if self["mode"] == "iso":
            color = self["color"]
            if color > 7:
                color -= 8
                if 1 not in sgr:
                    sgr.append(1)
            color += 40 if bg else 30
            sgr.append(color)

        if len(sgr) > 0:
            sgr.sort()
            out += "\033[%sm" % ";".join(map(str, sgr))

        # output 256-color

        if self["mode"] == "rgb888":
            out += "\033[%d;2;%d;%d;%dm" % (48 if bg else 38,
                                            self["tcred"],
                                            self["tcgreen"],
                                            self["tcblue"])
        else:
            color = self.getcolor()
            if color is not None:
                out += "\033[%d;5;%dm" % (48 if bg else 38, color)

        return out

    @property
    def ansi(self):
        return self.fmt(True)

def getch():
    import sys, tty, termios
    fd = sys.stdin.fileno()
    old = termios.tcgetattr(fd)
    try:
        #tty.setraw(fd)
        return sys.stdin.read(1)
    finally:
        termios.tcsetattr(fd, termios.TCSADRAIN, old)

def icanon(mode):
    fd = sys.stdin.fileno()
    flags = termios.tcgetattr(fd)
    if mode:
        flags[3] &= ~termios.ICANON & ~termios.ECHO
    else:
        flags[3] |= termios.ICANON | termios.ECHO
    termios.tcsetattr(fd, 0, flags)

def bar(name, state, prop, scale=2, keys=""):
    minval, maxval = properties[prop]

    if scale < 0:
        step = -scale
        scale = 1
    else:
        step = 1

    newstate = state.copy()
    out = "%10s: [" % name
    for val in range(minval, maxval+1, step):
        newstate[prop] = val
        out += newstate.fmt(flags=False) + state["barfill"]*scale
    out += "\033[m] %-3d" % state[prop]
    if keys:
        out += " (keys: %s)" % keys
    print(out)

    out = "%10s   " % ""
    cur = int(state[prop] / step) * step
    for val in range(minval, maxval+1, step):
        out += ("^" if val == cur else " ") * scale
    print(out)

class Sgr(object):
    BOLD = 1
    DARK = 2
    ITALIC = 3
    UNDERLINE = 4
    REVERSE = 7
    STRIKE = 9

    names = {
        BOLD:       "bold",
        DARK:       "dark",
        ITALIC:     "italic",
        UNDERLINE:  "underline",
        REVERSE:    "reverse",
        STRIKE:     "strike",
    }

def main(state):
    global wait_fav

    screen_clear()

    char = "x"
    print("    ┌" + "─"*20 + "┬" + "─"*20 + "┬" + "─"*20 + "┐")
    print("    │%-20s│%-20s│%-20s│" %
        ("default bg", "iso black bg", "iso white bg"))
    line = "    │"
    line += "\033[49m" + state.fmt() + char*20 + "\033[m│"
    line += "\033[40m" + state.fmt() + char*20 + "\033[m│"
    line += "\033[47m" + state.fmt() + char*20 + "\033[m│"
    print("\n".join([line]*3))
    print("    │%-20s│%-20s│%-20s│" %
        ("default fg", "iso black fg", "iso white fg"))
    line = "    │"
    line += "\033[39m" + state.fmt(bg=True) + char*20 + "\033[m│"
    line += "\033[30m" + state.fmt(bg=True) + char*20 + "\033[m│"
    line += "\033[37m" + state.fmt(bg=True) + char*20 + "\033[m│"
    print("\n".join([line]*3))
    print("    └" + "─"*20 + "┴" + "─"*20 + "┴" + "─"*20 + "┘")
    print()

    indent = "%11s" % ""

    print("%11s" % "keys:", "mode g/G, format b/k/i/u/S/r, bar #, exit Q")
    if state["mode"] in {"rgb", "rgb888"}:
        print(indent, "red 7/9 (q/e), green 4/6 (a/d), blue 1/3 (z/c)")
        print(indent, "all +/-, reset 8/5/2 (w/s/x), reset all 0")
    elif state["mode"] in {"sys", "iso"}:
        print(indent, "color +/- (q/e), reset 0")
    elif state["mode"] == "gray":
        print(indent, "level +/- (q/e), reset 0")
    print()

    if state["mode"] == "rgb":
        bar("red",   state, "red",   3, "7/9 or q/e")
        bar("green", state, "green", 3, "4/6 or a/d")
        bar("blue",  state, "blue",  3, "1/3 or z/c")
    elif state["mode"] in {"sys", "iso"}:
        bar("color", state, "color", 2, "+/- or q/e")
    elif state["mode"] == "gray":
        bar("gray",  state, "gray",  1, "+/- or q/e")
    elif state["mode"] == "rgb888":
        bar("red",   state, "tcred",   -8, "7/9 or q/e")
        bar("green", state, "tcgreen", -8, "4/6 or a/d")
        bar("blue",  state, "tcblue",  -8, "1/3 or z/c")

    print("%11s" % "mode:", modes[state["mode"]])
    fmtfgstr = state.fmt(flags=True).replace("\033", "\\e")
    fmtbgstr = state.fmt(flags=True, bg=True).replace("\033", "\\e")
    print("%11s" % "code:",
        fmtfgstr, "(fg),",
        fmtbgstr, "(bg)")
    style = [Sgr.names[f] for f in state["flags"]]
    if state["mode"] == "rgb888":
        style.append("#%02x%02x%02x" % (state["tcred"],
                                        state["tcgreen"],
                                        state["tcblue"]))
    else:
        #style.append("#%06x" % state.get256color()) # FIXME
        style.append("color%d" % state.getcolor(iso=True))
    print("%11s" % "name:", " + ".join(style))

    favs = state["favcolors"]
    print()
    line, count, prefix = "", 0, "favs:"
    if favs:
        for pos, col in enumerate(favs):
            st = state["favstates"][col]
            fmt = st.fmt(flags=False, bg=True)
            num = pos+1
            if num == 10:
                num = 0
            elif num > 10:
                num = chr(ord('a') + num - 11)
            if count == 8:
                print("%11s" % prefix, line)
                line, count, prefix = "", 0, ""
            line += "%s" % (num) + fmt + " "*4 + "\033[m, "
            count += 1
        print("%11s" % prefix, line)
        prefix = ""
    print("%11s" % prefix, "add F, jump f",
        "(waiting for index)" if wait_fav else "+ index")

    k = getch()
    if k == "Q":        return False
    elif wait_fav:
        if k in "123456789":    k = int(k)
        elif k == "0":      k = 10
        elif ord('a') <= ord(k) <= ord('z'):
                    k = ord(k)-ord('a')+11
        else:           k = None
        if k is not None:
            state.load_fav(k-1)
        wait_fav = False
    elif k == "n":
        icanon(False)
        n = input()
        icanon(True)
        state.setcolor(int(n))
    elif k == "#":      state.incr("barfill")
    elif k == "b":      state.toggle(Sgr.BOLD)
    elif k == "i":      state.toggle(Sgr.ITALIC)
    elif k == "k":      state.toggle(Sgr.DARK)
    elif k == "u":      state.toggle(Sgr.UNDERLINE)
    elif k == "r":      state.toggle(Sgr.REVERSE)
    #elif k == "B":     state.toggle(5)
    elif k == "S":      state.toggle(Sgr.STRIKE)
    elif k == "F":      state.toggle_fav()
    elif k == "f":      wait_fav = True
    elif k == "g":      state.incr("mode")
    elif k == "G":      state.decr("mode")
    elif state["mode"] == "rgb":
        if None: pass
        elif k in "7q": state.decr("red")
        elif k in "8w": state.reset("red")
        elif k in "9e": state.incr("red")
        elif k in "4a": state.decr("green")
        elif k in "5s": state.reset("green")
        elif k in "6d": state.incr("green")
        elif k in "1z": state.decr("blue")
        elif k in "2x": state.reset("blue")
        elif k in "3c": state.incr("blue")
        elif k in "-":  state.decr("red", "green", "blue")
        elif k in "0":  state.reset("red", "green", "blue", "flags")
        elif k in "+":  state.incr("red", "green", "blue")
        elif k in "/":  state.decr_carry("blue", "green", "red")
        elif k in "*":  state.incr_carry("blue", "green", "red")
    elif state["mode"] == "sys":
        if None: pass
        elif k in "741qaz-":    state.decr("color")
        elif k in "852wsx0":    state.reset("color", "flags")
        elif k in "963edc+":    state.incr("color")
    elif state["mode"] == "iso":
        if None: pass
        elif k in "741qaz-":    state.decr("color")
        elif k in "852wsx0":    state.reset("color")
        elif k in "963edc+":    state.incr("color")
    elif state["mode"] == "gray":
        if None: pass
        elif k in "741qaz-":    state.decr("gray")
        elif k in "852wsx0":    state.reset("gray", "flags")
        elif k in "963edc+":    state.incr("gray")
    elif state["mode"] == "rgb888":
        if None: pass
        elif k in "7q": state.decr("tcred")
        elif k in "8w": state.reset("tcred")
        elif k in "9e": state.incr("tcred")
        elif k in "4a": state.decr("tcgreen")
        elif k in "5s": state.reset("tcgreen")
        elif k in "6d": state.incr("tcgreen")
        elif k in "1z": state.decr("tcblue")
        elif k in "2x": state.reset("tcblue")
        elif k in "3c": state.incr("tcblue")
        elif k in "-":  state.decr("tcred", "tcgreen", "tcblue")
        elif k in "0":  state.reset("tcred", "tcgreen", "tcblue", "flags")
        elif k in "+":  state.incr("tcred", "tcgreen", "tcblue")
        elif k in "/":  state.decr_carry("tcblue", "tcgreen", "tcred")
        elif k in "*":  state.incr_carry("tcblue", "tcgreen", "tcred")

    return True

if not os.path.exists(state_dir):
    os.makedirs(state_dir)

if not sys.stdin.isatty():
    sys.stdin = open("/dev/tty", "r")

state = State()
state.init()
state.load_persistent()

screen_init(True)
icanon(True)

wait_fav = False

try:
    while main(state):
        pass
except KeyboardInterrupt:
    pass
finally:
    icanon(False)
    screen_init(False)
    state.save_persistent()