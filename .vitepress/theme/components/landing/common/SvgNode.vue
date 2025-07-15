<script setup lang="ts">
import { computed, Ref, ref, watch, ComputedRef, onMounted } from 'vue' // استورد onMounted
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin' // تأكد من استيراد MotionPathPlugin هنا أيضًا

// بما أن MotionPathPlugin يستخدم getPointAtLength، تأكد من تسجيله
// ليس شرطًا أن تسجله هنا إذا كنت تسجله مرة واحدة في HeroDiagram.vue
// ولكن للتأكيد وضمان عمل SvgNode.vue بشكل مستقل، يفضل تسجيله.
// إذا كنت متأكدًا أن HeroDiagram.vue هو الوحيد الذي يسجل، يمكنك إزالة هذا السطر.
gsap.registerPlugin(MotionPathPlugin) // أضفت هذا السطر

/**
 * A single glowing "node" (dot) on an SVG path.
 */
export interface SvgNodeProps {
  /**
   * The SVG path to draw the node on.
   */
  path: string

  /**
   * The position of the node along the path, represented as a percentage from 0-1.
   */
  position?: number

  /**
   * Whether the node is visible or not.
   */
  visible?: boolean

  /**
   * Whether the node label is visible or not.
   */
  labelVisible?: boolean

  /**
   * The label to display next to the node.
   */
  label?: string

  /**
   * The color of the glow effect.
   */
  glowColor?: string | undefined

  /**
   * The color of the dot.
   */
  dotColor?: string | undefined
}

const props = withDefaults(defineProps<SvgNodeProps>(), {
  position: 0,
  visible: false,
  labelVisible: false,
  glowColor: '#41D1FF',
  dotColor: '#9fe6fd',
})

/**
 * A unique id for the path, to avoid collisions in a single SVG output.
 */
const pathId: Ref<string> = ref(Math.random().toString(36).substring(2)) // substring لجعل الـ ID أقصر وأكثر قابلية للقراءة

/**
 * A ref for the path element in the SVG DOM.
 */
const pathElement: Ref<SVGPathElement | null> = ref(null)

/**
 * The radius on each side of the dot, represented as a glow on the SVG path.
 */
const gradientWidth: Ref<number> = ref(30)

/**
 * A scale factor for animating the gradient width.
 */
const gradientWidthScaleFactor: Ref<number> = ref(props.visible ? 1 : 0)

/**
 * The length of the SVG path.
 */
const pathLength: ComputedRef<number> = computed(() => {
  // تأكد من وجود pathElement.value قبل محاولة getTotalLength()
  return pathElement.value ? pathElement.value.getTotalLength() : 0
})

/**
 * The position of the dot on the SVG path (x, y coordinates).
 * **هنا هو التغيير الرئيسي:** استخدم ComputedRef لضمان إعادة الحساب تلقائيًا.
 */
const dotCoordinates: ComputedRef<{ x: number; y: number }> = computed(() => {
  if (!pathElement.value) {
    // إذا لم يكن المسار موجودًا بعد، ارجع قيمة افتراضية لتجنب الأخطاء
    return { x: 0, y: 0 }
  }
  // MotionPathPlugin.getPoint() يمكن أن يكون مفيدًا هنا إذا كنت تستخدمه بانتظام
  // ولكن getTotalLength() و getPointAtLength() هي وظائف SVG الأصلية.
  const pos = (1 - props.position) * pathLength.value
  const point = pathElement.value.getPointAtLength(pos)
  return { x: point.x, y: point.y }
})


/**
 * The radius of the dot.
 */
const dotRadius: Ref<number> = ref(props.visible ? 3 : 0)

/**
 * Watch for changes to the visible prop and animate the glow and dot radius.
 */
watch(
  () => props.visible,
  (visible) => {
    gsap.to(gradientWidthScaleFactor, {
      duration: 0.5,
      ease: 'power2.inOut',
      value: visible ? 1 : 0,
    })
    gsap.to(dotRadius, {
      duration: 0.6,
      ease: 'power2.inOut',
      value: visible ? 3 : 0,
    })
  },
)

// هام: قم بتهيئة dotCoordinates بعد التأكد من أن pathElement.value متاح
// onMounted لضمان أن الـ ref قد تم تعيينه
onMounted(() => {
  // هنا، dotCoordinates ستعيد حساب نفسها تلقائيًا
  // عندما يتم تحميل pathElement.value لأول مرة.
  // لا حاجة لتعيينها يدوياً هنا، computed property سيتكفل بذلك.
});

</script>

<template>
  <g>
    <path
      ref="pathElement"
      :d="props.path"
      :stroke="`url(#glow_gradient_${pathId})`"
      stroke-width="1.2"
      :mask="`url(#glow_mask_${pathId})`"
      class="svg-path"
    />
    <circle
      v-if="props.dotColor && pathElement" :cx="dotCoordinates.x" :cy="dotCoordinates.y" :r="dotRadius"
      :fill="props.dotColor ? props.dotColor : 'transparent'"
      class="circle-dot"
      :style="`--dot-color: ${props.dotColor}`"
      key="circle-dot"
    />
    <text
      v-if="props.label && pathElement" :x="dotCoordinates.x" :y="dotCoordinates.y + 15" fill="#a3a3a3"
      font-family="Inter, sans-serif"
      font-size="11px"
      font-style="normal"
      font-weight="400"
      text-anchor="middle"
      alignment-baseline="hanging"
      class="label"
      :class="{ 'label--visible': props.labelVisible }"
    >
      {{ props.label }}
    </text>
    <defs v-if="pathElement"> <mask :id="`glow_mask_${pathId}`">
        <path :d="props.path" fill="black" />
        <circle
          :cx="dotCoordinates.x"
          :cy="dotCoordinates.y"
          :r="gradientWidth * gradientWidthScaleFactor"
          fill="white"
        />
      </mask>
      <radialGradient
        :id="`glow_gradient_${pathId}`"
        :cx="dotCoordinates.x"
        :cy="dotCoordinates.y"
        :r="gradientWidth * gradientWidthScaleFactor"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" :stop-color="props.glowColor" :stop-opacity="1" />
        <stop offset="100%" :stop-color="props.glowColor" stop-opacity="0" />
      </radialGradient>
    </defs>
  </g>
</template>

<style scoped>
.svg-path {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

.label {
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  /* **التعديلات هنا:** */
  /* أزلنا display: none; لكي تظهر الكلمات دائمًا إذا كانت labelVisible: true */
  /* display: none; */
  will-change: opacity;

  /* يمكننا ضبط حجم الخط هنا ليكون أصغر على الشاشات الأصغر */
  font-size: 11px; /* حجم الخط الأساسي */

  @media (max-width: 1179px) {
    /* طبق هذه الستايلات على الشاشات الأصغر من 1180px */
    font-size: 9px; /* تصغير حجم الخط للموبايل والأجهزة اللوحية الصغيرة */
    /* يمكنك تعديل الـ y position في التيمبليت أو هنا إذا لزم الأمر */
    /* text-shadow لإضافة وضوح */
    text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.6);
  }

  /* هذا الكود هو المسؤول عن جعل الكلمة مرئية، وهذا سيعمل الآن */
  &.label--visible {
    opacity: 1;
  }
}

.circle-dot {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  --dot-color: white;

  @media (min-width: 768px) {
    filter: drop-shadow(0 0 3px var(--dot-color));
  }
}
</style>