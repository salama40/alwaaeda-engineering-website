<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ... (بقية تعريفات الواجهة والبيانات كما هي لم تتغير) ...
interface StatItem {
  icon: string;
  targetValue: number;
  description: string;
  suffix?: string;
  iconColor?: string;
}

const stats: StatItem[] = [
  { icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z', targetValue: 3350, description: 'مشروع مكتمل', suffix: '+' , iconColor: '#84F3B3' },
  { icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-9h2v2H7zm6 0h2v2h-2zm-1 4c-2.21 0-4-1.79-4-4h2c0 1.1.9 2 2 2s2-.9 2-2h2c0 2.21-1.79 4-4 4z', targetValue: 5000, description: 'ساعات صيانة مقدمة ', suffix: '+', iconColor: '#FFD700' },
  { icon: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z', targetValue: 98, description: 'معدل رضا العملاء', suffix: '%', iconColor: '#00BFFF' },
  { icon: 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z', targetValue: 15, description: 'سنوات خبرة', suffix: '+', iconColor: '#FF69B4' },
  { icon: 'M19 9h-4V3H9v6H5l7 7 7-7zM7 11h10v8H7zm2 2h6v2H9v-2zm0 4h6v2H9v-2z', targetValue: 1200, description: 'عملاء خارج مصر ', suffix: '+', iconColor: '#9370DB' },
  { icon: 'M18 9h-2V7h2c1.1 0 2-.9 2-2s-.9-2-2-2H8c-1.1 0-2 .9-2 2s.9 2 2 2h2v2H4c-1.1 0-2 .9-2 2v2h2v2h-2v2h2v2h12v-2h2v-2h-2v-2h2v-2h-2v-2zm-6 10c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z', targetValue: 45, description: 'جائزة وتقدير', suffix: '+', iconColor: '#F0E68C' },
];

const statRefs = ref<HTMLElement[]>([]);

onMounted(() => {
  statRefs.value.forEach((el, index) => {
    const targetValue = stats[index].targetValue;
    const suffix = stats[index].suffix || '';
    const startValue = { value: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to(startValue, {
          value: targetValue,
          duration: 2.5, // ****** هذا هو التعديل المطلوب: زيادة المدة من 2 إلى 2.5 ثانية ******
          ease: "power2.out",
          onUpdate: () => {
            if (el) {
              const displayValue = Math.round(startValue.value);
              const numberElement = el.querySelector('.stat-value');
              if (numberElement) {
                numberElement.textContent = displayValue.toLocaleString('en-US') + suffix;
              }
            }
          },
          once: true
        });
      },
    });
  });

  // ... (بقية أنيميشن الأشكال الخلفية كما هي لم تتغير) ...
  gsap.to(".bg-sparkle-1", {
    x: 100, y: -80, rotation: 360, scale: 1.2, duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut"
  });
  gsap.to(".bg-sparkle-2", {
    x: -120, y: 90, rotation: -360, scale: 0.8, duration: 18, repeat: -1, yoyo: true, ease: "power2.inOut"
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.killTweensOf(".bg-sparkle-1");
  gsap.killTweensOf(".bg-sparkle-2");
});
</script>

<template>
  <section class="stats-section">
    <div class="background-sparks">
      <div class="bg-sparkle bg-sparkle-1"></div>
      <div class="bg-sparkle bg-sparkle-2"></div>
    </div>

    <div class="content-wrapper">
      <h2 class="stats-title">أرقام تتحدث عن إنجازاتنا</h2>
      <p class="stats-description">
        نفخر بتقديم نتائج ملموسة تعكس التزامنا بالتميز والنجاح
      </p>

      <div class="stats-grid">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="stat-item"
          :ref="(el) => { if (el) statRefs[index] = el as HTMLElement; }"
          :data-icon-color="stat.iconColor"
        >
          <div class="stat-icon-wrapper">
            <svg class="stat-icon" viewBox="0 0 24 24" fill="currentColor">
              <path :d="stat.icon"></path>
            </svg>
          </div>
          <div class="stat-value">{{ 0 }}{{ stat.suffix }}</div>
          <div class="stat-description">{{ stat.description }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');

.stats-section {
  position: relative;
  margin-top: 100px;
  padding: 80px 20px;
  background-color: #0b0b0b;
  overflow: hidden;
  border-top: 1px solid rgba(38, 38, 38, 0.7);
  border-bottom: 1px solid rgba(38, 38, 38, 0.7);
}

.background-sparks {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.bg-sparkle {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.12;
}

.bg-sparkle-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #a020f0 0%, transparent 70%);
  top: 15%;
  left: 10%;
}

.bg-sparkle-2 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, #84F3B3 0%, transparent 70%);
  bottom: 20%;
  right: 15%;
}

.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.stats-title {
  background: linear-gradient(90deg, #ffffff 0%, #a020f0 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 auto 15px;
  font-family: 'Tajawal', sans-serif;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.3), 0 0 15px rgba(160, 32, 240, 0.4);
  font-size: 3em;
}

.stats-description {
  color: #a3a3a3;
  font-family: 'Tajawal', sans-serif;
  font-size: 1.15em;
  margin-bottom: 50px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 0 20px;
  grid-auto-rows: minmax(auto, max-content);
}

.stat-item {
  background-color: #161616;
  border: 1px solid rgba(38, 38, 38, 0.7);
  border-radius: 12px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 8px 25px rgba(160, 32, 240, 0.2), 0 0 10px rgba(132, 243, 179, 0.1);
}

.stat-icon-wrapper {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  border-radius: 50%;
  background: linear-gradient(45deg, #a020f0, #84F3B3);
  box-shadow: 0 0 15px rgba(160, 32, 240, 0.5), 0 0 15px rgba(132, 243, 179, 0.5);
}

/* الألوان المخصصة للأيقونات بناءً على data-icon-color */
.stat-item[data-icon-color="#84F3B3"] .stat-icon-wrapper { background-color: #84F3B3; box-shadow: 0 0 15px rgba(132, 243, 179, 0.5), 0 0 15px rgba(132, 243, 179, 0.3); }
.stat-item[data-icon-color="#FFD700"] .stat-icon-wrapper { background-color: #FFD700; box-shadow: 0 0 15px rgba(255, 215, 0, 0.5), 0 0 15px rgba(255, 215, 0, 0.3); }
.stat-item[data-icon-color="#00BFFF"] .stat-icon-wrapper { background-color: #00BFFF; box-shadow: 0 0 15px rgba(0, 191, 255, 0.5), 0 0 15px rgba(0, 191, 255, 0.3); }
.stat-item[data-icon-color="#FF69B4"] .stat-icon-wrapper { background-color: #FF69B4; box-shadow: 0 0 15px rgba(255, 105, 180, 0.5), 0 0 15px rgba(255, 105, 180, 0.3); }
.stat-item[data-icon-color="#9370DB"] .stat-icon-wrapper { background-color: #9370DB; box-shadow: 0 0 15px rgba(147, 112, 219, 0.5), 0 0 15px rgba(147, 112, 219, 0.3); }
.stat-item[data-icon-color="#F0E68C"] .stat-icon-wrapper { background-color: #F0E68C; box-shadow: 0 0 15px rgba(240, 230, 140, 0.5), 0 0 15px rgba(240, 230, 140, 0.3); }


.stat-icon {
  width: 30px;
  height: 30px;
  color: #161616;
}

.stat-value {
  font-family: 'Tajawal', sans-serif;
  font-size: 3.5em;
  font-weight: 700;
  background: linear-gradient(90deg, #fff 0%, #E0FFFF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 5px;
  line-height: 1.1;
}

.stat-description {
  font-family: 'Tajawal', sans-serif;
  font-size: 1.1em;
  color: #a3a3a3;
  font-weight: 500;
}

/* Media Queries */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .stats-title {
    font-size: 2.5em;
  }
}

@media (max-width: 768px) {
  .stats-section {
    padding: 60px 15px;
  }
  .stats-title {
    font-size: 2em;
  }
  .stats-description {
    font-size: 1em;
    margin-bottom: 30px;
  }
  .stats-grid {
    grid-template-columns: 1fr;
  }
  .stat-item {
    padding: 25px 15px;
  }
  .stat-value {
    font-size: 3em;
  }
  .stat-icon-wrapper {
    width: 50px;
    height: 50px;
  }
  .stat-icon {
    width: 25px;
    height: 25px;
  }
  .bg-sparkle-1 {
    width: 200px;
    height: 200px;
    top: 5%;
    left: -10%;
  }

  .bg-sparkle-2 {
    width: 250px;
    height: 250px;
    bottom: 10%;
    right: -10%;
  }
}
</style>