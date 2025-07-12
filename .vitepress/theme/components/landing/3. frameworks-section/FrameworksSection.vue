<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import FrameworkCard, { Framework } from './FrameworkCard.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Framework assets - سيتم الاحتفاظ بأسماء الاستيراد الأصلية
import logoNuxt from './images/nuxt.jpg'
import logoVue from './images/vue.jpg'
import logoAnalog from './images/analog.jpg'
import logoPlaywright from './images/playwright.jpg'
import logoMarko from './images/marko.jpg'
import logoStorybook from './images/storybook.jpg'
import logoVitest from './images/vitest.jpg'
import logoRedwood from './images/redwood.jpg'
import logoSolid from './images/solid.jpg'
import logoReact from './images/react.jpg'
import logoRemix from './images/remix.jpg'
import logoEmber from './images/ember.jpg'
import logoPreact from './images/preact.jpg'
import logoHono from './images/hono.jpg'


/**
 * بيانات المشاريع.
 * تم الإبقاء على اسم المصفوفة frameworks
 */
const frameworks: Framework[] = [
  {
    title: 'مشروع أبراج النيل', // اسم المشروع/الشركة
    description: 'مبنى سكني وتجاري', // نوع المبنى/المكان
    logo: logoVitest, // الصورة الأصلية
    color: '#FFD700',
    url: '#',
    visible: ref(false),
  },
  {
    title: 'توسعات فندق الفردوس',
    description: 'فندق سياحي',
    logo: logoReact,
    color: '#32CD32',
    url: '#',
    visible: ref(false),
  },

  {
    title: 'مقر شركة النور',
    description: 'مبنى إداري',
    logo: logoVue,
    color: '#40B782',
    url: '#',
    visible: ref(false),
  },
  {
    title: 'مجمع سيتي مول',
    description: 'مركز تسوق',
    logo: logoSolid,
    color: '#75B2DF',
    url: '#',
    visible: ref(false),
  },

  {
    title: 'عيادات التخصصي',
    description: 'مجمع طبي',
    logo: logoPreact,
    color: '#673AB8',
    url: '#',
    visible: ref(false),
  },

  {
    title: 'جامعة المستقبل',
    description: 'مؤسسة تعليمية',
    logo: logoRemix,
    color: '#3991FD',
    url: '#',
    visible: ref(false),
  },
  {
    title: 'منتجع الرمال الذهبية',
    description: 'منتجع ساحلي',
    logo: logoNuxt,
    color: '#00DA81',
    url: '#',
    visible: ref(false),
  },

  {
    title: 'مدينة الألعاب المائية',
    description: 'مدينة ترفيهية',
    logo: logoRedwood,
    color: '#BE4622',
    url: '#',
    visible: ref(false),
  },
  {
    title: 'مركز مؤتمرات القاهرة',
    description: 'قاعة فعاليات',
    logo: logoAnalog,
    color: '#C10F2E',
    url: '#',
    visible: ref(false),
  },
  {
    title: 'مشروع فلل الزهور',
    description: 'مجمع فلل سكنية',
    logo: logoPlaywright,
    color: '#D45247',
    url: '#',
    visible: ref(false),
  },
  {
    title: 'المستشفى الدولي',
    description: 'مستشفى خاص',
    logo: logoMarko,
    color: '#DE2A87',
    url: '#',
    visible: ref(false),
  },
  {
    title: 'أبراج ميناء الإسكندرية',
    description: 'مبنى تجاري بحري',
    logo: logoStorybook,
    color: '#FD4684',
    url: '#',
    visible: ref(false),
  },


  {
    title: 'المكتبة الرقمية الكبرى',
    description: 'مبنى ثقافي',
    logo: logoEmber,
    color: '#E04E39',
    url: '#',
    visible: ref(false),
  },
  {
    title: 'مركز بيانات الأمن',
    description: 'منشأة حكومية',
    logo: logoHono,
    color: '#FF5C13',
    url: '#',
    visible: ref(false),
  },
]

const numDuplicates = 3;
const firstRowOriginal = computed(() => frameworks.slice(0, Math.ceil(frameworks.length / 2)));
const secondRowOriginal = computed(() => frameworks.slice(Math.ceil(frameworks.length / 2)));

const firstRowFrameworks = computed(() => Array(numDuplicates).fill(firstRowOriginal.value).flat());
const secondRowFrameworks = computed(() => Array(numDuplicates).fill(secondRowOriginal.value).flat());


let timeline: gsap.core.Timeline | null = null;

onMounted(() => {
  timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#frameworks-section',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });

  timeline.fromTo(".framework-row",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
  );
});

onUnmounted(() => {
  if (timeline) {
    timeline.kill()
    timeline = null
  }
});

</script>

<template>
  <section class="frameworks-section" id="frameworks-section">
    <div class="animated-line"></div>
    <h2>أبرز المشاريع الحديثة </h2>
    <div class="frameworks-container">
      <div class="framework-row right-to-left">
        <FrameworkCard
          v-for="(framework, index) in firstRowFrameworks"
          :key="'row1-' + index"
          :framework="framework"
        />
      </div>

      <div class="framework-row left-to-right">
        <FrameworkCard
          v-for="(framework, index) in secondRowFrameworks"
          :key="'row2-' + index"
          :framework="framework"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* **تعريف keyframes للأنيميشن اللانهائي** */
