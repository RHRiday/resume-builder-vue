<template>
    <button class="btn btn-sm btn-danger w-100 mt-2 mb-1 rounded" @click="removeBtnClicked">
        <fa-icon icon="trash-alt" /> {{ title }}
    </button>
</template>

<script>
export default {
    emits: ["remove-btn-clicked"],
    props: {
        title: {
            type: String,
            required: true
        }
    },
    methods: {
        removeBtnClicked() {
            this.$emit("remove-btn-clicked");
        }
    }
}

</script>