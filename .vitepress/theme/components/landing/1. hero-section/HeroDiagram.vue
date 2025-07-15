<script setup lang="ts">
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin'
import { onMounted, onUnmounted, Ref, ref } from 'vue'
import SvgInputs from './svg-elements/SvgInputs.vue'
import SvgOutputs from './svg-elements/SvgOutputs.vue'
import SvgBlueIndicator from './svg-elements/SvgBlueIndicator.vue'
import SvgPinkIndicator from './svg-elements/SvgPinkIndicator.vue'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger' // تأكد من استيراد ScrollTrigger
import { SvgNodeProps } from '../common/SvgNode.vue'

// **التصحيح هنا: سجل كلا الـ plugins**
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger)

// Define the paths on the input side of the diagram
const inputPaths = [
  'M843.505 284.659L752.638 284.659C718.596 284.659 684.866 280.049 653.251 271.077L598.822 255.629L0.675021 1.00011',
  'M843.505 298.181L724.342 297.36C708.881 297.36 693.450 296.409 678.220 294.518L598.822 284.659C592.820 284.659 200.538 190.002 0.675028 164.892',
  'M843.505 311.703L701.108 310.061L598.822 305.136L0.675049 256.071',
  'M843.505 325.224L598.822 326.002L0.675049 321.858',
  'M843.505 338.746L701.108 340.388L598.822 345.442L0.675038 387.646',
  'M843.505 352.268L724.342 353.088C708.881 353.088 693.450 354.039 678.220 355.930L598.822 365.789L0.675067 478.825',
  'M843.505 365.789L752.638 365.789C718.596 365.789 684.866 370.399 653.251 379.372L598.822 394.820L0.675049 642.717',
]

// Setup objects representing each input line's animation state
const inputLines: Ref<SvgNodeProps>[] = inputPaths.map((path) =>
  ref({
    position: 0,
    visible: false,
    labelVisible: false,
    label: '',
    dotColor: undefined,
    glowColor: undefined,
    path,
  }),
)

// Define the file set "combinations" that can be shown on the input side
const inputFileSets = ref([
  [{ label: 'الجودة', color: '#ff8d67' }, { label: 'السرعة', color: '#40b782' }, { label: 'الامان', color: '#678dff' }],
  [{ label: 'الصيانة', color: '#ff678d' }, { label: 'التطوير', color: '#8dff67' }, { label: 'التركيب', color: '#67ff8d' }],
  [{ label: 'التصميم', color: '#8d67ff' }, { label: 'الدعم', color: '#ff8d67' }, { label: 'الضمان', color: '#40b782' }],
])

// Setup objects representing each output line's animation state
const outputLines: Ref[] = [
  ref({
    position: 0,
    visible: false,
    labelVisible: false,
    label: 'التطور',
  }),
  ref({
    position: 0,
    visible: false,
    labelVisible: false,
    label: 'الخبرة',
  }),
  ref({
    position: 0,
    visible: false,
    labelVisible: false,
    label: 'التميز',
  }),
  ref({
    position: 0,
    visible: false,
    labelVisible: false,
    label: 'الثقة',
  }),
]

// Add some flags for whether to display various subcomponents
const blueIndicator = ref(false)
const pinkIndicator = ref(false)
const illuminateLogo = ref(false)

// Set up a reference to our ScrollTrigger instance and timeline
let scrollTriggerInstance: ScrollTrigger | null
let timeline: gsap.core.Timeline | null

// Start all animations when mounted
onMounted(() => {
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: '#hero-diagram',
    start: 'center 100%',
    once: true,
    onEnter: () => {
      animateDiagram()
    },
  })
})

// Clean up the scroll trigger and timeline when unmounted
onUnmounted(() => {
  scrollTriggerInstance?.kill()
  timeline?.kill()
})

/**
 * The core animation for the hero diagram.
 * Has both a desktop and mobile variation.
 */
