'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const logosTop=[
'/images/partners/partner-logo1.png',
'/images/partners/partner-logo2.png',
'/images/partners/partner-logo3.png',
'/images/partners/partner-logo4.png',
'/images/partners/partner-logo5.png',
'/images/partners/partner-logo6.png',
'/images/partners/partner-logo7.png',
'/images/partners/partner-logo8.png',
'/images/partners/partner-logo9.png'
]

const logosBottom=[
'/images/partners/partner-logo1.png',
'/images/partners/partner-logo2.png',
'/images/partners/partner-logo3.png',
'/images/partners/partner-logo4.png',
'/images/partners/partner-logo5.png',
'/images/partners/partner-logo6.png',
'/images/partners/partner-logo7.png',
'/images/partners/partner-logo8.png',
'/images/partners/partner-logo9.png'
]

export default function PartnersMarquee(){
return(
<div className="w-full bg-black flex justify-center py-10 max-md:py-6">
<div className="w-full max-w-[1280px]">
<motion.div className="flex gap-16 max-md:gap-8 justify-center whitespace-nowrap" animate={{x:['0%','-50%']}} transition={{duration:25,repeat:Infinity,ease:'linear'}}>
{logosTop.concat(logosTop,logosTop).map((logo,idx)=>(
<div key={idx} className="flex-shrink-0 w-52 h-28 max-md:w-32 max-md:h-20 flex items-center justify-center">
<Image src={logo} alt={`partner-${idx}`} width={208} height={112} className="max-md:w-[128px] max-md:h-auto"/>
</div>
))}
</motion.div>
<motion.div className="flex gap-16 max-md:gap-8 justify-center whitespace-nowrap mt-6 max-md:mt-4" animate={{x:['-50%','0%']}} transition={{duration:25,repeat:Infinity,ease:'linear'}}>
{logosBottom.concat(logosBottom,logosBottom).map((logo,idx)=>(
<div key={idx} className="flex-shrink-0 w-52 h-28 max-md:w-32 max-md:h-20 flex items-center justify-center">
<Image src={logo} alt={`partner-${idx}`} width={208} height={112} className="max-md:w-[128px] max-md:h-auto"/>
</div>
))}
</motion.div>
</div>
</div>
)}
