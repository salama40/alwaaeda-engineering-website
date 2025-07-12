<script setup lang="ts">
import SvgNode, { SvgNodeProps } from '../../common/SvgNode.vue'
import { Ref } from 'vue'

defineProps({
  outputLines: {
    type: Array as () => Ref<SvgNodeProps>[],
    required: true,
  },
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="844"
    height="80"
    viewBox="0 0 844 40"
    fill="none"
    class="output-line"
    style="opacity: 0.9" >
    <path
      d="M843.463 1.3315L245.316 5.47507L0.633077 4.69725"
      stroke="url(#output_gradient_new)" stroke-width="2" />
    <g v-for="outputLine in outputLines">
      <SvgNode
        path="M843.463 1.3315L245.316 5.47507L0.633077 4.69725"
        :position="outputLine.value.position"
        :visible="outputLine.value.visible"
        :label-visible="outputLine.value.labelVisible"
        :label="outputLine.value.label"
        dot-color="#66b2ff" glow-color="#007bff" />
    </g>
    <defs>
      <linearGradient id="output_gradient_new" gradientUnits="userSpaceOnUse"> <stop offset="0.1" stop-color="#00cc99" stop-opacity="0.2" /> <stop offset="0.4" stop-color="#00cc99" stop-opacity="0.6" />
        <stop offset="0.8" stop-color="#800080" stop-opacity="0.4" /> <stop offset="1" stop-color="#00cc99" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
</template>

<style scoped>
.output-line {
  position: absolute;
  top: 300px; /* ممكن تعدل الـ top والـ left دول عشان تغير مكان الـ SVG على الشاشة */
  left: 785px;
  transform: translate3d(0, 0, 0);
}
</style>