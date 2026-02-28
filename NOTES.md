# Portfolio Improvement Notes

## What Was Done (March 2026)

### 1. Bug Fixes
- **ESLint config**: Fixed invalid severity value with trailing comma
- **Hero typing animation**: Moved `roles` array outside component to prevent infinite re-render loop; removed from useEffect dependency array
- **Unused import**: Removed `StaticImageData` from `src/data/project.tsx`
- **React keys**: Replaced all index-based keys with unique identifiers across 7+ components (skills, project, contact, experience, education, projects page)

### 2. Skills Section Update
- Removed duplicate Next.js entry
- Added 9 new skills: Vue, Nuxt, Flutter, Dart, WebSocket, Redis, Cache, Nginx, PM2
- Total skills: ~26 technologies

### 3. CV Download Button
- Added "Download CV" button with download icon in hero section
- Links to `/assets/resume.pdf` with native download attribute
- **Action needed**: Place actual resume PDF at `public/assets/resume.pdf`

### 4. Performance Optimization
- Converted static components to server components (removed `"use client"` from `about.tsx`, `skills.tsx`, `experience.tsx`, `page.tsx`)
- Added `sizes` prop to all `<Image fill>` components for better responsive image loading
- Reduced font weight variants from 8 to 5 (removed 100, 200, 300)
- Enhanced SEO metadata with keywords and OpenGraph configuration

### 5. Contact Form (Resend Email)
- Created `/api/send-email` POST endpoint with input validation
- Integrated Resend SDK for email delivery (lazy initialization to avoid build-time crash)
- Emails sent to `drome.emord@gmail.com` with visitor's email as reply-to
- Form includes: first name, last name, email, phone, service dropdown, subject, message
- Shows loading, success, and error states
- **Action needed**: Set `RESEND_API_KEY` in `.env.local`

### 6. Services Removal & Blog Implementation
- Deleted services page and data files
- Updated navigation: Blog now visible, Services removed
- Blog system powered by Google Sheets as CMS (serverless, no database)
- ISR revalidation every 300 seconds
- Blog listing page with card grid layout
- Blog detail page with markdown rendering (react-markdown + remark-gfm + rehype-highlight)
- Latest 3 blog posts shown on homepage after projects section
- **Action needed**: Set `GOOGLE_SHEET_ID` and `GOOGLE_SHEETS_API_KEY` in `.env.local`
- **Action needed**: Create Google Sheet with columns: title, slug, date, tags, summary, content

### 7. UI Additions
- "Send Me a Message" button in homepage contact section linking to `/contact`
- "View All Posts" button in blog section (shows when >3 posts)

---

## Environment Variables Needed

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
GOOGLE_SHEET_ID=your-google-sheet-id
GOOGLE_SHEETS_API_KEY=your-google-sheets-api-key
```

See `.env.example` for template.

---

## New Dependencies Added

| Package | Purpose |
|---------|---------|
| `resend` | Email delivery for contact form |
| `react-markdown` | Render markdown blog content |
| `remark-gfm` | GitHub Flavored Markdown support |
| `rehype-highlight` | Syntax highlighting in code blocks |
| `@tailwindcss/typography` | Prose styling for blog posts |

---

## TODO / Future Improvements

### High Priority
- [ ] Place resume PDF at `public/assets/resume.pdf`
- [ ] Configure Resend API key and test contact form
- [ ] Set up Google Sheets for blog and configure API keys
- [ ] Test blog post creation workflow end-to-end

### Features
- [ ] Add dark/light mode toggle
- [ ] Add page transition animations between routes
- [ ] Add search/filter functionality to blog listing
- [ ] Add reading time estimate to blog posts
- [ ] Add table of contents for long blog posts
- [ ] Add RSS feed for blog (`/blog/rss.xml`)
- [ ] Add sitemap.xml generation
- [ ] Add confirmation email to visitors after contact form submission
- [ ] Add CAPTCHA or rate limiting to contact form to prevent spam

### Performance
- [ ] Add loading skeletons for blog posts
- [ ] Implement image optimization for blog content images
- [ ] Consider adding `next/dynamic` for heavy client components
- [ ] Add Lighthouse CI to measure performance regression

### Content
- [ ] Write first blog post to test the system
- [ ] Update project data with latest projects
- [ ] Add testimonials or recommendations section
- [ ] Consider adding a "What I'm Currently Learning" section

### DevOps
- [ ] Set up Vercel preview deployments for PRs
- [ ] Add GitHub Actions for lint + build checks on PR
- [ ] Consider adding Sentry for error monitoring
- [ ] Set up analytics (Vercel Analytics or Plausible)
