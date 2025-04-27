"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertTriangle, CheckCircle, Upload } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { kpiData } from "@/data/kpi-data"
import { FileHandler } from "@/components/file-handler"
import { exportToJson } from "@/utils/export-utils"

export function ReportAnalyzer() {
  const [reportText, setReportText] = useState("")
  const [fileName, setFileName] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)

  const handleFileContent = (content: string, name: string) => {
    setReportText(content)
    setFileName(name)
  }

  const analyzeReport = async () => {
    if (!reportText) return

    setIsAnalyzing(true)

    try {
      // In a real implementation, we would call the API
      // const response = await fetch('/api/analyze-report', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ reportText })
      // });
      // const data = await response.json();
      // setAnalysisResult(data);

      // For demo purposes, we'll simulate the analysis
      setTimeout(() => {
        // Generate analysis based on the actual KPI data
        const mockAnalysis = {
          misalignments: [],
          summary: "",
          fileName: fileName || "Unnamed Report",
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

        setAnalysisResult(mockAnalysis)
        setIsAnalyzing(false)
      }, 2000)
    } catch (error) {
      console.error("Error analyzing report:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-600 hover:bg-red-700"
      case "medium":
        return "bg-yellow-600 hover:bg-yellow-700"
      case "low":
        return "bg-blue-600 hover:bg-blue-700"
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Report Analyzer</CardTitle>
          <CardDescription>
            Upload or paste your business report to identify terminology misalignments across departments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileHandler onFileContent={handleFileContent} acceptedFileTypes=".txt,.doc,.docx,.pdf,.md,.csv">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Drag and drop your report file, or click to browse</p>
            <Button variant="outline" className="mt-2">
              Upload File
            </Button>
          </FileHandler>

          {fileName && (
            <Alert variant="outline" className="mt-2">
              <p className="text-sm">
                Uploaded: <span className="font-medium">{fileName}</span>
              </p>
            </Alert>
          )}

          <div className="space-y-2">
            <Textarea
              placeholder="Or paste your report text here..."
              className="min-h-[200px]"
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={analyzeReport} disabled={!reportText || isAnalyzing} className="w-full">
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Report"
            )}
          </Button>
        </CardFooter>
      </Card>

      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>{analysisResult.summary}</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Potential Misalignments Detected</AlertTitle>
              <AlertDescription>
                We found {analysisResult.misalignments.length} terminology misalignments that could cause confusion.
              </AlertDescription>
            </Alert>

            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {analysisResult.misalignments.map((item, index) => (
                  <Card key={index}>
                    <CardHeader className="py-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center">
                          {item.term}
                          <Badge className={`ml-2 ${getSeverityColor(item.severity)}`}>{item.severity}</Badge>
                        </CardTitle>
                        <Badge>{item.department}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">Context:</span>
                          <p className="text-sm italic">"{item.context}"</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Issue:</span>
                          <p className="text-sm">{item.issue}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                if (analysisResult) {
                  exportToJson(analysisResult, `analysis-${analysisResult.fileName || "report"}.json`)
                }
              }}
            >
              Export Report
            </Button>
            <Button>
              <CheckCircle className="mr-2 h-4 w-4" />
              Add to Glossary
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
