/**
 * Exports data as a CSV file
 */
export function exportToCsv(data: any[], filename: string) {
  // Get all unique keys from all objects
  const keys = Array.from(new Set(data.flatMap((obj) => Object.keys(obj))))

  // Create CSV header row
  let csvContent = keys.join(",") + "\n"

  // Add data rows
  data.forEach((obj) => {
    const row = keys.map((key) => {
      // Handle nested objects and arrays
      const value = obj[key] !== undefined ? obj[key] : ""
      const cellValue = typeof value === "object" ? JSON.stringify(value) : value

      // Escape quotes and wrap in quotes if needed
      return `"${String(cellValue).replace(/"/g, '""')}"`
    })
    csvContent += row.join(",") + "\n"
  })

  // Create and download the file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Exports data as a JSON file
 */
export function exportToJson(data: any, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Exports SVG element as an SVG file
 */
export function exportSvg(svgSelector: string, filename: string) {
  const svgElement = document.querySelector(svgSelector) as SVGElement

  if (svgElement) {
    // Clone the SVG to avoid modifying the original
    const svgClone = svgElement.cloneNode(true) as SVGElement

    // Add XML namespace
    svgClone.setAttribute("xmlns", "http://www.w3.org/2000/svg")

    // Serialize to string
    const svgData = new XMLSerializer().serializeToString(svgClone)

    // Create blob and download
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)

    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}
