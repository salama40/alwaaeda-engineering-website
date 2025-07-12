<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSlideIn } from '../../../composables/useSlideIn'

// تسجيل الـ plugin بتاع ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Ref للحالة بتاعة الـ card عشان الـ CSS class
const isCardActive = ref(false)

// لتخزين الـ ScrollTrigger instance والـ animation timeline
let scrollTriggerInstance: ScrollTrigger | null = null
let animationTimeline: gsap.core.Timeline | null = null
let textMoveTimeline: gsap.core.Timeline | null = null // جديد: لـ timeline حركة النص

/**
 * Slide the card in when the page loads
 */
// **تم تحديث الـ ID هنا ليتناسب مع الـ ID الجديد**
useSlideIn('#features-section') 

// دالة لإنشاء وتشغيل الأنيميشن
const createAndPlayAnimation = () => {
  if (animationTimeline && animationTimeline.isActive()) {
    // لو الـ main animation timeline شغال، منعملش حاجة
    return
  }
  if (animationTimeline) {
    animationTimeline.restart() // لو موجود، اعمل restart
    isCardActive.value = true
    // لو النص المتحرك موجود، شغله
    if (textMoveTimeline) {
        textMoveTimeline.restart();
    }
    return
  }

  animationTimeline = gsap.timeline({
    paused: true, // مهم: عشان ScrollTrigger هو اللي يشغله
    onComplete: () => {
      // ممكن نضيف أي logic هنا بعد ما الأنيميشن يخلص
    },
  })

  // Pink and Blue Chip Cube animations
  animationTimeline.to(
    '.blue-chip__cube, .pink-chip__cube',
    {
      transform: 'translate3d(0px, 0, 0)',
      duration: 0.5,
      ease: 'power2.out',
    },
    0,
  ) // Start at the beginning

  // Filter animations for cubes
  animationTimeline.to(
    '.blue-chip__cube',
    {
      filter:
        'grayscale(0) brightness(1) drop-shadow(0 0 0.5rem color-mix(in srgb, #40cffd 100%, transparent))',
      duration: 0.05,
      ease: 'none', // No ease for filter, just direct change
    },
    0.45,
  ) // After 0.45s (matching CSS transition-delay)

  animationTimeline.to(
    '.pink-chip__cube',
    {
      filter:
        'grayscale(0) brightness(1) drop-shadow(0 0 0.5rem color-mix(in srgb, #bc33fc 100%, transparent))',
      duration: 0.05,
      ease: 'none',
    },
    0.45,
  )

  // Connection clip-path animations (with delay)
  animationTimeline.to(
    '.blue-chip__connection, .pink-chip__connection',
    {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      duration: 0.6,
      ease: 'ease-in-out',
    },
    0.3,
  ) // Starts after 0.3s

  // **أنيميشن ظهور واستقرار النص (الهندسية الواعدة)**
  animationTimeline.to(
    '.vite-chip__logo', // استهداف الـ group التي تحتوي على النص
    {
      filter:
        'grayscale(0) brightness(1) drop-shadow(0px 20px 4px rgba(0, 0, 0, 0.4))',
      transform: 'translate3d(0, 0, 0)', // النص يستقر في مكانه المحدد (x, y)
      opacity: 1, // النص يصبح مرئياً
      duration: 1, // زيادة المدة لإظهار الارتداد بشكل أوضح
      ease: 'bounce.out', // **استخدام ease للارتداد**
    },
    0.8,
  ) // يبدأ بعد 0.8 ثانية

  // **جديد: أنيميشن حركة النص يمين وشمال بشكل مستمر**
  // هذا الـ timeline سيبدأ بعد انتهاء أنيميشن الـ bounce.out (في 0.8 + 1 = 1.8 ثانية)
  // أو ممكن نخليه يبدأ بعد أنيميشن الظهور مباشرة.
  // عشان نضمن أنه هيبدأ بعد استقرار النص، ممكن نستخدم onComplete للأنيميشن اللي قبله،
  // أو نحدده بعده بمسافة زمنية كافية. هنخليه يبدأ في نفس توقيت انتهاء ظهور النص.
  animationTimeline.call(() => {
    // نوقف أي timeline قديم قبل ما نعمل واحد جديد
    if (textMoveTimeline) {
        textMoveTimeline.kill();
    }
    textMoveTimeline = gsap.timeline({
      repeat: -1, // تكرار لا نهائي
      yoyo: true,  // ذهابًا وإيابًا
      ease: 'power1.inOut', // حركة سلسة
      paused: true // نبدأه متوقف ونشغله لما النص يظهر
    });

    textMoveTimeline.to('.vite-chip__logo', {
      x: -10, // **تم التعديل هنا: التحرك لليسار 10 بكسل**
      duration: 2 // المدة 2 ثانية للحركة في اتجاه واحد
    });
    // تشغيل الـ timeline بعد إنشائه
    textMoveTimeline.play();
  }, undefined, 1.8); // يبدأ هذا الـ call بعد 1.8 ثانية (0.8 للبداية + 1 للـ duration بتاع الـ bounce)

  // Play the animation
  animationTimeline.play()
  isCardActive.value = true // Activate the CSS class
}

