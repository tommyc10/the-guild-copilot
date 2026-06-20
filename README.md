# The Guild Copilot

## Full-Stack GenAI Project Brief

**Project name:** The Guild Copilot  
**Product type:** Full-stack GenAI / RAG chatbot  
**Domain:** Fictional bounty hunter intelligence archive  
**Primary inspiration:** Document Copilot-style internal document assistant  
**MVP interface:** Simple ChatGPT/Claude-style chat UI with conversation history and cited answers  

The Guild Copilot is a full-stack GenAI application for querying a fictional Bounty Hunter Guild archive. It allows licensed Guild users to ask natural-language questions about bounty contracts, target dossiers, capture reports, clients, planets, factions, and risk records.

The assistant must answer only from the uploaded archive, cite its sources, show the supporting passages, and clearly refuse to guess when the evidence is missing or weak.

This is not intended to be a public Star Wars fan wiki. It is a serious internal intelligence product set in a Star Wars-inspired universe.

## Running The Project

This project is split into two apps:

- `backend/` - FastAPI backend managed with `uv`
- `frontend/` - React + TypeScript frontend managed with `npm`

Run the backend and frontend in separate terminal windows.

### Prerequisites

Install these before running the project:

- Python
- `uv`
- Node.js
- npm

Check the tools are available:

```bash
python3 --version
uv --version
node --version
npm --version
```

If `uv` is missing on macOS, install it with Homebrew:

```bash
brew install uv
```

### Run The Backend

From the project root:

```bash
cd backend
uv sync
uv run uvicorn app.main:app --reload
```

The backend runs at:

```text
http://127.0.0.1:8000
```

Health check:

```text
http://127.0.0.1:8000/health
```

FastAPI docs:

```text
http://127.0.0.1:8000/docs
```

If the root URL shows `{"detail":"Not Found"}`, that is normal unless a `/` route has been added. Use `/health` or `/docs`.

### Run The Frontend

Open a second terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend usually runs at:

```text
http://localhost:5173
```

### Development Workflow

Typical local development flow:

1. Start the backend with `uv run uvicorn app.main:app --reload`.
2. Start the frontend with `npm run dev`.
3. Use `http://127.0.0.1:8000/docs` to test backend endpoints.
4. Use `http://localhost:5173` to view the frontend.
5. Commit each milestone once it runs locally.

## Project Summary

The Bounty Hunter Guild manages dangerous contract work across the galaxy. Hunters and Guild analysts rely on scattered records before accepting, assigning, or investigating a bounty.

Those records may include target dossiers, failed capture reports, planetary risk assessments, syndicate advisories, client reliability files, docking-port sightings, and hunter after-action reports.

The problem is that this information is spread across many documents. Before accepting a contract, a hunter may need to manually search through pages of old reports just to answer basic questions:

- Has this target escaped hunters before?
- Is the client trustworthy?
- What was the last confirmed sighting?
- Which reports are verified, and which are rumors?
- Are there faction risks attached to this bounty?
- Does the archive prove the claim, or only suggest it?

The Guild Copilot reduces this research burden by turning the archive into a trusted, citation-backed chat assistant.

## The Client

The client is the **Bounty Hunter Guild**, a professional network that licenses hunters, manages bounty contracts, verifies intelligence, resolves disputes, and protects the Guild's reputation.

The Guild does not simply publish contracts. It provides the trust layer behind bounty work:

- It verifies clients.
- It stores target intelligence.
- It records failed and successful captures.
- It tracks hunter conduct.
- It warns members about dangerous territories.
- It keeps contract history.
- It arbitrates disputes over payment, proof, and capture claims.

The Guild's business depends on accurate intelligence. A false report can waste a hunter's time, damage the Guild's credibility, or get someone killed.

## How The Guild Makes Money

The Guild earns revenue through:

- Contract listing fees from clients posting bounties
- Commission on completed contracts
- Hunter licensing and membership dues
- Premium access to verified intelligence records
- Priority contract access for senior hunters
- Verification fees for high-risk contracts
- Dispute arbitration fees
- Reputation-backed payment enforcement

The Guild's value is not just access to jobs. Its value is access to trusted intelligence.

## The Problem

