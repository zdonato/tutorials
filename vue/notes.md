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
`v-on:click` = '@click`


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


