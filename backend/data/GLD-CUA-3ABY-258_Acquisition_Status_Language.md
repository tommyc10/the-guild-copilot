# Copilot Usage Advisory: Acquisition Status Language

**Document ID:** GLD-CUA-3ABY-258
**Document Type:** Copilot Usage Advisory
**Classification:** Guild Internal
**Reliability Rating:** Procedural
**Date Filed:** Standard Date 3.8.14 ABY
**Filed By:** Guild Copilot Oversight Queue, Outer Rim Sector
**Primary Entities:** Guild Copilot, acquisition status, bounty postings, payout ledgers, transfer register
**Related Records:** GLD-GHN-3ABY-250, GLD-BPL-3ABY-252, GLD-BCV-3ABY-253, GLD-HLF-3ABY-257, GLD-CUA-3ABY-249

## Executive Summary

This advisory defines how Guild Copilot should describe acquisition status across bounty postings, hunter files, payout ledgers, and transfer registers. The assistant must use precise Guild language instead of collapsing every state into "captured," "active," or "paid."

The advisory matters because inaccurate status language causes payout confusion, hunter disputes, and overconfident answers. Copilot should treat status as a procedural lane, not a dramatic conclusion.

## Background

Guild records use several related but distinct states: posted, accepted, in pursuit, acquired, delivered, register pending, evidence credited, payout held, payout denied, arbitration, and cancelled. Each state has different consequences for hunters, clients, bondsmen, and branch masters.

Recent disputes show why precision matters. Vela Tann received an evidence credit but not capture payout. Ilyen Marr remained licensed despite a failed lead. Ressa Korr paid dues but did not become fully licensed. These distinctions should drive chatbot answers.

## Confirmed Intelligence

- Copilot should distinguish posted from accepted.
- Copilot should distinguish acquired from delivered.
- Copilot should distinguish evidence credited from completion payout.
- Copilot should distinguish register pending from payout denied.
- Copilot should distinguish applicant status from active license status.
- Copilot should cite the specific record that establishes each status.
- Copilot should refuse to infer status from nearby or similar records.

## Unverified Or Conflicting Reports

- User questions may use casual wording like "caught," "paid," or "cleared"; Copilot must translate to archive status when possible.
- Client claims may describe a target as guilty even when only posting status is confirmed.
- Hunter statements may describe evidence recovery as acquisition; bondsman ledgers may not agree.
- Branch rumors may describe application, probation, and suspension imprecisely.

## Operational Risk Notes

Copilot should answer with the narrowest supported status. If the archive only shows active posting, it must not say acquired. If the archive only shows register pending, it must not say paid or denied. When status is unclear, the assistant should say which record is missing.

## Source Passages

**Passage 1 - Section: Status Rule**  
"Copilot should distinguish posted from accepted."

**Passage 2 - Section: Payout Rule**  
"Copilot should distinguish evidence credited from completion payout."

**Passage 3 - Section: Register Rule**  
"Copilot should distinguish register pending from payout denied."

**Passage 4 - Section: Inference Rule**  
"Copilot should refuse to infer status from nearby or similar records."

## Entities Mentioned

- People: Vela Tann, Ilyen Marr, Ressa Korr
- Aliases: acquisition status
- Species/Droid Models: none
- Planets/Locations: Ord Mantell, Nar Shaddaa, Tatooine
- Factions: Bounty Hunters' Guild
- Ships: none
- Clients: Amber Quay Recovery Concern, unnamed clients
- Hunters: Vela Tann, Ilyen Marr, Ressa Korr
- Contract IDs: GLD-C-AQ-771-A, GLD-C-AQ-771-B

## Analyst Notes

Guild Copilot should treat this advisory as the behavior record for acquisition and payout terminology. It may use the listed status vocabulary when summarizing records, but it must cite the source record supporting each status.

## Recommended Chatbot Behavior

Use precise labels: posted, accepted, acquired, delivered, register pending, evidence credited, payout held, denied, arbitration, cancelled, applicant, probationary, active, suspended. Do not overstate status.
