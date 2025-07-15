---
title: Our Expert Team
titleTemplate: خبراء المصاعد الرائدون في الوطن العربي تصميم، تركيب، وصيانة مصاعد بأعلى معايير الأمان والجودة
---

<style>
/* =================================================
   تنسيقات CSS لصفحة الفريق - داخل ملف Markdown مباشرة
   =================================================
*/

/* استيراد خطوط Google Fonts لمظهر عصري وواضح */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Montserrat:wght@300;400;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap'); /* خط عربي جديد */

/* متغيرات الألوان الجديدة (تأثير النيون/الزجاجي) */
:root {
  --neon-blue: #00eaff; /* أزرق سيان ساطع */
  --neon-purple: #ae00ff; /* بنفسجي ساطع */
  --neon-green: #00ff88; /* أخضر ساطع */
  --dark-bg-primary: #0a081c; /* أزرق داكن جداً جداً للخلفية الأساسية */
  --dark-bg-secondary: #1a1538; /* أزرق داكن بنفسجي أفتح قليلاً - لخلفية المقال */
  --card-bg-inner: #1e1942; /* خلفية أفتح قليلاً لكروت الأعضاء */
  --text-light: #e0f2f7; /* أبيض-أزرق فاتح جداً للنص الأساسي */
  --text-dim: #99aab5; /* نص باهت للأوصاف */
  --glass-border: rgba(255, 255, 255, 0.15); /* حدود فاتحة لتأثير الزجاج */
}

