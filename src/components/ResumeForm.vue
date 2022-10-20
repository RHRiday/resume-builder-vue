<template>
  <div class="container">
    <div class="row py-3 align-items-center">
      <!-- For Demo Purpose -->
      <div class="mb-5 mb-md-0">
        <h3 class="text-center fw-bold">Create your own resume</h3>
      </div>

      <!-- Registeration Form -->
      <div class="ml-auto">
        <form>
          <div class="accordion">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#profileForm"
                >
                  Profile and contacts
                </button>
              </h2>
              <div id="profileForm" class="accordion-collapse collapse">
                <div class="accordion-body">
                  <div class="input-group mb-4">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text bg-white px-3 border-md border-end-0 h-100"
                      >
                        <i class="fa fa-user text-muted"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Full name"
                      class="form-control bg-white border-start-0 border-md"
                      v-model="form.fullName"
                    />
                  </div>
                  <div class="input-group mb-4">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text bg-white px-3 border-md border-end-0 h-100"
                      >
                        <i class="fab fa-black-tie text-muted"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Title (ex: Marketing Expert)"
                      class="form-control bg-white border-start-0 border-md"
                      v-model="form.title"
                    />
                  </div>
                  <div class="input-group mb-4">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text bg-white px-3 border-md border-end-0 h-100"
                      >
                        <i class="fa fa-envelope text-muted"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Email address"
                      class="form-control bg-white border-start-0 border-md"
                      v-model="form.email"
                    />
                  </div>
                  <div class="input-group mb-4">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text bg-white px-3 border-md border-end-0 h-100"
                      >
                        <i class="fa fa-phone-square text-muted"></i>
                      </span>
                    </div>
                    <span
                      class="input-group-text bg-white px-1 border-md border-start-0 border-end-0 h-100 small"
                    >
                      +880
                    </span>
                    <input
                      type="text"
                      placeholder="Phone number"
                      class="form-control bg-white border-start-0 border-md"
                      v-model="form.phone"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="image" class="form-label">Choose image</label>
                    <input
                      class="form-control form-control-sm"
                      id="image"
                      type="file"
                      accept="image/*"
                      @change="fileHandler"
                    />
                  </div>
                  <div class="input-group mb-4">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text bg-white px-3 border-md border-end-0 h-100"
                      >
                        <i class="fa fa-map-marker-alt text-muted"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Current address"
                      class="form-control bg-white border-start-0 border-md"
                      v-model="form.location"
                    />
                  </div>
                  <div class="mb-1">
                    <div
                      class="input-group"
                      v-for="(site, index) in form.websites"
                    >
                      <div class="input-group-prepend">
                        <span
                          class="input-group-text bg-white px-3 border-md border-end-0 h-100"
                        >
                          <i class="fa fa-globe text-muted"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Website"
                        class="form-control bg-white border-start-0 border-md"
                        v-model="form.websites[index]"
                      />
                      <div
                        class="input-group-text px-3 border-md border-end-0 h-100"
                      >
                        <button
                          class="btn btn-sm btn-primary"
                          @click.prevent="reduceField('websites', index)"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="d-grid mb-4">
                    <button
                      class="btn btn-secondary btn-sm"
                      @click.prevent="addField('websites')"
                    >
                      <i class="fa fa-plus-circle"></i> Add more websites
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#careerSummary"
                >
                  Career details
                </button>
              </h2>
              <div id="careerSummary" class="accordion-collapse collapse">
                <div class="accordion-body">
                  <div class="form-floating">
                    <textarea
                      v-model="form.summary"
                      class="form-control"
                      style="height: 100px"
                    ></textarea>
                    <label>Career summary</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#experience"
                >
                  Work experiences
                </button>
              </h2>
              <div id="experience" class="accordion-collapse collapse">
                <div class="accordion-body p-1">
                  <div
                    class="border border-dark p-2 my-2"
                    v-for="(exp, index) in form.experiences"
                  >
                    <div class="input-group">
                      <div class="input-group mb-1">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text bg-white px-3 border-md border-end-0 h-100"
                          >
                            <i class="fab fa-black-tie text-muted"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder="Title"
                          class="form-control bg-white border-start-0 border-md"
                          v-model="form.experiences[index].title"
                        />
                      </div>
                      <div class="input-group mb-1">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text bg-white px-3 border-md border-end-0 h-100"
                          >
                            <i class="fas fa-building text-muted"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder="Company"
                          class="form-control bg-white border-start-0 border-md"
                          v-model="form.experiences[index].company"
                        />
                      </div>
                      <div class="input-group mb-1">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text bg-white px-3 border-md border-end-0 h-100"
                          >
                            <i class="fas fa-trophy text-muted"></i>
                          </span>
                        </div>
                        <textarea
                          placeholder="Description"
                          class="form-control bg-white border-start-0 border-md"
                          v-model="form.experiences[index].desc"
                        ></textarea>
                      </div>
                      <div class="input-group mb-1">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text bg-white px-3 border-md border-end-0 h-100 text-muted"
                          >
                            <i class="far fa-clock"></i
                            ><span class="mx-2">Start date:</span>
                          </span>
                        </div>
                        <input
                          type="date"
                          v-model="form.experiences[index].startDate"
                          class="form-control bg-white border-start-0 border-md"
                        />
                      </div>
                      <div class="input-group mb-1">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text bg-white px-3 border-md border-end-0 h-100 text-muted"
                          >
                            <i class="far fa-clock"></i
                            ><span class="mx-2">End date:</span>
                          </span>
                        </div>
                        <input
                          :id="'endDate_' + index"
                          type="date"
                          v-model="form.experiences[index].endDate"
                          class="form-control bg-white border-start-0 border-md"
                        />
                        <div class="form-check small mx-1 my-auto fw-light">
                          <input
                            @change="setEndDate($event, index)"
                            class="form-check-input"
                            type="checkbox"
                            :id="'currentWork_' + index"
                          />
                          <label
                            class="form-check-label"
                            v-bind:for="'currentWork_' + index"
                          >
                            Currently work here
                          </label>
                        </div>
                      </div>
                      <button
                        class="btn btn-sm btn-primary w-100 mb-1"
                        @click.prevent="reduceField('experiences', index)"
                      >
                        <i class="fas fa-trash-alt"></i> Remove experience
                      </button>
                    </div>
                  </div>
                  <div class="d-grid mb-4">
                    <button
                      class="btn btn-secondary btn-sm"
                      @click.prevent="addField('experiences')"
                    >
                      <i class="fa fa-plus-circle"></i> Add an experience
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#skills"
                  aria-expanded="true"
                >
                  Skills & Tools
                </button>
              </h2>
              <div id="skills" class="accordion-collapse collapse">
                <div class="accordion-body p-1">
                  <div
                    class="border border-dark p-2 my-2"
                    v-for="(skill, index) in form.skills"
                  >
                    <div class="input-group justify-content-between">
                      <div class="input-group mb-1">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text bg-white px-3 border-md border-end-0 h-100"
                          >
                            <i class="fas fa-tools text-muted"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder="Technology"
                          class="form-control bg-white border-start-0 border-md"
                          v-model="form.skills[index].tool"
                        />
                      </div>
                      <div class="col-6 d-flex mb-1">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text bg-white px-3 border-md border-end-0 h-100"
                          >
                            <i class="fas fa-percentage text-muted"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder="Expertise in %"
                          class="form-control bg-white border-start-0 border-md"
                          v-model="form.skills[index].area"
                        />
                      </div>
                      <button
                        class="btn btn-sm btn-primary col-4 mb-1"
                        @click.prevent="reduceField('skills', index)"
                      >
                        <i class="fas fa-trash-alt"></i> Remove skill
                      </button>
                    </div>
                  </div>
                  <div class="d-grid mb-4">
                    <button
                      class="btn btn-secondary btn-sm"
                      @click.prevent="addField('skills')"
                    >
                      <i class="fa fa-plus-circle"></i> Add a skill
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#education"
                >
                  Education
                </button>
              </h2>
              <div id="education" class="accordion-collapse collapse">
                <div class="accordion-body p-1">
                  <div
                    class="border border-dark p-2 my-2"
                    v-for="(edu, index) in form.education"
                  >
                    <div class="input-group">
                      <div class="input-group mb-1">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text bg-white px-3 border-md border-end-0 h-100"
                          >
                            <i class="fas fa-graduation-cap text-muted"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder="Degree"
                          class="form-control bg-white border-start-0 border-md"
                          v-model="form.education[index].degree"
                        />
                      </div>
                      <div class="input-group mb-1">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text bg-white px-3 border-md border-end-0 h-100"
                          >
                            <i class="fas fa-school text-muted"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder="Institution"
                          class="form-control bg-white border-start-0 border-md"
                          v-model="form.education[index].school"
                        />
                      </div>
                      <div class="input-group mb-1">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text bg-white px-3 border-md border-end-0 h-100 text-muted"
                          >
                            <i class="far fa-clock text-muted"></i
                            ><span class="mx-2">Passing year:</span>
                          </span>
                        </div>
                        <input
                          type="date"
                          v-model="form.education[index].batch"
                          class="form-control bg-white border-start-0 border-md"
                        />
                      </div>
                      <div class="input-group mb-1">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text bg-white px-3 border-md border-end-0 h-100"
                          >
                            <i class="fas fa-star-half-alt text-muted"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder="Grade"
                          class="form-control bg-white border-start-0 border-md"
                          v-model="form.education[index].grade"
                        />
                      </div>
                      <button
                        class="btn btn-sm btn-primary w-100 mb-1"
                        @click.prevent="reduceField('education', index)"
                      >
                        <i class="fas fa-trash-alt"></i> Remove education
                      </button>
                    </div>
                  </div>
                  <div class="d-grid mb-4">
                    <button
                      class="btn btn-secondary btn-sm"
                      @click.prevent="addField('education')"
                    >
                      <i class="fa fa-plus-circle"></i> Add education
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#award"
                >
                  Awards & Certifications
                </button>
              </h2>
              <div id="award" class="accordion-collapse collapse">
                <div class="accordion-body p-1">
                  <div
                    class="border border-dark p-2 my-2"
                    v-for="(award, index) in form.awards"
                  >
                    <div class="input-group">
                      <div class="input-group mb-1">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text bg-white px-3 border-md border-end-0 h-100"
                          >
                            <i class="fas fa-award text-muted"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder="Title"
                          class="form-control bg-white border-start-0 border-md"
                          v-model="form.awards[index].title"
                        />
                      </div>
                      <div class="input-group mb-1">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text bg-white px-3 border-md border-end-0 h-100"
                          >
                            <i class="fas fa-school text-muted"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder="Institution"
                          class="form-control bg-white border-start-0 border-md"
                          v-model="form.awards[index].school"
                        />
                      </div>
                      <button
                        class="btn btn-sm btn-primary w-100 mb-1"
                        @click.prevent="reduceField('awards', index)"
                      >
                        <i class="fas fa-trash-alt"></i> Remove award
                      </button>
                    </div>
                  </div>
                  <div class="d-grid mb-4">
                    <button
                      class="btn btn-secondary btn-sm"
                      @click.prevent="addField('awards')"
                    >
                      <i class="fa fa-plus-circle"></i> Add award
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="text-center">
      <button class="btn-primary btn-lg" @click="exportPdf">
        Download pdf
      </button>
    </div>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
