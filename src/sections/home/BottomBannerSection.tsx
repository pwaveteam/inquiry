'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function BottomBannerSection() {
  return (
    <section
      id="cta"
      className="relative w-full overflow-hidden h-[60vh] flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/home/bottom-banner.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/85" />
      <div className="relative container-default text-center z-10 max-w-[900px] px-4">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-[50px] leading-[1.3] tracking-[-0.03em] mb-[30px] drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)] font-normal text-white"
        >
          비용 부담 없이 시작하는 완성형 웹사이트<br />
          <span className="font-semibold">기획부터 개발, 사업의 전략까지</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-[26px] leading-[1.3] tracking-[-0.03em] text-white/95 mb-[40px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
        >
          내 사업을 알릴 브랜드 홈페이지, 사업 아이디어를 담아낼 플랫폼<br />
          사업을 이해하는 전문가의 전략이 담겨야 지속가능한 서비스가 됩니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center space-x-[20px]"
        >
          <Button asChild variant="primary">
            <a href="#contact">홈페이지 개발 문의</a>
          </Button>
          <Button asChild variant="whiteOutline">
            <a href="#portfolio">포트폴리오 보기</a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
