#!/usr/bin/env ksh

# Charles Cooke's 16-color Mandelbrot
# http://earth.gkhs.net/ccooke/shell.html
# Combined Bash/ksh93 flavors by Dan Douglas (ormaaj)

function doBash {
	typeset P Q X Y a b c i v x y 
	for ((P=10**8,Q=P/100,X=320*Q/cols,Y=210*Q/lines,y=-105*Q,v=-220*Q,x=v;y<105*Q;x=v,y+=Y)); do
		for ((;x<P;a=b=i=c=0,x+=X)); do
			for ((;a**2+b**2<4*P**2&&i++<99;a=((c=a)**2-b**2)/P+x,b=2*c*b/P+y)); do :
			done
			colorBox $((i<99?i%16:0))
		done
		echo
	done
}

function doKsh {
	integer i
	float a b c x=2.2 y=-1.05 X=3.2/cols Y=2.1/lines 
	while
		for ((a=b=i=0;(c=a)**2+b**2<=2&&i++<99&&(a=a**2-b**2+x,b=2*c*b+y);)); do :
		done
		. colorBox $((i<99?i%16:0))
		if ((x<1?!(x+=X):(y+=Y,x=-2.2))); then
			print
			((y<1.05)) 
		fi
		do :
	done
}

function colorBox {
	(($1==lastclr)) || printf %s "${colrs[lastclr=$1]:=$(tput setaf "$1")}"
	printf '█'
}

unset -v lastclr
((cols=$(tput cols)-1, lines=$(tput lines)))
typeset -a colrs
trap 'tput sgr0; echo' EXIT
${KSH_VERSION+. doKsh} ${BASH_VERSION+doBash}