const animateDiagram = () => {
  const isMobile = window.innerWidth < 768

  timeline = gsap.timeline({
    onComplete: animateDiagram,
  })

  // Animate the input nodes/lines
  prepareInputs().forEach((lineIndex, fileIndex) => {
    timeline!.add(
      isMobile
        ? animateSingleInputMobile(inputLines[lineIndex])
        : animateSingleInputDesktop(inputLines[lineIndex]),
      // زيادة الفارق الزمني بين بدء أنيميشن كل خط للموبايل لجعلها أبطأ
      fileIndex * (isMobile ? 1.0 : 0.15), // **تغيير رئيسي هنا** كان 0.6
    )
  })

  // Illuminate the logo and colored indicators
  // زيادة التأخير للموبايل لجعلها تظهر ببطء أكبر
  timeline.set(blueIndicator, { value: true }, isMobile ? '>-3.5' : '>-0.05') // **تغيير رئيسي هنا** كان >-2.5
  timeline.set(illuminateLogo, { value: true }, '<-0.05')
  timeline.set(pinkIndicator, { value: true }, '<+0.1')

  // Animate the output nodes/lines
  timeline.addLabel('showOutput', '<')
  outputLines.forEach((outputLine, index) => {
    timeline!.add(
      isMobile
        ? animateSingleOutputMobile(outputLine)
        : animateSingleOutputDesktop(outputLine, index),
      // زيادة الفارق الزمني بين بدء أنيميشن كل خط للموبايل لجعلها أبطأ
      'showOutput+=' + (isMobile ? 0.8 : 0.05) * index, // **تغيير رئيسي هنا** كان 0.5
    )
  })

  // Desktop only reset
  if (!isMobile) {
    timeline.set(blueIndicator, { value: false }, '>-0.5')
    timeline.set(pinkIndicator, { value: false }, '<')
    timeline.set({}, {}, '+=0.1')
  }
}

/**
 * Randomly selects a set of input file nodes and assigns them to input lines.
 */
const prepareInputs = () => {
  const inputFileSet =
    inputFileSets.value[Math.floor(Math.random() * inputFileSets.value.length)]

  const inputLineIndexes = new Set<number>()
  while (inputLineIndexes.size < 3) {
    const index: number = Math.floor(Math.random() * inputLines.length)
    inputLineIndexes.add(index)
  }

  const inputs = [...inputLineIndexes]
  inputs.forEach((lineIndex, fileIndex) => {
    inputLines[lineIndex].value.label = inputFileSet[fileIndex].label
    inputLines[lineIndex].value.dotColor = inputLines[
      lineIndex
    ].value.glowColor = inputFileSet[fileIndex].color
  })
  return inputs
}

/**
 * Animates a single output line for desktop.
 */
const animateSingleOutputDesktop = (
  outputLine: Ref<SvgNodeProps>,
  index: number,
) => {
  const timeline = gsap.timeline()

  timeline.set(outputLine.value, { position: 0 }, 0)

  timeline.to(
    outputLine.value,
    {
      position: (0.7 / outputLines.length) * (index + 1) + 0.05,
      duration: 1.0,
      ease: 'expo.out',
    },
    0,
  )

  timeline.set(outputLine.value, { visible: true }, 0)

  timeline.set(outputLine.value, { labelVisible: true }, 0.2)

  timeline.to(
    outputLine.value,
    {
      position: 1,
      duration: 1.0,
      ease: 'power3.in',
    },
    1.5,
  )

  timeline.set(outputLine.value, { labelVisible: false }, 2.0)

  timeline.set(outputLine.value, { visible: false }, 2.2)

  return timeline
}

/**
 * Animates a single output line for mobile.
 */
