'use client'

import Navbar from "../components/Navbar"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'

// Mock database interface
interface Database {
  id: string;
  name: string;
}

// Mock API functions
const mockDatabases: Database[] = [
  { id: '1', name: 'MySQL Database' },
  { id: '2', name: 'PostgreSQL Database' },
  { id: '3', name: 'MongoDB Database' },
]

const fetchDatabases = async (): Promise<Database[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return mockDatabases
}

function Prediction() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDatabase, setSelectedDatabase] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [databases, setDatabases] = useState<Database[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Fetch databases on component mount
  useEffect(() => {
    const loadDatabases = async () => {
      setIsLoading(true)
      try {
        const data = await fetchDatabases()
        setDatabases(data)
      } catch (err) {
        setError('Failed to load databases')
      } finally {
        setIsLoading(false)
      }
    }

    loadDatabases()
  }, [])

  const handleDatabaseSelect = (database: Database) => {
    setSelectedDatabase(database.name)
    setIsOpen(false)
    setError('')
  }

  const handleNext = async () => {
    if (!selectedDatabase) {
      setError('Please select a database first')
      return
    }

    setIsLoading(true)
    try {
      localStorage.setItem('selectedDatabase', selectedDatabase)
      router.push('/prediction/calculate')
    } catch (err) {
      setError('Failed to process selection')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setSelectedDatabase('')
    setError('')
  }

  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-normal text-6xl mb-10 mt-60">Database</h1>
      
      {/* Updated dropdown container with z-index */}
      <div className="relative w-80 z-10">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading}
          className="w-full px-4 py-2 text-left bg-white border-2 border-black-200 rounded-lg flex justify-between items-center"
        >
          {isLoading ? 'Loading...' : selectedDatabase || 'Please Select'}
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute w-full mt-1 bg-white border-2 border-black-200 rounded-lg shadow-lg z-20">
            <div className="py-1">
              {databases.map((db) => (
                <button 
                  key={db.id}
                  onClick={() => handleDatabaseSelect(db)}
                  className="w-full px-4 py-2 text-left hover:bg-blue-50 bg-white"
                >
                  {db.name}
                </button>
              ))}
            </div>
          </div>
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      {/* Updated button container with lower z-index */}
      <div className="flex gap-4 mt-6 z-0">
        <button 
          onClick={handleReset}
          disabled={isLoading}
          className="px-6 py-2 bg-white border-2 border-black-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
        >
          Reset
        </button>
        <button 
          onClick={handleNext}
          disabled={isLoading || !selectedDatabase}
          className="px-6 py-2 bg-white border-2 border-black-200 text-black rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Next'}
        </button>
      </div>
    </div>
    </>
  )
}

export default Prediction