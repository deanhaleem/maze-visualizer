<template>
    <div :id="`node-${row}-${column}`" class="node">
    </div>
</template>
  
<script setup lang="ts">
defineProps<{
    column: number,
    row: number
}>()
</script>
  
<style scoped>
.node {
    width: 25px;
    height: 25px;
    outline: 1px solid rgb(175, 216, 248);
    display: inline-block;
    background-color: rgb(12, 53, 71);
}

.node-visited {
    animation-name: visitedAnimation;
    animation-duration: 1.5s;
    animation-timing-function: ease-out;
    animation-delay: 0;
    animation-direction: alternate;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-play-state: running;
}

@keyframes visitedAnimation {
    0% {
        transform: scale(0.3);
        background-color: rgba(0, 0, 66, 0.75);
        border-radius: 100%;
    }

    12.5% {
        background-color: rgba(17, 104, 217, 0.75);
    }

    25% {
        transform: scale(1);
        background-color: rgba(0, 217, 159, 0.75);
    }

    37.5% {
        transform: scale(1);
        background-color: rgba(0, 190, 218, 0.75);
    }

    50% {
        transform: scale(1);
        background-color: rgba(95, 206, 223, 0.75);
    }

    62.5% {
        transform: scale(1);
        background-color: rgba(0, 217, 159, 0.75);
    }

    75% {
        transform: scale(1);
        background-color: rgba(133, 209, 188, 0.726);
    }

    87.5% {
        transform: scale(1);
        background-color: rgba(164, 223, 206, 0.726);
    }

    100% {
        transform: scale(1);
        background-color: rgba(255, 255, 255, 0.75);
    }
}
</style>