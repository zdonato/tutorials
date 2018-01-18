<!-- Single file component in Vue. -->

<!-- The HTML for the component -->
<template>
    <div id="app">
        <input id="newItemInput" v-model="newItemText">
        <button id="addButton" @click="addItem">Add Item</button>
        <p>TODO <span v-if="todos.length > 0">({{numItems}} items)</span></p>
        <button @click="changeClass">Change Class</button>
        <ul>
            <li v-if="todos.length === 0">No items added yet!</li>
            <todo-item v-for="(todo, index) in todos"
                :todo="todo"
                :key="index"
                :class="classes">
            </todo-item>
        </ul>
        
    </div>
</template>

<!-- the object to use for creating the Vue instance -->
<script>
import todoItem from './todoItem.vue';

export default {
    // name of the component
    name: "app",
    // Data to be passed into the scope
    data () {
        return { 
            todos: [],
            newItemText: "",
            classes: {}
        }
    },
    // Lifecycle hook for created.
    created: function () {
        this.classes = {
            active: true,
            open: false
        };
    },
    mounted: function () {
        document.getElementById('newItemInput').addEventListener("keyup", (event) => {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById('addButton').click();
            }
        });
    },
    // Methods to be passed into the scope of the component. Class this.methodName
    // Reference any vars in scope using the this context
    methods: {
        addItem: function () {
            if (this.newItemText.length > 0) {
                let idx = this.todos.length;
                this.todos.push({
                    text: this.newItemText,
                    id: idx
                });
                this.newItemText = "";
            }
        },
        removeItem: function (id) {
            this.todos.some( (item, idx) => {
                if (item.id == id) {
                    this.todos.splice(idx, 1);
                    return true;
                }
            });
        },
        changeClass: function () {
            this.classes.open = !this.classes.open;
        }
    },
    // Use computed for when a value depends on some other value and needs to be updated when it changes
    computed: {
        numItems: function() {
            return this.todos.length;
        }
    },
    components: {
        'todo-item': todoItem
    }
}
</script>

<!-- Put CSS in the style tag -->
<style lang="scss">

</style>