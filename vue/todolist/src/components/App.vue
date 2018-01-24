<!-- Single file component in Vue. -->

<!-- The HTML for the component -->
<template>
    <div id="app">
        <input id="newItemInput" v-model="newItemText" v-on:keyup.enter="addItem">
        <button id="addButton" @click="addItem">Add Item</button>
        <p>TODO <span v-if="todos.length > 0">({{numItems}} items)</span></p>
        <button @click="changeClass">Change Class</button>
        <ul>
            <li v-if="todos.length === 0">No items added yet!</li>
            <todo-item v-for="(todo, index) in todos"
                :todo="todo"
                :key="index"
                :class="classes"
                @remove="removeItem"
                @complete="completeItem"> <!-- Listen to the remove event, emitted when removing an item.--> 
            </todo-item>
        </ul>
        
        <div v-if="completedItems.length > 0">
            <p>COMPLETED ({{numCompletedItems}} items) </p>
            <ul>
                <todo-item v-for="(todo, index) in completedItems"
                    :todo="todo"
                    :key="index"
                    @remove="removeCompletedItem"
                >
                </todo-item>
            </ul>
        </div>
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
            completedItems: [],
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
            this.todos.splice(this.findItemIdx(id), 1);
        },
        completeItem: function (id) {
            let idx = this.findItemIdx(id);
            this.todos[idx].completed = true;

            this.completedItems.push(this.todos.splice(idx, 1)[0]);
        },
        removeCompletedItem: function (id) {
            this.completedItems.splice(this.findItemIdx(id), 1);
        },
        changeClass: function () {
            this.classes.open = !this.classes.open;
        },
        findItemIdx: function (id) {
            let idxRet;

            this.todos.some( (item, idx) => {
                if (item.id == id) {
                    idxRet = idx;
                    return true;
                }
            });

            return idxRet;
        }
    },
    // Use computed for when a value depends on some other value and needs to be updated when it changes
    computed: {
        numItems: function() {
            return this.todos.length;
        },
        numCompletedItems: function() {
            return this.completedItems.length;
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