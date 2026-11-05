---
name: nitrr-internship-report-generator
description: Generates formal, publication-grade academic internship reports for the Department of Information Technology at National Institute of Technology Raipur (NIT Raipur). Enforces strict pure-black monochrome typography, multi-level hierarchical section numbering (1.1, 1.2), A4 print dimensions, well-defined bordered tables, and UI screenshot placeholder boxes.
---

# NIT Raipur Department of Information Technology — Internship Report Generator Skill

This skill enforces strict academic publishing standards for B.Tech Information Technology Summer Internship reports at the National Institute of Technology Raipur (NIT Raipur).

## 1. Document Formatting Constitution (Strict Academic Monochrome)

1. **Monochrome Typography (100% Black Text Only):**
   - **No Colored Text**: Banned are blue, orange, red, or navy headings/body fonts. All runs must resolve to pure black: `RGBColor(0, 0, 0)` or `#000000`.
   - **Body Text**: Times New Roman, 12pt, 1.2 line spacing, fully justified (`WD_ALIGN_PARAGRAPH.JUSTIFY`), 6pt space after paragraphs.
   - **Headings**:
     - `Heading 1`: Times New Roman, 16pt, Bold, Pure Black (`#000000`), 14pt space before, 6pt space after, page-break before each major chapter.
     - `Heading 2`: Times New Roman, 13.5pt, Bold, Pure Black (`#000000`), 12pt space before, 4pt space after.
     - `Heading 3`: Times New Roman, 12pt, Bold, Pure Black (`#000000`), 8pt space before, 3pt space after.

2. **Physical Page Geometry (A4 Print Standard):**
   - **Page Size**: Strict International A4: `8.27 inches` (210 mm) width $\times$ `11.69 inches` (297 mm) height.
   - **Margins**: Exactly `1.0 inch` (72 pt / 1440 dxa) on all 4 sides (Top, Bottom, Left, Right).
   - **Page Numbering**: Formatted in Footer, centered, Times New Roman 10pt, pure black, using standard Word dynamic XML page fields (`w:fldChar` / `w:instrText PAGE`).

3. **Well-Defined Tables:**
   - **Explicit Black Borders**: Solid 1pt (`w:sz="8"`) black border (`#000000`) on all exterior edges (`top`, `bottom`, `left`, `right`) and 0.5pt (`w:sz="4"`) internal gridlines (`insideH`, `insideV`).
   - **Table Headers**: Light grayscale shading (`#E5E5E5`), pure black bold text (`Pt(11)`), centered alignment.
   - **Alternating Rows**: Subtle light gray zebra striping (`#F9F9F9` on odd rows, `#FFFFFF` on even rows).

4. **UI Screenshot & Image Placeholders:**
   - Must provide dedicated single-cell callout boxes with:
     - 1pt dashed black border (`w:val="dashed"`).
     - Light gray background (`#F8F8F8`).
     - Centered text: `[PHOTO / SCREENSHOT PLACEHOLDER]`, recommended dimensions (e.g., `6.0 in x 3.0 in`), and prompt for the user.
     - Formally numbered caption directly below: `Figure X.Y: [Figure Title]` in 10.5pt Bold Black, followed by a 2-sentence italicized descriptive paragraph.

---

## 2. Table of Contents & Hierarchical Numbering Specification

The report must feature an exact hierarchical index with multi-level numbering (`1.`, `1.1`, `1.2`, `8.1`, `8.2`, `10.1`, etc.) and dot-leader formatting matching the NIT Raipur template:

| Section | Title & Subsections | Page |
| :--- | :--- | :---: |
| **—** | **Title Page** (NIT Raipur, Dept of IT, Roll No: 23118098, Guide: Dr. Suvendu Rup Sir) | **1** |
| **—** | **TABLE OF CONTENTS** (Hierarchical numbering with dot leaders) | **2** |
| **1.** | **Acknowledgement** | **3** |
| **2.** | **Certificate of Project Completion** (Includes Scanned Certificate Frame) | **4** |
| **3.** | **About the Organization** | **5** |
| | 3.1 Corporate Profile and Operating Philosophy | 5 |
| | 3.2 Dual-Market Scope (India & UAE Tourism) | 5 |
| **4.** | **Abstract** | **6** |
| **5.** | **Introduction** | **7** |
| | 5.1 Background & Digital Travel Landscape | 7 |
| | 5.2 Project Objectives & Technical Scope | 7 |
| **6.** | **System Requirements & Problem Statement** | **8** |
| | 6.1 Problem Statement & Legacy Pain Points | 8 |
| | 6.2 Functional & Non-Functional Specifications Matrix | 8 |
| **7.** | **Technology Stack** | **9** |
| | 7.1 Traverse Globe Consumer Platform | 9 |
| | 7.2 Quotation Maker Service (QMS) & CRM | 10 |
| **8.** | **System Architecture** | **10** |
| | 8.1 High-Level Multi-Tier Architectural Topology (Figure 8.1) | 10 |
| | 8.2 Automated Event-Driven Lead Ingestion Pipeline (Figure 8.2) | 11 |
| | 8.3 Zero-JS Paged Media Vector PDF Architecture | 12 |
| **9.** | **Database Structure & Schema** | **13** |
| | 9.1 Relational Database Schema (Supabase PostgreSQL - Figure 9.1) | 13 |
| | 9.2 Headless CMS Document Schemas (Sanity.io) | 13 |
| **10.** | **Key Features & Functionalities** | **14** |
| | 10.1 High-Performance Consumer Web Platform | 14 |
| | 10.2 Contextual Lead Capture & CRO Optimizations | 15 |
| | 10.3 Precision Financial & Pricing Engine (QMS) | 15 |
| | 10.4 CRM Lead Pipeline & Agent Workflow | 16 |
| **11.** | **Code Structure & Implementation** | **17** |
| | 11.1 Repository Organization | 17 |
| | 11.2 Key Implementation Highlights (Custom GROQ Client, BigInt Math) | 17 |
| **12.** | **User Interface & Experience** | **18** |
| | 12.1 Design Philosophy & Human UI (Figures 12.1, 12.2) | 18 |
| | 12.2 Design System Tokens & Semantic Styling | 19 |
| | 12.3 Conversion Rate Optimization & Enterprise CRM UI (Figures 12.3 - 12.5) | 20 |
| **13.** | **Conclusion & Measurable Impact** | **22** |
| | 13.1 Measurable Technical & Business Impact Matrix (Figure 13.1) | 22 |
| | 13.2 Key Learnings & Future Enhancements | 22 |
| **14.** | **References** (Formal IEEE Citation Bibliography) | **23** |

---

## 3. Reference Data Sources in the Workspace

When writing or expanding content, always cross-reference these local files:
- **Consumer Portal (`Traverse-Globe/`)**:
  - `CLAUDE.md`: Core Web Vitals guardrails (CLS $\le 0.05$, LCP $\le 2.0s$, TBT $\le 150ms$), lightweight GROQ fetch client, font-fallback definitions.
  - `DESIGN.md`: Human UI design system, color tokens, button treatments.
  - `REVAMP_PLAN.md`: Dual-entry search architecture, theme curation, CRO strategy.
  - `revamp-screenshots/`: Baseline vs Phase 1 desktop and mobile screenshots for UI analysis.
- **Quotation Maker Service (`QMS/`)**:
  - `PRD.md`: Full product specification, BigInt minor-unit money math, paged-media CSS vector PDF rules.
  - `PROGRESS.md`: Implemented features, Vitest coverage, allocation math.
  - `README_LEADS_SYNC.md`: Google Sheets middleware + Apps Script webhook trigger pipeline.
  - `supabase/migrations/`: SQL DDL schemas for `leads`, `call_responses`, `quotations`, `templates`, `tasks`, and `catalog_products`.
- **Existing Python Generator**:
  - `generate_report.py`: Programmatic script that generates the complete `.docx` file using `python-docx`. Run `python generate_report.py` to regenerate the document.

---

## 4. How Claude Code Must Execute This Skill

When tasked with generating, revising, or updating the report:
1. Load `generate_report.py` in the workspace root.
2. Read the user's specific performance numbers or text edits.
3. Update `generate_report.py` to embed the new metrics, verified schemas, and screenshot callouts.
4. Run `python generate_report.py` in the terminal to compile the `.docx` document.
5. Verify that the output document `Surya_Tejas_Kisan_23118098_Traverse_Globe_Internship_Report.docx` compiles cleanly without errors.
