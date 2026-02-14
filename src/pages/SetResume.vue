<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-4" :class="{ 'd-none': isMobile && showPreview }">
        <div :class="[!showPreview ? 'd-block' : 'd-none']">
          <ResumeForm @changedInData="getFormData" />
        </div>
        <div class="text-center my-2 d-none d-lg-block">
          <button class="btn btn-primary btn-lg" @click="exportPdf">
            Download pdf
          </button>
        </div>
        <div class="text-center d-lg-none my-2 mb-5">
          <button class="btn btn-info btn-lg mb-5" @click="switchPreview" v-if="!showPreview">
            {{ showPreview ? 'Hide' : 'Show' }} Preview
          </button>
        </div>
      </div>
      <div class="col-xl-8 my-4" :class="{ 'd-none': isMobile && !showPreview }">
        <div :style="isMobile && showPreview ? {
          width: '992px',
          transform: `scale(${scaleValue})`,
          transformOrigin: 'top left',
          overflow: 'hidden',
        } : {}">
          <article class="position-relative" id="convertToPdf">
            <PillarTemplate :resumeData="resumeData" v-if="resumeTemplate == 'Pillar'" />
            <DevResumeTemplate :resumeData="resumeData" v-if="resumeTemplate == 'DevResume'" />
          </article>
        </div>
      </div>
    </div>

    <div v-if="isMobile && !showPreview" class="text-center preview-action-wrapper">
      <button class="btn btn-primary action-btn" @click="exportPdf">
        Download PDF
      </button>
    </div>

    <div v-if="isMobile && showPreview" class="text-center preview-action-wrapper">
      <button class="btn btn-info action-btn" @click="switchPreview">
        Hide Preview
      </button>
    </div>
  </div>
</template>

<script>
import DevResumeTemplate from "../components/Templates/DevResume.vue";
import _ from "lodash";
import PillarTemplate from "../components/Templates/Pillar.vue";
import { defaultResume } from "../plugins/defaultResumeData";
import ResumeForm from "./ResumeForm.vue";
import html2pdf from "html2pdf.js";
import { Capacitor } from "@capacitor/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
export default {
  components: {
    ResumeForm, PillarTemplate, DevResumeTemplate
  },
  data() {
    return {
      showPreview: false,
      resumeData: {},
      resumeTemplate: this.$router.currentRoute.value.params.wrapper,
      isMobile: window.innerWidth < 992,
      scaleValue: 1
    };
  },
  mounted() {
    this.resumeData = defaultResume;
    this.calculateScale();
    window.addEventListener("resize", this.calculateScale);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.calculateScale);
  },
  methods: {
    calculateScale() {
      if (this.isMobile) {
        const deviceWidth = window.innerWidth;
        this.scaleValue = (deviceWidth / 993) - 0.02;

      } else {
        this.scaleValue = 1;
      }
    },
    getFormData(data) {
      this.resumeData = data;
    },
    switchPreview() {
      this.showPreview = !this.showPreview;
    },
    async exportPdf() {
      const fileName = _.kebabCase(this.resumeData.fullName || 'resume') + '.pdf';

      const pdfFile = html2pdf()
        .set({
          jsPDF: { unit: "px", format: [1000, 1500] },
        })
        .from(document.getElementById("convertToPdf"));

      if (Capacitor.isNativePlatform()) {
        const blobFile = await pdfFile.outputPdf('blob');

        const reader = new FileReader();
        reader.readAsDataURL(blobFile);

        reader.onloadend = async () => {
          const base64Data = reader.result.split(',')[1];

          await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Documents,
          });

          alert("PDF saved successfully in the Documents folder of Internal Storage!");
        };
      } else {
        await pdfFile
          .toPdf()
          .get("pdf")
          .then(function (pdf) {
            window.open(pdf.output("bloburl"), "_blank");
          });
      }
    },
  },
};
</script>

<style scoped>
.action-btn {
  font-size: 1rem;
  border-radius: 0.75rem;
  padding: 0.6rem 1.5rem;
}

@media (min-width: 992px) {
  .action-btn {
    font-size: 1.1rem;
    padding: 0.75rem 2rem;
  }
}

@media (max-width: 991px) {
  .preview-action-wrapper {
    position: fixed;
    bottom: 20px;
    left: 0;
    width: 100%;
    z-index: 1000;
  }

  .action-btn {
    width: 85%;
  }
}
</style>