export default {
  data() {
    return {
      form: {
        fullName: "",
        title: "",
        email: "",
        phone: "",
        img: "",
        location: "",
        summary: "",
        websites: [""],
        experiences: [
          {
            title: "",
            company: "",
            desc: "",
            startDate: "",
            endDate: "",
          },
        ],
        skills: [
          {
            tool: "",
            area: "",
          },
        ],
        education: [
          {
            degree: "",
            university: "",
            grade: "",
            batch: "",
          },
        ],
        awards: [
          {
            title: "",
            school: "",
          },
        ],
      },
    };
  },
  methods: {
    sendFormData() {
      this.$emit("data", this.form);
    },

    addField(field) {
      if (field == "websites") {
        return this.form.websites.push("");
      }
      let obj = {};
      let keys = Object.keys(this.form[field][0]);
      keys.forEach((k) => {
        obj[k] = "";
      });
      this.form[field].push(obj);
    },
    reduceField(field, i) {
      if (this.form[field].length > 1) {
        this.form[field].splice(i, 1);
      }
    },

    setEndDate(event, i) {
      if (event.target.checked) {
        document.getElementById("endDate_" + i).disabled = true;
        this.form.experiences[i].endDate = "Present";
      } else {
        document.getElementById("endDate_" + i).disabled = false;
      }
    },
    fileHandler(e) {
      this.form.img = URL.createObjectURL(e.target.files[0]);
      this.sendFormData();
    },
    exportPdf() {
      html2pdf()
        .set({
          filename: "CV.pdf",
          html2canvas: { y: 30 },
          jsPDF: { unit: "px", format: [1000, 1500] },
        })
        .from(document.getElementById("convertToPdf"))
        .save();
    },
  },
  updated() {
    this.sendFormData();
  },
};
</script>

<style scoped></style>
