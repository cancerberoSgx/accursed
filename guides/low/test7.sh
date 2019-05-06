
#!/bin/bash
#
# generates an 8 bit color table (256 colors) for
# reference purposes, using the \033[48;5;${val}m
# ANSI CSI+SGR (see "ANSI Code" on Wikipedia)
#
# echo -en "\n   +  "
# for i in {0..35}; do
#   printf "%2b " $i
# done

printf "\n\n %3b  " 0
for i in {0..15}; do
 printf "\033[48;5;${i}m  \033[m "
done

#for i in 16 52 88 124 160 196 232; do
for i in {0..6}; do
  let "i = i*36 +16"
  printf "\n\n %3b  " $i
  for j in {0..35}; do
    let "val = i+j"
    printf "\033[48;5;${val}m  \033[m "
  done
done

tput sgr0

echo -e "\n"


for C in {0..255}; do
    tput setab $C
    printf " "
done
tput sgr0
echo ""
