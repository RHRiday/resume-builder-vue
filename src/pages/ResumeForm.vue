<template>
  <div class="container">
    <div class="row py-3 align-items-center">
      <div class="my-3 my-lg-2">
        <h3 class="text-center fw-bold">Create your own resume</h3>
      </div>

      <div class="accordion">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#profileForm">
              Profile and contacts
            </button>
          </h2>
          <div id="profileForm" class="accordion-collapse collapse">
            <div class="accordion-body">
              <div class="input-group mb-3">
                <span class="input-group-text bg-white px-3 border-md border-end-0">
                  <fa-icon icon="user" class="text-muted" />
                </span>
                <input type="text" placeholder="Full name" class="form-control bg-white border-start-0 border-md"
                  v-model="form.fullName" />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-white px-3 border-md border-end-0">
                  <fa-icon :icon="['fab', 'black-tie']" class="text-muted" />
                </span>
                <input type="text" placeholder="Title (ex: Marketing Expert)"
                  class="form-control bg-white border-start-0 border-md" v-model="form.title" />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-white px-3 border-md border-end-0">
                  <fa-icon icon="envelope" class="text-muted" />
                </span>
                <input type="text" placeholder="Email address" class="form-control bg-white border-start-0 border-md"
                  v-model="form.email" />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-white px-3 border-md border-end-0">
                  <fa-icon icon="phone-square" class="text-muted" />
                </span>
                <span class="input-group-text bg-white px-1 border-md border-start-0 border-end-0 small">
                  +880
                </span>
                <input type="text" placeholder="Phone number" class="form-control bg-white border-start-0 border-md"
                  v-model="form.phone" />
              </div>
              <div class="mb-4">
                <label for="image" class="form-label">Choose image</label>
                <input class="form-control form-control-sm" id="image" type="file" accept="image/*"
                  @change="fileHandler" />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-white px-3 border-md border-end-0">
                  <fa-icon icon="map-marker-alt" class="text-muted" />
                </span>
                <input type="text" placeholder="Current address" class="form-control bg-white border-start-0 border-md"
                  v-model="form.location" />
              </div>
              <div class="mb-1">
                <div class="input-group my-2" v-for="(site, index) in form.websites">
                  <span class="input-group-text bg-white px-3 border-md border-end-0">
                    <fa-icon icon="globe" class="text-muted" />
                  </span>
                  <input type="text" placeholder="Website" class="form-control bg-white border-start-0 border-md"
                    v-model="form.websites[index]" />
                  <div v-if="form.websites.length > 1" class="input-group-text px-2 border-md border-end-0">
                    <button class="btn btn-sm btn-danger mt-2 py-1 rounded" @click="reduceField('websites', index)">
                      <fa-icon icon="trash-alt" />
                    </button>
                  </div>
                </div>
              </div>
              <add-more-btn title="Add more websites" @add-btn-clicked="addField('websites')" />
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#careerSummary">
              Career details
            </button>
          </h2>
          <div id="careerSummary" class="accordion-collapse collapse">
            <div class="accordion-body">
              <div class="form-floating">
                <textarea v-model="form.summary" class="form-control" style="height: 100px"></textarea>
                <label>Career summary</label>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#experience">
              Work experiences
            </button>
          </h2>
          <div id="experience" class="accordion-collapse collapse">
            <div class="accordion-body p-1">
              <div class="border border-dark border-end-0 border-top-0 border-start-0 p-2 my-2"
                :class="{ 'border-bottom-0': form.experiences.length >= 1 && index == form.experiences.length - 1 }"
                v-for="(exp, index) in form.experiences">
                <div class="input-group">
                  <div class="input-group mb-1">
                    <span class="input-group-text bg-white px-3 border-md border-end-0">
                      <fa-icon :icon="['fab', 'black-tie']" class="text-muted" />
                    </span>
                    <input type="text" placeholder="Title" class="form-control bg-white border-start-0 border-md"
                      v-model="form.experiences[index].title" />
                  </div>
                  <div class="input-group mb-1">
                    <span class="input-group-text bg-white px-3 border-md border-end-0">
                      <fa-icon icon="building" class="text-muted" />
                    </span>
                    <input type="text" placeholder="Company" class="form-control bg-white border-start-0 border-md"
                      v-model="form.experiences[index].company" />
                  </div>
                  <div class="input-group mb-1">
                    <span class="input-group-text bg-white px-3 border-md border-end-0">
                      <fa-icon icon="trophy" class="text-muted" />
                    </span>
                    <div class="form-control border-start-0 border-md">
                      <input class="trixInput" :data-index="index" :id="'exp' + index" type="hidden" />
                      <trix-editor :input="'exp' + index" placeholder="Work details"></trix-editor>
                    </div>
                  </div>
                  <div class="input-group mb-1">
                    <span class="input-group-text bg-white px-3 border-md border-end-0 text-muted">
                      <fa-icon icon="clock" class="text-muted" /><span class="mx-2">Start date:</span>
                    </span>
                    <input type="date" v-model="form.experiences[index].startDate"
                      class="form-control bg-white border-start-0 border-md" />
                  </div>
                  <div class="input-group mb-1">
                    <span class="input-group-text bg-white px-3 border-md border-end-0 text-muted">
                      <fa-icon icon="clock" class="text-muted" /><span class="mx-2">End date:</span>
                    </span>
                    <input :id="'endDate_' + index" type="date" v-model="form.experiences[index].endDate"
                      class="form-control bg-white border-start-0 border-md" />
                    <div class="form-check col-12 col-md-auto mt-2 small mx-2 my-auto fw-light">
                      <input @change="setEndDate($event, index)" class="form-check-input" type="checkbox"
                        :id="'currentWork_' + index" />
                      <label class="form-check-label fw-bold" v-bind:for="'currentWork_' + index">
                        Currently work here
                      </label>
                    </div>
                  </div>
                  <remove-btn v-if="form.experiences.length > 1" title="Remove experience"
                    @remove-btn-clicked="reduceField('experiences', index)" />
                </div>
              </div>
              <add-more-btn title="Add an experience" @add-btn-clicked="addField('experiences')" />
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#skills"
              aria-expanded="true">
              Skills & Tools
            </button>
          </h2>
          <div id="skills" class="accordion-collapse collapse">
            <div class="accordion-body p-1">
              <div class="border border-dark border-end-0 border-top-0 border-start-0 p-2 my-2"
                :class="{ 'border-bottom-0': form.skills.length >= 1 && index == form.skills.length - 1 }"
                v-for="(skill, index) in form.skills">
                <div class="input-group mb-1">
                  <span class="input-group-text bg-white px-3 border-md border-end-0">
                    <fa-icon icon="tools" class="text-muted" />
                  </span>
                  <input type="text" placeholder="Technology" class="form-control bg-white border-start-0 border-md"
                    v-model="form.skills[index].tool" />
                </div>
                <div class="input-group mb-1">
                  <span class="input-group-text bg-white px-3 border-md border-end-0">
                    <fa-icon icon="percentage" class="text-muted" />
                  </span>
                  <input type="text" placeholder="Expertise in %" class="form-control bg-white border-start-0 border-md"
                    v-model="form.skills[index].area" />
                  <div v-if="form.skills.length > 1" class="input-group-text w-50 px-2 border-md border-end-0">
                    <remove-btn title="Remove skill" @remove-btn-clicked="reduceField('skills', index)" />
                  </div>
                </div>
              </div>
              <add-more-btn title="Add another skill" @add-btn-clicked="addField('skills')" />
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#education">
              Education
            </button>
          </h2>
          <div id="education" class="accordion-collapse collapse">
            <div class="accordion-body p-1">
              <div class="border border-dark border-end-0 border-top-0 border-start-0 p-2 my-2"
                :class="{ 'border-bottom-0': form.education.length >= 1 && index == form.education.length - 1 }"
                v-for="(edu, index) in form.education">
                <div class="input-group">
                  <div class="input-group mb-1">
                    <span class="input-group-text bg-white px-3 border-md border-end-0">
                      <fa-icon icon="graduation-cap" class="text-muted" />
                    </span>
                    <input type="text" placeholder="Degree" class="form-control bg-white border-start-0 border-md"
                      v-model="form.education[index].degree" />
                  </div>
                  <div class="input-group mb-1">
                    <span class="input-group-text bg-white px-3 border-md border-end-0">
                      <fa-icon icon="school" class="text-muted" />
                    </span>
                    <input type="text" placeholder="Institution" class="form-control bg-white border-start-0 border-md"
                      v-model="form.education[index].school" />
                  </div>
                  <div class="input-group mb-1">
                    <span class="input-group-text bg-white px-3 border-md border-end-0 text-muted">
                      <fa-icon icon="clock" class="text-muted" /><span class="mx-2">Passing year:</span>
                    </span>
                    <input type="date" v-model="form.education[index].batch"
                      class="form-control bg-white border-start-0 border-md" />
                  </div>
                  <div class="input-group mb-1">
                    <span class="input-group-text bg-white px-3 border-md border-end-0">
                      <fa-icon icon="star-half-alt" class="text-muted" />
                    </span>
                    <input type="text" placeholder="Grade" class="form-control bg-white border-start-0 border-md"
                      v-model="form.education[index].grade" />
                  </div>
                  <remove-btn v-if="form.education.length > 1" title="Remove education"
                    @remove-btn-clicked="reduceField('education', index)" />
                </div>
              </div>
              <add-more-btn title="Add education" @add-btn-clicked="addField('education')" />
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#award">
              Awards & Certifications
            </button>
          </h2>
          <div id="award" class="accordion-collapse collapse">
            <div class="accordion-body p-1">
              <div class="border border-dark border-end-0 border-top-0 border-start-0 p-2 my-2"
                :class="{ 'border-bottom-0': form.awards.length >= 1 && index == form.awards.length - 1 }"
                v-for="(award, index) in form.awards">
                <div class="input-group">
                  <div class="input-group mb-1">
                    <span class="input-group-text bg-white px-3 border-md border-end-0">
                      <fa-icon icon="award" class="text-muted" />
                    </span>
                    <input type="text" placeholder="Title" class="form-control bg-white border-start-0 border-md"
                      v-model="form.awards[index].title" />
                  </div>
                  <div class="input-group mb-1">
                    <span class="input-group-text bg-white px-3 border-md border-end-0">
                      <fa-icon icon="school" class="text-muted" />
                    </span>
                    <input type="text" placeholder="Institution" class="form-control bg-white border-start-0 border-md"
                      v-model="form.awards[index].school" />
                  </div>
                  <remove-btn v-if="form.awards.length > 1" title="Remove award"
                    @remove-btn-clicked="reduceField('awards', index)" />
                </div>
              </div>
              <add-more-btn title="Add award" @add-btn-clicked="addField('awards')" />
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#interests">
              Interest & Hobbies
            </button>
          </h2>
          <div id="interests" class="accordion-collapse collapse">
            <div class="accordion-body p-1">
              <div class="border border-dark border-end-0 border-top-0 border-start-0 p-2 my-2"
                :class="{ 'border-bottom-0': form.interests.length >= 1 && index == form.interests.length - 1 }"
                v-for="(interest, index) in form.interests">
                <div class="input-group">
                  <div class="input-group mb-1">
                    <span class="input-group-text bg-white px-3 border-md border-end-0">
                      <fa-icon icon="running" class="text-muted" />
                    </span>
                    <input type="text" placeholder="Favorite activities" class="form-control bg-white border-start-0 border-md"
                      v-model="form.interests[index]" />
                  </div>
                  <remove-btn v-if="form.interests.length > 1" title="Remove hobby"
                    @remove-btn-clicked="reduceField('interests', index)" />
                </div>
              </div>
              <add-more-btn title="Add hobbies" @add-btn-clicked="addField('interests')" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddMoreBtn from "./../components/buttons/AddMoreBtn.vue";
import RemoveBtn from "./../components/buttons/RemoveBtn.vue";
export default {
  components: { AddMoreBtn, RemoveBtn },
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
        interests: [''],
      }
    };
  },
  methods: {
    sendFormData() {
      this.$emit("changedInData", this.form);
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
        document.getElementById("endDate_" + i).hidden = true;
        this.form.experiences[i].endDate = "Present";
      } else {
        document.getElementById("endDate_" + i).hidden = false;
      }
    },
    fileHandler(e) {
      this.form.img = URL.createObjectURL(e.target.files[0]);
      this.sendFormData();
    },
  },
  updated() {
    document.querySelectorAll(".trixInput").forEach((el) => {
      let index = Number(el.getAttribute('data-index'));
      this.form.experiences[index].desc = el.value;
    });
    this.sendFormData();
  },
};
</script>