onMounted(() => {
  // **تم تحديث الـ ID هنا ليتناسب مع الـ ID الجديد**
  const element = document.querySelector('#features-section') 
  if (!element) {
    console.warn('Element #features-section not found for ScrollTrigger.')
    return
  }

  scrollTriggerInstance = ScrollTrigger.create({
    // **تم تحديث الـ ID هنا ليتناسب مع الـ ID الجديد**
    trigger: '#features-section', 
    start: 'top 80%', // هيشتغل لما التريجر يوصل لـ 80% من الشاشة من فوق
    once: true, // هيشتغل مرة واحدة بس
    onEnter: () => {
      createAndPlayAnimation() // شغل الأنيميشن لما العنصر يظهر
    },
    // Markers are useful for debugging, uncomment if needed
    // markers: true,
  })
})

onUnmounted(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
  }
  if (animationTimeline) {
    animationTimeline.kill()
  }
  // مهم: تدمير الـ timeline الخاص بحركة النص أيضاً
  if (textMoveTimeline) {
      textMoveTimeline.kill();
  }
})
</script>

<template>
  <div
    class="feature-card"
    id="features-section"
  >
    <div class="feature__visualization" :class="{ active: isCardActive }">
      <div class="diagram">
        
<svg
          width="686"
          height="218"
          viewBox="0 0 686 218"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <g class="pink-chip__base">
              <rect
                width="35.0955"
                height="35.0923"
                rx="5.87331"
                transform="matrix(-0.845602 0.533814 -0.895247 -0.44557 611.937 102.855)"
                fill="#1F1F1F"
              />
              <rect
                width="35.0955"
                height="35.0923"
                rx="5.87331"
                transform="matrix(-0.845602 0.533814 -0.895247 -0.44557 611.937 102.855)"
                stroke="#2C2C2C"
                stroke-opacity="0.4"
                stroke-width="4"
              />
            </g>
            <g class="pink-chip__cube">
              <path
                d="M573.798 105.165L573.684 96.2398L581.79 90.9291L590.029 96.0306L590.143 104.956L582.027 109.523L573.798 105.165Z"
                fill="#BD34FE"
              />
              <path
                d="M573.798 105.165L573.684 96.2398L581.79 90.9291L590.029 96.0306L590.143 104.956L582.027 109.523L573.798 105.165Z"
                fill="white"
                fill-opacity="0.5"
              />
            </g>
            <path
              class="pink-chip__connection"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M440.083 64.7972L456.9 53.3972C463.204 49.4177 473.724 48.8842 480.397 52.2055L565 94.5L562.717 95.9411L478.114 53.6466C472.776 50.9895 464.359 51.4164 459.316 54.6L442.5 66L440.083 64.7972Z"
              fill="#BD34FE"
              stroke-width="1.2"
              stroke="#BD34FE"
            />
            <path
              class="blue-chip__connection"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M270 130L230.567 154.669C224.263 158.648 213.743 159.182 207.07 155.86L122.717 113.941L125 112.5L209.353 154.419C214.691 157.076 223.108 156.65 228.151 153.466L267.583 128.797L270 130Z"
              fill="#41d1ff"
              stroke-width="1.2"
              stroke="#41d1ff"
            />
            <g class="blue-chip__base">
              <rect
                width="35.0955"
                height="35.0923"
                rx="5.87331"
                transform="matrix(0.845602 -0.533814 0.895247 0.44557 76.1337 105.512)"
                fill="#1F1F1F"
                shape-rendering="crispEdges"
              />
              <rect
                width="35.0955"
                height="35.0923"
                rx="5.87331"
                transform="matrix(0.845602 -0.533814 0.895247 0.44557 76.1337 105.512)"
                stroke="#2C2C2C"
                stroke-opacity="0.4"
                stroke-width="4.39073"
                shape-rendering="crispEdges"
              />
            </g>
            <g class="blue-chip__cube">
              <path
                d="M99.902 97.3307L99.7304 90.3097L106.066 86.0571L112.601 89.995L112.773 97.016L106.423 100.684L99.902 97.3307Z"
                fill="#41D1FF"
              />
              <path
                d="M99.902 97.3307L99.7304 90.3097L106.066 86.0571L112.601 89.995L112.773 97.016L106.423 100.684L99.902 97.3307Z"
                fill="white"
                fill-opacity="0.5"
              />
              <path
                d="M110.272 103.431L110.1 96.4099L116.435 92.1574L122.971 96.0953L123.143 103.116L116.793 106.784L110.272 103.431Z"
                fill="#41D1FF"
              />
              <path
                d="M110.272 103.431L110.1 96.4099L116.435 92.1574L122.971 96.0953L123.143 103.116L116.793 106.784L110.272 103.431Z"
                fill="white"
                fill-opacity="0.5"
              />
              <path
                d="M89.6627 103.976L89.491 96.9545L95.8263 92.7019L102.362 96.6398L102.533 103.661L96.1839 107.328L89.6627 103.976Z"
                fill="#41D1FF"
              />
              <path
                d="M89.6627 103.976L89.491 96.9545L95.8263 92.7019L102.362 96.6398L102.533 103.661L96.1839 107.328L89.6627 103.976Z"
                fill="white"
                fill-opacity="0.5"
              />
              <path
                d="M99.4817 109.323L99.31 102.302L105.645 98.0495L112.181 101.987L112.352 109.008L106.003 112.676L99.4817 109.323Z"
                fill="#41D1FF"
              />
              <path
                d="M99.4817 109.323L99.31 102.302L105.645 98.0495L112.181 101.987L112.352 109.008L106.003 112.676L99.4817 109.323Z"
                fill="white"
                fill-opacity="0.5"
              />
            </g>

            
