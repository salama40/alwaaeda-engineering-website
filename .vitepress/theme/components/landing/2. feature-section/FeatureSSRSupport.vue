<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const isSectionActive = ref(false);

let scrollTriggerInstance: ScrollTrigger | null = null;

// useSlideIn('#ssr-support'); // تم التعليق عليه لو كان بيعمل تعارض مع أنيميشن البطاقات الجديد

// قائمة بألوان التوهج المختلفة
const glowColors = [
    '#00BFFF', // Blue
    '#32CD32', // Green
    '#FFD700', // Gold
    '#FF69B4', // Pink
    '#8A2BE2', // Purple
    '#FF4500', // Orange
];

// دالة لجلب لون التوهج بناءً على الـ ID (أو أي منطق آخر)
const getGlowColor = (id: number) => {
    return glowColors[(id - 1) % glowColors.length];
};

const animateCardsIn = () => {
    if (!isSectionActive.value) {
        isSectionActive.value = true;
        // أنيميشن البطاقات: تبدأ من منطقة مركزية، مصغرة، بدوران عشوائي، ثم تنتشر لمكانها
        gsap.fromTo('.service-card',
            {
                opacity: 0,
                scale: 0.7, // تبدأ بحجم أصغر
                rotation: (i) => gsap.utils.random(-15, 15), // دوران عشوائي لكل بطاقة
                y: 80, // تبدأ من أسفل قليلاً
                x: (i) => gsap.utils.random(-50, 50), // تبدأ من يمين/يسار عشوائي قليلاً
            },
            {
                opacity: 1,
                scale: 1, // تصل للحجم الطبيعي
                rotation: 0, // تعود لدوران 0
                y: 0, // تصل لمكانها الطبيعي في الـ Grid
                x: 0, // تصل لمكانها الطبيعي في الـ Grid
                duration: 1.2, // مدة أطول للأنيميشن
                stagger: 0.1, // تأخير تتابعي بين البطاقات
                ease: 'back.out(1.7)', // أنيميشن ارتدادي جذاب
                delay: 0.5 // تأخير بسيط قبل بدء أنيميشن البطاقات
            }
        );

        // أنيميشن التوهج الخلفي للبطاقات عند ظهورها (كما هو)
        gsap.fromTo('.service-card::before',
            { opacity: 0, scaleY: 0 },
            { opacity: 0.9, scaleY: 1, duration: 1.2, stagger: 0.1, delay: 0.7, ease: 'power2.out' } // تأخير متناسق مع البطاقات
        );

        // **تم إزالة أنيميشن ظهور الحدود ::after هنا، حيث تم حذفها بالكامل**
    }
};

onMounted(() => {
    const element = document.querySelector('#ssr-support');
    if (!element) {
        console.warn('Element #ssr-support not found for ScrollTrigger.');
        return;
    }

    scrollTriggerInstance = ScrollTrigger.create({
        trigger: '#ssr-support',
        start: 'top 70%',
        once: true,
        onEnter: () => {
            animateCardsIn();
        },
        // markers: true,
    });
});

onUnmounted(() => {
    if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
    }
});

const serviceCards = ref([
    { id: 1, title: 'تصميم احترافي', description: 'حلول تصميمية مبتكرة تتناسب مع كل المساحات' },
    { id: 2, title: 'تركيب دقيق', description: 'فريق متخصص يضمن تركيب المصاعد بدقة وأمان' },
    { id: 3, title: 'صيانة دورية', description: 'عقود صيانة شاملة لضمان أداء مثالي وتقليل الأعطال' },
    { id: 4, title: 'تحديث وتطوير', description: 'تحديث الأنظمة القديمة بأحدث التقنيات '},
    { id: 5, title: 'دعم فني 24/7', description: 'دعم فني متاح على مدار الساعة للتعامل مع أي طارئ'},
    { id: 6, title: 'قطع غيار أصلية', description: 'نضمن توفير قطع غيار أصلية وعالية الجودة ' },
]);

</script>

<template>
    <div
        class="feature-card"
        id="ssr-support"
        :class="{ 'section-active': isSectionActive }"
    >
        <div class="service-cards-container">
            <div
                class="service-card"
                v-for="card in serviceCards"
                :key="card.id"
                :style="{'--glow-color': getGlowColor(card.id)}"
            >
                <div class="card-content-wrapper">
                    <h3>{{ card.title }}</h3>
                    <p>{{ card.description }}</p>
                    <!-- تم نقل card-status-bottom هنا ليكون في نهاية card-content-wrapper -->
                    <div class="card-status-bottom">
                        <span class="status-dot"></span>
                        <span class="status-text">Active</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="css">
/*
  ملاحظة هامة: تم تحويل الـ CSS اللي فيه nesting لـ Vanilla CSS.
*/

.feature-card {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 20px;
    box-sizing: border-box;
    min-height: 320px;
    background-color: #1a1a1a;
    border-radius: 16px;
    border: 1px solid #333;
    overflow: hidden;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

@media (min-width: 768px) {
    .feature-card {
        transform: translate3d(-60px, 0, 0);
    }
}

@media (max-width: 380px) {
    .feature-card {
        height: auto;
        padding: 20px 10px;
        min-height: auto;
    }
}

.service-cards-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 1200px;
}

