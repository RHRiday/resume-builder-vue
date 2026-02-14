<template>
    <article class="resume-wrapper mx-auto theme-bg-light py-3 px-5 shadow-lg">
        <div class="resume-header pt-2">
            <div class="row align-items-center">
                <div class="resume-title col-8">
                    <h2 class="resume-name mb-0 text-uppercase">
                        {{ resumeData?.fullName || "Name" }}
                    </h2>
                    <div class="resume-tagline mb-3 mb-md-0">{{ resumeData?.title || "Title" }}</div>
                </div>
                <div class="resume-contact col-4">
                    <ul class="list-unstyled mb-0">
                        <li class="mb-2">
                            <fa-icon icon="phone-square" class="me-2" />
                            <a class="resume-link" :href="'tel:' + resumeData?.phone || '+880-1234567890'">
                                {{ resumeData?.phone || "1234567890" }}
                            </a>
                        </li>
                        <li class="mb-2">
                            <fa-icon icon="envelope" class="me-2" />
                            <a class="resume-link" :href="'mailto:' + resumeData?.email || 'Email'">
                                {{ resumeData?.email || "Email" }}
                            </a>
                        </li>
                        <li class="mb-0">
                            <fa-icon icon="map-marker-alt" class="me-2" />
                            {{ resumeData?.location || "Current address" }}
                        </li>
                    </ul>
                </div>
            </div>

        </div>
        <hr>
        <div class="resume-intro">
            <div class="row align-items-center">
                <div class="col-2 text-center">
                    <img class="resume-profile-image mb-3 mb-md-0 me-md-5  ms-md-0 rounded mx-auto"
                        :src="resumeData?.img" alt="Candidate image">
                </div>

                <div class="col text-start">
                    <p class="mb-0">{{ resumeData?.summary || "Summarise your career here." }}</p>
                </div>
            </div>
        </div>
        <hr>
        <div class="resume-body">
            <div class="row">
                <div class="col-9 resume-main pe-2 pt-3">
                    <section class="work-section">
                        <h3 class="text-uppercase resume-section-heading mb-4">Work Experiences</h3>
                        <div class="item mb-3"
                            v-for="exp in resumeData?.experiences?.filter(ex => ex.company != 'Project')">
                            <div class="item-heading row align-items-center mb-2">
                                <h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">
                                    {{ exp.title }}
                                </h4>
                                <div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">
                                    {{ exp.company }} |
                                    {{ convertDate(exp.startDate) }} — {{ convertDate(exp.endDate) }}
                                </div>

                            </div>
                            <div class="item-content">
                                <p v-html="exp.desc" class="trix-content"></p>
                            </div>
                        </div>
                    </section>


                    <section class="project-section py-3">
                        <h3 class="text-uppercase resume-section-heading mb-4">Projects</h3>
                        <div class="item mb-3"
                            v-for="exp in resumeData?.experiences?.filter(ex => ex.company == 'Project')">
                            <div class="item-heading row align-items-center mb-2">
                                <h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">{{ exp.title }}</h4>
                                <div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">
                                    {{ convertDate(exp.startDate) }} — {{ convertDate(exp.endDate) }}
                                </div>
                            </div>
                            <div class="item-content">
                                <p v-html="exp.desc" class="trix-content"></p>
                            </div>
                        </div>
                    </section>
                </div>
                <aside class="col-3 resume-aside pt-3">
                    <section class="skills-section">
                        <h3 class="text-uppercase resume-section-heading mb-2">Technical Skills</h3>
                        <div class="item mt-3">
                            <ul class="list-unstyled resume-skills-list">
                                <li class="mb-2" v-for="skill in resumeData?.skills">{{ skill.tool }}</li>
                            </ul>
                        </div>
                        <!-- <div class="item">
                            <h4 class="item-title">Professional</h4>
                            <ul class="list-unstyled resume-skills-list">
                                <li class="mb-2">Effective communication</li>
                                <li class="mb-2">
                                    Team player
                                </li>
                                <li class="mb-2">Strong problem solver</li>
                                <li>Good time management</li>
                            </ul>
                        </div> -->
                    </section>
                    <section class="education-section">
                        <h3 class="text-uppercase resume-section-heading mb-2">Education</h3>
                        <ul class="list-unstyled resume-education-list">
                            <li class="mb-3" v-for="edu in resumeData?.education">
                                <div class="resume-degree font-weight-bold">{{ edu.degree }}</div>
                                <div class="resume-degree-org text-muted">{{ edu.university }}</div>
                                <div class="resume-degree-time text-muted">
                                    {{ convertDate(edu.batch) }} |
                                    Grade: {{ edu.grade }}
                                </div>
                            </li>
                        </ul>
                    </section>
                    <section class="education-section">
                        <h3 class="text-uppercase resume-section-heading mb-2">Awards</h3>
                        <ul class="list-unstyled resume-awards-list">
                            <li class="mb-3" v-for="award in resumeData?.awards">
                                <div class="font-weight-bold">{{ award.title }}</div>
                                <div class="text-muted">{{ award.school }}</div>
                            </li>
                        </ul>
                    </section>
                    <section class="skills-section">
                        <h3 class="text-uppercase resume-section-heading mb-2">Interests</h3>
                        <ul class="list-unstyled resume-interests-list mb-0">
                            <li class="mb-2" v-for="hobby in resumeData?.interests">{{ hobby }}</li>
                        </ul>
                    </section>

                </aside>
            </div>
        </div>
        <hr>
        <div class="resume-footer text-center">
            <ul class="resume-social-list list-inline mx-auto mb-0 d-inline-block text-muted">

                <li class="list-inline-item mb-lg-0 me-3" v-for="site in resumeData?.websites">
                    <fa-icon :icon="getIcon(site)" class="me-2" />
                    <a class="resume-link" :href="site" target="_blank">{{ breakDownWebsite(site) }}</a>
                </li>
            </ul>
        </div>
    </article>
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
    name: "DevResumeTemplate",
    methods: commonMethods
}
</script>

<style lang="scss" scoped>
@import url('./../../assets/css/dev-resume.css');
</style>