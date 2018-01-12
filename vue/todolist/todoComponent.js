Vue.component('todo-item', {
    props: ['todo'],
    template: `<li> 
                {{ todo.text }} 
                <button v-on:click="removeItem(todo.id)">X</button>
            </li>`
});