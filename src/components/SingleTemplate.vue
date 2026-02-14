<template>
    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 text-center overflow-hidden" :class="[
        isOddSl(sl) ? 'text-white' : 'text-dark'
    ]">
        <div class="border border-dark rounded">
            <div class="py-2 px-3 template-detail rounded-top" :class="[
                isOddSl(sl) ? 'bg-dark' : 'bg-light'
            ]">
                <h3>{{ title }}</h3>
                <p class="small">{{ desc }}</p>
            </div>
            <div class="shadow-sm mx-auto">
                <img class="picture" :src="imgSrc" :alt="title">
            </div>
            <div class="py-3 rounded-bottom" :class="[
                isOddSl(sl) ? 'bg-dark' : 'bg-light'
            ]">
                <router-link :to="'/set-resume/' + wrapper" class="btn" :class="[
                    isOddSl(sl) ? 'btn-outline-light' : 'btn-outline-dark'
                ]">
                    Select teamplate
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            required: true
        },
        desc: {
            required: true
        },
        imgSrc: {
            required: true
        },
        wrapper: {
            required: true
        },
        sl: {
            type: Number,
            required: false
        }
    },
    methods: {
        isOddSl(serialNo) {
            return serialNo % 2 == 1;
        }
    }
}
</script>

<style lang="scss" scoped>
.picture {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    min-height: 333px;
}

@media (min-width: 990px) {
    .template-detail {
        max-height: 115px;
        min-height: 115px;
    }
}
</style>