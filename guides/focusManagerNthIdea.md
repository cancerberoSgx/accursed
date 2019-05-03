



 # Focus Fragment State Definitions

(a concrete manager problem,  rto attack only the focus gesture and learn: )
A declarative syntax for focus fragments, states and conditions that must apply, keybindings and relations with the rest of the elements. 

```jsx
<Focus includeEscapeKeys={['ESC']} excludeBlurKeys={["TAB", "S-TAB"]} excludeEnter={["enter", "C-enter"]}>
<EditorLikeWidget></EditorLikeWidget>
</Focus>
```
2

```jsx
<form>
name: <input>
<Focus preventFocus={true}>
<select>(Permanently disabled but visible inputs)
<list>
</Focus>
```

## Dynamic focus status

Maintain a focus status in a fragment until some condition occurs. While user request focus change if this condition doesn't apply we will only focusing in elements inside the fragment. 

```jsx
<form>
<Focus preventBlurUnless={e=>userResolved()}>
Virus Found decide now what to do
  <checkbox> Power off
```

<Focus>

Better third dimension definition




# Implementation

 * without hacking blessed
 * we can asume elements will use a common manager / emitter to register for key events






# second approach - attack it universally: Gestures

# Managers  

What are managers?
Is a language to declare state and behavior, first a little context: 

 * applies to "live" tree-like documents, like the DOM, blessed screen, etc. (and so more, could be a program AST that user is editing.)
 * declarative syntax - implementation independant (aspect oriented ?)
 * generic - axiom things that can be targetted are elements, options, properties and events
 * supports a declarative syntax to create new concepts also so to the previous we could also add the meta (we want to prevent/control ancestors to declare new concepts)

## Better definition now:

 * Dclarative language for  behavior and state policies/rules/control. Now assume a hierarchy, declarations are given by ancestors to descendants, declaring order is top-down
meaning that the closest descendant is the last to be evaluated - so is capable to override faarst
We will divide Managers in a hierarchy

## Syntax proposal

### examples first

(use markup since trees are bettwer visualized)


 *Options* more static ones - just control descendant properties states
 * Events  declare which events descendants can emit or bi notified
   * Gestures define specialized on those events caused directly by the user like focus, click, dragm, enter, input, select, etc
     * Focus : a concrete problem / aspect of Gestures so we can start implementing it.  
   semantics / language for policies and rules  and extension mechanism


a general syntax for Providers or 

  properties or events
# Gestures: A behavior Provider for USER ACTIONS

(just for things that depend  to do with user like scroll, focus, input. for other things like render, style, etc there will be other providers (below))

  * we can start by just enabling disabling behavior properties in blessed (clickable, keyable) but the idea is to be so flexible

interface Manager {}
interface Gestures extends Manager{}
<Gestures name="focus" verb={enable} condition="while" predicate={}>
//again only things that are direct user consecuense
enum SomeKnownGestureTypes { focus, blur, enter, escape, scroll, drag, click, key, mousemove }
enum Verb {enable, disable, remove}
enum Condition {while, if, unless} // TODO: change name to condition
type Predicate = e:DependsOnType=>boolean
interface GesturesProps {
enable: Gesture|Gesture[] 
enable: Gesture|Gesture[] 
}
....

