<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-4" :class="{ 'resume-wrapper': !showPreview }">
        <div :class="[!showPreview ? 'd-block' : 'd-none']">
          <ResumeForm @changedInData="getFormData" />
        </div>
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
          <PillarTemplate :resumeData="resumeData" v-if="resumeTemplate == 'Pillar'" />
          <DevResumeTemplate :resumeData="resumeData" v-if="resumeTemplate == 'DevResume'" />
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
import DevResumeTemplate from "../components/Templates/DevResume.vue";
import PillarTemplate from "../components/Templates/Pillar.vue";
import { defaultResume } from "../plugins/defaultResumeData";
import ResumeForm from "./ResumeForm.vue";
import html2pdf from "html2pdf.js";
export default {
  components: {
    ResumeForm, PillarTemplate, DevResumeTemplate
  },
  data() {
    return {
      showPreview: false,
      resumeData: {},
      resumeTemplate: this.$router.currentRoute.value.params.wrapper,
    };
  },
  mounted() {
    this.resumeData = defaultResume;
  },
  methods: {
    getFormData(data) {
      this.resumeData = data;
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
