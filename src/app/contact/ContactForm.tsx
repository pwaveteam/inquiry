'use client'
import React,{useState,useCallback} from 'react'
import {motion} from 'framer-motion'
import {Input} from '@/components/ui/input'
import {Textarea}from '@/components/ui/textarea'
import {Label}from '@/components/ui/label'
import {Checkbox}from '@/components/ui/checkbox'
import {Button}from '@/components/ui/button'

const ContactForm:React.FC=()=>{
  const[form,setForm]=useState({
    name:'',
    company:'',
    phone:'',
    email:'',
    message:'',
    agree:false
  })
  const[status,setStatus]=useState<string>('')

  const handleChange=useCallback((key:keyof typeof form,value:string|boolean)=>{
    setForm(prev=>({...prev,[key]:value}))
  },[])

  const isValid=!!form.name&&!!form.phone&&!!form.email&&!!form.message&&form.agree

  const handleSubmit=useCallback(async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(!isValid){
      setStatus('필수 항목을 모두 입력해주세요.')
      return
    }
    setStatus('전송 중...')
    try{
      const res=await fetch('/api/contact',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(form)
      })
      const result=await res.json()
      if(result.ok){
        setStatus('문의가 정상적으로 접수되었습니다.')
        setForm({name:'',company:'',phone:'',email:'',message:'',agree:false})
      }else{
        setStatus('오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      }
    }catch(err){
      console.error(err)
      setStatus('전송 실패. 네트워크 상태를 확인해주세요.')
    }
  },[form,isValid])

  return(
    <section className="section-wrapper pt-3">
      <motion.div
        initial={{opacity:0,y:40}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:0.6,ease:'easeOut'}}
        viewport={{once:true,amount:0.3}}
      >
        <div className="text-left mb-8 flex flex-col items-start gap-4">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-[3px] border-primary/30"/>
            <div className="absolute inset-0 rounded-full border-[3px] border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"/>
          </div>
          <div>
            <h2 className="section-heading !text-left !mb-[10px]">프로젝트 문의하기</h2>
            <p className="section-description !text-left !mb-[30px]">담당자 검토 후 영업일 기준 1-2일 내 회신드리겠습니다.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div>
            <Label htmlFor="name" className="flex items-center gap-[2px]">이름(담당자명)<span className="text-[#cc2a2a]">*</span></Label>
            <Input id="name" type="text" value={form.name} onChange={e=>handleChange('name',e.target.value)} placeholder="이름을 입력해주세요" required/>
          </div>
          <div>
            <Label htmlFor="company">회사명</Label>
            <Input id="company" type="text" value={form.company} onChange={e=>handleChange('company',e.target.value)} placeholder="회사명을 입력해주세요"/>
          </div>
          <div>
            <Label htmlFor="phone" className="flex items-center gap-[2px]">연락처<span className="text-[#cc2a2a]">*</span></Label>
            <Input id="phone" type="tel" value={form.phone} onChange={e=>handleChange('phone',e.target.value)} placeholder="010-0000-0000" required/>
          </div>
          <div>
            <Label htmlFor="email" className="flex items-center gap-[2px]">이메일<span className="text-[#cc2a2a]">*</span></Label>
            <Input id="email" type="email" value={form.email} onChange={e=>handleChange('email',e.target.value)} placeholder="contact@example.com" required/>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="message" className="flex items-center gap-[2px]">문의내용<span className="text-[#cc2a2a]">*</span></Label>
            <Textarea id="message" value={form.message} onChange={e=>handleChange('message',e.target.value)} placeholder="문의하실 내용을 작성해주세요" className="min-h-[160px]" required/>
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