```jsx
<Keys preventKeyPressUntil={}>
</keys>

register custom behavior for known actions

manager.registerGesture({
  name: 'focusNextTop',
  emits: ['focus' 'blur'],
  desription: 'focus the closest element to the top of current one, no matter how far in ancestors it is',
  implementation(screen){},
})

and also for things not related to focus:

manager.registerGesture({
  name: 'scroll-left',
  emits: ['scroll']
})

## Rule to respect: 

<Gesture> tag only applies to descendants, inother wirds in not possible to affect outside without the programmer to do it explicitly. i.e he alwayt can do a top lavel wrapper like a provider,
<Gesture prevent="scroll" verb="change /*default*/" while={s=>s.focused.name=='XXX'}>

<Gesture allow="drag" unless={elementToDrag=>isPrimaryPanel(elementToDrag)}

knwon actions

focusnext, focusprev, focus, blur, click, mourover, keypress, escape, change, input, userInput





# implement providers - 

* kind of hacky ? 
```
forEachELementClass C  (( / think there is a collection over there...
    wrap   C.prototype.props with a new 'getter'  is possible ?
        the getter inject values defined by a top-level provider somewhere.
        ALSO WRAP THE SETTER since others can be setting this and in that case, if we are not providing lets decide if give thatone.
```

/** not only capable of enabling / disabling state with policies, but also of preventing / enforcing / protecting descendant state from other elements and user. */ 
interface Manager{
  children?: unknown
}

/** maages those events that are caused directly because of the user / input like input focus, key, mouse, hover, etc.
 * prevnets */
interface Gestures extends Manager{

}

interface Options extends Manager{

}


the problem of resize the console too small that an element gets  invisible

<Properties substance="height" action="change" verb="prevent" condition={name: "number-lower-than", args: ["screen", "">
<smallElement height="20%">

Manager subject="height" passion="


I only need little space but when user resizes the terminal i risk to get invisible>


property: 'height', 'focus'
action: 'change, decrement, etc






aristotele categories semantic - try to be impl agnostic - all these need to be implemented: 

"if any descendant width is less than $2     then    its height property cannot be reduced  


           * "width": substance
           * "is less than" - condition
           * "$2":  Quantity
           * "reduced"  ---> affection / passion - is what they are doing us !
           * "THEN"

          * "if any descendant" ---> is implied for all rules because only top-down


Substance : The concrete thing 
### (οὐσία, ousia, essence or substance).[6] Substance is that which cannot be predicated of anything or be said to be in anything. Hence, this particular man or that particular tree are substances. Later in the text, Aristotle calls these particulars “primary substances”, to distinguish them from secondary substances, which are universals and can be predicated. Hence, Socrates is a primary substance, while man is a secondary substance. Man is predicated of Socrates, and therefore all that is predicated of man is predicated of Socrates.

#
When or time
When or time (πότε, pote, when). Position in relation to the course of events. Examples: yesterday, last year.

Relative:  
(πρός τι, pros ti, toward something). This is the way one object may be related to another. Examples: double, half, large, master, knowledge.



## condition
Having or state, condition (ἔχειν, echein, to have or be). The examples Aristotle gives indicate that he meant a condition of rest resulting from an affection (i.e. being acted on): ‘shod’, ‘armed’. The term is, however, frequently taken to mean the determination arising from the physical accoutrements of an object: one's shoes, one's arms, etc. Traditionally, this category is also called a habitus (from Latin habere, to have).


## affection
Being affected or affection (πάσχειν, paschein, to suffer or undergo). The reception of change from some other object (or from the affected object itself qua other). Aristotle's name paschein for this category has traditionally been translated into English as "affection" and "passion" (also "passivity"), easily misinterpreted to refer only or mainly to affection as an emotion or to emotional passion. For action he gave the example, ‘to lance’, ‘to cauterize’; for affection, ‘to be lanced’, ‘to be cauterized.’ His examples make clear that action is to affection as the active voice is to the passive voice — as acting is to being acted on.



## Qualification or quality
  (ποιόν, poion, of what kind or quality). This determination characterizes the nature of an object. Examples: white, black, grammatical, hot, sweet, curved, straigh


Quantity
 (ποσόν, poson, how much). This is the extension of an object, and may be either discrete or continuous. Further, its parts may or may not have relative positions to each other. All medieval discussions about the nature of the continuum, of the infinite and the infinitely divisible, are a long footnote to this text. It is of great importance in the development of mathematical ideas in the medieval and late Scholastic period. Examples: two cubits long, number, space, (length of) time.
