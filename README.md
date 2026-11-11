# Kreatty

A responsive one-page website for Kreatty, an influencer marketing and creator partnership agency. Built with Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, and Resend.

## Requirements

- Node.js 20.9 or newer
- A Resend account and a verified sending domain

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and set the environment variables described below.
3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Resend email setup

The contact API sends both brand and creator enquiries to `CONTACT_EMAIL`. It does not report success unless Resend accepts the email.

1. Add your sending domain in the [Resend Domains dashboard](https://resend.com/domains).
2. Add the DNS records Resend provides at your domain registrar. Verify the domain in Resend after DNS propagates.
3. Create an API key in the Resend dashboard.
4. Set the environment variables:

   ```env
   RESEND_API_KEY=re_...
   CONTACT_EMAIL=hello.kreatty@gmail.com
   EMAIL_FROM=Kreatty <enquiries@your-verified-domain.com>
   ```

   `EMAIL_FROM` must use the verified domain. Do not use the visitor's address as the sender; it is set as `replyTo` so replies go to the person who submitted the form. Never expose the API key to the browser or commit it to source control.

5. Submit a test enquiry from the website. Check the Resend email logs and the `CONTACT_EMAIL` inbox. If email delivery isn't configured or Resend rejects delivery, the form displays an error instead of a success message.

The API validates both enquiry types server-side, has a hidden honeypot field and applies a basic per-IP in-memory rate limit. On serverless platforms, this in-memory limit is best-effort and resets between instances.

## Deploy to Vercel

1. Push the project to a Git provider and import it in [Vercel](https://vercel.com/new).
2. Keep the framework preset as Next.js and use the default build command (`next build`).
3. Add `RESEND_API_KEY`, `CONTACT_EMAIL`, and `EMAIL_FROM` in **Project Settings → Environment Variables** for each environment you deploy.
4. Redeploy after adding or changing environment variables.
5. Submit a test brand enquiry and a test creator enquiry on the deployed site, then confirm both arrive at `CONTACT_EMAIL`.

## Project structure

```text
app/
  api/contact/route.ts  Server-side validation and Resend delivery
  globals.css           Responsive design system and page styles
  layout.tsx            Root layout and SEO metadata
  page.tsx              Single-page site and sections
components/
  contact-form.tsx      Brand and creator enquiry form
  flowing-mesh.tsx      Lightweight decorative mesh illustration
  logo.tsx              Kreatty wordmark and monogram
```

Social links in the footer are editable placeholders. Replace them with Kreatty's official profile URLs before launch.
