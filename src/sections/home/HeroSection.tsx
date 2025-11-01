'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
const [isVideoLoaded, setIsVideoLoaded] = useState(false)

useEffect(() => {
const iframe=document.querySelector<HTMLIFrameElement>('#heroVideo')
if(iframe) iframe.addEventListener('load',()=>setIsVideoLoaded(true))
}, [])

return(
<section className="container-default mt-[100px] mb-[80px]">
<motion.div
id="mainBanner"
initial={{opacity:0}}
animate={{opacity:1}}
transition={{duration:1,ease:'easeOut'}}
className="relative h-[80vh] flex items-center justify-center text-center text-white font-sans overflow-hidden rounded-[36px] shadow-[0_10px_40px_rgba(0,0,0,0.25)] bg-black"
>
{!isVideoLoaded&&(
<motion.div
initial={{opacity:1}}
animate={{opacity:0}}
transition={{duration:0.8,delay:0.2}}
className="absolute inset-0 z-[1] bg-black/80 backdrop-blur-xl rounded-[36px]"
/>
)}

<div className="absolute inset-0 overflow-hidden z-[0] rounded-[36px]">
<iframe
id="heroVideo"
src="https://player.vimeo.com/video/1129940842?background=1&autoplay=1&loop=1&muted=1&byline=0&title=0"
className="absolute top-1/2 left-1/2 w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2"
allow="autoplay; fullscreen; picture-in-picture"
allowFullScreen
/>
</div>

<motion.div
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{duration:0.8,delay:0.3,ease:'easeOut'}}
className="relative z-[2] max-w-[900px] w-full px-4"
>
<h2 className="text-[30px] md:text-[50px] leading-[1.3] tracking-[-0.03em] mb-[30px] drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)] font-normal">
비즈니스를 설계하고, 기술로 완성합니다.
</h2>
<p className="text-[18px] md:text-[26px] leading-[1.3] tracking-[-0.03em] text-white/95 mb-[40px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
아이디어 구상을 넘어, 실행 가능한 전략과 시장을 움직이는 프로덕트까지,<br />
퍼스는 단순 개발사가 아닌, 당신의 A to Z 비즈니스 파트너입니다.
</p>
<div className="text-center space-x-[20px]">
<Button asChild variant="primary">
<a href="/contact">홈페이지 개발 문의</a>
</Button>
<Button asChild variant="whiteOutline">
<a href="/portfolio">포트폴리오 보기</a>
</Button>
</div>
</motion.div>

<motion.div
initial={{opacity:0.7,y:10}}
animate={{opacity:1,y:0}}
transition={{delay:0.2,duration:0.6,ease:'easeOut'}}
className="absolute bottom-[32px] left-1/2 -translate-x-1/2 flex flex-col items-center text-white/80 z-[3] pointer-events-none"
>
<span className="text-[12px] tracking-[0.15em] mb-[10px]">SCROLL</span>
<div className="relative w-[20px] h-[34px] rounded-full border border-white/60 flex items-start justify-center">
<motion.div
animate={{y:[4,18,4]}}
transition={{duration:1.2,repeat:Infinity,ease:'easeInOut'}}
className="w-[1.5px] h-[6px] bg-white rounded-full"
/>
</div>
<motion.div
animate={{opacity:[0.4,1,0.4],y:[0,6,0]}}
transition={{duration:1.5,repeat:Infinity,ease:'easeInOut'}}
className="w-[1px] h-[18px] bg-white/40 mt-[8px]"
/>
</motion.div>
</motion.div>
</section>
)
}