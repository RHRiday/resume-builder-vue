<template>
    <div class="d-grid mb-4">
        <button class="btn btn-secondary btn-sm mt-2 py-1 rounded" @click="addBtnClicked">
            <fa-icon icon="plus-circle" /> {{ title }}
        </button>
    </div>
</template>

<script>
export default {
    emits: ["add-btn-clicked"],
    props: {
        title: {
            type: String,
            required: true
        }
    },
    methods: {
        addBtnClicked() {
            this.$emit("add-btn-clicked");
        }
    }
}

</script>