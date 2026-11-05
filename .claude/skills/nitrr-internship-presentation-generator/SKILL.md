---
name: nitrr-internship-presentation-generator
description: Generates high-impact, professional academic PowerPoint presentations (.pptx) for B.Tech Internship Evaluations at NIT Raipur based on project reports and codebases. Enforces 16:9 widescreen layout, executive card design, certificate slide, screenshot placeholder frames, verified benchmark callouts, speaker notes, and python-pptx automation.
---

# NIT Raipur Department of Information Technology — Internship Presentation Generator Skill

This skill enforces strict academic presentation standards for B.Tech Information Technology Summer Internship Evaluations and Viva Voce at the National Institute of Technology Raipur (NIT Raipur).

## 1. Required Presentation Sequence (16-Slide Standard Deck)

The deck must strictly follow this exact 16-slide sequence:

1. **Slide 1: Title Slide (Dark Executive Theme)**
   - Header: National Institute of Technology Raipur, Department of Information Technology.
   - Title: Modern Web Architecture, Headless CMS Integration & High-Precision Quotation Management System (QMS).
   - Subtitle: End-to-End Core Web Vitals Optimization, Financial Math Engine & Automated Lead Ingestion Pipeline.
   - Presenter Metadata: Surya Tejas Kisan (Roll No: 23118098, 7th Sem B.Tech IT).
   - Supervision & Host: Guided by Dr. Suvendu Rup Sir (Associate Professor); Host: Traverse Globe (Dubai & India).
2. **Slide 2: Certificate of Project Completion**
   - Official certification card with academic and industrial verification text.
   - Signatures block: Dr. Suvendu Rup Sir, Industry Mentor, Head of Department, External Examiner.
   - Dedicated framed placeholder container (`5.4" x 5.1"`) to insert scanned Certificate image.
3. **Slide 3: Executive Overview & About the Organization**
   - Traverse Globe corporate profile, business model, boutique curation vs. mass OTAs.
   - Dual-market operations (India & UAE: INR & AED corridors) and ₹50k–₹2.5L family travel demographic.
4. **Slide 4: Problem Statement & Legacy Bottlenecks**
   - Critical Core Web Vitals failure (Mobile PageSpeed 42, CLS 0.28, LCP 4.4s).
   - Fragile screenshot-based PDF generation (html2canvas font overrides and gradient loss).
   - IEEE-754 float rounding bugs ("AED ₹ 12,500.00") and 4–8 hour manual lead entry delays.
5. **Slide 5: Project Objectives & Scope (The Dual Mandate)**
   - Track 1 (Consumer Portal): Pass Core Web Vitals (90+ Mobile / 95+ Desktop), eliminate CLS, custom GROQ client.
   - Track 2 (Enterprise QMS): BigInt integer minor-unit money math, zero-JS A4 vector print engine, real-time CRM sync.
6. **Slide 6: Technology Stack: Frontend, Backend, Services & Deployment**
   - Card 1 (Frontend): React 18, Vite 5, Tailwind CSS v3, Shadcn UI, Magic UI, Lenis.
   - Card 2 (Backend & Database): Astro 5, React Islands, TypeScript 5, Supabase (PostgreSQL 15, RLS, pgvector).
   - Card 3 (Services & Deployment): Sanity Headless CMS (GROQ), Cloudflare Pages & Workers, Google Apps Script.
7. **Slide 7: System Architecture & Data Synchronization**
   - 4-Tier decoupled architecture: React 18 SPA -> Sanity Content Lake -> Astro 5 QMS -> Supabase PostgreSQL.
8. **Slide 8: Database Structure & Schema Design**
   - PostgreSQL relational tables: `leads`, `call_responses`, `quotations`, `templates`, `catalog_products` with copy-on-add rule.
   - Sanity CMS schemas: `package`, `hotel`, `destination`, `banner`, `testimonial`.
9. **Slide 9: Key Features & Functionalities**
   - Consumer platform features: Dual-entry discovery hero, zero-CLS skeletons, intent BookingModal, sticky mobile bar.
   - Enterprise QMS & CRM features: Minor-unit pricing, zero-JS vector printing, CRM Kanban pipeline.
