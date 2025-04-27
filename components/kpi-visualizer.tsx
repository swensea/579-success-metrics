"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { kpiData } from "@/data/kpi-data"
import { exportToCsv, exportSvg } from "@/utils/export-utils"

export function KpiVisualizer() {
  const [viewType, setViewType] = useState("relationships")

  // Get the top conflicting metrics for visualization
  const topConflicts = kpiData.conflictingMetrics.slice(0, 6)

  const handleExportRelationships = () => {
    exportSvg(".kpi-relationship-svg", "kpi-relationships.svg")
  }

  const handleExportMetrics = () => {
    // Format data for CSV export
    const csvData = kpiData.metricMappings.map((mapping) => ({
      "Sales KPI": mapping.sales.term,
      "Sales Definition": mapping.sales.definition,
      "Marketing KPI": mapping.marketing.term,
      "Marketing Definition": mapping.marketing.definition,
      "Product KPI": mapping.product.term,
      "Product Definition": mapping.product.definition,
      "Data KPI": mapping.data.term,
      "Data Definition": mapping.data.definition,
      "Alignment Status": mapping.alignmentStatus,
    }))

    exportToCsv(csvData, "kpi-mappings.csv")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>KPI Visualizer</CardTitle>
          <CardDescription>Visualize relationships between KPIs and terminology across departments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={viewType} onValueChange={setViewType} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="relationships">Term Relationships</TabsTrigger>
              <TabsTrigger value="metrics">Metric Mapping</TabsTrigger>
            </TabsList>

            <TabsContent value="relationships" className="mt-6">
              <div className="flex justify-end mb-4">
                <Button variant="outline" size="sm" onClick={handleExportRelationships}>
                  <Download className="mr-2 h-4 w-4" />
                  Export SVG
                </Button>
              </div>

              <div className="relative border rounded-lg p-4 h-[500px] overflow-hidden">
                <svg width="100%" height="100%" viewBox="0 0 800 500" className="mx-auto kpi-relationship-svg">
                  {/* Teams */}
                  <circle cx="400" cy="100" r="60" fill="#3b82f6" />
                  <text x="400" y="100" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">
                    Sales
                  </text>

                  <circle cx="200" cy="300" r="60" fill="#22c55e" />
                  <text x="200" y="300" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">
                    Marketing
                  </text>

                  <circle cx="600" cy="300" r="60" fill="#a855f7" />
                  <text x="600" y="300" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">
                    Product
                  </text>

                  <circle cx="400" cy="400" r="60" fill="#f59e0b" />
                  <text x="400" y="400" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">
                    Data
                  </text>

                  {/* Metrics */}
                  {/* First metric */}
                  <circle cx="300" cy="180" r="40" fill="#93c5fd" />
                  <text x="300" y="180" textAnchor="middle" fill="#1e3a8a" fontSize="12">
                    {topConflicts[0]?.name || "Conversion Rate"}
                  </text>

                  {/* Second metric */}
                  <circle cx="500" cy="180" r="40" fill="#93c5fd" />
                  <text x="500" y="180" textAnchor="middle" fill="#1e3a8a" fontSize="12">
                    {topConflicts[1]?.name || "Engagement"}
                  </text>

                  {/* Third metric */}
                  <circle cx="250" cy="380" r="40" fill="#86efac" />
                  <text x="250" y="380" textAnchor="middle" fill="#14532d" fontSize="12">
                    {topConflicts[2]?.name || "Active Users"}
                  </text>

                  {/* Fourth metric */}
                  <circle cx="150" cy="380" r="40" fill="#86efac" />
                  <text x="150" y="380" textAnchor="middle" fill="#14532d" fontSize="12">
                    {topConflicts[3]?.name || "Retention"}
                  </text>

                  {/* Fifth metric */}
                  <circle cx="550" cy="380" r="40" fill="#d8b4fe" />
                  <text x="550" y="380" textAnchor="middle" fill="#581c87" fontSize="12">
                    {topConflicts[4]?.name || "Churn"}
                  </text>

                  {/* Sixth metric */}
                  <circle cx="650" cy="380" r="40" fill="#d8b4fe" />
                  <text x="650" y="380" textAnchor="middle" fill="#581c87" fontSize="12">
                    {topConflicts[5]?.name || "Activation"}
                  </text>

                  {/* Connecting Lines */}
                  {/* Sales to Marketing */}
                  <line x1="400" y1="100" x2="200" y2="300" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />

                  {/* Sales to Product */}
                  <line x1="400" y1="100" x2="600" y2="300" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />

                  {/* Sales to Data */}
                  <line x1="400" y1="100" x2="400" y2="400" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />

                  {/* Marketing to Product */}
                  <line x1="200" y1="300" x2="600" y2="300" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />

                  {/* Marketing to Data */}
                  <line x1="200" y1="300" x2="400" y2="400" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />

                  {/* Product to Data */}
                  <line x1="600" y1="300" x2="400" y2="400" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />

                  {/* Term Relationships */}
                  <line x1="300" y1="180" x2="250" y2="380" stroke="#ef4444" strokeWidth="2" />
                  <line x1="500" y1="180" x2="550" y2="380" stroke="#ef4444" strokeWidth="2" />
                  <line x1="150" y1="380" x2="650" y2="380" stroke="#ef4444" strokeWidth="2" />
                </svg>

                <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-xs">Sales</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-xs">Marketing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    <span className="text-xs">Product</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                    <span className="text-xs">Data</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-0.5 bg-red-500"></div>
                    <span className="text-xs">Equivalent Terms</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="mt-6">
              <div className="flex justify-end mb-4">
                <Button variant="outline" size="sm" onClick={handleExportMetrics}>
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </div>

              <div className="border rounded-lg p-6 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left">Sales KPI</th>
                      <th className="py-2 px-4 text-left">Marketing KPI</th>
                      <th className="py-2 px-4 text-left">Product KPI</th>
                      <th className="py-2 px-4 text-left">Data KPI</th>
                      <th className="py-2 px-4 text-left">Alignment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kpiData.metricMappings.map((mapping, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <span className="font-medium">{mapping.sales.term}</span>
                            <span className="text-xs text-muted-foreground">{mapping.sales.definition}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <span className="font-medium">{mapping.marketing.term}</span>
                            <span className="text-xs text-muted-foreground">{mapping.marketing.definition}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <span className="font-medium">{mapping.product.term}</span>
                            <span className="text-xs text-muted-foreground">{mapping.product.definition}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <span className="font-medium">{mapping.data.term}</span>
                            <span className="text-xs text-muted-foreground">{mapping.data.definition}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              mapping.alignmentStatus === "Misaligned"
                                ? "bg-red-600 hover:bg-red-700"
                                : mapping.alignmentStatus === "Partially Aligned"
                                  ? "bg-yellow-600 hover:bg-yellow-700"
                                  : "bg-green-600 hover:bg-green-700"
                            }
                          >
                            {mapping.alignmentStatus}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
