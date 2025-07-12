<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// استيراد ملف الفيديو
import elevatorVideo from "./images/video1.mp4";

// أنيميشن عند ظهور البطاقة على الشاشة (ScrollTrigger)
const startCardAnimation = () => {
  gsap.fromTo(".video-wrapper", 
    { opacity: 0, scale: 0.7 },
    { opacity: 1, scale: 1, duration: 1, ease: "power2.out", delay: 0.2 }
  );
  gsap.fromTo(".feature__meta",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.7 }
  );
};

onMounted(() => {
  ScrollTrigger.create({
    // تم تغيير الـ trigger ليطابق الـ ID الجديد
    trigger: '#company-section', 
    start: 'top 80%',
    onEnter: startCardAnimation,
    once: true,
    // markers: true, // لتفعيل مؤشرات تتبع ScrollTrigger (للتصحيح)
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
</script>

<template>
  <div id="company-section" class="feature-card video-design">
    <div class="feature__visualization">
      <div class="video-wrapper"> 
        <video 
          :src="elevatorVideo" 
          autoplay 
          loop 
          muted 
          playsinline 
          class="elevator-video"
        ></video>
        
        <div class="feature__meta">
          <div class="meta__title">تجربة صعود لا مثيل لها</div>
          <div class="meta__description">
            نضمن لك رحلة آمنة ومريحة في كل صعود، مع أعلى معايير الجودة والتصميم
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* استيراد الخطوط اللي هنستخدمها */
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600&display=swap');


/* Base styles for the feature card */
.feature-card.video-design {
  background: transparent;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 600px; 
  width: 100%;
}

.feature__visualization {
  position: relative;
  width: 100%; 
  height: 100%;
  display: flex;
  justify-content: center; 
  align-items: center; 
  flex-grow: 1;
}

/* ** الجديد: wrapper للتحكم في حجم الفيديو والنص معاً ** */
.video-wrapper {
  position: relative;
  width: 100%; 
  max-width: 950px; 
  height: 550px; 
  overflow: hidden;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  margin: 0 auto; 
  transform: translateX(5%); /* **تغيير رئيسي:** إزاحة العنصر 5% إلى اليمين */
}

.elevator-video {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  display: block;
}

/* ******* تصميم النصوص الوصفية التي ستظهر فوق الفيديو ******** */
.feature__meta {
  position: absolute; 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  text-align: center;
  color: #f0f0f0;
  z-index: 10; 
  padding: 30px; 
  width: 90%; 
  max-width: 600px; 
  background: rgba(0, 0, 0, 0.8); 
  border-radius: 15px; 
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.9), inset 0 0 20px rgba(255, 255, 255, 0.2); 
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); 
}

.meta__title {
  font-family: 'Tajawal', sans-serif; 
  font-size: 48px; 
  font-weight: 900; 
  margin-bottom: 25px; 
  background: linear-gradient(to right, #41D1FF, #BD34FE);
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(65, 209, 255, 0.9), 0 0 30px rgba(189, 52, 254, 0.7); 
  line-height: 1.2; 
}

.meta__description {
  font-family: 'Noto Sans Arabic', sans-serif; 
  font-size: 22px; 
  line-height: 1.8;
  opacity: 1; 
  color: #ffffff; 
}

/* ******* تعديلات لجعله متجاوباً (Responsive) ******** */
@media (max-width: 1024px) {
  .video-wrapper {
    width: 100%; 
    max-width: 850px; 
    height: 500px;
    transform: translateX(5%); /* **تغيير رئيسي:** إزاحة العنصر 5% إلى اليمين */
  }
  .meta__title {
    font-size: 40px;
  }
  .meta__description {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .feature-card.video-design {
    min-height: 400px;
  }
  .video-wrapper {
    width: 98%; 
    height: 350px; 
    transform: translateX(5%); /* **تغيير رئيسي:** إزاحة العنصر 5% إلى اليمين */
  }
  .feature__meta {
    padding: 20px;
    width: 95%;
    max-width: 450px;
  }
  .meta__title {
    font-size: 32px;
    margin-bottom: 15px;
  }
  .meta__description {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .feature-card.video-design {
    min-height: 350px;
  }
  .video-wrapper {
    width: 98%; 
    height: 280px; 
    transform: translateX(5%); /* **تغيير رئيسي:** إزاحة العنصر 5% إلى اليمين */
  }
  .feature__meta {
    padding: 15px;
    border-radius: 10px;
  }
  .meta__title {
    font-size: 26px;
    margin-bottom: 10px;
  }
  .meta__description {
    font-size: 15px;
    line-height: 1.6;
  }
}
</style>