"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, Search, ArrowRightLeft } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { kpiData } from "@/data/kpi-data"

export function MetricConflicts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredMetrics, setFilteredMetrics] = useState(kpiData.conflictingMetrics)
  const [selectedMetric, setSelectedMetric] = useState(null)
  const [severityFilter, setSeverityFilter] = useState("all")

  useEffect(() => {
    let filtered = kpiData.conflictingMetrics

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (metric) =>
          metric.name.toLowerCase().includes(term) ||
          metric.teams.some((team) => team.toLowerCase().includes(term)) ||
          metric.definitions.some((def) => def.definition.toLowerCase().includes(term)),
      )
    }

    // Apply severity filter
    if (severityFilter !== "all") {
      filtered = filtered.filter((metric) => metric.severity === severityFilter)
    }

    setFilteredMetrics(filtered)
  }, [searchTerm, severityFilter])

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "bg-red-600 hover:bg-red-700"
      case "Medium":
        return "bg-yellow-600 hover:bg-yellow-700"
      case "Low":
        return "bg-blue-600 hover:bg-blue-700"
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  const getTeamColor = (team) => {
    switch (team) {
      case "Sales":
        return "bg-blue-600 hover:bg-blue-700"
      case "Marketing":
        return "bg-green-600 hover:bg-green-700"
      case "Product":
        return "bg-purple-600 hover:bg-purple-700"
      case "Data":
        return "bg-amber-600 hover:bg-amber-700"
      case "Finance":
        return "bg-rose-600 hover:bg-rose-700"
      case "Customer Success":
        return "bg-cyan-600 hover:bg-cyan-700"
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search metrics or teams..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm whitespace-nowrap">Filter by severity:</span>
          <Tabs defaultValue="all" value={severityFilter} onValueChange={setSeverityFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="High">High</TabsTrigger>
              <TabsTrigger value="Medium">Medium</TabsTrigger>
              <TabsTrigger value="Low">Low</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Conflicting Metric Definitions Detected</AlertTitle>
        <AlertDescription>
          We found {kpiData.conflictingMetrics.length} metrics with different definitions across teams. These conflicts
          could lead to misaligned decisions.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Conflicting Metrics</CardTitle>
            <CardDescription>Metrics with different definitions across teams, sorted by severity</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              <div className="px-4 py-2 space-y-2">
                {filteredMetrics.map((metric) => (
                  <div
                    key={metric.id}
                    className={`p-3 rounded-md border cursor-pointer transition-colors ${
                      selectedMetric?.id === metric.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedMetric(metric)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{metric.name}</h3>
                      <Badge className={`${getSeverityColor(metric.severity)}`}>{metric.severity}</Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {metric.teams.map((team) => (
                        <Badge key={team} variant="outline" className="text-xs">
                          {team}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}

                {filteredMetrics.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground">
                    No metrics found matching your search criteria
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedMetric ? selectedMetric.name : "Select a metric to view details"}
            </CardTitle>
            {selectedMetric && (
              <CardDescription>
                This metric has {selectedMetric.definitions.length} different definitions across teams
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {selectedMetric ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Badge className={`${getSeverityColor(selectedMetric.severity)}`}>
                    {selectedMetric.severity} Severity Conflict
                  </Badge>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <span>Used by</span>
                    <div className="flex -space-x-1">
                      {selectedMetric.teams.map((team) => (
                        <Badge key={team} className={`${getTeamColor(team)} ml-1`}>
                          {team}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedMetric.definitions.map((def, index) => (
                    <Card key={index}>
                      <CardHeader className="py-3">
                        <div className="flex items-center justify-between">
                          <Badge className={`${getTeamColor(def.team)}`}>{def.team}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p>{def.definition}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Recommended Resolution</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedMetric.recommendation ||
                      "Create a standardized definition that works across all teams, or clearly document the differences and when each definition should be used."}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Standardize Definition
                    </Button>
                    <Button variant="outline">
                      <ArrowRightLeft className="mr-2 h-4 w-4" />
                      Map Relationships
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                <ArrowRightLeft className="mx-auto h-12 w-12 mb-4 opacity-20" />
                <p>Select a metric from the list to view detailed information and resolve conflicts</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
