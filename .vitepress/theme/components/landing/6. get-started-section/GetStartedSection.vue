<template>
  <section class="call-to-action-section" id="final-cta-section">
    <div class="animated-divider"></div>

    <div class="content-wrapper">
      <div class="cta-card">
        <svg class="cta-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
        </svg>
      </div>

      <h2>هل أنت مستعد لرفع مستوى مبناك؟</h2>
      <h3>
        تواصل معنا اليوم لتحصل على استشارة مجانية وعرض سعر مخصص لاحتياجاتك.
      </h3>

      <a href="https://m.me/61558622763500" target="_blank" class="btn btn--primary">اطلب عرض سعر الآن</a>

      <div class="contact-info">
        <div class="contact-item">
          <span class="phone-text">
            <svg class="phone-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.46.57 3.57.11.35.03.74-.25 1.02L6.62 10.79z"/>
            </svg>
            +0201000183131
          </span>
        </div>
        <div class="contact-item">
          <span class="phone-text">
            <svg class="phone-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.46.57 3.57.11.35.03.74-.25 1.02L6.62 10.79z"/>
            </svg>
            +0201063509009
          </span>
        </div>
        
        <div class="contact-item location-item">
          <a href="https://www.google.com/maps/place/جاردينيا1+-+التجمع+الخامس%D8%8C+محافظة+القاهرة%D8%8C+مصر/@30.015694,31.458925,17z/data=!3m1!4b1!4m6!3m5!1s0x1458231c5b8e9d3d:0x3c2a7f5a8c9b3e1a!8m2!3d30.015694!4d31.458925!16s%2Fg%2F12p1x_3p8?entry=ttu" target="_blank" class="location-link">
            <svg class="location-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
            </svg>
            <span>جاردينيا1 _ التجمع الخامس _ محافظة القاهرة_ مصر</span>
          </a>
        </div>
      </div>

    </div>

    <div class="glow glow--purple" />
    <div class="glow glow--blue" />
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');

.call-to-action-section {
  margin: 0 auto;
  padding: 150px 20px;
  position: relative;
  overflow: hidden;
  background-color: #0b0b0b;
  /* الخط الفاصل القديم تم حذفه من هنا */
  /* border-top: 1px solid rgba(38, 38, 38, 0.7); */
  /* animation: borderGlow 3s infinite alternate; */
  text-align: center;
}

