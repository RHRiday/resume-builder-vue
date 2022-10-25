<template>
  <div class="row justify-content-between">
    <div class="col-xl-4 resume-wrapper">
      <ResumeForm @data="getFormData" />
    </div>
    <div class="col-xl-8">
      <article
        class="resume-wrapper text-right position-relative"
        id="convertToPdf"
      >
        <div class="resume-wrapper-inner mx-auto text-start bg-white shadow-lg">
          <header class="resume-header pt-4 pt-md-0">
            <div class="row">
              <div
                class="col-4 col-xl-auto resume-picture-holder text-center text-xl-start"
              >
                <img
                  class="picture"
                  :src="resumeData?.img || './src/assets/images/profile.jpg'"
                  alt=""
                />
              </div>
              <!--//col-->
              <div class="col">
                <div class="row p-xl-4 justify-content-between">
                  <div class="primary-info col-7 col-xl-auto">
                    <h1
                      class="name mt-0 mb-1 text-white text-uppercase text-uppercase"
                    >
                      {{ resumeData?.fullName || "Name" }}
                    </h1>
                    <div class="title my-1">
                      {{ resumeData?.title || "Title" }}
                    </div>
                    <ul
                      class="list-unstyled d-flex flex-column justify-content-between"
                    >
                      <li class="my-1">
                        <a
                          class="text-link"
                          :href="'mailto:' + resumeData?.email || 'Email'"
                          ><i
                            class="far fa-envelope fa-fw me-2"
                            data-fa-transform="grow-3"
                          ></i>
                          {{ resumeData?.email || "Email" }}
                        </a>
                      </li>
                      <li class="my-1">
                        <a
                          class="text-link"
                          :href="
                            'tel:' + resumeData?.phone || '+880-1234567890'
                          "
                          ><i
                            class="fas fa-mobile-alt fa-fw me-2"
                            data-fa-transform="grow-6"
                          ></i
                          >+880
                          {{ resumeData?.phone || "1234567890" }}
                        </a>
                      </li>
                      <li class="my-1">
                        <a
                          class="text-link"
                          target="_blank"
                          :href="
                            'https://google.com/search?q=' +
                            resumeData?.location
                          "
                          ><i
                            class="fas fa-map-marker-alt fa-fw me-2"
                            data-fa-transform="grow-6"
                          ></i>
                          {{ resumeData?.location || "Current address" }}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <!--//primary-info-->
                  <div class="secondary-info col-5 col-xl-auto mt-2">
                    <ul class="resume-social list-unstyled">
                      <li class="mb-3" v-for="site in resumeData.websites">
                        <a class="text-link" :href="site" target="_blank"
                          ><span
                            class="fa-container text-center me-2 d-none d-xl-inline-block"
                            ><i
                              :class="getIcon(site) + ' text-muted fa-fw'"
                            ></i></span
                          >{{ site }}</a
                        >
                      </li>
                    </ul>
                  </div>
                  <!--//websites-->
                </div>
                <!--//row-->
              </div>
              <!--//col-->
            </div>
            <!--//row-->
          </header>
          <div class="resume-body p-3 p-lg-5">
            <section class="resume-section summary-section mb-3 mb-xl-5">
              <h2
                class="resume-section-title text-uppercase font-weight-bold pb-lg-3 mb-lg-3"
              >
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
                  <h2
                    class="resume-section-title text-uppercase font-weight-bold pb-lg-3 mb-lg-3"
                  >
                    Work Experience
                  </h2>
                  <div class="resume-section-content">
                    <div class="resume-timeline position-relative">
                      <article
                        v-for="exp in resumeData?.experiences"
                        class="resume-timeline-item position-relative pb-2"
                      >
                        <div class="resume-timeline-item-header mb-2">
                          <div class="d-flex">
                            <h3
                              class="resume-position-title font-weight-bold mb-1"
                            >
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
                          <!-- <div>
                            <h4
                              class="resume-timeline-item-desc-heading font-weight-bold"
                            >
                              Achievements:
                            </h4>
                            <p>
                              Praesentium voluptatum deleniti atque corrupti
                              quos dolores et quas molestias excepturi sint
                              occaecati cupiditate non provident.
                            </p>
                            <ul>
                              <li>
                                Lorem ipsum dolor sit amet, 80% consectetuer
                                adipiscing elit.
                              </li>
                              <li>
                                At vero eos et accusamus et iusto odio
                                dignissimos.
                              </li>
                              <li>
                                Blanditiis praesentium voluptatum deleniti atque
                                corrupti.
                              </li>
                              <li>Maecenas tempus tellus eget.</li>
                            </ul>
                            <h4
                              class="resume-timeline-item-desc-heading font-weight-bold"
                            >
                              Technologies used:
                            </h4>
                            <ul class="list-inline">
                              <li class="list-inline-item">
                                <span class="badge bg-secondary badge-pill"
                                  >Angular</span
                                >
                              </li>
                              <li class="list-inline-item">
                                <span class="badge bg-secondary badge-pill"
                                  >Python</span
                                >
                              </li>
                              <li class="list-inline-item">
                                <span class="badge bg-secondary badge-pill"
                                  >jQuery</span
                                >
                              </li>
                              <li class="list-inline-item">
                                <span class="badge bg-secondary badge-pill"
                                  >Webpack</span
                                >
                              </li>
                              <li class="list-inline-item">
                                <span class="badge bg-secondary badge-pill"
                                  >HTML/SASS</span
                                >
                              </li>
                              <li class="list-inline-item">
                                <span class="badge bg-secondary badge-pill"
                                  >PostgresSQL</span
                                >
                              </li>
                            </ul>
                          </div> -->
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
                  <h2
                    class="resume-section-title text-uppercase font-weight-bold pb-lg-3 mb-lg-3"
                  >
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
                            <div
                              class="progress-bar theme-progress-bar-dark"
                              role="progressbar"
                              :style="`width: ${skill.area}%`"
                            ></div>
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
                  <h2
                    class="resume-section-title text-uppercase font-weight-bold pb-lg-3 mb-lg-3"
                  >
                    Education
                  </h2>
                  <div class="resume-section-content">
                    <ul class="list-unstyled">
                      <li class="mb-2" v-for="edu in resumeData?.education">
                        <div class="resume-degree font-weight-bold">
                          {{ edu.degree }}
                        </div>
                        <div class="resume-degree-org">
                          {{ edu.school }}
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
                  <h2
                    class="resume-section-title text-uppercase font-weight-bold pb-lg-3 mb-lg-3"
                  >
                    Awards & Certifications
                  </h2>
                  <div class="resume-section-content">
                    <ul class="list-unstyled resume-awards-list">
                      <li
                        class="mb-2 ps-4 position-relative"
                        v-for="award in resumeData?.awards"
                      >
                        <i
                          class="resume-award-icon fas fa-trophy position-absolute"
                          data-fa-transform="shrink-2"
                        ></i>
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
    </div>
  </div>
</template>

<script>
import ResumeForm from "./ResumeForm.vue";
export default {
  components: {
    ResumeForm,
  },
  data() {
    return {
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
        "https://rhriday.github.io/",
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
      if (str.includes("linkedin")) {
        return "fab fa-linkedin-in";
      } else if (str.includes("github")) {
        return "fab fa-github";
      } else if (str.includes("facebook")) {
        return "fab fa-facebook";
      } else if (str.includes("twitter")) {
        return "fab fa-twitter";
      } else {
        return "fas fa-globe";
      }
    },
    convertDate(date) {
      if (date == "Present") {
        return date;
      }
      let d = new Date(date);
      return d.getMonth() + 1 + "/" + d.getFullYear();
    },
  },
};
</script>

<style scoped></style>
