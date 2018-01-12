let app = new Vue({
    el: "#app",
    data: {
        todos: [],
        newItemText: ""
    },
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
        }
    }
});

document.getElementById('newItemInput').addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById('addButton').click();
    }
});

function removeItem(id) {
    app.todos.some( (item, idx) => {
        if (item.id === id) {
            app.todos.splice(idx, 1);
            return true;
        }
    })
}