<g class="vite-chip" filter="url(#filter-chip-shadow)">
              <g
                class="vite-chip__highlight"
                filter="url(#filter-vite-chip-highlight)"
              >
                <rect
                  width="153.998"
                  height="153.998"
                  rx="12.1578"
                  transform="matrix(0.895247 0.44557 -0.845602 0.533814 330.524 11.7643)"
                  fill="black"
                  fill-opacity="0.3"
                />
                <rect
                  width="153.998"
                  height="153.998"
                  rx="12.1578"
                  transform="matrix(0.895247 0.44557 -0.845602 0.533814 330.524 11.7643)"
                  fill="url(#gradient-vite-chip-highlight)"
                  fill-opacity="0.1"
                />
                <rect
                  x="-0.0335319"
                  y="-0.661506"
                  width="155.349"
                  height="155.349"
                  rx="12.8332"
                  transform="matrix(0.895247 0.44557 -0.845602 0.533814 329.961 11.4709)"
                  stroke="#111111"
                  stroke-opacity="0.2"
                  stroke-width="1.35086"
                />
              </g>
              <g class="vite-chip__base" opacity="0.6">
                <rect
                  x="-0.0335319"
                  y="-0.661506"
                  width="152.647"
                  height="152.647"
                  rx="11.4823"
                  transform="matrix(0.895247 0.44557 -0.845602 0.533814 330.028 12.7942)"
                  fill="#1E1E1E"
                  fill-opacity="0.4"
                />
                <rect
                  x="-0.0335319"
                  y="-0.661506"
                  width="152.647"
                  height="152.647"
                  rx="11.4823"
                  transform="matrix(0.895247 0.44557 -0.845602 0.533814 330.028 12.7942)"
                  stroke="url(#gradient-vite-chip-right-specular)"
                  stroke-width="1.2"
                />
                <rect
                  x="-0.0335319"
                  y="-0.661506"
                  width="152.647"
                  height="152.647"
                  rx="11.4823"
                  transform="matrix(0.895247 0.44557 -0.845602 0.533814 330.028 12.7942)"
                  stroke="url(#gradient-vite-chip-left-specular)"
                  stroke-opacity="0.1"
                  stroke-width="1.2"
                />
              </g>
              
