import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const answers = await request.json();

    const prompt = `
You are **AI Valuation Assistant**, an expert business valuer. You must always respond with valid JSON format only.

### INSTRUCTIONS:
1. Carefully review the user-supplied questionnaire data between <DATA></DATA> tags
2. Apply all exclusion rules exactly
3. Return ONE of these JSON structures:

#### DECLINED RESPONSE (if any rule is breached):
{
  "status": "declined",
  "reason": "Specific rule that was breached",
  "rule_number": 1-7
}

#### ACCEPTED RESPONSE (if all rules pass):
{
  "status": "accepted",
  "valuation_methods": {
    "primary": "DCF",
    "secondary": ["Market multiples", "Cost Approach (if applicable)"],
    "notes": ["Sum-of-the-Parts if Group", "Net Assets if distressed"]
  },
  "entities_treatment": [
    "Parent Company - Consolidated DCF",
    "[X] Significant Partial Entities - Individual DCF",
    "[Y] Insignificant Partial Entities - NBV",
    "Non-core assets at NBV"
  ],
  "data_requirements": [
    "3 years historical financials (FYXX-FYXX)",
    "Management accounts to [valuation_date]",
    "5-year forecast (market participant view)",
    "Group structure chart (if Group)"
  ],
  "adjustments": [
    "DLOC/DLOM if stake <51%",
    "Synergy disclaimer if applicable"
  ]
}

### HARD EXCLUSION RULES:
1. Industries:
   - Metals/Mining
   - Regulated financials (banks, insurers, asset managers)
   - Agricultural businesses needing biological-asset valuation
   - Industries lacking normal P&L structure

2. Capital Structure:
   - Preference shares needing OPM/PWERM
   - Early-stage startups with minimal operating history

3. Truly Distressed:
   - Loss-making AND no turnaround expected → Use Net Asset basis

4. DCF Forecast:
   - Must provide ≥5-year forecast for DCF

5. Owner-Specific Synergies:
   - Warn if forecasts include them (≠ market value)

6. Non-Controlling (<51%):
   - Always apply DLOC & DLOM

7. Non-Core Assets:
   - Carry at Net Book Value, exclude from core valuation

### DATA REQUIREMENTS:
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

### IMPORTANT:
- Respond ONLY with valid JSON
- No additional commentary or markdown
- For accepted cases, fill all sections (use empty arrays if no items)
- Replace [X], [Y], [valuation_date] etc. with actual values
- Strictly follow the specified JSON schema
- Never include any text outside the JSON object
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
