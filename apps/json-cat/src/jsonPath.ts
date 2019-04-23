/* JSONPath 0.8.0 - XPath for JSON
 *
 * Copyright (c) 2007 Stefan Goessner (goessner.net)
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 */
 interface JsonPath {
   result: {[a: string]: any},
   resultType: string
   normalize(expr: string): string
   walk(loc: string, expr: string, val: any, path: string,
    f: (i:number|string,loc:string,expr:string,val:any,path:string)=>void
    ): void
   [a: string]: any //string
 }
function jsonPath(obj: any, expr: string, arg: any) {
  var P : JsonPath = {
     resultType: arg && arg.resultType || "VALUE",
     result: [],
     normalize: function(expr: string) {
        var subx: string[] = [];
        return expr.replace(/[\['](\??\(.*?\))[\]']/g, function($0,$1){return "[#"+(subx.push($1)-1)+"]";})
                   .replace(/'?\.'?|\['?/g, ";")
                   .replace(/;;;|;;/g, ";..;")
                   .replace(/;$|'?\]|'$/g, "")
                   .replace(/#([0-9]+)/g, function($0,$1){return subx[$1];});
     },
     asPath: function(path: string) {
        var x = path.split(";"), p = "$";
        for (var i=1,n=x.length; i<n; i++)
           p += /^[0-9*]+$/.test(x[i]) ? ("["+x[i]+"]") : ("['"+x[i]+"']");
        return p;
     },
     store: function(p: string, v: any) {
        if (p) P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
        return !!p;
     },
     trace: function(expr: string, val: any, path: string) {
        if (expr) {
           var xxx:string[] = expr.split(";"), loc = xxx.shift()!
           var x = xxx.join(";");
           if (val && val.hasOwnProperty(loc))
              P.trace(x, val[loc], path + ";" + loc);
           else if (loc === "*")
              P.walk(loc, x, val, path, function(m,l,x,v,p) { P.trace(m+";"+x,v,p); });
           else if (loc === "..") {
              P.trace(x, val, path);
              P.walk(loc, x, val, path, function(m,l,x,v,p) { typeof v[m] === "object" && P.trace("..;"+x,v[m],p+";"+m); });
           }
           else if (/,/.test(loc)) { // [name1,name2,...]
              for (var s=loc.split(/'?,'?/),i=0,n=s.length; i<n; i++)
                 P.trace(s[i]+";"+x, val, path);
           }
           else if (/^\(.*?\)$/.test(loc)) // [(expr)]
              P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";")+1))+";"+x, val, path);
           else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
              P.walk(loc, x, val, path, function(m,l,x,v,p) { if (P.eval(l.replace(/^\?\((.*?)\)$/,"$1"),v[m],m)) P.trace(m+";"+x,v,p); });
           else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
              P.slice(loc, x, val, path);
        }
        else
           P.store(path, val);
     },
     walk: function(loc:string, expr:string, val:any, path:string, f: (i:number|string,loc:string,expr:string,val:any,path:string)=>void) {
        if (val instanceof Array) {
           for (var i=0,n=val.length; i<n; i++)
              if (i in val)
                 f(i,loc,expr,val,path);
        }
        else if (typeof val === "object") {
           for (var m in val)
              if (val.hasOwnProperty(m))
                 f(m,loc,expr,val,path);
        }
     },
     slice: function(loc: string, expr:string, val: any, path: string) {
        if (val instanceof Array) {
           var len=val.length, start=0, end=len, step=1;
           //@ts-ignore
           loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0,$1,$2,$3){start=parseInt($1||start);end=parseInt($2||end);step=parseInt($3||step);});
           start = (start < 0) ? Math.max(0,start+len) : Math.min(len,start);
           end   = (end < 0)   ? Math.max(0,end+len)   : Math.min(len,end);
           for (var i=start; i<end; i+=step)
              P.trace(i+";"+expr, val, path);
        }
     },
     eval: function(x:string, _v:any, _vname:string) {
        try { return $ && _v && eval(x.replace(/@/g, "_v")); }
        catch(e) { throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a")); }
     }
  };

  var $ = obj;
  if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
     P.trace(P.normalize(expr).replace(/^\$;/,""), obj, "$");
     return P.result.length ? P.result : false;
  }
} 
