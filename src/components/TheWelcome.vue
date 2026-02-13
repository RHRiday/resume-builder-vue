<template>
  <div class="px-2">
    <div class="row">
      <div class="col-xl-4" :class="{ 'resume-wrapper': !showPreview }">
        <ResumeForm @changedInData="getFormData" v-if="!showPreview" />
        <div class="text-center my-2 d-none d-lg-block">
          <button class="btn btn-primary btn-lg" @click="exportPdf">
            Download pdf
          </button>
        </div>
        <div class="text-center d-lg-none my-2">
          <button class="btn btn-info btn-lg" @click="switchPreview" v-if="!showPreview">
            {{ showPreview ? 'Hide' : 'Show' }} Preview
          </button>
        </div>
      </div>
      <div class="col-xl-8 my-4" :class="[showPreview ? 'd-inline' : 'd-none d-lg-inline']">
        <article class="position-relative" id="convertToPdf">
          <div class="resume-wrapper-inner mx-auto text-start bg-white shadow-lg">
            <header class="resume-header">
              <div class="row">
                <div class="col-3 resume-picture-holder text-center text-xl-start">
                  <img class="picture" :src="resumeData?.img || './src/assets/images/profile.jpg'" alt="" />
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
                <h2 class="resume-section-title text-uppercase font-weight-bold pb-lg-3 mb-lg-3">
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
                    <h2 class="resume-section-title text-uppercase font-weight-bold pb-lg-3 mb-lg-3">
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
                            <!--//row-->
                            <div class="resume-position-time">
                              {{ convertDate(exp.startDate) }} —
                              {{ convertDate(exp.endDate) }}
                            </div>
                          </div>
                          <!--//resume-timeline-item-header-->
                          <div class="resume-timeline-item-desc">
                            <p v-html="exp.desc" class="trix-content"></p>
                          </div>
                          <!--//resume-timeline-item-desc-->
                        </article>
                        <!--//resume-timeline-item-->
                      </div>
                      <!--//resume-timeline-->
                    </div>
                  </section>
                  <!--//experience-section-->
                </div>
                <div class="col-3">
                  <section class="resume-section skills-section mb-3 mb-xl-4">
                    <h2 class="resume-section-title text-uppercase font-weight-bold pb-lg-3 mb-lg-3">
                      Skills &amp; Tools
                    </h2>
                    <div class="resume-section-content">
                      <div class="resume-skill-item">
                        <!-- <h4 class="resume-skills-cat font-weight-bold">
                        Frontend
                      </h4> -->
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
                      <!--//resume-skill-item-->
                    </div>
                    <!--resume-section-content-->
                  </section>
                  <!--//skills-section-->
                  <section class="resume-section education-section mb-3 mb-xl-5">
                    <h2 class="resume-section-title text-uppercase font-weight-bold pb-lg-3 mb-lg-3">
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
                  <!--//education-section-->
                  <section class="resume-section reference-section mb-3 mb-xl-5">
                    <h2 class="resume-section-title text-uppercase font-weight-bold pb-lg-3 mb-lg-3">
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
                  <!--//language-section-->
                  <!-- <section class="resume-section interests-section mb-5">
                  <h2
                    class="resume-section-title text-uppercase font-weight-bold pb-3 mb-3"
                  >
                    Interests
                  </h2>
                  <div class="resume-section-content">
                    <ul class="list-unstyled">
                      <li class="mb-1">Climbing</li>
                      <li class="mb-1">Snowboarding</li>
                      <li class="mb-1">Cooking</li>
                    </ul>
                  </div>
                </section> -->
                  <!--//interests-section-->
                </div>
              </div>
              <!--//row-->
            </div>
            <!--//resume-body-->
          </div>
        </article>
        <div class="text-center mt-5" :class="[!showPreview ? 'd-none' : 'd-block']">
          <button class="btn btn-primary btn-lg preview-large-button" @click="exportPdf">
            Download pdf
          </button>
        </div>
        <div class="text-center d-lg-none my-4 my-md-2" :class="[!showPreview ? 'd-none' : 'd-block']">
          <button class="btn btn-info btn-lg preview-large-button" @click="switchPreview">
            {{ showPreview ? 'Hide' : 'Show' }} Preview
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResumeForm from "./ResumeForm.vue";
import html2pdf from "html2pdf.js";
export default {
  components: {
    ResumeForm,
  },
  data() {
    return {
      showPreview: false,
      resumeData: {},
    };
  },
  mounted() {
    this.resumeData = {
      fullName: "Rifat Hossen Riday",
      title: "Software Engineer",
      email: "riffatriday@gmail.com",
      phone: "1521401417",
      img: "",
      location: "Halishahar, Khan Bari, Chattogram 4216.",
      summary: `A self-taught web developer with 3 years of personal experience and 1 year of 
        professional experience working with web technologies. I have worked in 8+
        professional projects as well as 20+ personal projects with technologies such as
        php/laravel, node.js/angular/react.js using MVC architecture. I have also worked with
        APIs professionally to build customized ERP/CRM/LMS based applications.`,
      websites: [
        "https://rhriday.github.io/ab",
        "https://github.com/RHRiday",
        "https://linkedin.com/in/rhriday",
      ],
      experiences: [
        {
          title: "Software Engineer (Fullstack)",
          company: "Panacea PLT",
          desc: `<ul><li>Designed front-end, developed APIs and hosted web applications in the required environment according to client needs.</li><li>Implemented special features to satisfy clients’ every day usage and easy to handle functionalities.</li><li>Had meetings with team and clients to ensure best project managing criteria are met while developing projects</li></ul>`,
          startDate: "2021-09-12",
          endDate: "Present",
        },
        {
          title: "Jr. Web Developer",
          company: "Zorg IT Group",
          desc: `<ul><li>Designed front-end, developed APIs and hosted web applications in the required environment according to client needs.</li><li>Implemented special features to satisfy clients’ every day usage and easy to handle functionalities.</li><li>Had meetings with team and clients to ensure best project managing criteria are met while developing projects</li></ul>`,
          startDate: "2021-08-02",
          endDate: "2021-08-30",
        },
        {
          title: "Laravel Developer (Intern)",
          company: "PONDITs",
          desc: `<ul><li>Worked on projects using Laravel knowledge gained in classes to fix bugs and achieved development recognition by designing and implementing special project during internship.</li></ul>`,
          startDate: "2021-08-02",
          endDate: "2021-08-30",
        },
        {
          title: "Tams Agency",
          company: "Project",
          desc: `<ul><li>Integrated b2b portal among Airline companies with their APIs to cross-connect both businesses.</li><li>Worked on building REST APIs and took part as project manager. Also held meetings with client and front-end team on a regular basis.</li><li>Built special features according to clients’ needs such as admin, agent, sub-agent separate authorization; ticket booking, generating tickets, managing loans and payments, quick import/export in csv/pdf, admin control over all transactions etc.</li></ul>`,
          startDate: "2022-02-05",
          endDate: "2022-07-30",
        },
      ],
      skills: [
        {
          tool: "Problem Solving/ Programming",
          area: "83",
        },
        {
          tool: "php/ Laravel",
          area: "92",
        },
        {
          tool: "Frontend development",
          area: "87",
        },
        {
          tool: "Backend development",
          area: "95",
        },
        {
          tool: "REST API",
          area: "89",
        },
        {
          tool: "Project management/ Team lead",
          area: "71",
        },
        {
          tool: "MySql, MongoDB",
          area: "85",
        },
        {
          tool: "Vue, React, Angular",
          area: "80",
        },
        {
          tool: "Adobe Photoshop",
          area: "89",
        },
        {
          tool: "Git/ Version control",
          area: "83",
        },
        {
          tool: "vsCode, Jira, Slack",
          area: "83",
        },
      ],
      education: [
        {
          degree: "Bsc in Computer Science and Engineering",
          university: "International Islamic Univeristy, Chattogram",
          grade: "3.5",
          batch: "2021-10-05",
        },
      ],
      awards: [
        {
          title: "Complete Web Development Bootcamp",
          school: "Udemy",
        },
      ],
    };
  },
  methods: {
    getFormData(data) {
      this.resumeData = data;
    },
    getIcon(str) {
      if (str.includes("linkedin.com")) {
        return ['fab', "linkedin"];
      } else if (str.includes("github.com")) {
        return ['fab', "github"];
      } else if (str.includes("facebook.com") || str.includes("fb.com")) {
        return ['fab', "facebook"];
      } else if (str.includes("x.com")) {
        return ['fab', "x-twitter"];
      } else {
        return "globe";
      }
    },
    breakDownWebsite(str) {
      if (str.includes("linkedin.com") || str.includes("github.com") || str.includes("facebook.com") || str.includes("fb.com") || str.includes("x.com")) {
        const splittedString = str.split('/');
        const lastString = splittedString[splittedString.length - 1];
        return '/' + lastString;
      } else if (str.length > 28) {
        return "Website";
      } else {
        return str;
      }
    },
    convertDate(date) {
      if (date == "Present") {
        return date;
      }
      let d = new Date(date);
      return d.getMonth() + 1 + "/" + d.getFullYear();
    },
    switchPreview() {
      this.showPreview = !this.showPreview;
      const meta = document.querySelector('meta[name="viewport"]');
      if (meta) {
        if (this.showPreview) {
          meta.setAttribute('content', 'width=991');
        } else {
          meta.setAttribute('content', 'width=device-width, initial-scale=1.0');
        }
      }
    },
    exportPdf() {
      html2pdf()
        .set({
          jsPDF: { unit: "px", format: [1000, 1500] },
        })
        .from(document.getElementById("convertToPdf"))
        .toPdf()
        .get("pdf")
        .then(function (pdf) {
          window.open(pdf.output("bloburl"), "_blank");
        });
    },
  },
};
</script>

<style scoped>
@import url('./../assets/css/pillar.css');

.preview-large-button {
  font-size: 3.25rem;
  border-radius: 1.25rem;
  padding: 1.2rem 3.6rem;
}

@media (min-width: 576px) and (max-width: 990px) {
  .preview-large-button {
    font-size: 1rem;
    border-radius: 0.75rem;
    padding: 0.6rem 1.2rem;
  }
}
</style>
