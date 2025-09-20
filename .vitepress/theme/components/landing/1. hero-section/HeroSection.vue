<script setup lang="ts">
import HeroDiagram from './HeroDiagram.vue'
import { ref } from 'vue'

const heroTitle = 'الهندسية الواعدة'
const heroSubtitle = 'للمصاعد الكهربائية'

// تم تغيير القيمة لـ true مباشرة عشان الأزرار تظهر على طول
const isSubtitleTypingFinished = ref(true) 

// تم حذف الدالة onTypingEnd لأنها لم تعد تستخدم
</script>

<template>
  <div class="hero">
    <video autoplay loop muted playsinline class="hero-video-background">
      <source src="./imges1/video 1.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="hero-video-overlay"></div>

    <div class="container">
      <a
        class="hero__pill"
        target="_blank"
      >
        <img src="/viteconf.svg" alt="Viteconf logo" width="20" height="20" />
        <span> 2025</span>
      </a>

      <h1>
        <span class="primary-title">{{ heroTitle }}</span><br />
        <span class="secondary-title">
          {{ heroSubtitle }}
        </span>
      </h1>
      <h3 class="tagline-animate">
        👋مرحبًا بك في عالم المصاعد . . . من هنا يبدأ التميز 👋
      </h3>

      <div class="hero__actions" :class="{ 'visible': isSubtitleTypingFinished }">
        <a href="#final-cta-section" class="btn btn--primary">Get Started</a>
        <a
          href="https://wa.me/+0201063509009"
          target="_blank"
          class="btn btn--outline"
        >
          <svg width="30" height="30" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="23" fill="#fff"/>
            <path fill="#25D366" d="M24 6C14.06 6 6 14.06 6 24c0 3.66.96 7.242 2.79 10.375L6 42l7.813-2.047C17.18 41.36 20.52 42 24 42c9.94 0 18-8.06 18-18s-8.06-18-18-18z"/>
            <path fill="#25D366" d="M13 34c1.3.8 3.2 1.5 4.2 1.7-.3 1-.7 2.4-1 3.1L12 41l1-7z"/>
            <path fill="#fff" d="M31.5 29.675c-.395-.198-2.34-1.155-2.7-1.29-.36-.132-.624-.198-.888.198s-1.017 1.29-1.247 1.557c-.228.264-.456.3-.84.099-.395-.198-1.665-.612-3.174-1.95-1.172-1.042-1.965-2.325-2.196-2.715-.228-.396-.024-.61.171-.81.175-.177.395-.456.593-.684.198-.228.264-.396.396-.66.132-.264.066-.495-.033-.693-.099-.198-.888-2.137-1.215-2.916-.318-.768-.642-.663-.888-.675l-.756-.014c-.264 0-.693.099-1.056.495s-1.386 1.353-1.386 3.306.141 3.837 1.617 5.475c1.476 1.638 4.05 3.87 6.984 4.875 1.386.396 2.07.63 2.772.81 1.164.297 2.133.258 2.937.156.897-.133 2.34-1.053 2.67-2.07.33-1.017.33-1.89.231-2.07-.099-.183-.36-.288-.756-.504z"/>
          </svg>
          WhatsApp
        </a>
      </div>
    </div>

    <HeroDiagram />
  </div>
</template>

<style scoped>
/* --- Hero Section Styles --- */
.hero {
  position: relative;
  z-index: 2;
  margin-bottom: 0;
  background-color: #101010;
  overflow: hidden;
  min-height: 100vh;
}
@media (min-width: 768px) {
  .hero {
    margin-bottom: 60px;
  }
}

/* --- Video Background Styles --- */
.hero-video-background {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1;
  transform: translate(-50%, -50%);
  object-fit: cover;
 
}
.hero-video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(23, 181, 230, 0);
  z-index: 0;
}

/* --- Container Styles --- */
.container {
  display: flex;
  flex-direction: column;
  max-width: 902px;
  margin: 60px auto 0;
  align-items: center;
  position: relative;
  z-index: 2;
}
@media (min-width: 768px) {
  .container {
    margin: 95px auto 0;
  }
}

/* --- Pill Styles --- */
.hero__pill {
  color: #000000;
  font-family: Inter, sans-serif;
  font-size: 50px;
  font-style: normal;
  font-weight: 1000;
  line-height: normal;
  letter-spacing: 0.3px;
  display: inline-flex;
  padding: 6px 16px;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  border: 1px solid rgba(189, 52, 254, 0.5);
  background: radial-gradient(
    1686.42% 113.39% at 83.25% 2.56%,
    rgba(189, 52, 254, 0.1) 0%,
    rgba(189, 52, 254, 0) 100%
  );
  box-shadow: none;
  margin-bottom: 40px;
}
@media (min-width: 768px) {
  .hero__pill {
    margin-bottom: 25px;
  }
}
.hero__pill span {
  color: #ffffff;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;
}
.hero__pill:hover {
  animation: hero-pill-glow 1600ms ease-out infinite alternate;
}
@keyframes hero-pill-glow {
  0% {
    border-color: rgba(189, 52, 254, 0.5);
    box-shadow:
      0 0 5px rgba(189, 52, 254, 0.01),
      inset 0 0 5px rgba(189, 52, 254, 0.1);
  }
  100% {
    border-color: rgba(189, 52, 254, 0.6);
    box-shadow:
      0 0 20px rgba(189, 52, 254, 0.2),
      inset 0 0 10px rgba(189, 52, 254, 0.2);
  }
}

/* --- Action Buttons Styles --- */
.hero__actions {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.8s ease;
}
.hero__actions.visible {
  visibility: visible;
  opacity: 1;
}
@media (min-width: 768px) {
  .hero__actions {
    margin-top: 0;
  }
}

/* --- Typewriter Animation Styles for H1 --- */
.hero h1 {
  font-size: 3.8rem;
  font-weight: 800;
  text-align: center;
  line-height: 1.2;
  color: #ffffff;
  margin-bottom: 20px;
  text-shadow: 0px 4px 15px rgba(0, 0, 0, 0.6);
  display: block;
}
.primary-title {
  display: inline-block;
  white-space: nowrap;
}
.secondary-title {
  display: inline-block;
  white-space: nowrap;
  color: #ffffff;
  opacity: 1; 
  animation: none;
  width: auto;
  overflow: visible;
}
/* --- End Typewriter Animation Styles for H1 --- */

/* --- Tagline Animation Styles for H3 --- */
.hero h3 {
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  line-height: 1.5;
  color-scheme: inherit;
  max-width: 700px;
  margin: 0 auto 40px;
  animation: slide-left-right 8s ease-in-out infinite alternate;
}
@keyframes slide-left-right {
  0% { transform: translateX(-20px); }
  100% { transform: translateX(20px); }
}
/* --- End Tagline Animation Styles for H3 --- */

/* --- Button Styles --- */
.btn {
  display: inline-flex;
  padding: 12px 28px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}
.btn--primary {
  background: linear-gradient(90deg, #007bff, #0056b3);
  color: #ffffff;
  border: 1px solid #0056b3;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}
.btn--primary:hover {
  background: linear-gradient(90deg, #0056b3, #007bff);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.5);
  transform: translateY(-2px);
}
.btn--outline {
  background-color: transparent;
  color: #9cdbff;
  border: 1px solid #007bff;
  box-shadow: inset 0 0 10px rgba(0, 123, 255, 0.1);
}
.btn--outline:hover {
  background-color: rgba(0, 123, 255, 0.1);
  color: #ffffff;
  border-color: #0099ff;
  transform: translateY(-2px);
}
</style>