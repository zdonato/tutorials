<template>
    <li>
        {{ todo.text }}
        <button @click="$parent.removeItem(todo.id)">X</button>
    </li>
</template>

<script>
export default {
    props: ['todo']
}
</script>