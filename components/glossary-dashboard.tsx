"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlossaryTerms } from "@/components/glossary-terms"
import { ReportAnalyzer } from "@/components/report-analyzer"
import { KpiVisualizer } from "@/components/kpi-visualizer"
import { DepartmentHeader } from "@/components/department-header"
import { MetricConflicts } from "@/components/metric-conflicts"

export function GlossaryDashboard() {
  const [activeTab, setActiveTab] = useState("conflicts")

  return (
    <div className="container mx-auto py-8 px-4">
      <DepartmentHeader />

      <Tabs defaultValue="conflicts" className="mt-8" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="conflicts">Metric Conflicts</TabsTrigger>
          <TabsTrigger value="glossary">Business Glossary</TabsTrigger>
          <TabsTrigger value="analyzer">Report Analyzer</TabsTrigger>
          <TabsTrigger value="visualizer">KPI Visualizer</TabsTrigger>
        </TabsList>

        <TabsContent value="conflicts" className="mt-6">
          <MetricConflicts />
        </TabsContent>

        <TabsContent value="glossary" className="mt-6">
          <GlossaryTerms />
        </TabsContent>

        <TabsContent value="analyzer" className="mt-6">
          <ReportAnalyzer />
        </TabsContent>

        <TabsContent value="visualizer" className="mt-6">
          <KpiVisualizer />
        </TabsContent>
      </Tabs>
    </div>
  )
}
