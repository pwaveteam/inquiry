'use client'
import { motion } from 'framer-motion'

export default function PlanSection() {
  const plans = [
    {
      name: '랜딩페이지',
      info: '소개부터 프로모션, 광고까지 다양하게 활용할 수 있는 원페이지형 웹사이트',
      price: '500,000원',
      list: [
        '- 1p 반응형 웹',
        '- 기획 미포함',
        '- 문의폼 및 카카오톡 연결',
        '- 기본 SEO 및 검색 노출 최적화',
        '- 작업 기간: 3~4일',
        '- 호스팅·SSL 제공: 6개월 무료',
      ],
    },
    {
      name: '자사 홈페이지',
      info: '기업이나 브랜드의 가치와 서비스를 소개하는 공식 웹사이트',
      price: '1,500,000원',
      best: true,
      list: [
        '- 5p 반응형 웹',
        '- 기획 포함',
        '- 무료 스톡 이미지 포함',
        '- 기본 SEO 및 검색 노출 최적화',
        '- 작업 기간: 2주',
        '- 호스팅·SSL 제공: 1년 무료',
      ],
    },
    {
      name: '커스텀 개발',
      info: 'MVP부터 서비스 운영까지, 맞춤형 기능 개발이 필요한 웹 또는 앱',
      price: '별도 협의',
      highlight: true,
      list: [
        '- 서비스 구조 및 화면 설계 포함',
        '- SaaS, 예약, 결제 등 맞춤 기능 개발',
        '- API 연동 및 관리자 시스템 구축',
        '- 웹/앱 동시 개발 가능',
        '- 작업 기간: 별도 협의',
        '- 호스팅·SSL 제공: 1년 무료',
      ],
    },
  ]
  
  return (
    <section
      id="plan"
      className="relative text-white overflow-hidden"
      style={{ backgroundImage: "url('https://i.imgur.com/5gkMDob.jpeg')", backgroundPosition: 'center', backgroundSize: 'cover' }}
    >
      <div className="section-wrapper">
      <div className="mb-[80px] text-left">
  <motion.h2
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.3 }}
    className="section-label-w"
  >
    PLAN
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.3 }}
    className="section-heading-w"
  >
부담없이 시작하는 합리적인 제작 플랜
  </motion.p>

  <motion.p
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.3 }}
    className="section-description-w"
  >
    초기 투자 부담은 낮추고, 단계에 맞게 선택할 수 있는 플랜<br />가볍게 시작해도, 원하는 결과로 이어집니다.
  </motion.p>
</div>
 
 
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[36px] mt-[50px]">
  {plans.map((plan, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.4, ease: 'easeOut' },
      }}
      className="relative bg-white/15 backdrop-blur-xl border border-white/10 rounded-[30px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:shadow-[0_12px_50px_rgba(255,255,255,0.1)]"
    >
      <div className="bg-white text-black px-[39px] pt-[38px] pb-[28px] text-left rounded-t-[30px]">
      <div className="flex items-center justify-between mb-[10px]">
  <div className="subtitle">{plan.name}</div>
  {plan.best && (
    <motion.div
      animate={{
        opacity: [0.7, 1, 0.7],
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="bg-[#003090] text-white text-[12px] font-medium px-[14px] py-[5px] rounded-full shadow-md"
    >
      BEST
    </motion.div>
  )}
</div>


<div className="description mb-[14px]">{plan.info}</div>

<div
  className={`description font-semibold ${
    plan.highlight ? 'text-[#0d6efd]' : 'text-[#003090]'
  }`}
>
  {plan.price}
</div>

      </div>

      <div className="px-[39px] pt-[23px] pb-[30px] bg-gradient-to-b from-white/10 to-transparent">
  <ul className="description-w space-y-[6px]">
    {plan.list.map((item, j) => (
      <li
        key={j}
        className="transition-all duration-300 hover:text-white hover:translate-x-[4px]"
      >
        {item}
      </li>
    ))}
  </ul>
</div>

    </motion.div>
  ))}
</div>


      </div>
    </section>
  )
}
