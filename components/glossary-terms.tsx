"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search, Edit2, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { kpiData } from "@/data/kpi-data"

export function GlossaryTerms() {
  const [glossary, setGlossary] = useState(kpiData.standardizedMetrics)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTerm, setNewTerm] = useState({
    name: "",
    team: "All",
    definition: "",
    relatedTerms: [],
  })

  const filteredGlossary = glossary.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddTerm = () => {
    if (newTerm.name && newTerm.definition) {
      setGlossary([...glossary, { ...newTerm, id: glossary.length + 1 }])
      setNewTerm({
        name: "",
        team: "All",
        definition: "",
        relatedTerms: [],
      })
      setShowAddForm(false)
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
      case "All":
        return "bg-slate-600 hover:bg-slate-700"
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search terms or definitions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Term
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Term</CardTitle>
            <CardDescription>Define a new term and its standardized definition</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="term">Term</Label>
                <Input
                  id="term"
                  value={newTerm.name}
                  onChange={(e) => setNewTerm({ ...newTerm, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team">Primary Team</Label>
                <Select value={newTerm.team} onValueChange={(value) => setNewTerm({ ...newTerm, team: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Teams (Standard)</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Data">Data</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Customer Success">Customer Success</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="definition">Definition</Label>
              <Textarea
                id="definition"
                rows={3}
                value={newTerm.definition}
                onChange={(e) => setNewTerm({ ...newTerm, definition: e.target.value })}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTerm}>Save Term</Button>
          </CardFooter>
        </Card>
      )}

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {filteredGlossary.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      {item.name}
                      <Badge className={`ml-2 ${getTeamColor(item.team)}`}>{item.team}</Badge>
                    </CardTitle>
                    <CardDescription className="mt-2">{item.definition}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {item.relatedTerms && item.relatedTerms.length > 0 && (
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Related Terms:</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.relatedTerms.map((term, idx) => (
                        <Badge key={idx} variant="outline">
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}

          {filteredGlossary.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">No terms found matching your search criteria</div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
