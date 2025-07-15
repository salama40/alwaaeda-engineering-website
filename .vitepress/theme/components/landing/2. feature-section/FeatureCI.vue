<script setup lang="ts">
import { Ref, ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ** هنا استيراد الصور بمساراتك المحددة **
// تأكد جداً أن مجلد 'images' في نفس مستوى ملف الـ Vue Component هذا.
import passengerLiftImage from './images/pho1.png'
import cargoLiftImage from './images/pho2.jpg'
import panoramicLiftImage from './images/pho3.jpeg'
import specialLiftImage from './images/pho4.jpeg'


// بيانات لأنواع المصاعد
interface ElevatorType {
  name: string;
  description: string;
  imageUrl: string; // الآن تحمل المسار المستورد
  link: string;
}

const elevatorTypes: ElevatorType[] = [
  {
    name: 'المصاعد المنزلية',
    description: 'توفير تجربة نقل مريحة وآمنة للأفراد في جميع أنواع المباني.',
    imageUrl: passengerLiftImage,
    link: '/products/passenger-lifts',
  },
  {
    name: 'مصاعد البانوراما',
    description: 'حلول قوية وفعالة لنقل الأحمال الثقيلة بكفاءة وأمان تام.',
    imageUrl: cargoLiftImage,
    link: '/products/cargo-lifts',
  },
  {
    name: 'مصاعد البضائع ',
    description: 'لمسة من الفخامة والعصرية مع إطلالات ساحرة للمباني المميزة.',
    imageUrl: panoramicLiftImage,
    link: '/products/panoramic-lifts',
  },
  {
    name: 'مصاعد مستشفيات',
    description: 'تصميم مخصص للمستشفيات، المنازل، والكراسي المتحركة بمرونة عالية.',
    imageUrl: specialLiftImage,
    link: '/products/special-lifts',
  },
];


// ** جزء الأنميشن GSAP/ScrollTrigger **
const glowPosition: Ref<number> = ref(0)
const glowVisible: Ref<boolean> = ref(false)
const CHECKMARK_COUNT = 6;
const checkmarks = Array.from({ length: CHECKMARK_COUNT }, (): Ref<boolean> => ref(false))

let mainTimeline: gsap.core.Timeline | null = null;

onMounted(() => {
  // الأنميشن الأصلي لـ ScrollTrigger (إن كنت لا تزال تستخدمه)
  ScrollTrigger.create({
    trigger: '#continuous-integration',
    start: 'top bottom',
    end: 'bottom top',
    onEnter: () => {
      if (!mainTimeline || !mainTimeline.isActive()) {
        mainTimeline = startScrollAnimation();
      }
      // تفعيل أنيميشن الكروت عند الدخول
      animateCardsOnScroll(); 
    },
    onLeaveBack: () => {
      if (!mainTimeline || !mainTimeline.isActive()) {
        mainTimeline = startScrollAnimation();
      }
      // إعادة ضبط حالة الكروت عند الخروج لأعلى
      resetCardsAnimation();
    },
    onLeave: () => {
      if (mainTimeline) {
        mainTimeline.pause(0);
        glowPosition.value = 0;
        glowVisible.value = false;
        checkmarks.forEach(c => c.value = false);
      }
      // إعادة ضبط حالة الكروت عند الخروج لأسفل
      resetCardsAnimation();
    },
    onEnterBack: () => {
      if (!mainTimeline || !mainTimeline.isActive()) {
        mainTimeline = startScrollAnimation();
      }
      // تفعيل أنيميشن الكروت عند الرجوع من الأسفل
      animateCardsOnScroll();
    }
  });

  // قم بضبط الحالة الأولية للكروت
  gsap.set('.elevator-card', { scale: 0.8, opacity: 0 });
});

onUnmounted(() => {
  if (mainTimeline) {
    mainTimeline.kill();
    mainTimeline = null;
  }
  ScrollTrigger.getAll().forEach(st => st.kill());
});

const startScrollAnimation = () => {
  glowPosition.value = 0
  glowVisible.value = false
  checkmarks.forEach((checkmark) => (checkmark.value = false))

  const timeline = gsap.timeline({
    repeat: -1,
    defaults: {
      duration: 0.1,
      ease: 'power2.out',
    },
  });

  timeline.to(
    glowPosition,
    {
      value: 1,
      duration: 1.0,
      ease: 'power2.in',
    },
    0,
  );

  timeline.call(
    () => {
      glowVisible.value = true
    },
    undefined,
    0.2,
  );
  timeline.call(
    () => {
      glowVisible.value = false
    },
    undefined,
    0.8,
  );

  checkmarks.forEach((checkmark, index) => {
    timeline.call(
      () => {
        checkmark.value = true
      },
      undefined,
      0.3 + index * 0.1,
    );
    timeline.call(
      () => {
        checkmark.value = false;
      },
      undefined,
      0.3 + index * 0.1 + 0.2,
    );
  });

  return timeline;
}

// ** وظائف الأنميشن الجديدة للكروت **
const animateCardsOnScroll = () => {
  gsap.to('.elevator-card', {
    scale: 1,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.15 // تأخير بسيط بين كل كارت
  });
};

const resetCardsAnimation = () => {
  gsap.to('.elevator-card', {
    scale: 0.8,
    opacity: 0,
    duration: 0.5,
    ease: 'power3.in',
    stagger: 0.05,
    overwrite: true // مهم لضمان إعادة الضبط بشكل صحيح
  });
};
</script>

<template>
  <div
    class="feature-card"
    id="continuous-integration"
  >
   
    <div class="elevator-cards-container">
      <a v-for="type in elevatorTypes" :key="type.name" :href="type.link" class="elevator-card">
        <div class="card-image-background" :style="{ backgroundImage: 'url(' + type.imageUrl + ')' }">
        </div>
        <div class="card-content-overlay-text">
            <h3 class="card-title">{{ type.name }}</h3>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.feature-card {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature__meta {
  max-width: 700px;
  text-align: center;
  margin: 0 auto 30px auto;
  padding: 0 15px;
}

.meta__title {
  font-size: 2em !important;
  font-weight: bold !important;
  margin-bottom: 8px;
}

.meta__description {
  font-size: 1.1em !important;
  font-weight: 500 !important;
  color: var(--vp-c-text-2);
  margin-top: 10px;
}

/* تنسيقات الكروت */
.elevator-cards-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* عمودين ثابتين */
  gap: 30px;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.elevator-card {
  background-color: var(--vp-c-bg-soft); /* لون خلفية الكارت نفسه */
  border-radius: 10px;
  padding: 0;
  text-align: center;
  box-shadow: var(--vp-shadow-2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 280px;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  position: relative;
}

.elevator-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: var(--vp-shadow-3);
}

/* حاوية الصورة كخلفية للكارت كله */
.card-image-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

/* طبقة التراكب النصية */
.card-content-overlay-text {
  position: relative;
  z-index: 2;
  padding: 25px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* تم تعديل هذا السطر */
  background-color: transparent; /* جعل الخلفية شفافة تمامًا */
  /* أو يمكنك إزالة السطر بالكامل لو لم تحتج أي خلفية */
  transition: background-color 0.3s ease;
}

/* تم تعديل هذا السطر لجعل الخلفية شفافة عند التحويم أيضًا */
.elevator-card:hover .card-content-overlay-text {
  background-color: transparent;
}


.card-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 0;
  color: rgb(255, 255, 255); /* النص سيكون أبيض ليبرز على الخلفية الداكنة */
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5); /* ظل خفيف للنص لزيادة الوضوح */
}

/* تم حذف تنسيقات .card-description بالكامل */

/* تعديل الـ media queries لـ 2 كروت في الصف */
@media (max-width: 960px) {
  .elevator-cards-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
    max-width: 700px;
  }
  .elevator-card {
    min-height: 260px;
  }
  .card-content-overlay-text {
    padding: 20px;
  }
  .card-title {
    font-size: 1.1em;
  }
}

@media (max-width: 640px) {
  .elevator-cards-container {
    grid-template-columns: 1fr; /* عمود واحد على هذه الشاشات */
    padding: 0 15px;
    gap: 20px;
  }
  .elevator-card {
    min-height: 240px;
  }
  .card-title {
    font-size: 1em;
  }
}

@media (max-width: 480px) {
  .feature__meta {
    padding: 0 10px;
  }
  .elevator-card {
    min-height: 220px;
  }
  .card-title {
    font-size: 0.9em;
  }
}
</style>