Guild analysts and hunters spend too much time searching the archive manually.

For any serious bounty, they may need to inspect:

- Target dossiers
- Active bounty contracts
- Closed bounty contracts
- Failed capture reports
- Planetary risk reports
- Known associate records
- Client reliability files
- Syndicate warnings
- Ship registry references
- Docking bay sightings
- Guild arbitration rulings
- Hunter after-action reports

This work is repetitive, slow, and easy to get wrong.

The biggest risk is not that hunters cannot find information. The biggest risk is that they find partial information and treat it as certainty.

The Guild needs a tool that can quickly summarize the archive while remaining strict about evidence.

## What They Want

The Guild wants an internal chatbot where a licensed user can:

- Ask questions in plain English
- Search across the Guild's curated archive
- Get direct answers grounded in documents
- See citations for every important claim
- Inspect the exact source passage
- Distinguish confirmed facts from rumors
- Identify contradictions between records
- Revisit previous conversations
- Trust the assistant to say "not enough evidence" when appropriate

The first version should be simple, clean, and focused on the core RAG workflow.

## Core Product Promise

> Ask the Guild Archive anything about a bounty, target, client, planet, faction, or prior capture attempt, and receive a sourced intelligence answer with the exact records behind it.

## Primary Users

### Junior Hunters

Junior hunters use the assistant to understand basic contract risk before accepting a bounty.

They ask:

- Is this target considered dangerous?
- Where was the target last confirmed?
- Has this bounty been attempted before?
- Are there known associates?
- Is the reward unusual for this kind of contract?

### Senior Hunters

Senior hunters use the assistant for high-value and high-risk contracts.

They ask:

- Which previous hunters failed and why?
- What patterns appear across prior sightings?
- Which source records are verified?
- Are there signs the client is hiding political motives?
- Which planets or factions introduce extra risk?

### Guild Analysts

Guild analysts maintain the archive and prepare official intelligence summaries.

They ask:

- Which documents support this target's risk rating?
- Are there contradictions between reports?
- Which claims are verified versus unverified?
- What changed between older and newer records?
- Which sources should be attached to an official bounty brief?

### Guild Administrators

Guild administrators manage access, documents, and system quality.

They need:

- User management
- Role-based access
- Document upload and deletion
- Processing status
- Conversation visibility
- Audit trails for sensitive queries

## MVP User Interface

The first UI should be a simple, clean chatbot inspired by ChatGPT, Claude, and the original Document Copilot project.

The MVP does not need a large dashboard, galaxy map, relationship graph, or cinematic interface. Those can come later.

The MVP should prioritize:

- Clear chat experience
- Fast document-grounded answers
- Visible citations
- Easy source inspection
- Saved conversation history
- Minimal friction

## Main UI Layout

### Left Sidebar

The left sidebar should contain:

- App identity: **The Guild Copilot**
- Subtitle: **Bounty intelligence assistant**
- New chat button
- Conversation history
- Groups such as Today, Yesterday, Previous
- User account area at the bottom

Example sidebar conversation titles:

- New investigation
- Kavos Ren sighting history
- Gorba contract risk
- Ord Mantell failed capture
- Crimson Dawn advisory

### Main Chat Area

The main area should contain:

- Current conversation title
- Chat messages
- User message bubbles
- Assistant responses
- Assistant search/status messages
- Source cards beneath answers
- Input box fixed near the bottom

Example input placeholder:

> Ask about targets, contracts, planets, or Guild records...

### Assistant Status Messages

The assistant should show short status updates while processing.

Examples:

- Searching Guild Archive...
- Reviewing target dossiers...
- Checking failed capture reports...
- Comparing source reliability...
- Looking for confirmed sightings...
- Checking for contradictory records...

These statuses make the app feel active without overcomplicating the interface.

## Visual Direction

The UI should feel like a professional intelligence tool used by bounty hunters.

It should be:

- Simple
- Clean
- Trustworthy
- Slightly in-universe
- Easy to scan
- More operational than decorative

Avoid making it look like a game menu or a Star Wars fan site.

### Suggested Color Direction

Use a restrained palette:

