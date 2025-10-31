'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function EstimateHero() {
const [isVideoLoaded, setIsVideoLoaded] = useState(false)

useEffect(() => {
const iframe = document.querySelector<HTMLIFrameElement>('#estimateHeroVideo')
if (iframe) iframe.addEventListener('load', () => setIsVideoLoaded(true))
}, [])

return (
<section className="container-default mt-[100px] mb-[80px]">
<motion.div
id="estimateHero"
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
id="estimateHeroVideo"
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
빠르고 정확한 견적을<br />
스마트 견적으로 바로 확인하세요.
</h3>
<p className="banner-subtitle-w">
복잡한 절차 없이 몇 가지 정보만 입력하면<br />맞춤 견적을 즉시 받아보실 수 있습니다.
</p>
</motion.div>
</motion.div>
</section>
)
}