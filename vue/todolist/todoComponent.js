// A component in Vue. function takes the component name and and object.

Vue.component('todo-item', {
    // Variables to pass into the scope
    // pass in via attribute on the html element as 
    //      v-bind:propName=""
    props: ['todo'],
    // HTML to use for the component.
    template: `<li> 
                {{ todo.text }} 
                <button @click="$parent.removeItem(todo.id)">X</button>
            </li>`
});