const animateSingleOutputMobile = (outputLine: Ref<SvgNodeProps>) => {
  const timeline = gsap.timeline()

  timeline.set(outputLine.value, { position: 0 }, 0)

  // اجعل الكلمة مرئية مبكرًا وببطء
  timeline.set(
    outputLine.value,
    {
      labelVisible: true,
    },
    0.5, // **تغيير رئيسي هنا** كان 0.3
  )

  timeline.to(
    outputLine.value,
    {
      position: 0.7,
      duration: 3.0, // **تغيير رئيسي هنا** كان 2.0
      ease: 'power1.inOut',
    },
    0.1,
  )

  // اجعل النقطة مرئية ببطء وتزامن مع حركة الكلمة
  timeline.set(
    outputLine.value,
    {
      visible: true,
    },
    1.0, // **تغيير رئيسي هنا** كان 0.8
  )

  timeline.set(
    outputLine.value,
    {
      visible: false,
    },
    2.5, // **تغيير رئيسي هنا** كان 1.5
  )

  // اخفِ الكلمة ببطء بعد انتهاء الحركة
  timeline.set(
    outputLine.value,
    {
      labelVisible: false,
    },
    3.0, // **تغيير رئيسي هنا** كان 2.0
  )

  return timeline
}

/**
 * Animates a single input line for desktop.
 */
const animateSingleInputDesktop = (inputLine: Ref<SvgNodeProps>) => {
  const timeline = gsap.timeline()

  timeline.set(inputLine.value, { position: 0 }, 0)

  timeline.to(
    inputLine.value,
    {
      position: Math.random() * 0.1 + 0.4,
      duration: 0.6,
      ease: 'expo.out',
    },
    0,
  )

  timeline.set(inputLine.value, { visible: true }, 0)

  timeline.set(inputLine.value, { labelVisible: true }, 0.1)

  timeline.to(
    inputLine.value,
    {
      position: 1,
      duration: 0.9,
      ease: 'power3.in',
    },
    1.0,
  )

  timeline.set(inputLine.value, { labelVisible: false }, 1.3)

  timeline.set(inputLine.value, { visible: false }, 1.5)

  return timeline
}

/**
 * Animates a single input line for mobile.
 */
const animateSingleInputMobile = (inputLine: Ref<SvgNodeProps>) => {
  const timeline = gsap.timeline()

  timeline.set(inputLine.value, { position: 0 }, 0)

  // اجعل الكلمة مرئية مبكرًا وببطء
  timeline.set(
    inputLine.value,
    {
      labelVisible: true,
    },
    0.4, // **تغيير رئيسي هنا** كان 0.2
  )

  timeline.to(
    inputLine.value,
    {
      position: 1,
      duration: 2.5, // **تغيير رئيسي هنا** كان 1.8
      ease: 'power2.out',
    },
    0,
  )

  // اجعل النقطة مرئية ببطء وتزامن مع حركة الكلمة
  timeline.set(
    inputLine.value,
    {
      visible: true,
    },
    0.5, // **تغيير رئيسي هنا** كان 0.1
  )

  timeline.set(
    inputLine.value,
    {
      visible: false,
    },
    1.5, // **تغيير رئيسي هنا** كان 0.8
  )

  // اخفِ الكلمة ببطء بعد انتهاء الحركة
  timeline.set(
    inputLine.value,
    {
      labelVisible: false,
    },
    2.0, // **تغيير رئيسي هنا** كان 1.2
  )

  return timeline
}

const isChromiumBrowser = ref(false)
onMounted(() => {
  isChromiumBrowser.value = 'chrome' in window
})

const isUwu = ref(false)
onMounted(() => {
  isUwu.value = location.search.includes('?uwu')
})
</script>

<template>
  <div class="hero__diagram" id="hero-diagram">
    <SvgInputs :input-lines="inputLines" />

    <SvgOutputs :output-lines="outputLines" />

    <SvgBlueIndicator :active="blueIndicator" />

    <SvgPinkIndicator :active="pinkIndicator" />

    <div class="vite-chip" :class="{ active: illuminateLogo }">
      <div class="vite-chip__background">
        <div class="vite-chip__border" />
        <div
          class="vite-chip__edge"
          :class="{ 'edge--animated': isChromiumBrowser }"
        ></div>
      </div>
      <div class="vite-chip__filter" />
      <img
        :src="isUwu ? '/logo-uwu.png' : '/logo.svg'"
        :alt="isUwu ? 'Vite Kawaii Logo by @icarusgkx' : 'Vite Logo'"
        class="vite-chip__logo"
        :class="{ uwu: isUwu }"
      />
    </div>
  </div>

  <div class="hero__background" :class="{ active: illuminateLogo }" />
