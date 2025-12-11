import { CheckCircle2 } from 'lucide-react'
import React from 'react'

export const BenefitItem = ({ text }) => {
    return (
        <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
            <span className="text-gray-700">{text}</span>
        </div>
    )
}