<g class="vite-chip__logo">
                <text x="345" y="85" fill="white" font-size="32" font-weight="bold" text-anchor="middle" dominant-baseline="middle">
                  الهندسية الواعدة
                </text>
              </g>
            </g>
          </g>
          <defs>
            <filter
              id="filter-chip-shadow"
              x="158.878"
              y="-7.1193"
              width="350.919"
              height="231.696"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="21.6138" />
              <feGaussianBlur stdDeviation="19.5875" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_0_5"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_0_5"
                result="shape"
              />
            </filter>
            <filter
              id="filter-vite-chip-highlight"
              x="177.815"
              y="-12.739"
              width="313.063"
              height="199.83"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="13.5086" />
              <feComposite
                in2="SourceAlpha"
                operator="in"
                result="effect1_backgroundBlur_0_5"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_backgroundBlur_0_5"
                result="shape"
              />
            </filter>
            <linearGradient
              id="gradient-vite-chip-highlight"
              x1="6.7543"
              y1="16.8858"
              x2="131.709"
              y2="135.086"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-opacity="0" />
              <stop offset="0.4" stop-color="white" />
              <stop offset="1" stop-opacity="0" />
            </linearGradient>
            <radialGradient
              id="gradient-vite-chip-right-specular"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(108.744 63.4905) rotate(110.653) scale(93.8362)"
            >
              <stop offset="0" stop-color="white" />
              <stop offset="1" stop-opacity="0" />
            </radialGradient>
            <radialGradient
              id="gradient-vite-chip-left-specular"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(7.42974 141.165) rotate(-21.5713) scale(93.6927)"
            >
              <stop offset="0" stop-color="white" />
              <stop offset="1" stop-opacity="0" />
            </radialGradient>
            
            
            
</defs>
        </svg>

        <div class="blue-glow" />

        <div class="pink-glow" />
      </div>
    </div>
    <div class="feature__meta">
      <div class="meta__title">      </div>
      <div class="meta__description">
        </div>
    </div>
  </div>
</template>

<style scoped lang="css">
/* لإبقاء الـ transform الخاص بالـ card نفسه في مكانه */
@media (min-width: 768px) {
  .feature-card {
    transform: translate3d(-60px, 0, 0);
  }
}

.feature-card .feature__meta {
  max-width: 680px;
}

@media (max-width: 330px) {
  .feature-card {
    height: 400px; /* ممكن نعدلها لو لسه محتاجين */
  }
}

/* **التعديل الرئيسي هنا: جعل الـ feature__visualization كـ flex container لتوسيط الـ diagram** */
.feature__visualization {
  position: relative; /* لابد أن يكون العنصر الأب للـ absolute له position */
  display: flex; /* تحويله إلى فليكس بوكس */
  justify-content: center; /* توسيط أفقي */
  align-items: center; /* توسيط رأسي */
  /* **تعديل: تقليل الـ min-height لرفع التصميم قليلاً** */
  min-height: 400px; /* كانت 500px، رجعناها لـ 400px */
  /* يمكنك ضبط هذه القيمة حسب حجم السكشن الذي تريد ان يظهر فيه التصميم */
  overflow: hidden; /* لإخفاء أي عناصر تخرج عن الحواف */
}

/* **تعديلات على الـ .diagram** */
.feature__visualization .diagram {
  width: fit-content; /* الحفاظ على عرض الـ SVG نفسه */
  position: absolute; /* مهم جداً عشان يتوسط داخل الـ flex container */
  /* **تعديل: تقليل قيمة الـ top لرفع التصميم لأعلى** */
  top: 45%; /* كانت 50%، قللناها لـ 45% */
  left: 50%; /* توسيط أفقي */
  /* **تعديل: تعديل الـ translateY ليتناسب مع الـ top الجديد** */
  transform: translate(-50%, -50%) scale(1); /* توسيط حقيقي و scale افتراضي */
  transform-origin: center center; /* نقطة الأصل للـ transform في المنتصف */
  margin-top: 0; /* إلغاء أي margin-top كان بيعمل إزاحة */
}

/* **إلغاء أو تعديل الميديا كويريز الخاصة بالـ .diagram scaling/positioning** */
/* بما أننا قمنا بتوسيعه وتوسيعه في المنتصف باستخدام الـ flexbox و الـ absolute positioning،
   لن نحتاج إلى هذه الميديا كويريز لتغيير الـ transform الأساسي.
   سنستخدمها فقط لتعديل الـ scale إذا لزم الأمر لأحجام شاشات معينة. */

@media (min-width: 480px) {
  .feature__visualization .diagram {
    transform: translate(-50%, -50%) scale(0.7); /* تصغير قليلاً للشاشات الأصغر من 630px */
  }
}

@media (min-width: 630px) {
  .feature__visualization .diagram {
    transform: translate(-50%, -50%) scale(0.85); /* حجم مناسب للشاشات المتوسطة */
  }
}