.service-card {
    position: relative; /* مهم للـ absolute positioning بتاع التوهج والـ status-bottom */
    background: linear-gradient(145deg, #2a2a2a, #1f1f1f);
    border-radius: 8px;
    padding: 0;
    text-align: center;
    color: #e0e0e0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* تأكد أن الـ transition ده للبطاقة كلها */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 220px; /* طول البطاقة */
    overflow: hidden;

    /* ---------------------------------------------------- */
    /* --- شكل البطاقة (Clip-Path) - تعديل ليكون أقرب للصورة --- */
    /* ---------------------------------------------------- */
    clip-path: polygon(
        0% 15px,      /* زاوية علوية يسار */
        15px 0%,      /* زاوية علوية يسار */
        calc(100% - 25px) 0%, /* زاوية علوية يمين */
        100% 25px,    /* زاوية علوية يمين */
        100% 100%,    /* أسفل يمين (مستقيم) */
        0% 100%       /* أسفل يسار (مستقيم) */
    );
    /* هذا الـ clip-path يحاكي شكل بطاقة صلاح بشكل أفضل، مع زوايا علوية مميزة وحواف سفلية مستقيمة. */
}

/* ---------------------------------------------------- */
/* --- الحدود الخارجية (::after) - تم حذفها بالكامل --- */
/* ---------------------------------------------------- */
/* تم إزالة .service-card::after بالكامل */


/* ---------------------------------------------------- */
/* --- تأثير التوهج (Glow) تحت البطاقة - أوضح --- */
/* ---------------------------------------------------- */
.service-card::before {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%) scaleY(0);
    transform-origin: bottom;
    width: 95%;
    height: 50px;
    background: radial-gradient(circle, var(--glow-color, #FFD700ee) 0%, transparent 70%); /* لون افتراضي ذهبي للتوهج */
    filter: blur(35px);
    opacity: 0;
    transition: opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease;
    z-index: -1;
}

/* ---------------------------------------------------- */
/* --- تأثير الـ Hover للبطاقة - تكبير البطاقة كلها + التوهج --- */
/* ---------------------------------------------------- */
.service-card:hover {
    transform: translateY(-10px) scale(1.05); /* حركة وتكبير أوضح عند الـ hover */
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.7);
    background: linear-gradient(145deg, #303030, #252525);
}

.service-card:hover::before {
    opacity: 1; /* التوهج يظهر بالكامل */
    filter: blur(50px);
    transform: translateX(-50%) scaleY(1) translateY(-8px);
}


/* ---------------------------------------------------- */
/* --- ستايلات محتوى البطاقة --- */
/* ---------------------------------------------------- */
.card-content-wrapper {
    width: 100%;
    padding: 15px;
    padding-top: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* لضمان دفع status للأسفل */
    flex-grow: 1; /* مهم عشان يأخذ المساحة المتاحة ويدفع الـ status للأسفل */
    position: relative; /* عشان الـ absolute positioning بتاع الـ status-bottom */
}

.service-card h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.3em;
    font-weight: 600;
    /* --- لون العناوين (H3) يرجع أصفر --- */
    color: #ffe358; /* لون أصفر ثابت */
    /* تم إزالة background-clip و text-fill-color */
    letter-spacing: -0.5px;
}

.service-card p {
    font-size: 0.9em;
    line-height: 1.5;
    color: #c0c0c0;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    flex-grow: 1; /* يدفع الـ status للأسفل */
    margin-bottom: 15px; /* مسافة قبل الـ status */
}

/* ---------------------------------------------------- */
/* --- تصميم "Active" في الأسفل خالص في المنتصف --- */
/* ---------------------------------------------------- */
.card-status-bottom {
    position: absolute; /* مهم جداً لتثبيتها في الأسفل */
    bottom: 15px; /* مسافة من أسفل البطاقة */
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 8px;
    color: #8bc34a; /* لون أخضر للحالة */
    font-size: 0.9em;
    font-weight: 600;
    padding: 5px 10px;
    background-color: rgba(60, 179, 113, 0.1);
    border-radius: 5px;
    border: 1px solid #4CAF50;
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.4);
    z-index: 2; /* لضمان ظهورها فوق التوهج */
}

.status-dot {
    width: 10px;
    height: 10px;
    background-color: #4CAF50;
    border-radius: 50%;
    box-shadow: 0 0 6px #4CAF50;
}


/* Media Queries للتجاوبية (Responsive Design) */

/* للأجهزة اللوحية (Tablet) - عمودين */
@media (max-width: 1024px) {
    .service-cards-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 18px;
    }
    .service-card {
        min-height: 200px;
    }
    .service-card h3 {
        font-size: 1.1em;
    }
    .service-card p {
        font-size: 0.8em;
    }
}

/* للهواتف الصغيرة (Mobile) - عمود واحد */
@media (max-width: 600px) {
    .service-cards-container {
        grid-template-columns: 1fr;
        gap: 12px;
    }
    .feature-card {
        padding: 25px 10px;
    }
    .service-card {
        padding: 0;
        min-height: auto;
    }
    .service-card h3 {
        font-size: 1em;
    }
    .service-card p {
        font-size: 0.75em;
    }
    .card-status-bottom {
        position: relative; /* إرجاعها لـ relative عشان تظهر في التدفق العادي للموبايل */
        bottom: auto;
        left: auto;
        transform: none;
        margin-top: 15px;
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
    }
}

/* --- GSAP Animation related styles (Initial states) --- */
.service-card {
    opacity: 0;
    transform: translateY(100px) scale(0.8);
}

.service-card::before {
    opacity: 0;
    transform: translateX(-50%) scaleY(0);
}
/* تم إزالة .service-card::after من الـ initial state لأنه تم حذفه بالكامل */
</style>