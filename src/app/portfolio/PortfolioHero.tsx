'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function PortfolioHero() {
const [isVideoLoaded, setIsVideoLoaded] = useState(false)

useEffect(() => {
const iframe = document.querySelector<HTMLIFrameElement>('#portfolioHeroVideo')
if (iframe) iframe.addEventListener('load', () => setIsVideoLoaded(true))
}, [])

return (
<section className="container-default mt-[100px] mb-[80px]">
<motion.div
id="portfolioHero"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 1.2, ease: 'easeOut' }}
className="relative h-[50vh] flex items-center justify-center text-center text-white font-sans overflow-hidden rounded-[36px] shadow-[0_10px_40px_rgba(0,0,0,0.25)] bg-black"
>
{!isVideoLoaded && (
<motion.div
initial={{ opacity: 1 }}
animate={{ opacity: 0 }}
transition={{ duration: 1.2, delay: 0.3 }}
className="absolute inset-0 z-[1] bg-black/80 backdrop-blur-xl rounded-[36px]"
/>
)}

<div className="absolute inset-0 overflow-hidden z-[0] rounded-[36px]">
<iframe
id="portfolioHeroVideo"
src="https://player.vimeo.com/video/1129940842?background=1&autoplay=1&loop=1&muted=1&byline=0&title=0"
className="absolute top-1/2 left-1/2 w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2"
allow="autoplay; fullscreen; picture-in-picture"
allowFullScreen
/>
</div>

<motion.div
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
className="relative z-[2] max-w-[900px] w-full px-4"
>
<h3 className="banner-title-w mb-[30px]">
다양한 산업 분야에서 검증된<br />
퍼스의 포트폴리오를 확인하세요.
</h3>
<p className="banner-subtitle-w">
비공개 프로젝트를 포함하여<br />45개 이상의 프로젝트를 성공적으로 수행했습니다.
</p>


</motion.div>
</motion.div>
</section>
)
}