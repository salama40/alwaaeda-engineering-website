// import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import { buildEnd } from './buildEnd.config' // تأكد من وجود هذا الملف أو إزالته إذا لم تستخدمه

// --- Meta tags for SEO and social sharing - UPDATE THESE FOR YOUR COMPANY ---
// سنستخدم هذه المتغيرات ونضيف إليها كلمات مفتاحية قوية
const companyName = 'الهندسية الواعدة للمصاعد' // **اسم شركتك بالكامل بالعربية**
const ogDescription = 'شركة الهندسية الواعدة: حلول متكاملة ومبتكرة للمصاعد والسلالم الكهربائية. تركيب، صيانة وتحديث مصاعد الركاب، البضائع، والمصاعد البانورامية بتقنيات أمان وجودة عالمية.' // وصف غني بالكلمات المفتاحية بالعربية
const ogImage = 'https://www.alwaeda-engineering.com/assets/alwaeda-og-image.jpg' // **أكد هذا الرابط - استخدم نفس الصورة اللي في الـ RSS**
const ogTitle = 'شركة الوحدة الهندسية للمصاعد - تركيب، صيانة، تحديث، حلول متكاملة' // عنوان غني بالكلمات المفتاحية بالعربية
const ogUrl = 'https://www.alwaeda-engineering.com' // **أكد هذا الدومين - دومين موقعك الحقيقي**

// netlify envs (retain as is if not changing deployment setup)
const deployURL = process.env.DEPLOY_PRIME_URL || ''
const commitRef = process.env.COMMIT_REF?.slice(0, 8) || ''

const deployType = (() => {
  switch (deployURL) {
    case 'https://main--vite-docs-main.netlify.app':
      return 'main'
    case '':
      return 'local'
    default:
      return 'release'
  }
})()
const additionalTitle = ((): string => {
  switch (deployType) {
    case 'main':
      return ' (main branch)'
    case 'local':
      return ' (local)'
    case 'release':
      return ''
  }
})()

