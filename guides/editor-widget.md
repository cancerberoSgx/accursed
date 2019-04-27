tutorial on how to use editor-widget in a blessed application

## snippet

```
this.editor = new Editor({
      parent: this.editorContainer,
      ...focusableOpts(),
      top: 0,
      left: 0,
      width: '95%',
      height: '95%',
      keys: true,
      keyable: true,
    })
    this.editor.textBuf.setText(examples[0].code)
    this.editor.language('js')
    this.editor.once('focus', e => {
      this.editor.indent(new Range(new Point(Infinity, Infinity), new Point(Infinity, Infinity)))
    })
```

##settings

editor's settings are guides/editor-widget.md

 * editor background color is not there:

 ```
[editor.buffer.style]
bg = "black"
```

## keyboard focus

```
this.editor.once('focus', e => {
      this.editor.indent(new Range(new Point(Infinity, Infinity), new Point(Infinity, Infinity)))
    })
```


# keys for change focus

## solution 1

 * don't use tab for change focus, use ctrl-right and ctrl-left.
