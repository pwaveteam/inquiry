'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function AboutSection() {
return (
<section id="about" className="relative overflow-hidden text-gray-900 bg-transparent">
<div className="section-wrapper relative z-10 text-center">
<motion.h2
initial={{ opacity: 0, x: -100 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.6, ease: 'easeOut' }}
viewport={{ once: true, amount: 0.3 }}
className="section-label"
>
About
</motion.h2>

<motion.p
initial={{ opacity: 0, y: 80 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
viewport={{ once: true, amount: 0.3 }}
className="section-heading"
>
전략이 기획으로, 디자인과 기술이 이어지는 팀<br />
가치가 담긴 설계, 전략이 이끄는 프로덕트
</motion.p>

<motion.p
initial={{ opacity: 0, y: 80 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
viewport={{ once: true, amount: 0.3 }}
className="section-description"
>
디자인과 기술의 조화를 통해, 브랜드 가치를 높입니다.
</motion.p>

<motion.div
initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
viewport={{ once: true, amount: 0.3 }}
className="flex justify-center"
>
<Button
  asChild
  variant="primary"
  className="text-[16px] rounded-[10px] px-[33px] py-[15px] transition-transform duration-500 hover:-translate-y-[3px]"
>
  <a href="#portfolio">포트폴리오 보기</a>
</Button>

</motion.div>
</div>
</section>
)
}