export default defineConfig({
  // --- General Site Settings for SEO ---
  // **lang: Set the primary language of your site for search engines**
  lang: 'ar-EG', // **مهم جداً: تحديد اللغة العربية للموقع**
  
  // **title: Your Company Name & Primary Keywords - This appears in browser tabs and search results**
  title: `${companyName}${additionalTitle}`, // سيظهر "شركة الوحدة الهندسية للمصاعد" كعنوان أساسي
  
  // **description: A concise, keyword-rich summary of your business for search engines**
  description: ogDescription, // استخدام الوصف الغني بالكلمات المفتاحية اللي عرفناه فوق

  head: [
    // --- Favicon and Fonts (keep as is if working) ---
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }], // **مسار شعار شركتك (تأكد من وجوده في مجلد public)**
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'true',
      },
    ],
    [
      'link',
      {
        rel: 'preload',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600&family=IBM+Plex+Mono:wght@400&display=swap',
        as: 'style',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600&family=IBM+Plex+Mono:wght@400&display=swap',
      },
    ],
    // **Smooth scroll for anchor links**
    ['style', {}, `html { scroll-behavior: smooth; }`],

    // --- Core SEO Meta Tags (Updated with keywords) ---
    // Keywords Meta Tag (less critical for Google, but good for others/historical reasons)
    ['meta', { name: 'keywords', content: 'الواحدة الهندسية, مصاعد, تركيب مصاعد, صيانة مصاعد, تحديث مصاعد, أسانسيرات, شركات مصاعد في مصر, حلول مصاعد, مصاعد كهربائية, مصاعد بضائع, مصاعد ركاب, مصاعد بانورامية, أمان المصاعد, الوحدة الهندسية' }],
    
    // OG Meta Tags for Social Media Sharing (Open Graph) - **Very Important**
    ['meta', { property: 'og:type', content: 'website' }], // نوع المحتوى
    ['meta', { property: 'og:title', content: ogTitle }], // عنوان مشاركة السوشيال ميديا
    ['meta', { property: 'og:image', content: ogImage }], // صورة المشاركة
    ['meta', { property: 'og:url', content: ogUrl }], // رابط المشاركة
    ['meta', { property: 'og:description', content: ogDescription }], // وصف المشاركة
    ['meta', { property: 'og:site_name', content: companyName }], // اسم الشركة للمشاركة

    // Twitter Card Meta Tags (Similar to OG, specific for Twitter)
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    // If you have a Twitter handle: ['meta', { name: 'twitter:site', content: '@YourTwitterHandle' }],
    // ['meta', { name: 'twitter:creator', content: '@YourTwitterHandle' }],
    ['meta', { name: 'twitter:title', content: ogTitle }],
    ['meta', { name: 'twitter:description', content: ogDescription }],
    ['meta', { name: 'twitter:image', content: ogImage }],

    // Theme Color for Mobile Browsers
    ['meta', { name: 'theme-color', content: '#3498db' }], // لون أساسي للبراند - حافظ عليه أو غيره للون البراند بتاعك
    
    // Fathom Analytics (keep if you use it, update YOUR_FATHOM_SITE_ID)
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'YOUR_FATHOM_SITE_ID', // If you use Fathom Analytics
        'data-spa': 'auto',
        defer: '',
      },
    ],
  ],

  themeConfig: {
    // **Company logo next to the name**
    logo: '/logo.svg', // **تأكد أن الشعار موجود في مجلد public بهذا الاسم**
    // اسم الشركة الذي يظهر بجوار الشعار في شريط التنقل
    siteTitle: companyName, // **مهم: عرض اسم الشركة بالعربي بجانب اللوجو**

    editLink: {
      pattern: 'https://github.com/your-repo/your-site/edit/main/docs/:path', // **تحديث: رابط مستودع GitHub الخاص بك**
      text: 'Suggest changes to this page',
    },

    // **Social links with Facebook and LinkedIn icons**
    socialLinks: [
      { icon: 'facebook', link: 'https://www.facebook.com/profile.php?id=61558622763500' }, // رابط الفيسبوك
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/salama-hamdy-61301720a/' } // رابط لينكدإن
    ],

    footer: {
      message: `
        <div style="text-align: center; padding: 20px 0;">
          <p style="font-size:1.1em; color: #aaa;">
            Designed and Developed by Elprof Salama ❤️ ${commitRef}
          </p>
          
          <p style="margin-top: 15px; font-size: 0.85em;">
            تواصل معنا <br>
            الهاتف: +201111343696<br>
            البريد الإلكتروني: www.elprof929@gmail.com
          </p>
          <p style="margin-top: 20px; font-size: 0.9em; color: #888;">
            حقوق النشر © 2025-حتى الآن ${companyName}. جميع الحقوق محفوظة.
          </p>
          
        </div>
      `,
      copyright: ''
    },

    // **القائمة الرئيسية للهيدر (باللغة الإنجليزية كما طلبت)**
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Company', link: '/#company-section' }, 
      { text: 'Services', link: '/#features-section' }, 
      { text: 'Projects', link: '/#frameworks-section' },
      { text: 'About Us', link: '/#testimonials-section' }, 
      { text: 'Contact', link: '/#final-cta-section' },
    ],

    // باقي الـ sidebar والـ config كما هو
    sidebar: {
      '/services/': [ // Sidebar for Services section
        {
          text: 'خدماتنا', // يمكنك تغيير هذا إلى 'Our Services' إذا أردت
          items: [
            { text: 'نظرة عامة على الخدمات', link: '/services/' },
            { text: 'تركيب المصاعد', link: '/services/installation' },
            { text: 'صيانة المصاعد', link: '/services/maintenance' },
            { text: 'تحديث المصاعد', link: '/services/modernization' },
          ],
        },
        { // Adding products under services for simplicity as per new nav structure
          text: 'منتجاتنا', // يمكنك تغيير هذا إلى 'Our Products' إذا أردت
          items: [
            { text: 'نظرة عامة على المنتجات', link: '/products/' },
            { text: 'مصاعد ركاب', link: '/products/passenger-lifts' },
            { text: 'مصاعد بضائع', link: '/products/cargo-lifts' },
            { text: 'مصاعد بانورامية', link: '/products/panoramic-lifts' },
            { text: 'مصاعد مستشفيات', link: '/products/hospital-lifts' },
            { text: 'قطع غيار المصاعد', link: '/products/spare-parts' },
          ],
        },
      ],
      // Default sidebar for other main pages (Home, Projects, Contact Us)
      // هذه القائمة الجانبية غالباً ما تظهر فقط على الصفحات التي ليس لها sidebar مخصص
      '/': [
        {
          text: 'روابط سريعة', // يمكنك تغيير هذا إلى 'Quick Links' إذا أردت
          items: [
            { text: 'الرئيسية', link: '/' },
            { text: 'عن الشركة', link: '/#company-section' }, 
            { text: 'خدماتنا', link: '/services/' }, 
            { text: 'مشاريعنا', link: '/projects' },
            { text: 'تواصل معنا', link: '/contact' },
          ],
        },
      ],
    },

    outline: {
      level: [2, 3],
    },
  },
  transformPageData(pageData) {
    const canonicalUrl = `${ogUrl}/${pageData.relativePath}`
      .replace(/\/index\.md$/, '/')
      .replace(/\.md$/, '')
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.unshift(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageData.title }],
      // Add a default meta description for each page if not explicitly set
      // This is crucial for pages without a specific 'description' in their frontmatter
      ['meta', { name: 'description', content: pageData.frontmatter.description || ogDescription }],
    )
    return pageData
  },
  markdown: {
    codeTransformers: [transformerTwoslash()],
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [
      // groupIconVitePlugin({ ... }),
      // llmstxt({ ... }),
    ],
    optimizeDeps: {
      include: [
        '@shikijs/vitepress-twoslash/client',
        'gsap',
        'gsap/dist/ScrollTrigger',
        'gsap/dist/MotionPathPlugin',
      ],
    },
  },
  buildEnd,
})