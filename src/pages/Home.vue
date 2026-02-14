<template>
    <main>
        <div class="position-relative p-3 p-md-5 m-md-3 text-center bg-light">
            <div class="col-md-6 p-lg-5 mx-auto my-5">
                <h1 class="display-4 fw-normal">Choose a template</h1>
                <p class="small">
                    Want to build a professional resume quickly? We got you. We have a variety of options to choose from
                    and more in-coming. Just choose one template below to update your resume with and you are all ready
                    to make your own resume with that design.
                </p>
                <span class="badge border border-secondary text-secondary p-2 lead">More coming soon</span>
            </div>
        </div>

        <div class="container-fluid">
            <div class="row gy-2 mx-2">
                <SingleTemplate v-for="(template, index) in availableTemplates" :title="template.title"
                    :desc="template.desc" :imgSrc="template.bodyImg" :wrapper="template.wrapper" :sl="index" />
            </div>
        </div>
    </main>

    <footer class="container py-3">
        <p class="lead text-center fw-normal">All rights reserved for &copy; RHRiday</p>
    </footer>
</template>

<script>
import SingleTemplate from '../components/SingleTemplate.vue';
import { templates } from '../plugins/allTemplates';

export default {
    components: { SingleTemplate },
    data() {
        return {
            availableTemplates: templates
        }
    }
}
</script>

<style lang="scss" scoped></style>