'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Scatter,
  ComposedChart,
  ResponsiveContainer,
  Label
} from 'recharts'

export default function ResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  

  const [parameters, setParameters] = useState({
    lightSource: searchParams.get('lightSource') || '',
    solvent: searchParams.get('solvent') || '',
    solute1: searchParams.get('solute1') || '',
    solute2: searchParams.get('solute2') || '',
    imageUrl: searchParams.get('imageUrl') || ''
  })

  
  const [concentration, setConcentration] = useState('0.5')
  const [timeUsed] = useState('5')
  

  const calibrationData = [
    { x: 0, y: 0 },
    { x: 0.2, y: 0.2 },
    { x: 0.4, y: 0.4 },
    { x: 0.6, y: 0.6 },
    { x: 0.8, y: 0.8 },
    { x: 1.0, y: 1.0 }
  ]

  const samplePoint = [
    { x: 0.5, y: 0.5 }
  ]

  const handleBack = () => {
    router.push('/prediction/calculate') 
  }

  return (
    <div>
      <nav className="flex justify-end mt-5 mx-7">
        <div className="flex">
          <h1 
            onClick={() => router.push('/')}
            className="mr-10 cursor-pointer hover:text-gray-600"
          >
            Home
          </h1>
          <h1 className="cursor-pointer hover:text-gray-600">Info</h1>
        </div>
      </nav>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-bold">ConCal</h1>
          <button 
            onClick={handleBack}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back to Calculate
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Input Parameters</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="font-medium mr-2">Concentration:</span>
                <div className="border border-gray-300 px-3 py-1 rounded w-20 text-center">
                  {concentration}
                </div>
                <span className="ml-2 text-2xl text-rose-800">w/v%</span>
              </div>
              <p><span className="font-medium">Light Source:</span> {parameters.lightSource}</p>
              <p><span className="font-medium">Solvent:</span> {parameters.solvent}</p>
              <p><span className="font-medium">Solute 1:</span> {parameters.solute1}</p>
              <p><span className="font-medium">Solute 2:</span> {parameters.solute2}</p>
              <p><span className="font-medium">Model:</span> Linear Regression</p>
              <p><span className="font-medium">Accuracy:</span> 98.5%</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Calibration Curve</h2>
              <div className="flex items-center">
                <span className="font-medium mr-2">Time Used:</span>
                <span>{timeUsed} seconds</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart
                margin={{
                  top: 20,
                  right: 30,
                  bottom: 40,
                  left: 40,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="x"
                  type="number"
                  domain={[0, 1]}
                  tickCount={6}
                  stroke="#666"
                />
                <YAxis
                  domain={[0, 1]}
                  tickCount={6}
                  stroke="#666"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  cursor={{ strokeDasharray: '3 3' }}
                />
                
                <Line
                  data={calibrationData}
                  dataKey="y"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                />
                
                <Scatter
                  data={samplePoint}
                  fill="#dc2626"
                  shape="circle"
                >
                  <Label
                    content={(props) => {
                      if (props?.x === undefined || props?.y === undefined) {
                        return null;
                      }
                      return (
                        <text 
                          x={props.x} 
                          y={Number(props.y) - 10} 
                          fill="#dc2626" 
                          textAnchor="middle"
                        >
                        </text>
                      );
                    }}
                  />
                </Scatter>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
