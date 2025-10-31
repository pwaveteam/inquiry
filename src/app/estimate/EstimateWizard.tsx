'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Transition } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { estimateSteps } from './EstimateSteps'

const motionVariant: {
initial: { opacity: number; x: number }
animate: { opacity: number; x: number }
exit: { opacity: number; x: number }
transition: Transition
} = {
initial: { opacity: 0, x: 40 },
animate: { opacity: 1, x: 0 },
exit: { opacity: 0, x: -40 },
transition: { duration: 0.4, ease: 'easeOut' },
}

export default function EstimateWizard() {
const totalSteps = estimateSteps.length
const [step, setStep] = useState(1)
const [selected, setSelected] = useState<Record<number, number | number[]>>({})
const [form, setForm] = useState({ company: '', industry: '', phone: '', email: '', agree: false })

useEffect(() => {
setStep(1)
setSelected({})
setForm({ company: '', industry: '', phone: '', email: '', agree: false })
}, [])

const current = estimateSteps[step - 1]
const currentValue = selected[step]
const progress = (step / totalSteps) * 100
const next = () => setStep(s => Math.min(s + 1, totalSteps))
const prev = () => setStep(s => Math.max(s - 1, 1))
const isFormValid = form.company && form.industry && form.phone && form.email && form.agree

const handleSelect = (i: number) =>
current.multi
? setSelected(p => ({
...p,
[step]: Array.isArray(p[step])
? (p[step] as number[]).includes(i)
? (p[step] as number[]).filter(v => v !== i)
: [...(p[step] as number[]), i]
: [i],
}))
: setSelected(p => ({ ...p, [step]: i }))

return (
<section className="section-wrapper">
<div className="max-w-[1000px] mx-auto">
<div className="mb-10">
<div className="w-full bg-gray-200 h-[6px] rounded-full overflow-hidden">
<div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
</div>
<div className="text-right text-[15px] text-gray-500 mt-2">
{step} / {totalSteps}
</div>
</div>
<AnimatePresence mode="wait">
<motion.div key={step} {...motionVariant}>
{current.type === 'form' ? (
<FormStep form={form} setForm={setForm} title={current.title} desc={current.desc} />
) : (
<OptionStep current={current} currentValue={currentValue} handleSelect={handleSelect} />
)}
</motion.div>
</AnimatePresence>
<div className="flex justify-between items-center mt-12">
{step > 1 ? (
<Button variant="default" onClick={prev} className="flex items-center gap-2">
<ArrowLeft className="w-[18px] h-[18px]" /> 이전으로
</Button>
) : (
<div />
)}
{step < totalSteps ? (
<Button
variant="primary"
onClick={next}
disabled={
currentValue === undefined ||
(Array.isArray(currentValue) && currentValue.length === 0)
}
className="flex items-center gap-2 disabled:opacity-50"
>
다음으로 <ArrowRight className="w-[18px] h-[18px]" />
</Button>

) : (
<Button variant="primary" disabled={!isFormValid} className="flex items-center gap-2 disabled:opacity-50">
견적 확인
</Button>
)}
</div>
</div>
</section>
)
}

