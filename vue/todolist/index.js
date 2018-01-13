// Allow devtools in the console.
Vue.config.devtools = true;

let app = new Vue({
    // bind to whatever id you give the element
    el: "#app",
    // Data to be passed into the scope
    data: {
        todos: [],
        newItemText: ""
    },
    // Methods to be passed into the scope. Call with this.methodName
    // Reference scope variables via this
    methods: {
        addItem: function() {
            if (this.newItemText.length > 0) {
                let idx = this.todos.length;
                this.todos.push({ 
                    text: this.newItemText,
                    id: idx
                });
                this.newItemText = "";
            }
        },
        removeItem: function(id) {
            this.todos.some( (item, idx) => {
                if (item.id === id) {
                    this.todos.splice(idx, 1);
                    return true;
                }
            })
        }
    }
});

document.getElementById('newItemInput').addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById('addButton').click();
    }
});