- Background: off-white, light grey, charcoal, or near-black
- Sidebar: subtle grey or dark panel
- Accent: muted amber, signal red, steel blue, or worn brass
- Text: high contrast and readable
- Citations: small, clean, and clearly clickable

The design should hint at the Star Wars-inspired setting without depending on official logos, copyrighted art, or excessive sci-fi decoration.

## Example Chat Flow

### User Question

What is known about Kavos Ren's last confirmed location?

### Assistant Search Status

Searching Guild Archive... target=Kavos Ren, records=target dossiers, sighting logs, failed captures

### Assistant Answer

Kavos Ren's last confirmed location is Docking Ring 7 on Ord Mantell, based on a verified Guild sighting log filed after the failed Sector 12 capture attempt. Two later reports mention Nar Shaddaa, but both are marked unverified and should not be treated as confirmed.

### Sources

**Target Dossier: Kavos Ren**  
Type: Target dossier  
Reliability: Verified Guild record  
Section: Last confirmed movement  

**Ord Mantell Docking Log**  
Type: Sighting log  
Reliability: Verified port record  
Entry: 1182  

**Failed Capture Report: Sector 12**  
Type: Hunter after-action report  
Reliability: Verified Guild record  
Section: Escape timeline  

## Source Display

Every meaningful answer should include source cards.

Each source card should show:

- Document title
- Document type
- Reliability rating
- Page, section, or entry number
- Short supporting passage
- Link or button to view the full source passage

Example source card content:

**Source:** Failed Capture Report - Sector 12  
**Type:** Hunter after-action report  
**Reliability:** Verified Guild record  
**Section:** Escape Pattern  
**Passage:** Target exited through the lower service corridor after disabling two tracker beacons.

## Example Corpus

The first demo corpus can be fictional documents created specifically for this project.

Suggested document types:

- Target dossiers
- Active bounty contracts
- Closed bounty contracts
- Failed capture reports
- Hunter after-action reports
- Planetary risk assessments
- Client reliability profiles
- Syndicate advisories
- Docking bay sighting logs
- Ship registry mentions
- Guild arbitration decisions
- Force-sensitive anomaly reports

## Example Document Names

- target-dossier-kavos-ren.md
- failed-capture-report-ord-mantell-sector-12.md
- client-risk-profile-gorba-the-hutt.md
- planetary-risk-tatooine-mos-espa.md
- guild-arbitration-case-8842-double-claim.md
- syndicate-advisory-crimson-dawn-remnants.md
- ship-registry-razor-class-patrol-craft.md
- force-anomaly-watchlist-outer-rim.md
- hunter-after-action-fennec-sector-incident.md
- closed-contracts-high-risk-targets-7aby-9aby.md

## Example User Questions

- What is known about Kavos Ren's last confirmed location?
- Which sightings of Kavos Ren are verified, and which are only rumors?
- Has this target previously escaped Guild hunters?
- What tactics did the target use in failed capture attempts?
- Which known associates are directly confirmed in the archive?
- Are any known associates only mentioned by unreliable sources?
- Compare the risk of pursuing this target on Tatooine, Ord Mantell, and Nar Shaddaa.
- Does the archive prove that the target is working with Crimson Dawn remnants?
- What prior contracts involved this client?
- Were there any payment disputes connected to this client?
- Are there signs that this bounty is politically motivated?
- Which documents mention Force-sensitive behavior?
- How reliable are the Force-sensitive claims?
- What weapons, ships, aliases, and companions are associated with the target?
- Are there contradictions between the target dossier and failed capture reports?
- Where should the assistant refuse to make a recommendation because the evidence is too weak?

## Trust Requirements

Trust is the most important part of the product.

The assistant must:

- Never invent facts
- Never use outside knowledge unless it is in the uploaded archive
- Cite every factual claim
- Show the exact supporting passage
- Distinguish confirmed facts from rumors
- Identify unreliable sources
- Highlight contradictions
- Say when evidence is missing
- Refuse unsupported conclusions
- Avoid pretending inference is fact

A confident false answer is worse than no answer.

## AI Boundaries

The assistant may:

- Summarize uploaded documents
- Compare records
- Extract names, planets, clients, aliases, ships, factions, and risks
- Identify contradictions
- Classify claims as verified or unverified
- Draft source-grounded pursuit briefs
- Explain why evidence is weak
- Recommend which source records a human should inspect

