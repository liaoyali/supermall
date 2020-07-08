<template>
    <div class="bottom-bar">
        <div>
        <CheckButton />全选
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
    components: {
        CheckButton
    }
}
</script>

<style scoped>
    .bottom-bar {
        height: 40px;
        background-color: red;
        position: relative;
        bottom: 40px;
    }
</style>