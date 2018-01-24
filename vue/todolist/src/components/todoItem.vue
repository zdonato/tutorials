<template>
    <li>
        {{ todo.text }}
        <button v-if="!todo.completed" @click="completeItem(todo.id)">&#10004;</button>
        <button @click="removeItem(todo.id)">X</button>
    </li>
</template>

<script>
export default {
    props: ['todo'],
    methods: {
        removeItem (id) {
            // Emit an event with data to communicate back to the parent component.
            this.$emit('remove', id);
        },
        completeItem (id) {
            this.$emit('complete', id);
        }
    }
}
</script>