/* الـ Div الجديد للخط الفاصل المتحرك في المنتصف */
.animated-divider {
  position: absolute;
  top: 0; /* يكون في بداية السيكشن من فوق */
  left: 50%; /* في المنتصف الأفقي */
  transform: translateX(-50%); /* إزاحة لمنتصف نفسه */
  width: 250px; /* عرض الخط (ممكن تعديله) */
  height: 2px; /* سمك الخط */
  background: linear-gradient(90deg, transparent 0%, #84F3B3 20%, #a020f0 50%, #84F3B3 80%, transparent 100%);
  box-shadow: 0 0 15px rgba(160, 32, 240, 0.7); /* ظل عشان يظهر متوهج */
  animation: dividerPulse 3s infinite alternate; /* animation جديد للخط ده */
  z-index: 2; /* عشان يظهر فوق كل حاجة لو فيه تداخل */
}

/* Keyframes جديد للخط الفاصل المتحرك في المنتصف */
@keyframes dividerPulse {
  0% {
    width: 250px;
    box-shadow: 0 0 15px rgba(160, 32, 240, 0.7);
    opacity: 0.8;
  }
  50% {
    width: 300px; /* يتمدد قليلاً في المنتصف */
    box-shadow: 0 0 25px rgba(132, 243, 179, 0.9);
    opacity: 1;
  }
  100% {
    width: 250px;
    box-shadow: 0 0 15px rgba(160, 32, 240, 0.7);
    opacity: 0.8;
  }
}

/* باقي الـ CSS كما هو */
.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

h2 {
  color: #fff;
  font-family: 'Tajawal', sans-serif;
  font-size: 44px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -1px;
  margin: 0 auto 20px;
  text-align: center;
  background: linear-gradient(90deg, #ffffff 0%, #a020f0 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.3), 0 0 15px rgba(160, 32, 240, 0.4);

  @media (min-width: 768px) {
    font-size: 52px;
  }
}

h3 {
  margin: 0 auto 40px;
  font-family: 'Tajawal', sans-serif;
  color: #a3a3a3;
  font-size: 1.2em;
  line-height: 1.6;
  max-width: 700px;
}

.btn {
  display: inline-flex;
  padding: 15px 35px;
  border-radius: 8px;
  text-decoration: none;
  font-family: 'Tajawal', sans-serif;
  font-weight: 600;
  font-size: 1.1em;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.btn--primary {
  background: linear-gradient(90deg, #a020f0 0%, #84F3B3 100%);
  color: #0b0b0b;
  border: none;
  position: relative;
  overflow: hidden;
}

.btn--primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(160, 32, 240, 0.4), 0 0 20px rgba(132, 243, 179, 0.3);
  filter: brightness(1.1);
}

.cta-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  margin: 0 auto 50px;
  border: 1px solid rgba(43, 70, 89, 0.5);
  border-radius: 15px;
  position: relative;
  z-index: 1;
  background-color: rgba(30, 30, 30, 0.6);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);

  &:before {
    content: '';
    position: absolute;
    bottom: -30px;
    left: -20px;
    width: 80px;
    height: 80px;
    background: linear-gradient(180deg, #61d9ff 0%, rgba(0, 0, 0, 0) 100%);
    z-index: -1;
    filter: blur(35px);
    border-radius: 50%;
  }

  &:after {
    content: '';
    position: absolute;
    top: -20px;
    right: -20px;
    width: 80px;
    height: 80px;
    background: linear-gradient(270deg, #7a23a1 0%, rgba(113, 94, 189, 0.9) 60%, rgba(189, 52, 254, 0) 100%);
    z-index: -1;
    filter: blur(35px);
    border-radius: 50%;
  }
}

.cta-icon {
  width: 50%;
  height: 50%;
  color: #84F3B3;
  filter: drop-shadow(0 0 10px rgba(132, 243, 179, 0.7));
}

/* تنسيقات أرقام التليفونات والموقع */
.contact-info {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 40px;
    align-items: center;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
    font-family: 'Tajawal', sans-serif;
    font-size: 1.1em;
    font-weight: 500;
}

.phone-text {
    display: flex;
    align-items: center;
    gap: 10px;
    color: inherit;
    cursor: default;
}

.phone-icon {
    width: 24px;
    height: 24px;
    color: #a3a3a3;
}

.location-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    transition: color 0.3s ease;
}

.location-link:hover {
    color: #84F3B3;
}

.location-icon {
    width: 24px;
    height: 24px;
    color: #a3a3a3;
    transition: color 0.3s ease;
}

.location-link:hover .location-icon {
    color: #84F3B3;
}

/* تنسيقات الـ glow الخلفية */
.glow {
  position: absolute;
  pointer-events: none;
  z-index: 0;
  border-radius: 100%;
  opacity: 0.3;
  filter: blur(100px);
}

.glow--blue {
  bottom: -15%;
  left: -20%;
  width: 60%;
  aspect-ratio: 1;
  background: radial-gradient(circle, #61d9ff 0%, transparent 70%);
}

.glow--purple {
  bottom: -15%;
  right: -20%;
  width: 60%;
  aspect-ratio: 1;
  background: radial-gradient(circle, #7a23a1 0%, transparent 70%);
}

/* Media Queries لتكييف التصميم */
@media (min-width: 768px) {
  .call-to-action-section {
    padding: 180px 20px;
  }
  h2 {
    font-size: 60px;
  }
  h3 {
    font-size: 1.4em;
  }
  .glow--blue {
    bottom: -20%;
    left: -10%;
    width: 50%;
  }
  .glow--purple {
    bottom: -20%;
    right: -10%;
    width: 50%;
  }
}

@media (min-width: 1025px) {
  .glow--blue {
    width: 400px;
    height: 400px;
    left: calc(50% - 600px);
    filter: blur(120px);
  }
  .glow--purple {
    width: 500px;
    height: 500px;
    right: calc(50% - 650px);
    filter: blur(150px);
  }
}

@media (max-width: 500px) {
  h2 {
    font-size: 36px;
  }
  h3 {
    font-size: 1em;
  }
  .cta-card {
    width: 70px;
    height: 70px;
    margin-bottom: 40px;
  }
  .contact-item {
    flex-direction: column;
    font-size: 1em;
    text-align: center;
  }
  .phone-text, .location-link {
    flex-direction: column;
    text-align: center;
    gap: 5px;
  }
  .animated-divider {
    width: 150px; /* أصغر على الموبايل */
  }
  @keyframes dividerPulse {
    0% {
      width: 150px;
    }
    50% {
      width: 200px;
    }
    100% {
      width: 150px;
    }
  }
}
</style>