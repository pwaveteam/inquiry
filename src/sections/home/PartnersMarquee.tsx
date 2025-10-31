'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const logosTop = [
'/images/partners/partner-logo1.png',
'/images/partners/partner-logo2.png',
'/images/partners/partner-logo3.png',
'/images/partners/partner-logo4.png',
'/images/partners/partner-logo5.png',
'/images/partners/partner-logo6.png',
'/images/partners/partner-logo7.png',
'/images/partners/partner-logo8.png',
'/images/partners/partner-logo9.png',
]

const logosBottom = [
'/images/partners/partner-logo1.png',
'/images/partners/partner-logo2.png',
'/images/partners/partner-logo3.png',
'/images/partners/partner-logo4.png',
'/images/partners/partner-logo5.png',
'/images/partners/partner-logo6.png',
'/images/partners/partner-logo7.png',
'/images/partners/partner-logo8.png',
'/images/partners/partner-logo9.png',
]

export default function PartnersMarquee() {
return (
<div className="w-full bg-black flex justify-center py-10">
<div className="w-full max-w-[1280px]">

<motion.div
className="flex gap-16 justify-center whitespace-nowrap"
animate={{ x: ['0%', '-50%'] }}
transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
>
{logosTop.concat(logosTop, logosTop).map((logo, idx) => (
<div
key={idx}
className="flex-shrink-0 w-52 h-28 flex items-center justify-center"
>
<Image src={logo} alt={`partner-${idx}`} width={208} height={112} />
</div>
))}
</motion.div>

<motion.div
className="flex gap-16 justify-center whitespace-nowrap mt-6"
animate={{ x: ['-50%', '0%'] }}
transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
>
{logosBottom.concat(logosBottom, logosBottom).map((logo, idx) => (
<div
key={idx}
className="flex-shrink-0 w-52 h-28 flex items-center justify-center"
>
<Image src={logo} alt={`partner-${idx}`} width={208} height={112} />
</div>
))}
</motion.div>
</div>
</div>
)
}