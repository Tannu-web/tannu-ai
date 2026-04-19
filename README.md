# tannu-ai
Tannu AI is a modern, fully responsive SaaS landing page for an Agentic AI-native Customer Interaction Platform. It is designed to help businesses automate their customer engagement across multiple channels like WhatsApp, Instagram, Web, Email, and Calls — all powered by artificial intelligence.

What Makes This Unique
Unlike typical SaaS landing pages, Tannu AI has:
Live Dashboard Mockup — The hero section features a fully designed interactive dashboard preview showing real-time chat conversations, active user stats, resolution counts, and satisfaction scores — giving visitors an instant feel of the product.
Working Login and Sign Up Modal — A real tabbed modal with Google OAuth button, email and password validation, forgot password flow, loading spinners, and an animated success screen. Most landing pages just link to external pages.
3-Step Book a Demo Form — A multi-page guided form inside a modal with a progress bar, field validation with shake animations on errors, clickable time slot picker, and a personalized confirmation message.
Animated Scroll Reveal — Every section fades and slides in as the user scrolls using the IntersectionObserver API — smooth, performant, and modern.
Infinite Ticker Strip — A seamlessly looping marquee of trusted company logos with pause-on-hover behavior.
Animated Floating Orbs — CSS keyframe-powered glowing orbs in the hero that drift and pulse, creating depth without any JavaScript.
Bold Design Identity — Custom Sora and DM Sans font pairing, deep navy background, purple and teal gradient accents, noise texture overlay, and glassmorphism card surfaces — nothing generic.

Project Structure
tannu-ai/
├── index.html          <- Complete website (single file, all HTML + CSS + JS)
└── README.md           <- This file
Everything — structure, styles, and interactivity — lives in one clean index.html file. No build step. No npm install. No configuration needed.

How to Run Locally
Option 1 — Open Directly
Just open index.html in your browser. No setup needed.
Option 2 — VS Code Live Server

Install VS Code
Install the "Live Server" extension
Right-click index.html and select "Open with Live Server"

Option 3 — Python HTTP Server
bashcd tannu-ai
python3 -m http.server 8080
# Open http://localhost:8080

Deploy Live for Free
Option A — GitHub Pages
bash# Step 1: Create a new repo on github.com called tannu-ai

