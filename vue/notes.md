# Vue Notes

### General
All vue applications are created via:

`let app = new Vue({});`

[API Docs for the options](https://vuejs.org/v2/api/#Options-Data)

`v-` prefix for all vue related attributes (`v-for`, `v-if`, etc.)

`@click="f()"` for binding function to onclick 

`data` 
- passes all properties into the scope of the Vue app 
- when values of the props change, the view will react by updating to match the new values (BUT, this only happens to properties that existed when the instance was created)

#### Useful attributes
- `v-on:keyup.enter="myFunc"` for calling functions on keyup events

### Instance properties/methods
Vue exposes instance properties/methods to the object returned when created a new instance, they are prefixed with `$`
- `app.$el` is the element the instance is bound to
- `app.$data` is the data passed into the instance
- `app.$watch('x', (newVal, oldVal) => { });` for watching the value of a property

### Lifecyle hooks
[API Docs](https://vuejs.org/v2/api/#Options-Lifecycle-Hooks)

[Lifecycle Diagram](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram)

- DON'T use arrow function for lifecycle hooks because the context will get screwed up
- all lifecycle hooks are called with their `this` context pointing to the Vue instance invoking it

### Template syntax
[API Docs](https://vuejs.org/v2/guide/syntax.html)
#### Text
- {{ prop }} simple mustache-like rendering
- will be updated when prop changes
- possible to make it not update by adding `v-once` attribute to element
#### Raw HTML
- use the `v-html="rawHTML"` binding
#### HTML Attributes
- use `v-bind:HTMLAttribute="value"`
- can use js expressions in the `v-bind:` values but don't use userdefined values and only one expression can be used at a time

#### Shorthannd
##### `v-bind`
`v-bind:href` === `:href`
##### `v-on`
`v-on:click` = `@click`


### Computed Properties and Watchers
#### Computed
- use `computed` in the Vue instance options
- properties are functions who return a value to be used in the template
- by default is used as a getter, but you can add `get` and `set` properties so that a setter function is called when the value changes
#### Watch
- use `watch` in the Vue instance options
- essentially same as AngularJS $watch, but it's often better to use `computed` over `watch`

### Class and Style Bindings
- use `v-bind:class="{ className: boolean }"`
- can use a bound object instead of inline object notation and place the bound object in the `data` property of the vue instance
- can also be bound to a computed property
- can also supply an array of strings to add as classes

### Conditional Rendering
- use `v-if` on an element
- can use `v-if` on a `<template></template>` element to conditionally render a template
- `v-else` and `v-else-if` are available for use, but must follow a `v-if` or they will be ignored
- Vue will reuse elements in conditional rendering for efficiency, if you don't want them to be reused add a `key` attribute to the element
- `v-show` will always render the element and toggle its CSS display property (does not support the `<template>` element though)
- `v-if` has higher toggle costs than `v-show`, because it will destroy and recreate event listeners and child components

### List Rendering
- `v-for` to render a list of items based on an array
    - `v-for="item in items"`
    - `v-for="(item, index) in items"` if you need the index of the element
    - can take a number as a range `v-for="n in 10"`
    -`v-for` has a higher priority than `v-if` when on the same node
- has full access to parent scope (the scope of the component)
- can also use `v-for` to iterate of the properties of an object
    - can do `(value, key, index)` to get the key, value, and index of the property
- add `:key` attribute when using `v-for` to uniquely identify each node for Vue to keep track of easier

#### Array Change Detection
- Vue wraps common array methods so that they trigger view updates
    - [Full List](https://vuejs.org/v2/guide/list.html#Mutation-Methods)
- use `Vue.set` on an array to update an item at a certain index if you want to trigger a state update
    - `Vue.set(example.items, indexOfItem, newValue)`

#### Object Change Detection Caveats
- can't detect changes on objects added after creating Vue instance
    - have to use `Vue.set(object, key, value)` or `vm.$set(object, key, value)`


#### Displaying Filtered/Sorted Results
- use a computed property or a method to filter the array when you don't want to actually change it's data, but want to display a filtered version

#### `v-for` with a Component
- can use `v-for` directly on a component, but requires the `key` attribute
    - use `v-bind` to set the properties
```
<my-component
    v-for="(item, index) in items"
    v-bind:item="item"
    v-bind:index="index"
    v-bind:key="item.id">
</my-component>
```

### Event Handling
#### Listening to Events
- use the `v-on` directive to listen to DOM events
    - `<button v-on:click="counter += 1">Add 1</button>`
    - `<button v-on:click="myFunc">Run Me</button>`
- pass in the DOM event with 2nd parameter as $event
    - `v-on:click="func(param, $event)"`
#### Event Modifiers 
- Common event modifiers are provided by Vue
    - [List of modifiers](https://vuejs.org/v2/guide/events.html#Event-Modifiers)
#### Key Modifiers
- Vue provides easy to use keyup listeners
    - `v-on:keyup.keyCode="func"`
    - `@keyup.enter`
- [Full List](https://vuejs.org/v2/guide/events.html#Key-Modifiers)
- Can define custom keycodes
    - `Vue.config.keyCodes.f1 = 112`
#### System Key Modifiers
- `.ctrl`, `.alt`, `.shift`, `.meta` (windows or command key)
    - `<div @click.ctrl="func"></div>` for ctrl + click
- `.exact` for when you want to respond to just one event only
    - `@click.ctrl.exact` for 
    only when the ctrl key is pressed
- `.left`, `.right`, `.middle` for mouse buttons

### Form Input Bindings
- use `v-model` to create two-way data bindings
    - will ignore any initial `value`, `checked`, or `selected` so declare the initial value inside the `data` option of the component
- will adapt to the input it is bound to
- always provide a disabled option with an empty value when using a select to get around iOS behavior when `v-model` expression does not match any of the options [link](https://vuejs.org/v2/guide/forms.html#Select)

#### Modifiers
- `v-model.lazy` to lazily update the data
- `v-model.number` to typecast as a number
- `v-model.trim` to automatically trim the input

### Components
- `Vue.component(tagName, options);`
    - use hyphens and all lowercase to comply with html element name standards
    - this will declare the component globally
- Local registration
    - use `components` option when creating the Vue instance
    - `new Vue({ components: 'my-component' });`
- `data` must be a function that returns an object with the properties for the component

#### Parent-Child Components
- Most commonly used components as a child of a parent
- Keep them as decoupled as possible
- Follow the strategy "props down, events up"
    - Parent passes props down to child component
    - Child emits events to pass data up to the parent
- Never directly reference or mutate parent data in the child
    - Take the initial value provided by props and make a copy in the child

#### Prop-Validation
- can specify requirements for props
- instead of defining props as an array of strings, make it an object
```
{
    props: {
        someProp: Number,
        otherProp: {
            type: String,
            required: true,
            default: 'some default value'
        }
    }
}
```
- default can be a function (factory)
    - use function when the default will be an array or an object
- can use a custom validation function
    - `prop: { validator: function (value) { return value > 10 } }`

#### Custom Events
- `this.$emit('eventName', [args...]);`
- in the parent component use `@eventName="func"` to run `func` when the event is emitted


