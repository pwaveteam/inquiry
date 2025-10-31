'use client'
import React,{useState,useCallback,useRef,useEffect}from'react'
import{motion,AnimatePresence}from'framer-motion'
import{Input}from'@/components/ui/input'
import{Textarea}from'@/components/ui/textarea'
import{Label}from'@/components/ui/label'
import{Checkbox}from'@/components/ui/checkbox'
import{RadioGroup,RadioGroupItem}from'@/components/ui/radio-group'
import{Button}from'@/components/ui/button'
import{UploadCloud,FileIcon,X}from'lucide-react'

const ContactForm:React.FC=()=>{
const[form,setForm]=useState({
name:'',
company:'',
phone:'',
email:'',
type:'',
form:'',
plan:'',
budget:'',
message:'',
files:[]as File[],
agree:false
})
const[status,setStatus]=useState<string>('')
const[open,setOpen]=useState<'type'|'form'|'budget'|null>(null)
const[isDragging,setIsDragging]=useState(false)
const typeRef=useRef<HTMLDivElement|null>(null)
const formRef=useRef<HTMLDivElement|null>(null)
const budgetRef=useRef<HTMLDivElement|null>(null)

const handleChange=useCallback((key:keyof typeof form,value:string|boolean|File[]|null)=>{
setForm(prev=>({...prev,[key]:value}))
},[])

const handleToggle=useCallback((type:'type'|'form'|'budget')=>{
setOpen(prev=>prev===type?null:type)
},[])

const closeDropdown=useCallback(()=>setOpen(null),[])

useEffect(()=>{
const handleClick=(e:MouseEvent)=>{
if(
typeRef.current&&!typeRef.current.contains(e.target as Node)&&
formRef.current&&!formRef.current.contains(e.target as Node)&&
budgetRef.current&&!budgetRef.current.contains(e.target as Node)
) closeDropdown()
}
document.addEventListener('mousedown',handleClick)
return()=>document.removeEventListener('mousedown',handleClick)
},[closeDropdown])

const isValid=!!form.name&&!!form.phone&&!!form.email&&!!form.message

const handleSubmit=useCallback(async(e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault()
if(!isValid){
setStatus('필수 항목을 모두 입력해주세요.')
return
}
setStatus('전송 중...')
try{
const body=new FormData()
Object.entries(form).forEach(([k,v])=>{
if(k==='files'&&Array.isArray(v))v.forEach(f=>body.append('files',f))
else if(v!==null)body.append(k,v as any)
})
const res=await fetch('/api/contact',{method:'POST',body})
const result=await res.json()
if(result.ok){
setStatus('문의가 정상적으로 접수되었습니다.')
setForm({name:'',company:'',phone:'',email:'',type:'',form:'',plan:'',budget:'',message:'',files:[],agree:false})
}else setStatus('오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
}catch{
setStatus('전송 실패. 네트워크 상태를 확인해주세요.')
}
},[form,isValid])

const handleFiles=(newFiles:FileList|null)=>{
if(!newFiles)return
const selected=Array.from(newFiles)
setForm(prev=>{
const merged=[...prev.files,...selected].slice(0,3)
return({...prev,files:merged})
})
}

const handleRemoveFile=(index:number)=>{
setForm(prev=>({...prev,files:prev.files.filter((_,i)=>i!==index)}))
}

const handleDrop=(e:React.DragEvent<HTMLLabelElement>)=>{
e.preventDefault()
setIsDragging(false)
handleFiles(e.dataTransfer.files)
}

const handleDragOver=(e:React.DragEvent<HTMLLabelElement>)=>{
e.preventDefault()
setIsDragging(true)
}

const handleDragLeave=()=>setIsDragging(false)

const typeOptions=[
'기업/브랜드 홈페이지 (랜딩페이지)',
'커머스/예약-결제',
'내부용 시스템',
'구독형 플랫폼',
'콘텐츠 포털/커뮤니티',
'교육/LMS',
'기타'
]
const formOptions=[
'PC웹',
'반응형웹',
'안드로이드/IoS앱',
'관리자시스템',
'PC프로그램',
'기타'
]
const planOptions=['모두 준비됨','일부만 있음','준비 안됨']
const budgetOptions = ['100만원 이하', '100~500만원', '500~1,500만원', '1,500~3,000만원', '3,000만원 이상']

const renderDropdown=(type:'type'|'form'|'budget',options:string[],ref:React.RefObject<HTMLDivElement|null>)=>{
const selected=form[type]
return(
<div className="relative" ref={ref}>
<div
tabIndex={0}
onClick={()=>handleToggle(type)}
className={`flex h-9 w-full items-center justify-between rounded-md border px-3 py-1 text-[15px] text-[#333] bg-white/80 border-neutral-300 transition-colors cursor-pointer
${open===type?'border-[#003090] ring-1 ring-[#003090]':''}
dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200`}
>
<span className={`${selected?'':'text-neutral-400 dark:text-neutral-500'}`}>
{selected||'선택'}
</span>
<svg className={`w-6 h-6 ml-1 transition-transform ${open===type?'rotate-180':''}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1">
<path d="M6 8l4 4 4-4"/>
</svg>
</div>
<AnimatePresence>
{open===type&&(
<motion.div
initial={{opacity:0,y:-5}}
animate={{opacity:1,y:0}}
exit={{opacity:0,y:-5}}
transition={{duration:0.15}}
className="absolute z-50 w-full mt-1 bg-white border border-neutral-300 rounded-md shadow-md dark:bg-neutral-900 dark:border-neutral-700"
>
{options.map(opt=>(
<div
key={opt}
onClick={()=>{
handleChange(type,opt)
closeDropdown()
}}
className={`px-3 py-1.5 text-[15px] cursor-pointer hover:bg-[#f0f6ff] hover:text-[#003090] dark:hover:bg-[#1a2333] ${
selected===opt?'bg-[#f0f6ff] text-[#003090] dark:bg-[#1a2333]':''
}`}
>
{opt}
</div>
))}
</motion.div>
)}
</AnimatePresence>
</div>
)
}

return(
<section className="section-wrapper pt-3">
<motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} transition={{duration:0.6,ease:'easeOut'}} viewport={{once:true,amount:0.3}}>
<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
<div>
<Label htmlFor="name" className="flex items-center gap-[2px]">성함<span className="text-[#cc2a2a]">*</span></Label>
<Input id="name" type="text" value={form.name} onChange={e=>handleChange('name',e.target.value)} placeholder="이름을 입력해주세요"/>
</div>
<div>
<Label htmlFor="company">소속회사</Label>
<Input id="company" type="text" value={form.company} onChange={e=>handleChange('company',e.target.value)} placeholder="회사명을 입력해주세요"/>
</div>
<div>
<Label htmlFor="phone" className="flex items-center gap-[2px]">연락처<span className="text-[#cc2a2a]">*</span></Label>
<Input id="phone" type="tel" value={form.phone} onChange={e=>handleChange('phone',e.target.value)} placeholder="010-0000-0000"/>
</div>
<div>
<Label htmlFor="email" className="flex items-center gap-[2px]">이메일<span className="text-[#cc2a2a]">*</span></Label>
<Input id="email" type="email" value={form.email} onChange={e=>handleChange('email',e.target.value)} placeholder="contact@example.com"/>
</div>
<div>
<Label>프로젝트 유형</Label>
{renderDropdown('type',typeOptions,typeRef)}
</div>
<div>
<Label>프로젝트 형태</Label>
{renderDropdown('form',formOptions,formRef)}
</div>

<div className="flex flex-col md:flex-row md:col-span-2 gap-8">
<div className="flex-1">
<Label>프로젝트 예산</Label>
{renderDropdown('budget',budgetOptions,budgetRef)}
</div>
<div className="flex-1">
<Label className="mb-2">프로젝트 기획이 되어있나요?</Label>

<RadioGroup value={form.plan} onValueChange={val=>handleChange('plan',val)} className="flex flex-wrap gap-6">
{planOptions.map(opt=>(
<div key={opt} className="flex items-center space-x-2">
<RadioGroupItem id={opt} value={opt} className="translate-y-[0.5px]"/>
<Label htmlFor={opt} className="text-[15px] text-[#333] dark:text-neutral-200 cursor-pointer translate-y-[3px]">{opt}</Label>
</div>
))}
</RadioGroup>


</div>
</div>

<div className="md:col-span-2">
<Label className="mb-2">파일 첨부</Label>
<label
onDragOver={e=>{e.preventDefault();setIsDragging(true)}}
onDragLeave={()=>setIsDragging(false)}
onDrop={e=>{e.preventDefault();setIsDragging(false);handleFiles(e.dataTransfer.files)}}
htmlFor="file"
className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-md cursor-pointer transition-colors
${isDragging?'border-[#003090] bg-[#f0f6ff]':'border-neutral-300 bg-white/80 hover:bg-neutral-50'}
dark:bg-neutral-900 dark:border-neutral-700`}
>
<UploadCloud className="w-10 h-10 text-neutral-400 mb-2"/>
<p className="text-[15px] text-neutral-600 dark:text-neutral-300">파일을 드래그하거나 클릭하여 업로드</p>
<p className="text-[13px] text-neutral-400 mt-1">최대 3개 파일, 총 10MB 이하</p>
</label>
<Input id="file" type="file" multiple accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.jpg,.png" className="hidden" onChange={e=>handleFiles(e.target.files)}/>
{form.files.length>0&&(
<div className="mt-3 space-y-2">
<p className="text-[14px] text-neutral-500">선택된 파일 ({form.files.length}개)</p>
{form.files.map((file,i)=>(
<div key={i} className="flex items-center justify-between border rounded-md px-3 py-2 bg-white/70 dark:bg-neutral-800 dark:border-neutral-700">
<div className="flex items-center gap-2 text-[14px] text-neutral-700 dark:text-neutral-300">
<FileIcon className="w-4 h-4 text-[#003090]"/>{file.name}
</div>
<button type="button" onClick={()=>handleRemoveFile(i)} className="text-neutral-400 hover:text-[#cc2a2a] transition-colors">
<X className="w-4 h-4"/>
</button>
</div>
))}
</div>
)}
</div>

<div className="md:col-span-2">
<Label htmlFor="message" className="flex items-center gap-[2px]">프로젝트에 대해서 자유롭게 설명해주세요<span className="text-[#cc2a2a]">*</span></Label>
<Textarea id="message" value={form.message} onChange={e=>handleChange('message',e.target.value)} placeholder="문의하실 내용을 작성해주세요" className="min-h-[160px]"/>
</div>

<div className="flex items-start mt-4 gap-3 text-left md:col-span-2">
<Checkbox id="agree" checked={form.agree} onCheckedChange={val=>handleChange('agree',val===true)} className="mt-[2px] shrink-0"/>
<div className="flex flex-col">
<Label htmlFor="agree" className="text-[15px] text-[#333] leading-[1.5] cursor-pointer">개인정보처리방침에 동의합니다.</Label>
<p className="text-[14px] text-gray-400 leading-[1.6] mt-[2px]">수집된 개인정보는 문의 응답 목적에만 사용되며<br/>관련 법령에 따라 안전하게 관리됩니다</p>
</div>
</div>

<div className="text-center mt-8 md:col-span-2">
<Button type="submit" disabled={!isValid}>문의 접수하기</Button>
</div>
</form>
{status&&<p className="text-center mt-6 text-gray-600 text-sm">{status}</p>}
</motion.div>
</section>
)
}
export default ContactForm