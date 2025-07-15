<script setup lang="ts">
import HeroDiagram from './HeroDiagram.vue'
</script>

<template>
  <div class="hero">
    <video autoplay loop muted playsinline class="hero-video-background">
      <source src="./imges1/video19.mp4" type="video/mp4">
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
        <span class="typewriter-text primary-title">الهندسية الواعدة</span><br />
        <span class="typewriter-text secondary-title">للمصاعد الكهربائية </span>
      </h1>
      <h3 class="tagline-animate">
          👋مرحبًا بك في عالم المصاعد . . . من هنا يبدأ التميز 👋

      </h3>

      <div class="hero__actions">
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


.hero {
  position: relative;
  z-index: 2; /* تأكد أن محتوى السكشن فوق الفيديو والـ overlay */
  margin-bottom: 0;
  background-color: #101010; 
  overflow: hidden; /* لإخفاء أي جزء زائد من الفيديو */
  min-height: 100vh; /* تأكد أن الـ hero نفسه يغطي كامل الارتفاع */


  @media (min-width: 768px) {
    margin-bottom: 60px;
  }
}

/* الأنماط الجديدة للفيديو كخلفية */
.hero-video-background {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%; /* تم تعديل هذا ليغطي العنصر الأب بالكامل */
  width: auto;
  height: auto;
  z-index: -1; /* ضع الفيديو خلف المحتوى */
  transform: translate(-50%, -50%);
  object-fit: cover; /* لضمان تغطية الفيديو للمساحة مع الحفاظ على الأبعاد */
  /* تم تعديل قيمة brightness لجعل الفيديو أغمق بشكل صحيح */
  filter: brightness(0.4) blur(3px); /* جعل الفيديو أغمق ومضبب لزيادة وضوح النص */
}

.hero-video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* طبقة سوداء شفافة فوق الفيديو */
  z-index: 0; /* بين الفيديو والمحتوى */
}


.container {
  display: flex;
  flex-direction: column;
  max-width: 902px;
  margin: 60px auto 0;
  align-items: center;
  position: relative;
  z-index: 2; /* تأكد أن الـ container فوق الفيديو والـ overlay */

  @media (min-width: 768px) {
    margin: 95px auto 0;
  }
}

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

  @media (min-width: 768px) {
    margin-bottom: 25px;
  }

  span {
    color: #ffffff;
    font-family: Inter, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.28px;
  }

  &:hover {
    animation: hero-pill-glow 1600ms ease-out infinite alternate;
  }
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

.hero__actions {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;

  @media (min-width: 768px) {
    margin-top: 0;
  }
}

/* --- Typewriter Animation Styles for H1 --- */
.hero h1 {
  font-size: 3.8rem;
  font-weight: 800;
  text-align: center;
  line-height: 1.2;
  color: #ffffff; /* أبيض ناصع */
  margin-bottom: 20px;
  text-shadow: 0px 4px 15px rgba(0, 0, 0, 0.6);
  display: block;
}

.typewriter-text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  width: 0;
  /* مؤشر الكتابة الوامض - سنضيفه فقط للسطر الأخير من الـ H1 */
  border-right: 0.15em snow rgba(255, 255, 255, 0); /* يبدأ شفافًا */
}

.primary-title {
  /* "الهندسية الواعدة" - 18 حرف */
  animation: typing 2.5s steps(18, end) forwards;
  animation-delay: 0s; /* يبدأ فورًا */
}

.secondary-title {
  /* "للمصاعد الكهربائية والهيدروليك" - 30 حرف */
  animation: typing 3.5s steps(30, end) forwards,
            blink-caret 0.75s step-end infinite; /* المؤشر فقط على هذا السطر */
  animation-delay: 2.5s, calc(2.5s + 3.5s); /* يبدأ بعد انتهاء الأول، والمؤشر بعد انتهاء الكتابة تمامًا */
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: rgb(255, 255, 255); } /* لون المؤشر أبيض */
}
/* --- End Typewriter Animation Styles for H1 --- */

/* --- Tagline Animation Styles for H3 --- */
.hero h3 {
  font-size: 2rem; /* حجم خط أكبر قليلاً */
  font-weight: 800;
  text-align: center;
  line-height:1.5;
  color-scheme:inherit;
  max-width: 700px;
  margin: 0 auto 40px;

  /* Animation for left-right movement */
  animation: slide-left-right 8s ease-in-out infinite alternate; /* 8 ثوانٍ، ذهابًا وإيابًا */
}

@keyframes slide-left-right {
  0% {
    transform: translateX(-20px); /* يبدأ 20 بكسل لليسار */
  }
  100% {
    transform: translateX(20px); /* ينتقل 20 بكسل لليمين */
  }
}
/* --- End Tagline Animation Styles for H3 --- */

/* الأزرار و styles أخرى كما هي */
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

  &:hover {
    background: linear-gradient(90deg, #0056b3, #007bff);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.5);
    transform: translateY(-2px);
  }
}

.btn--outline {
  background-color: transparent;
  color: #9cdbff; /* هذا اللون للنص، وليس للأيقونة الآن */
  border: 1px solid #007bff;
  box-shadow: inset 0 0 10px rgba(0, 123, 255, 0.1);

  /* **يمكن إزالة هذا الجزء بالكامل الآن أو تركه فارغًا، لأن لون الأيقونة يتم تحديده في الـ SVG نفسها.** */
  /*
  svg {
    filter: brightness(0) invert(1);
  }
  */

  &:hover {
    background-color: rgba(0, 123, 255, 0.1);
    color: #ffffff;
    border-color: #0099ff;
    transform: translateY(-2px);
  }
}
</style>