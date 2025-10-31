'use client'
import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function GeneralFaqSection() {
const faqs = [
    {
      question: '기획 없이도 제작이 가능한가요?',
      answer:
        '네, 가능합니다. 다만 패키지에 따라 기획은 별도로 진행되며 추가 비용이 발생합니다. 기획 없이 진행하실 경우, 제공해 주시는 자료와 요청 사항을 기반으로 디자인과 개발을 진행합니다.',
    },
    {
      question: '디자인 수정은 몇 번까지 가능한가요?',
      answer:
        '기본적으로 2회 수정이 포함되어 있으며, 추가 수정은 요청하신 범위에 따라 별도 견적이 산정됩니다. 초기 미팅에서 충분히 방향을 잡아드리므로 대부분 1~2회 내에 완성됩니다.',
    },
    {
      question: '개발 후 직접 관리가 가능한가요?',
      answer:
        '네, 관리자 페이지를 통해 직접 콘텐츠 수정이 가능하도록 구축해드립니다. 사용법에 대한 간단한 가이드도 함께 제공됩니다.',
    },
    {
      question: '도메인이나 서버는 따로 준비해야 하나요?',
      answer:
        '아니요, 원하실 경우 도메인 연결 및 호스팅 세팅까지 모두 대행해드립니다. 이미 보유 중이신 경우에도 연동 가능합니다.',
    },
  ]


return (
<section id="business" className="section-wrapper text-gray-900">
<motion.h2
initial={{ opacity: 0, x: -100 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.6, ease: 'easeOut' }}
viewport={{ once: true, amount: 0.3 }}
className="section-label"
>
FAQ
</motion.h2>

<div className="flex justify-end">
<motion.div
initial={{ opacity: 0, x: 60 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.6, ease: 'easeOut' }}
viewport={{ once: true, amount: 0.3 }}
className="w-full max-w-[800px]"
>
<Accordion type="single" collapsible className="space-y-4">
{faqs.map((faq, i) => (
<motion.div
key={i}
initial={{ opacity: 0, x: 40 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
viewport={{ once: true, amount: 0.3 }}
>
<AccordionItem value={`item-${i}`} className="border-b border-gray-200">
<AccordionTrigger className="py-5">
<span className="flex-1 text-left">{faq.question}</span>
</AccordionTrigger>
<AccordionContent className="mt-4">
<p className="description whitespace-pre-line">{faq.answer}</p>
</AccordionContent>
</AccordionItem>
</motion.div>
))}
</Accordion>

</motion.div>
</div>
</section>
)
}