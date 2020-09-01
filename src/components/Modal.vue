<template>
    <div class="custom-modal">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "modal"
    }
</script>

<style scoped>
    .custom-modal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: 0;
        padding: 0;
        background-color: rgba(0,0,0,0.4);
        z-index: 1100;
        opacity: 1;
        visibility: visible;
        -webkit-transition: opacity 0.4s ease-in-out 0s;
        transition: opacity 0.4s ease-in-out 0s;
    }
</style>