</template>

<style scoped>
.hero__diagram {
  pointer-events: none;
  position: relative;
  width: 1630px;
  overflow: hidden;
  margin: -100px auto 0;

  @media (max-width: 1630px) {
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }

  @media (max-width: 768px) {
    left: 50%;
    transform: translate3d(-50%, 0, 0) scale(0.9);
  }
}

/* هذا الستايل سيطبق على الـ label في SvgNode.vue بفضل :deep() */
.hero__diagram :deep(.label) {
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
}

.vite-chip {
  width: 134px;
  height: 134px;
  position: absolute;
  left: 750px;
  top: 260px;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.6s ease-out;
  transform: translate3d(0, 0, 0) scale(0.85);

  .vite-chip__filter {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translate3d(0, 0, 0) scale(1);
    transition: transform 0.3s ease-in-out;
    background:
      linear-gradient(
        130deg,
        rgba(30, 30, 40, 0.5) 0%,
        rgba(30, 30, 40, 0) 40%
      ),
      linear-gradient(
        130deg,
        rgba(20, 15, 30, 0) 60%,
        rgba(30, 30, 40, 0.5) 100%
      ),
      linear-gradient(to bottom, rgba(5, 5, 10, 0.5) 60%, rgba(5, 5, 5, 0));

    border-radius: 10px;
    display: none;

    @media (min-width: 768px) {
      display: block;
    }

    &:after {
      content: '';
      position: absolute;
      top: -10px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 5;
      background: linear-gradient(
        130deg,
        rgba(0, 0, 0, 0) 45%,
        rgba(255, 200, 0, 0.6) 50%,
        rgba(0, 0, 0, 0) 60%
      );
      background-size: 500%;
      background-position-x: 100%;
      filter: blur(15px);
      border-radius: 100px;
      mix-blend-mode: screen;
      display: none;
    }

    &:before {
      content: '';
      position: absolute;
      top: -10px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 5;
      background: linear-gradient(
        -130deg,
        rgba(20, 15, 30, 0) 40%,
        rgba(0, 255, 255, 0.5) 50%,
        rgba(20, 15, 30, 0) 60%
      );
      background-size: 400%;
      background-position-x: 100%;
      filter: blur(18px);
      border-radius: 100px;
      mix-blend-mode: screen;
      display: none;
    }

    @media (min-width: 768px) {
      &:before,
      &:after {
        display: block;
      }
    }
  }

  .vite-chip__edge {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 3px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(
      to bottom right,
      rgba(0, 0, 0, 0) 60%,
      rgba(255, 255, 255, 0.3) 65%,
      rgba(0, 0, 0, 0) 90%
    );
    opacity: 0;
    will-change: opacity, border;
    transition: all 0.8s ease-in-out;

    @media (min-width: 768px) {
      border-image-source: linear-gradient(
        to bottom right,
        rgba(0, 0, 0, 0) 50%,
        rgba(255, 255, 255, 0.3) 60%,
        rgba(0, 0, 0, 0) 90%
      );
    }
  }

  .vite-chip__border {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    border-radius: 10px;
    border: 0 solid rgba(120, 100, 150, 0.6);
    opacity: 1;
    background: rgba(20, 20, 25, 0.5);

    @media (min-width: 768px) {
      top: 2px;
      right: 2px;
      left: 2px;
      bottom: 2px;
    }
  }

  .vite-chip__logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.7);
    width: 65px;
    opacity: 0.4;
    filter: grayscale(60%);
    transition: all 0.3s ease;
    z-index: 3;
  }

  .uwu.vite-chip__logo {
    width: 134px;
  }

  &.active {
    box-shadow: 0 40px 50px -15px rgba(0, 0, 0, 0.8);
    transform: translate3d(0, 0, 0) scale(1.1);

    .vite-chip__edge {
      opacity: 1;

      &.edge--animated {
        @media (min-width: 768px) {
          animation: rotateGradient 4s linear infinite;
        }
      }
    }

    .vite-chip__filter {
      transform: translate3d(0, 0, 0) scale(0.95);

      &:before {
        animation: shimmer 4s infinite linear;
      }

      &:after {
        animation: shimmer 3s infinite linear;
      }
    }

    .vite-chip__border {
      border-width: 8px;
      transition: all 0.6s ease;
    }

    .vite-chip__logo {
      opacity: 1;
      filter: grayscale(0);
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
}

@keyframes shimmer {
  to {
    background-position-x: 0;
  }
}

.hero__background {
  position: absolute;
  top: -30%;
  left: 0;
  right: 0;
  bottom: -60%;
  width: 100%;
  z-index: -1;
  opacity: 0.6;
  transition: opacity 0.8s ease;

  @media (min-width: 768px) {
    opacity: 0.3;
  }

  background:
    radial-gradient(
      circle at right center,
      rgb(40, 100, 120) 0%,
      rgba(30, 90, 110, 1) 30%,
      rgb(100, 50, 150) 55%,
      rgba(70, 40, 120, 0.7) 100%
    );
  mask-image: radial-gradient(
    ellipse 300% 30% at center center,
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(0, 0, 0, 0) 100%
  );

  @media (min-width: 1024px) {
    background:
      radial-gradient(
        circle at right center,
        rgba(50, 110, 130, 0.7) 0%,
        rgb(40, 100, 120) 25%,
        rgba(30, 90, 110, 1) 40%,
        rgb(90, 40, 140) 65%,
        rgba(70, 40, 120, 0.7) 100%
      );
    mask-image: radial-gradient(
      ellipse 150% 30% at center center,
      rgba(0, 0, 0, 1) 20%,
      rgba(0, 0, 0, 0.7) 50%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  @media (min-width: 1500px) {
    background:
      radial-gradient(
        circle at right center,
        rgba(50, 110, 130, 0.7) 0%,
        rgb(40, 100, 120) 25%,
        rgba(30, 90, 110, 1) 45%,
        rgb(90, 40, 140) 65%,
        rgba(70, 40, 120, 0.7) 100%
      );
    mask-image: radial-gradient(
      ellipse 80% 40% at center center,
      rgba(0, 0, 0, 1) 20%,
      rgba(0, 0, 0, 0.7) 50%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  @media (min-width: 1800px) {
    background:
      radial-gradient(
        circle at right center,
        rgba(50, 110, 130, 0.7) 0%,
        rgb(40, 100, 120) 25%,
        rgba(30, 90, 110, 1) 50%,
        rgb(90, 40, 140) 70%,
        rgba(70, 40, 120, 0.7) 100%
      );
    mask-image: radial-gradient(
      ellipse 80% 40% at center center,
      rgba(0, 0, 0, 1) 20%,
      rgba(0, 0, 0, 0.7) 50%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  &.active {
    opacity: 0.7;

    @media (min-width: 768px) {
      opacity: 0.9;
    }
  }
}

@keyframes rotateGradient {
  0% {
    border-image-source: linear-gradient(
      to bottom right,
      rgba(0, 0, 0, 0) 60%,
      rgba(255, 255, 255, 0.3) 65%,
      rgba(0, 0, 0, 0) 90%
    );
  }
  25% {
    border-image-source: linear-gradient(
      to right top,
      rgba(0, 0, 0, 0) 60%,
      rgba(255, 255, 255, 0.3) 65%,
      rgba(0, 0, 0, 0) 90%
    );
  }
  50% {
    border-image-source: linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) 60%,
      rgba(255, 255, 255, 0.3) 65%,
      rgba(0, 0, 0, 0) 90%
    );
  }
  75% {
    border-image-source: linear-gradient(
      to left bottom,
      rgba(0, 0, 0, 0) 60%,
      rgba(255, 255, 255, 0.3) 65%,
      rgba(0, 0, 0, 0) 90%
    );
  }
  100% {
    border-image-source: linear-gradient(
      to bottom right,
      rgba(0, 0, 0, 0) 60%,
      rgba(255, 255, 255, 0.3) 65%,
      rgba(0, 0, 0, 0) 90%
    );
  }
}
</style>