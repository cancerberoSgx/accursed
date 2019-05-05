#!/bin/bash
#@ Copyright: © 2011 Chris F.A. Johnson
#@ Released under the terms of the GNU General Public License V2
#@ See the file COPYING for the full license
# Originally from http://cfajohnson.com/shell/listing1.txt

ESC="" ##  A literal escape character
x10_format="${ESC}[?1005l"  # Turn off extended xterm to get x10
utf8_format="${ESC}[?1005h"  # Extended format (UTF-8 encoding)
sgr_format="${ESC}[?1006h"  # CSI < button; Cx; Cy {M,m}
urxvt_format="${ESC}[?1015h"  # CSI decimal-button; Cx; Cy; M

output_mouse()
{
  printf "MOUSEX=%s MOUSEY=%s BUTTON=%s" "$1" "$2" "$3"
}

read_bytes()
{
  numbytes=$1
  dd bs=1 count=$numbytes 2>/dev/null
}

read_x10()
{
  prefix=$(read_bytes 3)
  button=$(read_bytes 1)
  cx=$(read_bytes 1)
  cy=$(read_bytes 1)
  
  cmd=$(printf "mb=%d mx=%d my=%d" "'$button'" "'$cx'" "'$cy'")
  eval $cmd

  ## Values > 127 are signed
  [ $mx -lt 0 ] && mx=$(( 223 + $mx )) || mx=$(( $mx - 32 ))
  [ $my -lt 0 ] && my=$(( 223 + $my )) || my=$(( $my - 32 ))

  ## Button pressed is in first 2 bytes; use bitwise AND
  b=$(( ($mb & 3) + 1 ))
  output_mouse $mx $my $b
}

ordinal_for_next_byte_of_input()
{
  c=$(read_bytes 1)
  echo -n $c | od -t u1 -A n | sed -e 's/^ *//' | sed -e 's/  / /g' | sed -e 's/ *$//' | head -1
}

## Reads in a utf8 character and outputs its code point in decimal.
## e.g., é -> 233
read_utf8_codepoint()
{
  c=$(ordinal_for_next_byte_of_input)

  [ $(( $c & 0xfc )) -eq 248 ] && length=5 mask=3
  [ $(( $c & 0xf8 )) -eq 240 ] && length=4 mask=7
  [ $(( $c & 0xf0 )) -eq 224 ] && length=3 mask=0x0f
  [ $(( $c & 0xe0 )) -eq 192 ] && length=2 mask=0x1f
  [ $(( $c & 0x80 )) -eq 0 ] && length=1 mask=0x7f

  value=$(( $c & $mask ))
  length=$(( $length - 1 ))
  mask=0x3f
  while [ $length -gt 0 ]; do
    c=$(ordinal_for_next_byte_of_input)
    value=$(( ($value << 6) + ($c & $mask) ))
    length=$(( $length - 1 ))
  done

  printf "%s" "$value"
}

is_decimal_digit()
{
  c="$1"
  n=$(printf "%d" "'$c'")
  printf "%s" $(( $n >= 48 && $n < 58 ))
}

read_decimal()
{
  c=$(read_bytes 1)
  while [ $(is_decimal_digit "$c") -eq 1 ]; do
    printf "%s" "$c"
    c=$(read_bytes 1)
  done
}

read_utf8()
{
  prefix=$(read_bytes 3)
  button=$(read_bytes 1)
  button=$(printf "%d" "'$button'")

  b=$(( ($button & 3) + 1 ))
  cx=$(( $(read_utf8_codepoint) - 32 ))
  cy=$(( $(read_utf8_codepoint) - 32 ))

  output_mouse $cx $cy $b
}

read_sgr()
{
  ## This loses whether it was a press or release because the last call to
  ## read_decimal swallows the terminal letter, which indicates this (m vs M).
  prefix=$(read_bytes 3)   ## CSI <
  button=$(read_decimal)
  cx=$(read_decimal)
  cy=$(read_decimal)
  b=$(( ($button & 3) + 1 ))

  output_mouse $cx $cy $b
}

