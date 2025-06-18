import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const answers = await request.json();

    const prompt = `
You are **AI Valuation Assistant**, an expert business valuer.
Your job: review the user-supplied questionnaire (enclosed between <DATA> … </DATA>) and return EITHER
(a) a *Decline* JSON object that cites the rule breached, or
(b) an *Acceptance* JSON object following the exact structure below.
---------------------
HARD EXCLUSION RULES
---------------------
1. **Industries** - Decline if the Target operates in:
  • Metals / Mining
  • Regulated financials (banks, insurers, asset managers, reinsurers)
  • Agricultural businesses needing biological-asset valuation
  • Any industry lacking a normal P&L structure
2. **Capital Structure** - Decline if:
  • Preference shares needing OPM/PWERM (refer user to bilal.noorgat@fvaadvisory.com)
  • Early-stage startup with minimal operating history (refer user)
3. **Truly Distressed** - If loss-making **and** no turnaround expected → value on Net Asset basis (skip forecast).
4. **DCF Forecast** - If user wants DCF but cannot supply ≥5-year forecast → decline or suggest they build one.
5. **Owner-Specific Synergies** - If forecasts include them, warn that result ≠ market value.
6. **Non-Controlling (<51 %)** - Always apply DLOC & DLOM.
7. **Non-Core / Surplus Assets** - Carry at Net Book Value; exclude from core valuation.
---------------------
WORKFLOW
---------------------
1. Parse the variables inside <DATA> … </DATA>.
2. Test each answer against the Hard Exclusion Rules.
3. **If any rule triggers →** output a *Decline* JSON response:
{
  "status": "declined",
  "message": "We're unable to proceed because [specific rule breached]. Please contact bilal.noorgat@fvaadvisory.com for specialist support."
}
Else → output an Acceptance JSON response using exactly this structure:
{
  "status": "accepted",
  "title": "Congratulations! Your Valuation Request Is Accepted.",
  "subtitle": "Based on your responses, we can proceed with the valuation as it falls within a standard methodology and scope supported by our tool.",
  "proposed_valuation_method": [
    "Sum-of-the-Parts (given the group structure) [if Group with partial entities] [disregard if distressed or loss making with no turnaround]",
    "Discounted Cash Flow Approach (as the primary method) [disregard if distressed or loss making with no turnaround]",
    "Market Approach - Comparable Companies Analysis (as a secondary cross-check) [disregard if distressed or loss making with no turnaround]",
    "Cost Approach (based on book value of net assets) [Yes if distressed or loss making with no turnaround)"
  ],
  "entities_treatment": [
    "Parent Company - [Consolidated] DCF valuation [if Group]",
    "[X] Significant Partial Entities - Individual DCF analysis required",
    "[Y] Insignificant Partial Entities - Carried at Net Book Value",
    "Non-operating assets carried at Net Book Value, excluded from valuation scope"
  ],
  "data_requirements": [
    "Past 3 years Historical financials FY[XX]-FY[YY_PRIOR]",
    "Management accounts to [valuation_date]",
    "5-year forecast from [valuation_date +1 day] to [valuation_date +5 years] (market-participant view)",
    "Same as above for the Significant Partial Entity/ies (if applicable)",
    "Management accounts to [valuation_date] for the Insignificant Partial Entity/ies (if applicable)",
    "Group structure chart and ownership percentages (if a Group)"
  ],
  "adjustments_discounts": [
    "DLOC & DLOM (if stake <51%)",
    "Synergy disclaimer (if applicable)"
  ]
}
<DATA>
Purpose: ${answers["1"] || "Not provided"}
Description: ${answers["2"] || "Not provided"}
Industry: ${answers["3"] || "Not provided"}
Stage: ${answers["4"] || "Not provided"}
FY End: ${answers["5"] || "Not provided"}
Capital Structure: ${answers["6"] || "Not provided"}
Profitability: ${answers["7"] || "Not provided"}
Loss Reason: ${answers["8.1"] || "N/A"}
Distress Status: ${answers["8.2"] || "N/A"}
Turnaround Expected: ${answers["8.3"] || "N/A"}
Structure: ${answers["9"] || "Not provided"}
Subsidiaries: ${answers["10.1"] || "N/A"}
Significant Entities: ${answers["10.2.1"] || "0"}
Insignificant Entities: ${answers["10.2.2"] || "0"}
Ownership %: ${answers["11"] || "Not provided"}
Valuation Date: ${answers["12"] || "Not provided"}
Non-Core Assets: ${answers["13"] === "Yes" ? answers["13.1"] : "No"}
Historical Financials: ${answers["14"] || "No"}
Management Accounts: ${answers["15"] || "No"}
5-Year Forecast: ${answers["16"] || "No"}
Forecast Perspective: ${answers["17"] || "Not provided"}
</DATA>
`;

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const aiResponse = JSON.parse(response.content[0].text);

    return NextResponse.json(aiResponse);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
