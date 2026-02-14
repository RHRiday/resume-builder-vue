<template>
    <div class="resume-wrapper-inner mx-auto text-start bg-white shadow-lg">
        <header class="resume-header">
            <div class="row">
                <div class="col-3 resume-picture-holder text-center text-xl-start">
                    <img class="picture" :src="resumeData?.img" alt="Candidate image" />
                </div>
                <div class="col row py-4">
                    <div class="col-8">
                        <h1 class="name mt-0 mb-1 text-white text-uppercase text-uppercase">
                            {{ resumeData?.fullName || "Name" }}
                        </h1>
                        <div class="title my-1">
                            {{ resumeData?.title || "Title" }}
                        </div>
                        <ul class="list-unstyled d-flex flex-column justify-content-between">
                            <li class="my-1">
                                <a class="text-link" :href="'mailto:' + resumeData?.email || 'Email'">
                                    <fa-icon icon="envelope" class="fa-fw me-2" />
                                    {{ resumeData?.email || "Email" }}
                                </a>
                            </li>
                            <li class="my-1">
                                <a class="text-link" :href="'tel:' + resumeData?.phone || '+880-1234567890'">
                                    <fa-icon icon="mobile-alt" class="fa-fw me-2" />
                                    +880{{ resumeData?.phone || "1234567890" }}
                                </a>
                            </li>
                            <li class="my-1">
                                <a class="text-link" target="_blank"
                                    :href="'https://google.com/search?q=' + resumeData?.location">
                                    <fa-icon icon="map-marker-alt" class="fa-fw me-2" />
                                    {{ resumeData?.location || "Current address" }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!--//primary-info-->
                    <div class="secondary-info col-4 mt-2">
                        <ul class="resume-social list-unstyled">
                            <li class="mb-3" v-for="site in resumeData.websites">
                                <a class="text-link" style="font-size: 1rem;" :href="site" target="_blank">
                                    <fa-icon :icon="getIcon(site)" class="me-2 text-white" />
                                    {{ breakDownWebsite(site) }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!--//websites-->

                    <!--//row-->
                </div>
                <!--//col-->
            </div>
        </header>
        <div class="resume-body p-3 p-lg-5">
            <section class="resume-section summary-section mb-3 mb-xl-5">
                <h2 class="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                    Career Summary
                </h2>
                <div class="resume-section-content">
                    <p class="mb-0">
                        {{ resumeData?.summary || "Summarise your career here." }}
                    </p>
                </div>
            </section>
            <!--//summary-section-->
            <div class="row">
                <div class="col-9">
                    <section class="resume-section experience-section mb-3 mb-xl-5">
                        <h2 class="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                            Work Experience
                        </h2>
                        <div class="resume-section-content">
                            <div class="resume-timeline position-relative">
                                <article v-for="exp in resumeData?.experiences"
                                    class="resume-timeline-item position-relative pb-2">
                                    <div class="resume-timeline-item-header mb-2">
                                        <div class="d-flex">
                                            <h3 class="resume-position-title font-weight-bold mb-1">
                                                {{ exp.title }}
                                            </h3>
                                            <div class="resume-company-name ms-auto">
                                                {{ exp.company }}
                                            </div>
                                        </div>
                                        <div class="resume-position-time">
                                            {{ convertDate(exp.startDate) }} —
                                            {{ convertDate(exp.endDate) }}
                                        </div>
                                    </div>
                                    <div class="resume-timeline-item-desc">
                                        <p v-html="exp.desc" class="trix-content"></p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="col-3">
                    <section class="resume-section skills-section mb-3 mb-xl-4">
                        <h2 class="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                            Skills &amp; Tools
                        </h2>
                        <div class="resume-section-content">
                            <div class="resume-skill-item">
                                <ul class="list-unstyled mb-4">
                                    <li class="mb-2" v-for="skill in resumeData?.skills">
                                        <div class="resume-skill-name">{{ skill.tool }}</div>
                                        <div class="progress resume-progress">
                                            <div class="progress-bar theme-progress-bar-dark" role="progressbar"
                                                :style="`width: ${skill.area}%`"></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section class="resume-section education-section mb-3 mb-xl-5">
                        <h2 class="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                            Education
                        </h2>
                        <div class="resume-section-content">
                            <ul class="list-unstyled">
                                <li class="mb-2 ps-3 position-relative" v-for="edu in resumeData?.education">
                                    <fa-icon icon="school" class="position-absolute resume-icon" width="13px" />
                                    <div class="resume-degree font-weight-bold">
                                        {{ edu.degree }}
                                    </div>
                                    <div class="resume-degree-org">
                                        {{ edu.university }}
                                    </div>
                                    <div class="resume-degree-time">
                                        {{ convertDate(edu.batch) }} | Grade: {{ edu.grade }}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section class="resume-section reference-section mb-3 mb-xl-5">
                        <h2 class="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                            Awards & Certifications
                        </h2>
                        <div class="resume-section-content">
                            <ul class="list-unstyled resume-awards-list">
                                <li class="mb-2 ps-4 position-relative" v-for="award in resumeData?.awards">
                                    <fa-icon icon="trophy" class="position-absolute resume-icon" />
                                    <div class="resume-award-name">{{ award.title }}</div>
                                    <div class="resume-award-desc">
                                        {{ award.school }}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section class="resume-section interests-section mb-5">
                        <h2 class="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                            Interests
                        </h2>
                        <div class="resume-section-content">
                            <ul class="list-unstyled">
                                <li class="mb-1" v-for="hobby in resumeData?.interests">{{ hobby }}</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { commonMethods } from "./../../plugins/profileSettingService";
export default {
    props: {
        resumeData: {
            type: Object,
            required: true,
        }
    },
    name: "PillarTemplate",
    methods: commonMethods,
}
</script>

<style lang="scss" scoped>
@import url('./../../assets/css/pillar.css');
</style>