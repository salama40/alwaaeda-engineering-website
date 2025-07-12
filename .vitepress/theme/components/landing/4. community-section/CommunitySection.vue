<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import CommunityCard, { Testimonial } from './CommunityCard.vue' 

import { gsap } from 'gsap' 
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger' 

gsap.registerPlugin(ScrollTrigger) 


// **مصفوفة التقييمات الأصلية (كما كانت في البداية مع 20 تقييمًا)**
const testimonials: Testimonial[] = [
  { name: 'أحمد محمود', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', comment: [`التعامل مع هذه الشركة كان تجربة رائعة حقًا. احترافية عالية، والتزام بالمواعيد، والنتائج فاقت توقعاتنا بكثير. نوصي بها بشدة!`,], rating: 5, },
  { name: 'فاطمة الزهراء', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', comment: [`فريق عمل مبدع ومتعاون للغاية. قدموا لنا حلولاً مبتكرة تناسب احتياجاتنا بالضبط. دعم فني ممتاز حتى بعد انتهاء المشروع.`,], rating: 4.5, },
  { name: 'محمد علي', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', comment: [`شركة موثوقة بكل معنى الكلمة. الجودة في العمل والاهتمام بأدق التفاصيل هو ما يميزهم. شكراً لكم على هذا الجهد الرائع.`,], rating: 5, },
  { name: 'سارة خالد', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', comment: [`تجربة سلسة ونتائج مبهرة. لقد ساعدونا في تحقيق أهدافنا بشكل فعال وفي وقت قياسي. فريق عمل يتمتع بخبرة واسعة.`,], rating: 4, },
  { name: 'يوسف العبدالله', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', comment: [`من أفضل الشركات التي تعاملت معها. يفهمون احتياجات العميل جيداً ويقدمون الدعم اللازم بكل صدق وشفافية.`,], rating: 4.5, },
  { name: 'ليلى فوزي', avatar: 'https://randomuser.me/api/portraits/women/6.jpg', comment: [`خدمة عملاء ممتازة واستجابة سريعة. لقد أحدثوا فرقاً كبيراً في مشروعنا. أنا سعيدة جداً بالنتائج النهائية.`,], rating: 5, },
  { name: 'خالد ناصر', avatar: 'https://randomuser.me/api/portraits/men/7.jpg', comment: [`احترافية في كل خطوة، من التخطيط وحتى التنفيذ. أشكر الفريق على تفانيهم واهتمامهم بجودة العمل.`,], rating: 4, },
  { name: 'مريم سعيد', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', comment: [`لقد أظهروا فهماً عميقاً لاحتياجات السوق وقدموا لنا استراتيجية ناجحة للغاية. نثق بهم في مشاريعنا المستقبلية.`,], rating: 5, },
  { name: 'عمران حسين', avatar: 'https://randomuser.me/api/portraits/men/9.jpg', comment: [`عمل رائع يفوق التوقعات. اهتمام حقيقي بالعميل ورغبة في تقديم الأفضل. فريق عمل يستحق كل الثناء.`,], rating: 4.5, },
  { name: 'ريم منصور', avatar: 'https://randomuser.me/api/portraits/women/10.jpg', comment: [`فريق عمل متفهم لاحتياجاتنا، وقدموا لنا حلولاً عملية وفعالة. تجربة رائعة بكل المقاييس.`,], rating: 4, },
  { name: 'نايف البشير', avatar: 'https://randomuser.me/api/portraits/men/11.jpg', comment: [`احترافية وسرعة في الإنجاز. النتائج كانت مذهلة وتجاوزت توقعاتنا. أنصح بالتعامل معهم.`,], rating: 5, },
  { name: 'هند القحطاني', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', comment: [`دعم فني مستمر واستجابة فورية. ساعدونا في تخطي العديد من التحديات. شكراً للفريق.`,], rating: 4.5, },
  { name: 'سامي العلي', avatar: 'https://randomuser.me/api/portraits/men/13.jpg', comment: [`جودة لا تضاهى في الخدمة والمنتج. فريق عمل مبدع ومحترف. شكراً جزيلاً لكم.`,], rating: 5, },
  { name: 'نورا كمال', avatar: 'https://randomuser.me/api/portraits/women/14.jpg', comment: [`تجربة ممتازة من البداية للنهاية. كان الفريق متعاوناً جداً وقدموا لنا كل الدعم.`,], rating: 4.5, },
  { name: 'فهد السعدي', avatar: 'https://randomuser.me/api/portraits/men/15.jpg', comment: [`أوصي بهم بشدة. فهموا رؤيتنا وحولوها إلى حقيقة بشكل يفوق التوقعات.`,], rating: 5, },
  { name: 'مها الشمري', avatar: 'https://randomuser.me/api/portraits/women/16.jpg', comment: [`خدمة عملاء رائعة. دقة في المواعيد وجودة في التنفيذ. أنا سعيدة جداً بالتعامل معكم.`,], rating: 4.5, },
  { name: 'جمال قاسم', avatar: 'https://randomuser.me/api/portraits/men/17.jpg', comment: [`فريق محترف ولديهم حلول لكل التحديات. لقد وفروا علينا الكثير من الوقت والجهد.`,], rating: 5, },
  { name: 'زينب العجمي', avatar: 'https://randomuser.me/api/portraits/women/18.jpg', comment: [`تجربة أكثر من رائعة. فهم للمشروع واهتمام بأدق التفاصيل. أنصح بالتعامل معهم.`,], rating: 4, },
  { name: 'ياسين فؤاد', avatar: 'https://randomuser.me/api/portraits/men/19.jpg', comment: [`الاستجابة السريعة والفعالية في حل المشكلات هو ما يميزهم. فريق عمل يعتمد عليه.`,], rating: 4.5, },
  { name: 'سلمى البدور', avatar: 'https://randomuser.me/api/portraits/women/20.jpg', comment: [`من الشركات القليلة التي تلتزم بوعودها وتقدم جودة حقيقية. استمروا في العمل الرائع!`,], rating: 5, },
]

// **تقسيم العملاء الموجودين على الأعمدة الثلاثة**
const totalTestimonials = testimonials.length;
const testimonialsPerColumn = Math.ceil(totalTestimonials / 3);

// العمود الأول
const col1Base = testimonials.slice(0, testimonialsPerColumn);
// العمود الثاني
const col2Base = testimonials.slice(testimonialsPerColumn, testimonialsPerColumn * 2);
// العمود الثالث
const col3Base = testimonials.slice(testimonialsPerColumn * 2);

// عدد مرات تكرار كل مجموعة بيانات داخل العمود لإنشاء تأثير اللانهائية
// يمكن زيادته لتقليل وضوح التكرار أكثر
const COLUMN_REPEAT_COUNT = 4; 

const column1Cards = ref([...Array(COLUMN_REPEAT_COUNT)].flatMap(() => col1Base));
const column2Cards = ref([...Array(COLUMN_REPEAT_COUNT)].flatMap(() => col2Base));
const column3Cards = ref([...Array(COLUMN_REPEAT_COUNT)].flatMap(() => col3Base));


let columnTimelines: (gsap.core.Tween | null)[] = [null, null, null]; 

onMounted(() => {
  nextTick(() => {
    const applyColumnAnimation = (columnElement: HTMLElement, baseCards: Testimonial[], index: number) => {
      const cardsInColumn = columnElement.querySelectorAll('.community-card');
      if (cardsInColumn.length === 0) {
        console.warn(`No cards found in column ${index + 1}. Animation might not work.`);
        return;
      }

      let singleSetHeight = 0;
      // حساب ارتفاع المجموعة الأساسية فقط من الكاردات لهذا العمود
      for (let i = 0; i < baseCards.length; i++) {
        if (cardsInColumn[i]) {
            singleSetHeight += (cardsInColumn[i] as HTMLElement).offsetHeight + 25; // ارتفاع الكارد + هامش 25px
        } else {
            console.warn(`Not enough cards to calculate single set height for column ${index + 1}.`);
            // Fallback: If for some reason cards aren't rendered, estimate height
            singleSetHeight = columnElement.scrollHeight / COLUMN_REPEAT_COUNT;
            break;
        }
      }

      const distanceToScroll = singleSetHeight; 
      
      const animationProps: gsap.TweenVars = {
        y: -distanceToScroll, // كل الأعمدة تنزل الآن
        duration: 80, // سرعة النزول (يمكنك تعديلها)
        ease: 'none',
        repeat: -1, 
        modifiers: {
          y: gsap.utils.unitize((y) => {
            const currentY = parseFloat(y);
            return currentY % distanceToScroll;
          })
        }
      };
      
      columnTimelines[index] = gsap.to(columnElement, animationProps);
    };

    // تطبيق الأنيميشن على الأعمدة
    applyColumnAnimation(document.querySelector('.column-1') as HTMLElement, col1Base, 0); 
    applyColumnAnimation(document.querySelector('.column-2') as HTMLElement, col2Base, 1); 
    applyColumnAnimation(document.querySelector('.column-3') as HTMLElement, col3Base, 2); 
  }); 
});

onUnmounted(() => {
  columnTimelines.forEach(timeline => {
    timeline?.kill();
  });
});
</script>

<template>
  <section id="testimonials-section" class="community-section">
      <div class="dancing-dots-animation">
      <div class="dot dot-1"></div>
      <div class="dot dot-2"></div>
      <div class="dot dot-3"></div>
      <div class="dot dot-4"></div>
      <div class="dot dot-5"></div>
      <div class="dot dot-6"></div>
    </div>
    <h2>ماذا يقول عملاؤنا عنا؟</h2>
    <h3>
      نفتخر بآراء عملائنا الكرام الذين وثقوا بنا وشاركونا رحلة النجاح
    </h3>
    <div class="community-grid-container">
      <div class="community-grid-columns">
        <div class="community-column column-1">
          <CommunityCard
            v-for="(testimonial, index) in column1Cards"
            :key="'col1-' + index"
            :testimonial="testimonial"
          />
        </div>
        <div class="community-column column-2">
          <CommunityCard
            v-for="(testimonial, index) in column2Cards"
            :key="'col2-' + index"
            :testimonial="testimonial"
          />
        </div>
        <div class="community-column column-3">
          <CommunityCard
            v-for="(testimonial, index) in column3Cards"
            :key="'col3-' + index"
            :testimonial="testimonial"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');

/* أنيميشن الدوائر المتراقصة فوق العنوان (6 نقاط) - لم يتغير */
.dancing-dots-animation {
  width: 100%;
  max-width: 350px; 
  height: 25px; 
  margin: 0 auto 20px;
  display: flex;
  justify-content: space-around; 
  align-items: center;
  position: relative;
}

.dancing-dots-animation .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(45deg, #a020f0, #84F3B3); 
  position: absolute; 
}

.dot-1 { left: 0%;   animation: bounceDot 2s ease-in-out infinite alternate; }
.dot-2 { left: 20%;  animation: bounceDot 2s ease-in-out infinite alternate 0.2s; }
.dot-3 { left: 40%;  animation: bounceDot 2s ease-in-out infinite alternate 0.4s; }
.dot-4 { left: 60%;  animation: bounceDot 2s ease-in-out infinite alternate 0.6s; }
.dot-5 { left: 80%;  animation: bounceDot 2s ease-in-out infinite alternate 0.8s; }
.dot-6 { left: 100%; animation: bounceDot 2s ease-in-out infinite alternate 1s; }


@keyframes bounceDot {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(-10px) scale(1.2); 
    opacity: 0.8;
  }
}

.community-section {
  margin-top: 140px;
  display: block; 

  h2 {
    background: linear-gradient(90deg, #ffffff 0%, #a020f0 100%); 
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0 auto 10px;
    text-align: center;
    font-family: 'Tajawal', sans-serif; 
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.3), 0 0 15px rgba(160, 32, 240, 0.4); 
    font-size: 2.5em; 
  }

  h3 {
    width: 600px; 
    max-width: 90%; 
    margin: 0 auto;
    text-align: center;
    color: #a3a3a3; 
    font-family: 'Tajawal', sans-serif; 
    font-size: 1.1em; 
  }

  .community-grid-container {
    position: relative;
    padding-left: 20px;
    padding-right: 20px;
    overflow: hidden; 
    height: 700px; 
    mask-image: linear-gradient(
      transparent,
      white 50px,
      white calc(100% - 50px),
      transparent
    ); 
    -webkit-mask-image: linear-gradient(
      transparent,
      white 50px,
      white calc(100% - 50px),
      transparent
    );
  }

  .community-grid-columns {
    display: flex;
    justify-content: center; 
    gap: 25px; 
    height: 100%; 
    align-items: flex-start; 
  }

  .community-column {
    flex: 1; 
    max-width: 350px; 
    display: flex;
    flex-direction: column;
  }
  
  @media (min-width: 768px) and (max-width: 1149px) { 
    .community-grid-columns {
      flex-wrap: wrap; 
      justify-content: center;
    }
    .community-column {
      max-width: 45%; 
    }
    .community-column:nth-child(3) { 
      display: none; 
    }
  }

  @media (max-width: 767px) { 
    .community-grid-columns {
      flex-direction: column; 
      align-items: center; 
    }
    .community-column {
      max-width: 90%; 
    }
    .community-column:nth-child(2),
    .community-column:nth-child(3) { 
      display: none; 
    }
  }
}
</style>