The assistant may not:

- Invent missing lore
- Use external Star Wars knowledge
- Claim a target is guilty without evidence
- Recommend lethal action
- Generate violent tactical plans
- Provide illegal infiltration instructions
- Treat rumors as confirmed facts
- Make decisions on behalf of a hunter

## Out Of Scope For MVP

The first version should not include:

- Live tracking
- Real-time ship telemetry
- Payment processing
- Public contract marketplace
- Mobile app
- Multi-tenant SaaS
- Galaxy map
- Relationship graph
- Automated bounty acceptance
- Weapons recommendations
- Lethal planning
- Official Star Wars data scraping

The MVP is a trusted document chatbot, not a full bounty marketplace.

## MVP Features

### Required

- User login
- Simple chat interface
- New chat creation
- Conversation history
- Document upload
- Document parsing
- Chunking and embedding
- Vector search
- Grounded answer generation
- Source citations
- Source passage display
- Basic admin document management

### Strong But Optional

- Role-based access
- Document metadata filters
- Reliability labels
- Conversation titles
- Low-confidence answer warnings
- Query status messages
- Basic evaluation questions
- Exportable source-grounded brief

## Suggested Roles

### Hunter

Can:

- Ask questions
- View permitted sources
- See their own chat history

Cannot:

- Upload documents
- Manage users
- Delete records

### Senior Hunter

Can:

- Ask questions
- View more sensitive sources
- Save investigation notes
- Generate brief drafts

### Analyst

Can:

- Upload documents
- Edit document metadata
- Review source quality
- Investigate contradictions

### Admin

Can:

- Manage users
- Manage documents
- Delete records
- View usage logs
- Configure system settings

## Suggested Document Metadata

Each document should eventually support metadata such as:

- Title
- Document type
- Target name
- Client name
- Planet
- Sector
- Faction
- Date or era
- Reliability rating
- Risk level
- Visibility level
- Uploaded by
- Upload date
- Processing status

## Suggested Reliability Labels

- Verified Guild record
- Confirmed port authority record
- Hunter-submitted report
- Client-submitted claim
- Unverified rumor
- Contradicted by later source
- Low-confidence intelligence
- Restricted record

## Success Criteria

The MVP is successful if a user can:

- Log in
- Start a new conversation
- Ask a question about the archive
- Receive a useful answer
- See citations
- Inspect the source passage
- Understand whether the answer is confirmed or uncertain
- Return to the conversation later

The product should prove that it can save time while improving trust.

## Pilot Definition Of Done

The Guild pilot is complete when five test users can use the app for a week and report that it:

- Reduces bounty research time
- Finds relevant records faster
- Makes source verification easy
- Correctly refuses unsupported claims
- Separates verified facts from rumors
- Helps prepare better bounty investigation briefs

## Project Positioning

The Guild Copilot is a portfolio-grade full-stack GenAI project showing:

- Retrieval-augmented generation
- Document ingestion
- Embeddings and vector search
- Authenticated user workflows
- Saved conversations
- Citation-backed answers
- Source inspection
- Trust-focused AI design
- A clean chatbot UI
- A fictional but coherent product domain

The engineering story is not "a Star Wars chatbot."

The engineering story is:

> A secure internal RAG assistant for high-trust document intelligence, set inside a fictional bounty hunter organization.

## Recommended Build Order

1. Create the frontend chat shell
2. Add static mock conversations
3. Add login/auth
4. Add backend health route
5. Add document upload
6. Add document parsing and storage
7. Add chunking
8. Add embeddings
9. Add vector search
10. Add chat endpoint
11. Add source citations
12. Add source passage viewer
13. Add conversation persistence
14. Add admin document page
15. Add reliability labels and refusal testing

## MVP Design Principle

Keep the first version boring in the right ways.

The interface should be simple enough that the AI behavior is the star:

- Did it retrieve the right records?
- Did it answer clearly?
- Did it cite sources?
- Did it refuse when evidence was missing?
- Could the user verify the answer?

Once that works, more cinematic Star Wars-inspired features can be added later.
