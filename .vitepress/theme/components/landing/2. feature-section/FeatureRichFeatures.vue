<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useSlideIn } from '../../../composables/useSlideIn';

/**
 * Slide the card in when the page loads
 */
useSlideIn('#rich-features-card');

// --- بيانات الشرائح التعريفية (3 عناصر فقط) ---
const infoSlides = ref([
  {
    title: 'تأسيس الشركة',
    description: 'تأسست الهندسية الواعدة في عام 2010 برؤية لتقديم حلول مصاعد مبتكرة وآمنة',
    icon: '🏢'
  },
  {
    title: 'رؤيتنا وقيمنا',
    description: 'نسعى لنكون الرواد في مجال المصاعد الكهربائية، ملتزمين بالجودة، الابتكار',
    icon: '✨'
  },
  {
    title: 'فريق العمل',
    description: 'لدينا فريق من المهندسين والفنيين ذوي الخبرة العالية ملتزمون بتقديم أفضل الخدمات',
    icon: '👨‍🔬'
  }
]);

const visibleSlidesCount = ref(0);
let slideshowTimeout: NodeJS.Timeout | undefined = undefined;
let initialAnimationTriggered = false;

const SLIDE_APPEAR_DELAY_SECONDS = 0.7; // ممكن نقللها لـ 0.6 لو محتاج سرعة أكتر

const startSlideshow = () => {
  if (slideshowTimeout) clearTimeout(slideshowTimeout);
  visibleSlidesCount.value = 0;

  infoSlides.value.forEach((_, index) => {
    slideshowTimeout = setTimeout(() => {
      visibleSlidesCount.value = index + 1;
    }, index * SLIDE_APPEAR_DELAY_SECONDS * 1000);
  });

  slideshowTimeout = setTimeout(() => {
    // للحفاظ على الشرائح ظاهرة بعد العرض الأول
  }, infoSlides.value.length * SLIDE_APPEAR_DELAY_SECONDS * 1000 + 1000);
};

const stopSlideshow = () => {
  if (slideshowTimeout) clearTimeout(slideshowTimeout);
  slideshowTimeout = undefined;
  visibleSlidesCount.value = 0;
};

let observer: IntersectionObserver | null = null;

const setupIntersectionObserver = () => {
  const cardElement = document.querySelector('#rich-features-card');
  if (cardElement) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !initialAnimationTriggered) {
            initialAnimationTriggered = true;
            startSlideshow();
            observer?.unobserve(cardElement);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );
    observer.observe(cardElement);
  }
};

onMounted(() => {
  setupIntersectionObserver();
});

onUnmounted(() => {
  const cardElement = document.querySelector('#rich-features-card');
  if (observer && cardElement) {
    observer.unobserve(cardElement);
  }
  stopSlideshow();
});
</script>

<template>
  <div
    class="feature-card"
    id="rich-features-card"
    :class="{ active: visibleSlidesCount > 0 }"
  >
    <div class="feature__visualization">
      <div class="info-slides-container">
        <transition-group name="arrow-slide" tag="div" class="arrow-slides-wrapper">
          <template v-for="(slide, index) in infoSlides" :key="index">
            <div
              v-if="index < visibleSlidesCount"
              :class="['info-slide', { 'slide-right': index % 2 === 0, 'slide-left': index % 2 !== 0 }]"
            >
              <div class="slide-content">
                <div class="slide-icon">{{ slide.icon }}</div>
                <div class="slide-title">{{ slide.title }}</div>
                <div class="slide-description">{{ slide.description }}</div>
              </div>
            </div>
          </template>
        </transition-group>
      </div>

      <div class="center-glow" />
    </div>
  </div>
</template>

<style scoped>
.feature-card {
  position: relative;
  width: 100%;
  margin: 0 auto;

  /* **تعديل 1: إلغاء الـ transform على الموبايل، وتطبيقه فقط على الشاشات الأكبر** */
  transform: none; /* إزالة الـ transform الافتراضي */

  @media (min-width: 768px) {
    transform: translate3d(-60px, 0, 0); /* إبقاء الـ transform الأصلي للشاشات الكبيرة */
  }

  &.active {
    .center-glow {
      opacity: 1;
    }
  }
}

.feature__visualization {
  display: flex;
  justify-content: center;
  align-content: flex-start;
  /* **تعديل 2: تقليل الارتفاع الافتراضي (للموبايل أولاً)** */
  min-height: 300px; /* قلل الارتفاع للموبايل */
  position: relative;

  @media (min-width: 768px) {
    min-height: 380px; /* ارجع للارتفاع الأصلي للشاشات الكبيرة */
  }
}

.center-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  /* **تعديل 3: تصغير حجم الـ glow الافتراضي (للموبايل أولاً)** */
  width: 300px; /* قلل العرض للموبايل */
  height: 150px; /* قلل الارتفاع للموبايل */
  background: #ffffff;
  filter: blur(60px); /* قلل الـ blur قليلاً للموبايل */
  z-index: 5;
  transform: translate3d(-50%, -50%, 0);
  opacity: 0;
  transition: opacity 0.8s ease;
  will-change: opacity;
  mix-blend-mode: overlay;

  @media (min-width: 768px) {
    width: 450px; /* ارجع للعرض الأصلي للشاشات الكبيرة */
    height: 220px; /* ارجع للارتفاع الأصلي للشاشات الكبيرة */
    filter: blur(80px); /* ارجع للـ blur الأصلي للشاشات الكبيرة */
  }
}

