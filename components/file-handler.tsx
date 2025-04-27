"use client"

import type React from "react"

import { useState } from "react"

interface FileHandlerProps {
  onFileContent: (content: string, fileName: string) => void
  acceptedFileTypes?: string
  children: React.ReactNode
}

export function FileHandler({
  onFileContent,
  acceptedFileTypes = ".txt,.doc,.docx,.pdf,.md",
  children,
}: FileHandlerProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      processFile(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const content = event.target?.result as string
      onFileContent(content, file.name)
    }

    reader.readAsText(file)
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        isDragging ? "border-primary bg-primary/5" : "hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label htmlFor="file-upload" className="cursor-pointer w-full h-full block">
        {children}
        <input id="file-upload" type="file" className="hidden" accept={acceptedFileTypes} onChange={handleFileChange} />
      </label>
    </div>
  )
}
