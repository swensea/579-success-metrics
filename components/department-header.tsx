import { Badge } from "@/components/ui/badge"

export function DepartmentHeader() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Business Glossary & KPI Translator</h1>
      <p className="text-muted-foreground">
        Reconcile terminology and KPIs across departments to improve alignment and decision-making
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="bg-blue-600 hover:bg-blue-700">Sales</Badge>
        <Badge className="bg-green-600 hover:bg-green-700">Marketing</Badge>
        <Badge className="bg-purple-600 hover:bg-purple-700">Product</Badge>
        <Badge className="bg-amber-600 hover:bg-amber-700">Data</Badge>
        <Badge className="bg-rose-600 hover:bg-rose-700">Finance</Badge>
        <Badge className="bg-cyan-600 hover:bg-cyan-700">Customer Success</Badge>
      </div>
    </div>
  )
}