.info-slides-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  /* **تعديل 4: تقليل العرض الأقصى لحاوية الشرائح الافتراضي (للموبايل أولاً)** */
  max-width: 320px; /* قلل أقصى عرض للموبايل */
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  z-index: 6;
  /* **تعديل 5: تقليل البادينج الافتراضي (للموبايل أولاً)** */
  padding: 15px 0; /* قلل البادينج العلوي والسفلي للحاوية للموبايل */

  @media (min-width: 768px) {
    max-width: 580px; /* ارجع للعرض الأقصى الأصلي للشاشات الكبيرة */
    padding: 25px 0; /* ارجع للبادينج الأصلي للشاشات الكبيرة */
  }
}

.arrow-slides-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-slide {
  position: relative;
  /* **تعديل 6: تقليل عرض كل شريحة لكي تتناسب (للموبايل أولاً)** */
  width: 95%; /* اجعلها أوسع قليلاً للموبايل */
  /* **تعديل 7: تقليل أقصى عرض للشريحة الواحدة (للموبايل أولاً)** */
  max-width: 300px; /* أقصى عرض للشريحة للموبايل */
  /* **تعديل 8: تقليل الـ padding لتقليل الحجم الداخلي (للموبايل أولاً)** */
  padding: 8px 15px; /* قلل البادينج للموبايل */
  /* **تعديل 9: تقليل المسافة بين الشرائح (للموبايل أولاً)** */
  margin-bottom: 15px; /* قلل المسافة بين الشرائح للموبايل */
  background: linear-gradient(145deg, #1c1c1c, #2c2c2c);
  border-radius: 10px; /* قلل الـ border-radius قليلاً */
  border: 1px solid rgba(80, 80, 80, 0.7);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); /* قلل الـ shadow قليلاً */
  text-align: center;
  color: #e0e0e0;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* **تعديل 10: تبسيط الـ clip-path للموبايل إذا لزم الأمر، أو تصغير القيم** */
  /* هذه القيم جيدة بشكل عام، لكن يمكن تصغيرها إذا أردت إزالة الزوايا الحادة على الموبايل */
  clip-path: polygon(
    0% 0%,
    95% 0%,
    100% 50%,
    95% 100%,
    0% 100%,
    5% 50%
  );

  /* **تعديل 11: إلغاء محاذاة "التعرج" على الموبايل** */
  &.slide-right,
  &.slide-left {
    align-self: center; /* اجعلها في المنتصف دائمًا */
    margin-left: 0;
    margin-right: 0;
  }

  @media (min-width: 768px) {
    width: 85%; /* ارجع للعرض الأصلي للشاشات الكبيرة */
    max-width: 450px; /* ارجع لأقصى عرض أصلي للشاشات الكبيرة */
    padding: 10px 20px; /* ارجع للبادينج الأصلي للشاشات الكبيرة */
    margin-bottom: 20px; /* ارجع للمسافة الأصلية للشاشات الكبيرة */
    border-radius: 12px; /* ارجع للـ border-radius الأصلي */
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.7); /* ارجع للـ shadow الأصلي */

    /* أعد تفعيل محاذاة التعرج للشاشات الكبيرة */
    &.slide-right {
      align-self: flex-end;
      margin-right: 8%;
    }

    &.slide-left {
      align-self: flex-start;
      margin-left: 8%;
    }
  }
}

.slide-icon {
  /* **تعديل 12: تقليل حجم الأيقونة (للموبايل أولاً)** */
  font-size: 1.8rem; /* قلل حجم الأيقونة للموبايل */
  margin-bottom: 6px; /* قلل الـ margin للموبايل */
  opacity: 0.9;
  color: #00bcd4;
  text-shadow: 0 0 8px rgba(0, 188, 212, 0.5);

  @media (min-width: 768px) {
    font-size: 2rem; /* ارجع للحجم الأصلي للشاشات الكبيرة */
    margin-bottom: 8px; /* ارجع للـ margin الأصلي للشاشات الكبيرة */
  }
}

.slide-title {
  /* **تعديل 13: تقليل حجم العنوان (للموبايل أولاً)** */
  font-size: 1.3rem; /* قلل حجم العنوان للموبايل */
  font-weight: bold;
  margin-bottom: 4px; /* قلل الـ margin للموبايل */
  color: #007bff;
  text-shadow: 0 0 6px rgba(0, 123, 255, 0.5);

  @media (min-width: 768px) {
    font-size: 1.5rem; /* ارجع للحجم الأصلي للشاشات الكبيرة */
    margin-bottom: 6px; /* ارجع للـ margin الأصلي للشاشات الكبيرة */
  }
}

.slide-description {
  /* **تعديل 14: تقليل حجم الوصف (للموبايل أولاً)** */
  font-size: 0.85rem; /* قلل حجم الوصف للموبايل */
  line-height: 1.4; /* قلل الـ line-height قليلاً للموبايل */
  color: #c0c0c0;

  @media (min-width: 768px) {
    font-size: 0.95rem; /* ارجع للحجم الأصلي للشاشات الكبيرة */
    line-height: 1.5; /* ارجع للـ line-height الأصلي للشاشات الكبيرة */
  }
}

.arrow-slide-enter-active,
.arrow-slide-leave-active {
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.arrow-slide-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.9);
}

.arrow-slide-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.arrow-slide-move {
  transition: transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>