function OptionStep({
current,
currentValue,
handleSelect,
}: {
current: { title: string; desc: string; options?: string[]; sub?: string[]; multi?: boolean; grid?: string }
currentValue: number | number[] | undefined
handleSelect: (i: number) => void
}) {
const isMulti = current.multi
return (
<div className="text-center">
<h2 className="text-[28px] font-semibold mb-4">{current.title}</h2>
<p className="text-[18px] text-gray-600 mb-10">{current.desc}</p>
{isMulti ? (
<div className={`grid grid-cols-1 ${current.grid || 'md:grid-cols-2'} gap-5`}>
{current.options?.map((option, i) => {
const active = Array.isArray(currentValue) && currentValue.includes(i)
return (
<div
  key={i}
  onClick={() => handleSelect(i)}
  className={`flex items-start gap-3 border rounded-2xl px-6 py-5 cursor-pointer transition-all duration-300 ${
    active
      ? 'border-primary bg-primary/5 text-primary'
      : 'border-gray-300 text-gray-800 hover:border-primary/70 hover:text-primary'
  }`}
>
  <Checkbox
    checked={active}
    onCheckedChange={() => handleSelect(i)}
    className="mt-[2px] border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
  />
  <div className="text-left">
    <p className="font-semibold text-[17px] leading-tight">{option}</p>
    {current.sub && current.sub[i] && (
      <p className="text-[15px] text-gray-500 leading-snug mt-[2px]">{current.sub[i]}</p>
    )}
  </div>
</div>
)
})}
</div>
) : (
<RadioGroup
value={typeof currentValue === 'number' ? String(currentValue) : ''}
onValueChange={v => handleSelect(Number(v))}
className={`grid grid-cols-1 ${current.grid || 'md:grid-cols-2'} gap-5`}
>
{current.options?.map((option, i) => (
<Label
key={i}
htmlFor={`option-${i}`}
className={`flex items-start gap-3 border rounded-2xl px-6 py-5 cursor-pointer transition-all duration-300 ${
  currentValue === i
    ? 'border-primary bg-primary/5 text-primary'
    : 'border-gray-300 text-gray-800 hover:border-primary/70 hover:text-primary'
}`}
>
<RadioGroupItem
  id={`option-${i}`}
  value={String(i)}
  className="mt-[2px] border-gray-400 data-[state=checked]:border-primary data-[state=checked]:bg-white"
/>
<div className="text-left">
  <p className="font-semibold text-[17px] leading-tight">{option}</p>
  {current.sub && current.sub[i] && (
    <p className="text-[15px] text-gray-500 leading-snug mt-[2px]">{current.sub[i]}</p>
  )}
</div>
</Label>
))}
</RadioGroup>
)}
</div>
)
}

function FormStep({
form,
setForm,
title,
desc,
}: {
form: { company: string; industry: string; phone: string; email: string; agree: boolean }
setForm: (v: typeof form) => void
title: string
desc: string
}) {
return (
<div className="text-center">
<h2 className="text-[28px] font-semibold mb-4">{title}</h2>
<p className="text-[18px] text-gray-600 mb-10">{desc}</p>
<form className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 text-left">
<div>
<Label htmlFor="name" className="flex items-center gap-[2px]">
이름(담당자명)<span className="text-[#cc2a2a]">*</span>
</Label>
<Input
id="name"
type="text"
value={form.company}
onChange={e => setForm({ ...form, company: e.target.value })}
placeholder="이름을 입력해주세요"
required
/>
</div>
<div>
<Label htmlFor="industry">업종</Label>
<Input
id="industry"
type="text"
value={form.industry}
onChange={e => setForm({ ...form, industry: e.target.value })}
placeholder="업종을 입력해주세요"
/>
</div>
<div>
<Label htmlFor="phone" className="flex items-center gap-[2px]">
연락처<span className="text-[#cc2a2a]">*</span>
</Label>
<Input
id="phone"
type="tel"
value={form.phone}
onChange={e => setForm({ ...form, phone: e.target.value })}
placeholder="010-0000-0000"
required
/>
</div>
<div>
<Label htmlFor="email" className="flex items-center gap-[2px]">
이메일<span className="text-[#cc2a2a]">*</span>
</Label>
<Input
id="email"
type="email"
value={form.email}
onChange={e => setForm({ ...form, email: e.target.value })}
placeholder="contact@example.com"
required
/>
</div>
<div className="flex items-start mt-4 gap-3 text-left md:col-span-2">
<Checkbox
id="agree"
checked={form.agree}
onCheckedChange={val => setForm({ ...form, agree: val === true })}
className="mt-[2px] shrink-0"
/>
<div className="flex flex-col">
<Label htmlFor="agree" className="text-[15px] text-[#333] leading-[1.5] cursor-pointer">
개인정보처리방침에 동의합니다.
</Label>
<p className="text-[14px] text-gray-400 leading-[1.6] mt-[2px]">
수집된 개인정보는 문의 응답 목적에만 사용되며<br />관련 법령에 따라 안전하게 관리됩니다
</p>
</div>
</div>
</form>
</div>
)
}