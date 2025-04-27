import { type NextRequest, NextResponse } from "next/server"
import { kpiData } from "@/data/kpi-data"

export async function POST(req: NextRequest) {
  try {
    const { reportText } = await req.json()

    if (!reportText) {
      return NextResponse.json({ error: "Report text is required" }, { status: 400 })
    }

    // In a real implementation with AI SDK, we would use:
    /*
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Analyze this business report for terminology misalignments across departments:
              ${reportText}
              
              Use this list of known conflicting metrics as reference:
              ${JSON.stringify(kpiData.conflictingMetrics.map(m => ({
                name: m.name,
                teams: m.teams,
                definitions: m.definitions.map(d => `${d.team}: ${d.definition}`).join('; ')
              })))}
              
              Identify terms in the report that might be defined differently across departments.
              Format your response as JSON with the following structure:
              {
                "misalignments": [
                  {
                    "term": "term used",
                    "context": "how it was used in the report",
                    "department": "which department perspective this represents",
                    "issue": "explanation of the potential misalignment",
                    "severity": "high/medium/low"
                  }
                ],
                "summary": "brief summary of findings"
              }`,
    });
    
    const analysis = JSON.parse(text);
    */

    // For demo purposes, we'll simulate the analysis
    const mockAnalysis = {
      misalignments: [],
      summary: "",
    }

    // Check for mentions of conflicting metrics in the report
    kpiData.conflictingMetrics.forEach((metric) => {
      if (reportText.toLowerCase().includes(metric.name.toLowerCase())) {
        mockAnalysis.misalignments.push({
          term: metric.name,
          context: `Contains reference to "${metric.name}"`,
          department: metric.teams[0],
          issue: `This metric has ${metric.definitions.length} different definitions across ${metric.teams.join(", ")}`,
          severity: metric.severity.toLowerCase(),
        })
      }
    })

    // If no specific conflicts found, add some sample ones
    if (mockAnalysis.misalignments.length === 0) {
      const sampleMetrics = kpiData.conflictingMetrics.slice(0, 3)
      sampleMetrics.forEach((metric) => {
        mockAnalysis.misalignments.push({
          term: metric.name,
          context: `Potential reference to "${metric.name}" concepts`,
          department: metric.teams[0],
          issue: `This metric has ${metric.definitions.length} different definitions across ${metric.teams.join(", ")}`,
          severity: metric.severity.toLowerCase(),
        })
      })
    }

    mockAnalysis.summary = `This report contains ${mockAnalysis.misalignments.length} potential terminology misalignments that could lead to miscommunication across departments.`

    return NextResponse.json(mockAnalysis)
  } catch (error) {
    console.error("Error analyzing report:", error)
    return NextResponse.json({ error: "Failed to analyze report" }, { status: 500 })
  }
}
