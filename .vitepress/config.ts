// docs/.vitepress/config.js
import { defineConfig } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import { buildEnd } from './buildEnd.config'
import type { PageData } from 'vitepress'
import type MarkdownIt from 'markdown-it'

import type { DefaultTheme } from 'vitepress/theme';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

// --- Meta tags for SEO and social sharing ---
const companyNameArabic = 'الهندسية الواعدة للمصاعد'
const companyNameEnglish = 'Alwaaeda Elevators'

const ogDescription = 'الهندسية الواعدة للمصاعد: شركة رائدة في تركيب وصيانة وتحديث جميع أنواع المصاعد والاسانسيرات (ركاب، بضائع، بانورامية). نقدم حلول متكاملة وأنظمة أمان وجودة عالمية في مصر. خبراء في مصاعد كهربائية وهيدروليكية.'
const ogImage = 'https://alwaaeda-elevators.netlify.app/assets/alwaaeda-og-image.jpg'
const ogTitle = 'الهندسية الواعدة للمصاعد - تركيب، صيانة وتحديث الأسانسيرات والمصاعد في مصر'
const ogUrl = 'https://alwaaeda-elevators.netlify.app'

const deployURL = process.env.DEPLOY_PRIME_URL || ''

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
  lang: 'ar-EG',
  title: `${ogTitle}${additionalTitle}`,
  description: ogDescription,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous', 
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
    ['meta', { name: 'keywords', content: 'الهندسية الواعدة للمصاعد, تركيب مصاعد, صيانة مصاعد, تحديث مصاعد, أسانسيرات, شركات مصاعد في مصر, حلول مصاعد, مصاعد كهربائية, مصاعد هيدروليكية, مصاعد بضائع, مصاعد ركاب, مصاعد بانورامية, أمان المصاعد, مقاولات مصاعد, توريد مصاعد, قطع غيار مصاعد, شركات اسانسيرات' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { property: 'og:site_name', content: companyNameArabic }], 
    ['meta', { property: 'og:locale', content: 'ar_EG' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: ogTitle }],
    ['meta', { name: 'twitter:description', content: ogDescription }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['meta', {name:'google-site-verification' , content:"czK9OoopCagNd1lRPK7lhUHX8lR7OVHibbNZg08CYZE" }],
    ['meta', { name: 'theme-color', content: '#3498db' }],
    ['script', { async: '', src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3417531868368775', crossorigin: 'anonymous' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: companyNameEnglish,
    socialLinks: [
      { icon: 'facebook', link: 'https://www.facebook.com/profile.php?id=61558622763500' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/salama-hamdy-61301720a/' }
    ],

    footer: {
      message: '',
      copyright: `
        <div style="text-align: center; padding: 20px 0;">
          <p style="font-size:1.1em; color: #aaa;">
            Designed And Developed By Elprof Salama ❤️
          </p>
          <p style="margin-top: 15px; font-size: 0.85em;">
            تواصل معنا <br>
            Phone : +201111343696<br>
            Email : www.elprof929@gmail.com
          </p>
          <p style="margin-top: 20px; font-size: 0.9em; color: #888;">
            Copyright © 2024- . جميع الحقوق محفوظة الهندسية الواعدة للمصاعد
          </p>
        </div>
      `
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Company', link: '/#company-section' },
      { text: 'Services', link: '/#features-section' },
      { text: 'Projects', link: '/#frameworks-section' },
      { text: 'Contact Us', link: '/#final-cta-section' },
      {
        text: 'Blogs',
        items: [
          { text: 'FAQs', link: '/news/faq' },
          { text: 'Articles', link: '/news/our-first-article' },
          { text: 'Services Overview', link: '/news/services-overview' },
          { text: 'Elevator Installation', link: '/news/installation' },
          { text: 'Elevator Maintenance', link: '/news/maintenance' },
          { text: 'Elevator Modernization', link: '/news/modernization' },
        ]
      },
      {
        text: 'About Us',
        items: [
          { text: 'team', link: '/news/team.md' },
          { text: 'Who We Are', link: '/#testimonials-section' },
        ]
      },
    ],
    sidebar: {
      '/news/': [
        {
          text: 'خدماتنا ومعلومات',
          items: [
            { text: 'المقالات', link: '/news/our-first-article' },
            { text: 'الأسئلة الشائعة', link: '/news/faq' },
            { text: 'نظرة عامة على الخدمات', link: '/news/services-overview' },
            { text: 'تركيب المصاعد', link: '/news/installation' },
            { text: 'صيانة المصاعد', link: '/news/maintenance' },
            { text: 'تحديث المصاعد', link: '/news/modernization' },
          ],
        },
      ],
    
      '/': [
        {
          text: 'روابط سريعة',
          items: [
            { text: 'الرئيسية', link: '/' },
            { text: 'عن الشركة', link: '/#company-section' },
            { text: 'خدماتنا', link: '/news/services-overview' },
            { text: 'منتجاتنا', link: '/products/' },
            { text: 'مشاريعنا', link: '/#frameworks-section' },
            { text: 'تواصل معنا', link: '/#final-cta-section' },
          ],
        },
      ],
    },
    outline: {
      level: [2, 3],
    },
    scrollBehavior: (to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded, savedPosition: { left: number; top: number } | null) => {
      if (savedPosition) {
        return savedPosition;
      }
      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth',
          top: 60
        };
      }
      return { top: 0, behavior: 'smooth' };
    },
  } as DefaultTheme.Config,
  transformPageData(pageData: PageData) {
    const canonicalUrl = `${ogUrl}/${pageData.relativePath}`
      .replace(/\/index\.md$/, '/')
      .replace(/\.md$/, '')
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.unshift(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageData.title }],
      ['meta', { name: 'description', content: pageData.frontmatter.description || ogDescription }],
    )
    return pageData
  },
  markdown: {
    codeTransformers: [transformerTwoslash()],
    config(md: MarkdownIt) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [],
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