/* تم تعديل قيم translateX لتعويض البادنج عند بداية ونهاية الأنيميشن */
@keyframes scrollRightToLeft {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-50% - var(--horizontal-padding))); } /* يضيف البادنج هنا */
}

@keyframes scrollLeftToRight {
  from { transform: translateX(calc(-50% - var(--horizontal-padding))); } /* يضيف البادنج هنا */
  to { transform: translateX(0); }
}

/* أنيميشن الخط المتوهج */
@keyframes glowAndExpand {
  0% {
    width: 0%;
    opacity: 0;
    transform: translateX(-50%); /* يبدأ من المنتصف لليسار */
  }
  50% {
    width: 100%;
    opacity: 1;
    transform: translateX(0%); /* يمتد ليشمل العرض الكامل */
  }
  100% {
    width: 0%;
    opacity: 0;
    transform: translateX(50%); /* يختفي بالانكماش لليمين */
  }
}


.frameworks-section {
  margin-top: 500px;

  @media (min-width: 768px) {
    margin-top: 200px;
  }

  /* الزخرفة والأنيميشن الخاص بالعنوان H2 */
  h2 {
    /* تم تعديل هذا الجزء لإضافة التدرج اللوني */
    background: linear-gradient(90deg, #ffffff 30%, #a020f0 100%); /* تدرج من الأبيض إلى البنفسجي */
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; /* يجعل النص شفافاً ليظهر التدرج من الخلفية */

    width: 800px;
    max-width: 90%;
    margin: 20px auto 0;
    text-align: center;
    position: relative;
    z-index: 3;
    font-size: 2.5em;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2);
  }

  /* تنسيق الخط المتحرك */
  .animated-line {
    width: 100px; /* عرض مبدئي */
    height: 3px; /* سمك الخط */
    background: linear-gradient(90deg, transparent, #b26deb, transparent); /* تدرج لوني */
    margin: 0 auto; /* توسيط الخط */
    position: relative;
    top: -10px; /* ارفعه قليلاً فوق العنوان */
    opacity: 0; /* يبدأ مخفياً */
    animation: glowAndExpand 3s infinite ease-in-out; /* تطبيق الأنيميشن */
    transform-origin: center; /* مهم ليتوسع من المنتصف */
    border-radius: 5px; /* حواف دائرية للخط */
  }

  .frameworks-container {
    width: 100%;
    background-color: transparent;
    position: relative;
    margin-top: 100px;
    overflow: hidden;
    padding-top: 50px;
    padding-bottom: 50px;

    /* **تم تعديل هذا الجزء للتحكم في البادنج الأفقي** */
    --horizontal-padding: 80px; /* تعريف متغير للبادنج الأفقي */
    padding-inline: var(--horizontal-padding); /* تطبيق البادنج على اليمين واليسار */

    box-sizing: border-box;

    @media (min-width: 840px) {
      mask-image: linear-gradient(
        90deg,
        transparent 0%,
        white var(--horizontal-padding), /* يبدأ الظهور من هنا */
        white calc(100% - var(--horizontal-padding)), /* ينتهي الظهور هنا */
        transparent 100%
      );
      -webkit-mask-image: linear-gradient(
        90deg,
        transparent 0%,
        white var(--horizontal-padding), /* يبدأ الظهور من هنا */
        white calc(100% - var(--horizontal-padding)), /* ينتهي الظهور هنا */
        transparent 100%
      );
    }

    &:before {
      content: '';
      display: block;
      height: 80px;
      background: linear-gradient(
        0deg,
        rgba(23, 23, 23, 0) 0%,
        rgba(16, 16, 16, 0.7) 50%,
        #101010 100%
      );
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
      pointer-events: none;
    }

    &:after {
      content: '';
      display: block;
      height: 100px;
      background: linear-gradient(
        180deg,
        rgba(23, 23, 23, 0) 0%,
        rgba(16, 16, 16, 0.7) 50%,
        #101010 100%
      );
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;
      pointer-events: none;
    }
  }

  .framework-row {
    display: flex;
    flex-wrap: nowrap;
    gap: 24px;
    margin-bottom: 24px;
    position: relative;
    white-space: nowrap;
    width: max-content;

    animation-duration: 40s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-play-state: running;

    /* **بداية الحركة للتعويض عن البادنج** */
    transform: translateX(var(--horizontal-padding));
  }

  .framework-row.right-to-left {
    animation-name: scrollRightToLeft;
    /* تأكد من أن الـ animation-fill-mode ليست forwards أو backwards إذا كنت لا تريد أن يبقى في مكانه الأخير بعد انتهاء الأنيميشن */
  }

  .framework-row.left-to-right {
    animation-name: scrollLeftToRight;
    animation-duration: 45s;
    /* تأكد من أن الـ animation-fill-mode ليست forwards أو backwards إذا كنت لا تريد أن يبقى في مكانه الأخير بعد انتهاء الأنيميشن */
  }

  .framework-row > :deep(.framework-card) {
      flex-shrink: 0;
  }

  @media (max-width: 839px) {
    .frameworks-container {
        mask-image: none;
        -webkit-mask-image: none;
        padding-inline: 20px; /* يمكن تعديل هذا البادنج للشاشات الصغيرة */
    }
    h2 {
        font-size: 2em;
    }
     .framework-row {
        /* إزالة التحول الأولي على الشاشات الصغيرة إذا لم يكن مرغوباً فيه */
        transform: translateX(0);
    }
  }
}
</style>