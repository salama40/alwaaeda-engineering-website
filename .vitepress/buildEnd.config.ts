import path from 'node:path'
import { writeFileSync } from 'node:fs'
import { Feed } from 'feed'
import type { SiteConfig } from 'vitepress'
import { createContentLoader } from 'vitepress'

// --- 1. تحديث معلومات الموقع والمدونة ---
const siteUrl = 'https://alwaaeda-elevators.netlify.app' // **الأهم: تم التعديل ليطابق الدومين الحالي لموقعك على Netlify**
const blogUrl = `${siteUrl}/news` // تأكد أن هذا هو المسار الصحيح لقسم الأخبار/المدونة

export const buildEnd = async (config: SiteConfig): Promise<void> => {
  const feed = new Feed({
    // --- 2. تخصيص بيانات الـ RSS Feed للـ SEO (باللغة العربية) ---
    title: 'الهندسية الواعدة للمصاعد: حلول، تركيب وصيانة | Al-Waeda Engineering Elevators', // عنوان المدونة/الأخبار مع كلمات مفتاحية
    description: 'ابق على اطلاع بأحدث أخبار شركة الهندسية الواعدة للمصاعد. اكتشف مشاريعنا المبتكرة في تركيب، صيانة وتحديث جميع أنواع المصاعد (الركاب، البضائع، البانورامية). نقدم حلولاً متكاملة لأنظمة الأمان والجودة العالية في قطاع المصاعد.', // وصف غني بالكلمات المفتاحية
    id: blogUrl,
    link: blogUrl,
    language: 'ar', // تم التغيير إلى 'ar' للغة العربية
    image: `${siteUrl}/assets/alwaeda-og-image.jpg`, // رابط صورة كبيرة معبرة للمدونة (تأكد من وجودها)
    favicon: `${siteUrl}/favicon.ico`, // رابط أيقونة موقعك (تأكد من وجودها)
    copyright: 'حقوق النشر © 2023-present شركة الهندسية الواعدة للمصاعد. جميع الحقوق محفوظة.', // حقوق النشر لشركتك (تم تعديلها للغة العربية)
  })

  // --- 3. تغيير مسار المقالات (تأكد من صحة هذا المسار) ---
  const posts = await createContentLoader('news/*.md', { // تأكد لو مجلد الأخبار اسمه 'news' فعلاً
    excerpt: true,
    render: true,
  }).load()

  posts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date as string) -
      +new Date(a.frontmatter.date as string),
  )

  for (const { url, excerpt, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${siteUrl}${url}`,
      link: `${siteUrl}${url}`,
      description: excerpt,
      content: html,
      author: [
        {
          // --- 4. معلومات الكاتب الافتراضية (اختياري) ---
          name: (frontmatter.author && frontmatter.author.name) || 'فريق الهندسية الواعدة للمصاعد', // اسم الكاتب الافتراضي (عربي)
        },
      ],
      date: frontmatter.date,
    })
  }

  // هينتج ملف اسمه news.rss لو الـ blogUrl بقت /news (تأكد من استخدام 'news.rss' أو 'ar-news.rss' حسب رغبتك)
  writeFileSync(path.join(config.outDir, 'news.rss'), feed.rss2())
}