<script setup lang="ts">
import HeroDiagram from './HeroDiagram.vue'
</script>

<template>
  <div class="hero">
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
          م/ عاطف السيد
      </h3>

      <div class="hero__actions">
        <a href="#final-cta-section" class="btn btn--primary">Get Started</a> 

        <a
          href="https://wa.me/+0201063509009"
          target="_blank"
          class="btn btn--outline"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0002 0.00012207C5.3831 0.00012207 0.000244141 5.383 0.000244141 12.0001C0.000244141 14.1793 0.589886 16.208 1.6375 17.9547L0.000244141 24.0001L6.10398 22.404C7.72895 23.3642 9.77443 24.0001 12.0002 24.0001C18.6171 24.0001 24.0002 18.6173 24.0002 12.0001C24.0002 5.383 18.6171 0.00012207 12.0002 0.00012207ZM17.1593 16.1264C16.8974 16.7118 15.656 16.0964 15.1121 15.795C14.5682 15.4936 13.5658 15.1922 13.3101 15.089C13.0544 14.9858 12.8093 14.8826 12.5642 15.2897C12.3191 15.6968 11.5835 16.4828 11.3384 16.7842C11.0933 17.0856 10.8482 17.096 10.3927 16.8403C9.9372 16.5846 8.52841 16.096 6.94586 14.6534C5.72659 13.5518 4.90805 12.0732 4.67389 11.6661C4.43973 11.2589 4.63016 11.0664 4.8206 10.8739C5.01103 10.6814 5.24519 10.3701 5.43563 10.153C5.62606 9.93583 5.72128 9.77028 5.86159 9.48866C6.0019 9.20704 5.92297 9.07663 5.81134 8.84247C5.70972 8.60831 5.23461 7.49257 5.03314 7.08544C4.83168 6.6783 4.63016 6.78151 4.45903 6.78151C4.28791 6.78151 4.09747 6.78151 3.86331 6.78151C3.62915 6.78151 3.25732 6.87773 2.94604 7.28486C2.63475 7.69199 1.83984 8.44163 1.83984 9.9482C1.83984 11.4548 2.9715 12.9084 3.12185 13.1901C3.2722 13.4717 5.34827 16.6375 8.44682 17.925C11.419 19.1437 11.9629 18.9625 12.5068 18.9004C13.0507 18.8383 16.0336 17.9868 16.6908 17.5897C17.348 17.1926 17.8919 16.4828 18.063 16.1814C18.2341 15.88 18.2341 15.6243 18.063 15.3787C17.8919 15.1331 17.4262 14.9406 17.1593 15.089C16.8925 15.2374 16.7118 15.4616 16.6002 15.6641C16.4886 15.8666 16.4886 15.9408 16.4886 16.0029C16.4886 16.065 16.6806 16.1786 17.1593 16.1264Z" fill="#25D366"/> 
          </svg>
          WhatsApp
        </a>
      </div>
    </div>

    <HeroDiagram />
  </div>
</template>

<style scoped>
/* لا داعي لتعديل الـ CSS هنا للتحكم في لون أيقونة الواتساب، لأن اللون سيتم تحديده مباشرة في الـ SVG */
/* يمكنك إزالة التعليق الخاص بالـ svg داخل .btn--outline إذا أردت */

.hero {
  position: relative;
  z-index: 2;
  margin-bottom: 0;
  background-color: #101010;

  @media (min-width: 768px) {
    margin-bottom: 60px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  max-width: 902px;
  margin: 60px auto 0;
  align-items: center;
  position: relative;
  z-index: 2;

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