@media (min-width: 768px) {
  .feature__visualization .diagram {
    transform: translate(-50%, -50%) scale(0.9); /* حجم مناسب للشاشات الكبيرة */
  }
}

@media (min-width: 1000px) {
  .feature__visualization .diagram {
    transform: translate(-50%, -50%) scale(1); /* الحجم الأصلي للشاشات الأكبر */
  }
}

@media (min-width: 1200px) {
  .feature__visualization .diagram {
    transform: translate(-50%, -50%) scale(1.1); /* تكبير إضافي للشاشات الكبيرة جداً */
  }
}

.feature__visualization .blue-chip__cube,
.feature__visualization .pink-chip__cube {
  will-change: filter, transform;
}

/* **تم تعديل هذا الجزء ليكون أكثر مرونة** */
/* بما أن الأنيميشن سيتحكم في الـ transform، يمكننا إزالة الـ translate3d الثابت هنا
   أو جعله هو الـ initial state للـ animation */
/* .feature__visualization .blue-chip__cube,
.feature__visualization .pink-chip__cube {
  transform: translate3d(0, -60px, 0); 
} */

.feature__visualization .blue-chip__cube {
  filter: grayscale(1) brightness(0.15)
    drop-shadow(0 0 0rem color-mix(in srgb, #40cffd 0%, transparent));
}

.feature__visualization .pink-chip__cube {
  filter: grayscale(1) brightness(0.15)
    drop-shadow(0 0 0rem color-mix(in srgb, #bc33fc 0%, transparent));
}

/* **تعديل: تصميم النص الجديد داخل .vite-chip__logo** */
.feature__visualization .vite-chip__logo {
  will-change: filter, transform, opacity; /* إضافة opacity للـ will-change */
  /* الحالة الأولية للأنيميشن: يبدأ النص أعلى المربع ومخفي */
  transform: translate3d(0, -100px, 0); /* ابدأ النص أعلى بـ 100 بكسل */
  opacity: 0; /* ابدأ النص مخفياً */
  filter: grayscale(1) brightness(0.4)
    drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1)); /* نفس فلتر البداية للوجو القديم */
}

/* تصميم النص نفسه (داخل الـ SVG text element) */
.feature__visualization .vite-chip__logo text {
  font-family: 'Arial', sans-serif; /* العودة للخط الافتراضي */
  font-size: 32px; /* حجم الخط مكبر قليلاً */
  font-weight: bold;
  white-space: nowrap; /* يمنع الكلمة من النزول لسطر جديد */
  /* الألوان والفلتر سيتم التحكم بها من خلال الـ .vite-chip__logo group */
  
  /* **إضافة ظل ناعم ومتناسب للاسم** */
  text-shadow:
    -1px -1px 0px rgba(0, 0, 0, 0.3), /* ظل خفيف لأعلى اليسار */
    1px 1px 2px rgba(0, 0, 0, 0.6), /* ظل أساسي للعمق */
    0 0 15px rgba(255, 255, 255, 0.2); /* توهج أبيض خفيف */
}

.feature__visualization .blue-chip__connection {
  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  will-change: clip-path;
  filter: drop-shadow(
    0 0 0.2rem color-mix(in srgb, #40cffd 50%, transparent)
  );
}

.feature__visualization .pink-chip__connection {
  clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
  will-change: clip-path;
  filter: drop-shadow(
    0 0 0.2rem color-mix(in srgb, #bc33fc 50%, transparent)
  );
}

.feature__visualization .blue-glow {
  position: absolute;
  top: 45%; /* تعديل لرفع الجلو الأزرق مع التصميم */
  left: 20%; 
  transform: translateY(-50%); 
  width: 100px;
  height: 100px;
  background: #41d1ff;
  filter: blur(80px);
  z-index: -1;
  opacity: 0;
  will-change: opacity;
}

.feature__visualization .pink-glow {
  position: absolute;
  top: 45%; /* تعديل لرفع الجلو الوردي مع التصميم */
  right: 20%; 
  transform: translateY(-50%); 
  width: 100px;
  height: 100px;
  background: #bd34fe;
  filter: blur(80px);
  z-index: -1;
  opacity: 0;
  will-change: opacity;
}

.feature__visualization.active .blue-glow {
  opacity: 0.8;
}
.feature__visualization.active:hover .blue-glow {
  opacity: 1;
}

.feature__visualization.active .pink-glow {
  opacity: 0.8;
}
.feature__visualization.active:hover .pink-glow {
  opacity: 1;
}
</style>