10. **Slide 10: End-to-End System Process Flow Diagrams**
    - Flow Diagram 1: Automated Event-Driven Lead Ingestion Pipeline (Meta Ads -> Sheets -> Apps Script -> Supabase).
    - Flow Diagram 2: Deterministic Quotation-to-Vector-PDF Generation Lifecycle (/print/[token] CSS Paged Media A4).
11. **Slide 11: User Interface & Experience: Consumer Travel Platform**
    - Dedicated screenshot placeholder frames:
      * Figure 11.1: Dual-Entry Hero Interface (Where to? + Theme Chips).
      * Figure 11.2: Structured Skeleton Loading vs. Hydrated Cards.
      * Figure 11.3: Contextual Lead Capture Modal & Sticky Mobile Booking Drawer.
12. **Slide 12: User Interface & Experience: Enterprise QMS & Sales CRM**
    - Dedicated screenshot placeholder frames:
      * Figure 12.1: Real-Time Sales CRM Kanban Lead Pipeline.
      * Figure 12.2: Deterministic A4 Vector Quotation Preview (`/print/[token]`).
13. **Slide 13: Performance Metrics & Cloud Deployment Architecture**
    - Before vs. After Core Web Vitals audit table: Mobile PageSpeed (42 -> 92+), CLS (0.28 -> 0.02), LCP (4.4s -> 1.7s), TBT (620ms -> 85ms), Bundle (680KB -> 240KB).
    - Cloudflare Pages, Workers, Render, and zero-cold-start hosting architecture.
14. **Slide 14: Key Achievements & Measurable Business Impact**
    - 4 large KPI callouts: Mobile PageSpeed `92+` (+119%), CLS `0.02` (Passed), Quote Time `2.5m` (-94%), Calculation Errors `0.00%`.
    - Business impact: 35% conversion lift, ~1.2s lead arrival, 100% sales team adoption.
15. **Slide 15: References, Standards & Repository Documentation**
    - Academic & Industry Literature: Google Web Vitals, React 18, Sanity GROQ, Astro, Martin Fowler Money Pattern.
    - Local Repository Docs: `Traverse-Globe/CLAUDE.md`, `DESIGN.md`, `REVAMP_PLAN.md`, `QMS/PRD.md`, `README_LEADS_SYNC.md`.
16. **Slide 16: Conclusion & Viva Voce Q&A (Dark Luxury Theme)**
    - Closing summary, repository pointers, acknowledgements to Dr. Suvendu Rup Sir, IT Dept NIT Raipur, and open Q&A.

---

## 2. Visual & Layout Design Rules (Modern Executive Aesthetics)

- **16:9 Widescreen Only:** `prs.slide_width = Inches(13.333)`, `prs.slide_height = Inches(7.5)`.
- **Palette Hierarchy:**
  - Backgrounds: Dark Accent (`#0F172A`) for Title & Conclusion slides; Clean Off-White (`#F8FAFC`) for content slides.
  - Cards: Crisp White (`#FFFFFF`) rounded rectangles with subtle 1pt border (`#E2E8F0`).
  - Text: Primary Charcoal (`#0F172A`), Secondary Slate (`#64748B`), Light (`#FFFFFF`).
  - Accents: Brand Orange (`#FF5B04`) for CTAs/kicking tags; Tech Blue (`#2563EB`) for technical tags; Green (`#16A34A`) for metrics.
- **Card-Based Layouts:** Avoid walls of bullet points. Use 2-column, 3-column, or 4-card grids with bold headers and concise explanations.
- **Screenshot Placeholder Frames:** Dedicated rounded rectangle containers with light slate background (`#F1F5F9`), slate border, centered prompt text, and formal caption below.
- **Embedded Speaker Notes:** Every single slide MUST include complete speaker notes in `slide.notes_slide.notes_text_frame.text` giving Surya Tejas Kisan ready-to-deliver viva speaking points.
- **Slide Footers:** Consistent hairline border, presenter metadata (`Surya Tejas Kisan | 23118098 | Traverse Globe`), and slide counter (`X / 16`).

---

## 3. Automation via `python-pptx`

The presentation is compiled programmatically using `python-pptx`:
- Generator Script: `generate_ppt.py` in the workspace root.
- To compile the presentation, run:
  ```bash
  python generate_ppt.py
  ```
- Output Target: `Surya_Tejas_Kisan_23118098_Traverse_Globe_Internship_Presentation.pptx`.
