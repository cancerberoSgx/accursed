How to write automated tests : perform clicks , fill inputs, pree keys, etc in a blessed app

# emitting key events

 * I couldn't find the way of emitting the real events which would be easier, 
 * The following solutions work  by emit() the correct event object in the correct element


## Buttons, box, etc (non input elements)

if an elements listen using `screen.key([some keys])`, then this works : 

```ts
screen.emit('key down', undefined, { name: 'down' })
screen.emit('key up', undefined, { name: 'up' })
screen.emit('key space', undefined, { name: 'space' })
screen.emit('key enter', undefined, { name: 'enter' })
```

and even this:


```ts
screen.emit('key down')
screen.emit('key up')
screen.emit('key space')
screen.emit('key enter')
```

For *normal characters*, the char must be passed in `ch`second argument:

```ts
screen.emit('keypress', 'z', { name: 'z' })
```

***This could vary on the element's implementation. 

## Textarea, textBox (text input elements)

 * they have two "states", when reading input and when not. When not reading input they beahve the same way as the other elements

### When reading input: 

  * While reading input (textarea.readInput()), they screen.lockKeys other elements are not notified for keys.
  * the user "enters" in this mode by clicking them or by pressing enter when they have focus
  * the user can "exit" this mode by pressing ESC (which seems to be hardcoded)
  * wehwn reading input *textarea listen to `this.on('keypress')` so it will only work with `aTextArea.emit('keypress', ...)`  or better with `screen.focused..emit('keypress', ...)`. 

Example: 

```ts
it('should show suggestions on focus and enter', async done => {
  // enter in input mode by focusing with a tab and pressing enter:
  screen.emit('key tab')
  screen.focused.emit('keypress', null, { name: 'enter' })
  
  expect(printElement(screen.focused)).toContain('afghanistan')
  expect(printElement(screen.focused)).not.toContain('brazil')

  // when pressing enter it loose input so we call:
  screen.focused.input(() => { })
  await sleep(200)
  screen.focused.emit('keypress', 'z', { name: 'z' })
  screen.focused.emit('keypress', null, { name: 'enter' })
  expect(printElement(screen.focused)).not.toContain('afghanistan')
  expect(printElement(screen.focused)).toContain('brazil')
  done()
})
```