read_urxvt()
{
  prefix=$(read_bytes 2)   ## CSI
  button=$(read_decimal)
  cx=$(read_decimal)
  cy=$(read_decimal)
  b=$(( ($button & 3) + 1 ))

  output_mouse $cx $cy $b
}

read_report()
{
  format=$1
  [ $format == $x10_format ] && read_x10
  [ $format == $utf8_format ] && read_utf8
  [ $format == $sgr_format ] && read_sgr
  [ $format == $urxvt_format ] && read_urxvt
}

clean_up()
{
  printf "${ESC}[?${mv}l"  ## Turn off mouse reporting
  stty "$_STTY"            ## Restore terminal settings
  printf "${ESC}[?12l${ESC}[?25h" ## Turn cursor back on
  printf "\n${ESC}[0J\n"   ## Clear from cursor to bottom of screen
}

printat() ## USAGE: printat ROW COLUMN
{
    printf "${ESC}[${1};${2}H"
}

print_buttons()
{
   num_but=$#
   COLUMNS=${COLUMNS:-$(tput cols)}
   gutter=2
   gutters=$(( $num_but + 1 ))
   but_width=$(( ($COLUMNS - $gutters) / $num_but ))
   n=0
   for but_str
   do
     col=$(( $gutter + $n * ($but_width + $gutter) ))
     printat $but_row $col
     printf "${ESC}[7m%${but_width}s" " "
     printat $but_row $(( $col + ($but_width - ${#but_str}) / 2 ))
     printf "%.${but_width}s${ESC}[0m" "$but_str"
     n=$(( $n + 1 ))
   done
}

but_row=1

clear
normal_tracking=1000  # Just button presses
# iterm2 doesn't support 1001, highlight tracking
button_tracking=1002 # clicks and drags are reported
any_event_tracking=1003 # clicks, drags, and motion

mv=$normal_tracking  ## I hacked this to use 1003 so everything is reported.
#printf "[?1006h"  ## SGR

format=$x10_format

trap clean_up EXIT

_STTY=$(stty -g)      ## Save current terminal setup
stty -echo -icanon    ## Turn off line buffering
printf "${ESC}[?${mv}h        "   ## Turn on mouse reporting
printf "${ESC}[?25l"  ## Turn off cursor
printf "${format}"    ## Set the reporting format

while :
do
  [ $mv -eq $normal_tracking ] && mv_str="Normal Tracking"
  [ $mv -eq $button_tracking ] && mv_str="Button Tracking"
  [ $mv -eq $any_event_tracking ] && mv_str="Any Event Tracking"

  [ $format == $x10_format ] && f_str="X10 Format"
  [ $format == $utf8_format ] && f_str="UTF-8 Format"
  [ $format == $sgr_format ] && f_str="SGR Format"
  [ $format == $urxvt_format ] && f_str="URXVT Format"
  print_buttons "$mv_str" "$f_str" "Exit"

  eval $(read_report $format)

  case $MOUSEY in
       $but_row) ## Calculate which on-screen button has been pressed
                 button=$(( ($MOUSEX - $gutter) / $but_width + 1 ))
                 case $button in
                      1) printf "${ESC}[?${mv}l"
                         [ $mv -eq $normal_tracking ] && next_mode=$button_tracking
                         [ $mv -eq $button_tracking ] && next_mode=$any_event_tracking
                         [ $mv -eq $any_event_tracking ] && next_mode=$normal_tracking
                         mv=$next_mode
                         printf "${ESC}[?${mv}h"
                         ;;
                      2)
                         [ $format == $x10_format ] && new_format=$utf8_format
                         [ $format == $utf8_format ] && new_format=$sgr_format
                         [ $format == $sgr_format ] && new_format=$urxvt_format
                         [ $format == $urxvt_format ] && new_format=$x10_format
                         format=$new_format
                         printf "%s" "$format"
                         ;;
                      3) break ;;
                 esac
                 ;;
       *) printat $MOUSEY $MOUSEX
          printf "X=%d Y=%d [%d]  " $MOUSEX $MOUSEY $BUTTON
          ;;
  esac

done