# Step 2: In your project folder run these commands
git init
git add .
git commit -m "Initial commit: Tannu AI website"
git branch -M main
git remote add origin (https://github.com/Tannu-web/tannu-ai)
git push -u origin main

# Step 3: Go to your repo on GitHub
# Settings -> Pages -> Source: Deploy from branch -> main -> / (root) -> Save
# Your site will be live at: (https://github.com/Tannu-web/tannu-ai)
Option B — Vercel
bash# Step 1: Push to GitHub using the commands above

# Step 2: Go to https://vercel.com
# Click "Add New Project"
# Import your GitHub repo
# Click Deploy
# Your site will be live at: tannu-ai.vercel.app
Option C — Netlify

Go to https://netlify.com
Drag and drop your index.html file into the Netlify dashboard
Your site is instantly live with a public URL


Code Explanation
index.html — Structure

Navbar: Fixed top bar with logo, navigation links, Login button, and Book a Demo button. Background darkens on scroll.
Hero: Full-height section with animated floating orbs, headline, subtext, CTA buttons, and a dashboard mockup with live-looking chat UI and stat cards.
Trusted Brands: Infinite auto-scrolling ticker strip of company name pills with pause on hover.
Features: 6-card responsive grid covering AI Chatbots, 360 Customer Profiles, Workflow Automation, Knowledge Base, Analytics, and Integrations.
How It Works: 4-step process with gradient numbered circles and descriptions.
Integrations: 20-pill grid of supported platforms including WhatsApp, Shopify, Slack, Gmail, OpenAI, Gemini, and more.
Pricing: 3-tier cards — Starter Free, Growth Rs.2999/month, Enterprise Custom — with full feature lists.
Testimonials: 3 customer review cards with colored avatars and feedback text.
CTA Banner: Gradient-bordered full-width section with radial glow background effect.
Footer: 4-column link grid with brand description and copyright.

CSS (inside index.html) — Design

Uses CSS custom properties via :root for complete theme control from one place
Flexbox and CSS Grid for all layouts — no Bootstrap or utility framework needed
@keyframes for orb float animations, ticker scroll, ripple click effects, pop-in success icons, and shake error animations
Media queries at 768px for full mobile responsiveness
.reveal class combined with IntersectionObserver for performant scroll animations
Glassmorphism surfaces using rgba backgrounds and backdrop-filter blur
Noise texture overlay using inline SVG feTurbulence filter for premium visual depth

JavaScript (inside index.html) — Functionality

Navbar: Watches scroll position and updates background opacity for a polished sticky effect
Scroll Reveal: IntersectionObserver monitors all .reveal elements and triggers fade-up transitions
Stagger Delays: Feature cards, testimonials, pricing cards, and integration pills animate in sequence using transition-delay
Login Modal: Handles tab switching between Log In and Sign Up, input validation, Google OAuth simulation, forgot password flow, loading states, and success screen
Demo Modal: Manages 3-step form navigation, per-step field validation, step dot progress indicator, time slot selection, shake animation on errors, and personalized success confirmation
Ripple Effect: Global click listener creates ripple spans on all buttons for tactile feedback
Modal Accessibility: Closes on overlay click and on Escape key press


Key Features to Highlight
FeatureWhy It Stands OutWorking login and signup modalReal validation, tabs, Google auth, success screen3-step demo booking formMulti-page with progress bar and time slot pickerHero dashboard product previewGives visitors an instant product feelInfinite brand tickerBuilds social proof with smooth looping animationScroll-triggered animationsModern and performant using IntersectionObserverZero dependenciesLoads instantly, no framework overheadSingle file architectureEasy to deploy anywhere, nothing to configureCSS variable themingEntire color scheme changeable in one place

Competitive Edge
FeatureStandard SaaS SitesTannu AIWorking login modal on landing pageNoYesMulti-step demo booking formNoYesHero dashboard product previewNoYesScroll-triggered animationsRarelyYesIndia-focused pricing in rupeesNoYesZero framework load timeSlowFastSingle file deploymentNoYes

Customization Guide
Change the brand name
Search and replace "Tannu AI" with your own name throughout index.html.
Change colors
Edit the CSS variables at the top of the style block:
css:root {
  --bg: #09090f;        /* Page background */
  --accent: #7c5cfc;    /* Primary purple */
  --accent2: #c084fc;   /* Light purple */
  --accent3: #06d6a0;   /* Teal green */
  --text: #f0eeff;      /* Main text */
  --muted: #8880a8;     /* Muted text */
}
Change fonts
Replace the Google Fonts link in the head tag with any font from fonts.google.com.
Update pricing
Find the Pricing section in index.html and update the plan names, amounts, and feature list items.
Add real links
Replace all href="#" placeholders in the navbar and footer with your actual page URLs.

Tech Stack
TechnologyUsageHTML5Page structure and semantic markupCSS3Styling, animations, grid and flexbox layoutsVanilla JavaScriptModal logic, form validation, scroll animationsGoogle FontsSora for headings, DM Sans for body textCSS Custom PropertiesFull theme control via :root variablesIntersectionObserver APIScroll-triggered reveal animationsCSS KeyframesOrb floats, ticker scroll, ripple, shake effects
No npm. No build tools. No frameworks. Just open and run.

License
This project is licensed under the MIT License. You are free to use, modify, and distribute it.
MIT License 2026 Tannu

Author
Tannu
Website:/C:/Users/tannu/Downloads/tannu-ai.html
GitHub: (https://github.com/Tannu-web/tannu-ai)
LinkedIn: (https://www.linkedin.com/in/tannu-rawat-b98126233/)

