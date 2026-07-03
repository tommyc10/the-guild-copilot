export type BountyStatus =
  | "active"
  | "disputed"
  | "escrow_hold"
  | "imperial_risk"
  | "rumor_contaminated"

export type Bounty = {
  id: string
  target: string
  client: string
  status: BountyStatus
  reliability: string
  lastKnownLocation: string
  summary: string
  relatedRecords: string[]
  suggestedQuestion: string
}

export const activeBounties: Bounty[] = [
  {
    id: "GLD-C-003ABY-099",
    target: "Boba Fett",
    client: "Jabba Desilijic Tiure",
    status: "disputed",
    reliability: "Client-Submitted Claim",
    lastKnownLocation: "Nar Shaddaa",
    summary:
      "Open recovery claim filed after the carbonite-frozen Han Solo disappeared from clinic custody. The contract is valid, but Jabba's betrayal allegation is not independently proven.",
    relatedRecords: [
      "GLD-CON-003ABY-099",
      "GLD-TD-003ABY-101",
      "GLD-SRN-003ABY-100",
      "GLD-FCR-003ABY-102",
    ],
    suggestedQuestion:
      "Is Boba Fett proven to have betrayed Jabba, or is the archive only showing a disputed client claim?",
  },
  {
    id: "GLD-C-AQ-771-A",
    target: "Tavro Merik",
    client: "Amber Quay Recovery Concern",
    status: "imperial_risk",
    reliability: "Mixed Reliability",
    lastKnownLocation: "Worlport Transfer Yard, Ord Mantell",
    summary:
      "Active live-delivery posting tied to alleged permit-blank theft and duplicate bounty-puck materials. Imperial Customs interest and unreliable fob data raise the risk profile.",
    relatedRecords: [
      "GLD-ABP-3ABY-221",
      "GLD-CON-3ABY-220",
      "GLD-FCR-3ABY-224",
      "GLD-JW-3ABY-227",
      "GLD-TFRL-3ABY-229",
    ],
    suggestedQuestion:
      "What does the archive confirm about Tavro Merik, and what claims remain unverified?",
  },
  {
    id: "GLD-C-AQ-771-B",
    target: "Sella Rinn",
    client: "Amber Quay Recovery Concern",
    status: "escrow_hold",
    reliability: "Mixed Reliability",
    lastKnownLocation: "Nar Shaddaa Corellian Sector",
    summary:
      "Active posting over alleged escrow chit diversion. The bounty remains open, but duplicated fob seed data and incomplete ledger trails keep the case conflict-flagged.",
    relatedRecords: [
      "GLD-ABP-3ABY-222",
      "GLD-CON-3ABY-220",
      "GLD-BPL-3ABY-225",
      "GLD-TFRL-3ABY-229",
      "GLD-SRR-3ABY-231",
    ],
    suggestedQuestion:
      "What is Sella Rinn accused of, and does the archive prove she diverted escrow chits?",
  },
  {
    id: "GLD-C-PY-404",
    target: "Laro Peth",
    client: "Pyke Syndicate intermediary",
    status: "active",
    reliability: "Client-Submitted Claim",
    lastKnownLocation: "Kessel-adjacent cargo routes",
    summary:
      "Pyke recovery claim alleging diverted spice tithe crates and lien scrip. The filing is procedurally valid, but the Guild has not independently inspected the named freighter.",
    relatedRecords: [
      "GLD-CON-3ABY-236",
      "GLD-SRR-3ABY-231",
      "GLD-SRR-3ABY-234",
      "GLD-JW-3ABY-227",
    ],
    suggestedQuestion:
      "Is Laro Peth proven to have stolen Pyke cargo, or is this only a client-submitted claim?",
  },
  {
    id: "GLD-C-AQ-771",
    target: "Amber Quay Recovery Concern",
    client: "Ord Mantell Branch review",
    status: "rumor_contaminated",
    reliability: "Client-Submitted Claim",
    lastKnownLocation: "Ord Mantell / Nal Hutta payment route",
    summary:
      "Unreliable client shell behind the Merik and Rinn postings. Hutt-adjacent payment routing is confirmed, but beneficial ownership and syndicate control are not.",
    relatedRecords: [
      "GLD-CON-3ABY-220",
      "GLD-BMM-3ABY-230",
      "GLD-SRR-3ABY-231",
      "GLD-BPL-3ABY-225",
    ],
    suggestedQuestion:
      "Is Amber Quay controlled by the Hutt Clan, or does the archive only show Hutt-adjacent payment routing?",
  },
  {
    id: "GLD-JEKARA-SOLO",
    target: "Carbonite-frozen Han Solo",
    client: "Contested underworld claimants",
    status: "rumor_contaminated",
    reliability: "Conflicting",
    lastKnownLocation: "Jekara rumor market / Crimson Dawn auction reports",
    summary:
      "High-value carbonite custody dispute driving the War of the Bounty Hunters contract market. The archive tracks rumors and forged auction material but does not confirm current custody.",
    relatedRecords: [
      "GLD-CUA-3ABY-239",
      "GLD-SRR-3ABY-234",
      "GLD-CON-003ABY-099",
      "GLD-TD-003ABY-101",
    ],
    suggestedQuestion:
      "Does the archive prove who currently has the carbonite cargo, or is the custody chain still broken?",
  },
]
