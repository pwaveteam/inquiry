'use client'
import EstimateHero from './EstimateHero'
import EstimateWizard from './EstimateWizard'

export default function EstimatePage() {
  return (
    <main className="w-full text-gray-900 bg-white overflow-hidden">
      <EstimateHero />
      <EstimateWizard />
    </main>
  )
}