/* التنسيقات الأساسية للجسم والكونتينر الرئيسي للصفحة */
body {
  background-color: var(--dark-bg-primary);
  color: var(--text-light);
  font-family: 'Montserrat', 'Cairo', sans-serif;
  line-height: 1.8;
  overflow-x: hidden; /* لمنع شريط التمرير الأفقي بسبب تأثيرات التوهج */
  /* خلفية نجمية بسيطة (اختياري) */
  background-image: radial-gradient(circle at top left, #1f1a3a 0%, transparent 50%),
                    radial-gradient(circle at bottom right, #2f1a3a 0%, transparent 50%);
  background-attachment: fixed; /* تثبيت الخلفية */
}

/* تنسيق المحتوى العام لملفات Markdown (الجزء الرئيسي من الصفحة) */
.VPDoc article {
  max-width: 950px;
  margin: 50px auto;
  padding: 45px 30px;
  background-color: var(--dark-bg-secondary);
  border-radius: 25px; /* زوايا أكثر استدارة وجمالية */
  border: 1px solid var(--glass-border);
  box-shadow: 0 0 40px var(--neon-blue), /* توهج أساسي للمقال كله */
              0 0 80px var(--neon-purple);
  backdrop-filter: blur(10px) saturate(180%); /* تأثير زجاجي أقوى قليلاً */
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  transition: all 0.6s ease-in-out; /* انتقال أبطأ وأسلس */
}

/* تأثير الـ hover للكونتينر الرئيسي */
.VPDoc article:hover {
  box-shadow: 0 0 50px var(--neon-blue),
              0 0 100px var(--neon-purple),
              0 0 150px var(--neon-green),
              0 0 200px rgba(0, 234, 255, 0.2); /* توهج محسّن ودراماتيكي عند الـ hover */
}

/* العناوين الرئيسية */
.VPDoc h1 {
  font-size: 4em; /* حجم أكبر قليلاً */
  margin-bottom: 40px; /* مسافة سفلية أكبر */
  color: #fff;
  text-align: center;
  text-shadow: 0 0 20px var(--neon-blue), 0 0 35px var(--neon-purple); /* ظل نص نيون أقوى */
  padding-bottom: 18px; /* مسافة سفلية أكبر للخط */
  border-bottom: 4px solid var(--neon-blue); /* خط سميك وواضح */
  letter-spacing: 0.1em; /* تباعد أكبر للحروف */
  line-height: 1.2;
}

/* العناوين الفرعية (مثل "Leadership") */
.VPDoc h2 {
  font-size: 3em; /* حجم أكبر */
  color: var(--neon-purple);
  margin-top: 80px; /* مسافة علوية أكبر */
  margin-bottom: 35px;
  text-align: center;
  border-bottom: 1px dashed var(--glass-border);
  padding-bottom: 12px;
  text-shadow: 0 0 12px var(--neon-purple);
}

/* أسماء الأعضاء (H3) */
.VPDoc h3 {
  font-size: 2.6em; /* حجم أكبر */
  color: var(--neon-green);
  margin-top: 50px; /* مسافة علوية أكبر */
  margin-bottom: 20px; /* مسافة سفلية كافية */
  text-align: center;
  text-shadow: 0 0 10px var(--neon-green);
  letter-spacing: 0.05em;
}

/* الفقرات والنصوص العادية */
.VPDoc p {
  margin-bottom: 25px; /* زيادة الهامش لتحسين المسافات */
  font-size: 1.25em; /* حجم خط أكبر قليلاً */
  color: var(--text-dim);
  text-align: center; /* توسيط كل النصوص الآن */
  padding: 0 25px; /* بعض المسافة الداخلية للنص */
  line-height: 1.9; /* تباعد أسطر أكبر لراحة العين */
}

/* تنسيق خاص لـ 'المنصب' و 'النبذة' داخل الفقرات */
.VPDoc p strong {
    display: block; /* يضمن أن المنصب يكون في سطر خاص به */
    margin-bottom: 10px; /* مسافة أكبر أسفل المنصب */
    font-size: 1.4em; /* حجم خط أكبر للمنصب */
    color: var(--neon-blue);
    font-weight: 700;
    text-shadow: 0 0 6px var(--neon-blue);
    margin-top: 30px; /* مسافة أعلى المنصب */
}

.VPDoc p .bio-text {
    font-size: 1.15em; /* حجم أكبر للنبذة */
    color: var(--text-dim);
    margin-top: 12px; /* مسافة أسفل المنصب، أعلى النبذة */
    line-height: 1.8;
    text-align: center;
    font-family: 'Cairo', sans-serif;
}

/* الخط الأفقي الفاصل (---) */
.VPDoc hr {
  border: none;
  border-top: 3px solid var(--glass-border); /* خط سميك قليلاً */
  margin: 80px auto; /* هوامش أكثر سخاءً */
  width: 60%; /* عرض أقل للخط ليكون أكثر جمالية */
  box-shadow: 0 0 20px var(--neon-blue), 0 0 35px var(--neon-purple); /* توهج أقوى للفاصل */
  background: linear-gradient(to right, transparent, var(--neon-blue), transparent); /* تدرج لوني للتوهج */
}

/* **تنسيق كروت أعضاء الفريق الفردية** */
.team-member-card {
  background-color: var(--card-bg-inner); /* خلفية داخلية للكارت */
  border-radius: 15px; /* حواف دائرية للكارت */
  padding: 30px 20px; /* مسافة داخلية للكارت */
  margin: 40px auto; /* مسافة بين كروت الأعضاء */
  max-width: 500px; /* عرض الكارت الفردي */
  border: 1px solid rgba(255, 255, 255, 0.1); /* حدود شفافة للكارت */
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.4), /* ظل نيون خفيف للكارت */
              0 0 30px rgba(174, 0, 255, 0.2);
  backdrop-filter: blur(5px); /* تأثير زجاجي خفيف داخل الكارت */
  -webkit-backdrop-filter: blur(5px);
  transition: all 0.4s ease-in-out;
}

.team-member-card:hover {
  transform: translateY(-8px) scale(1.02); /* رفع الكارت وتكبيره قليلاً عند الـ hover */
  box-shadow: 0 0 25px var(--neon-green), /* توهج أقوى للكارت عند الـ hover */
              0 0 50px var(--neon-purple),
              0 0 70px var(--neon-blue);
  border-color: var(--neon-blue); /* تغيير لون الحدود عند الـ hover */
}

/* تنسيق الصور المضافة */
.VPDoc img {
  max-width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 30px auto;
  border: 7px solid var(--neon-green); /* حدود نيون خضراء سميكة */
  box-shadow: 0 0 28px var(--neon-green), /* توهج نيون للصور */
              0 0 55px var(--neon-purple);
  transition: transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
}

.VPDoc img:hover {
  transform: scale(1.12); /* تكبير أكثر وضوحاً */
  box-shadow: 0 0 40px var(--neon-green),
              0 0 80px var(--neon-purple),
              0 0 120px var(--neon-blue),
              0 0 160px rgba(0, 234, 255, 0.3); /* توهج أقوى عند الـ hover */
}

/* تعديلات للاستجابة على الشاشات الأصغر (Responsive adjustments) */
@media (max-width: 992px) {
  .VPDoc h1 { font-size: 3.2em; }
  .VPDoc h2 { font-size: 2.3em; }
  .VPDoc h3 { font-size: 2em; }
  .VPDoc p { font-size: 1.1em; padding: 0 15px; }
  .VPDoc p strong { font-size: 1.2em; }
  .VPDoc p .bio-text { font-size: 1.05em; }
  .VPDoc img { max-width: 200px; height: 200px; border-width: 5px; }
  .VPDoc article { padding: 35px 20px; margin: 40px auto; border-radius: 20px; }
  .team-member-card { max-width: 450px; padding: 25px 15px; margin: 30px auto; border-radius: 12px; }
}

@media (max-width: 768px) {
  .VPDoc h1 { font-size: 2.8em; margin-bottom: 30px; }
  .VPDoc h2 { font-size: 1.8em; margin-top: 60px; }
  .VPDoc h3 { font-size: 1.6em; margin-top: 40px; }
  .VPDoc p { font-size: 1em; padding: 0 10px; }
  .VPDoc p strong { font-size: 1.1em; margin-top: 20px; }
  .VPDoc p .bio-text { font-size: 0.95em; }
  .VPDoc img { max-width: 160px; height: 160px; border-width: 4px; }
  .VPDoc article { padding: 30px 15px; margin: 30px auto; border-radius: 15px; }
  .team-member-card { max-width: 350px; padding: 20px 10px; margin: 25px auto; border-radius: 10px; }
  .VPDoc hr { margin: 60px auto; width: 65%; }
}

@media (max-width: 480px) {
  .VPDoc h1 { font-size: 2.2em; margin-bottom: 20px; }
  .VPDoc h2 { font-size: 1.4em; margin-top: 50px; }
  .VPDoc h3 { font-size: 1.3em; margin-top: 30px; }
  .VPDoc p { font-size: 0.95em; padding: 0 5px; }
  .VPDoc p strong { font-size: 1em; margin-top: 15px; }
  .VPDoc p .bio-text { font-size: 0.9em; }
  .VPDoc img { max-width: 120px; height: 120px; border-width: 3px; }
  .VPDoc article { padding: 20px 10px; border-radius: 12px; margin: 20px auto; }
  .team-member-card { max-width: 95%; padding: 15px 10px; margin: 20px auto; border-radius: 8px; }
  .VPDoc hr { margin: 50px auto; width: 75%; }
}
</style>

# Team Work

<p>نحن فريق من خبراء المصاعد المتفانين، نهدف إلى تقديم أعلى معايير الجودة والأمان في تصميم، تركيب، وصيانة المصاعد. كل فرد في فريقنا يجلب معه خبرة عميقة وشغفًا بالتميز في قطاع المصاعد.</p>

---

## Leadership

<div class="team-member-card">
  <h3>Atef Elsayed</h3>
  <p>
    <strong>المنصب:</strong> المؤسس والرئيس التنفيذي لقسم المصاعد
  </p>
</div>

<div class="team-member-card">
  <h3>Sameh Said</h3>
  <p>
    <strong>position:</strong> مدير العمليات والهندسة
  </p>
</div>

---

<h2>Maintenance Team</h2>

<div class="team-member-card">
  <h3>Waleed Nady</h3>
  <p>
    <strong>position:</strong> رئيس قسم التركيبات
  </p>
 </div>

<div class="team-member-card">
  <h3>Khalid Gaber</h3>
  <p>
    <strong>position:</strong> مشرف الصيانة والحالات الطارئة
  </p>

</div>

---

<h2>Quality & Support</h2>

<div class="team-member-card">
  <h3>Mohamed Ahmed</h3>
  <p>
    <strong>position:</strong> مدير ضمان الجودة
  </p>
 </div>

<div class="team-member-card">
  <h3>Salama Hamdy</h3>
  <p>
    <strong>position:</strong> مهندس الدعم الفني
  </p>
  </div>
 
---

<h2>Join Our Team</h2>

<p>نحن نبحث دائمًا عن المهندسين والفنيين ذوي الكفاءة للانضمام إلى عائلتنا المتنامية في مجال المصاعد. إذا كنت شغوفًا بالتميز وترغب في إحداث فرق، فلا تتردد في التواصل معنا!</p>