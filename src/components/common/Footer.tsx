'use client'
import Link from 'next/link'
import { Instagram, Youtube } from 'lucide-react'

export default function Footer(){
const sns=[
{icon:<Instagram size={18}/>,href:'https://www.instagram.com/pulsewave.on/'},
{icon:<Youtube size={18}/>,href:'https://www.youtube.com/channel/UCm1yMT7PlZTpMtNNqu5rASw'}
]

return(
<footer className="w-full bg-black text-white border-t border-white/10 pt-[60px] pb-[40px] max-md:pt-[40px] max-md:pb-[30px]">
<div className="max-w-[1300px] mx-auto px-6 flex flex-col md:flex-row justify-between gap-10 max-md:gap-6">
<div>
<h3 className="text-[13px] md:text-[15px] font-semibold tracking-[-0.019em] uppercase text-white/80 mb-2 md:mb-3">주식회사 펄스웨이브</h3>
<p className="text-[13px] md:text-[15px] text-white/60 leading-[1.6]">
경기 수원시 영통구 법조로 25, SK뷰레이크 25F<br/>
info@pulsewave.kr · 070-4149-3331
</p>
</div>
<div className="flex items-start gap-5">
{sns.map((item,i)=>(
<Link key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#003090] transition-colors duration-300">
{item.icon}
</Link>
))}
</div>
</div>
<div className="max-w-[1300px] mx-auto px-6 mt-[40px] max-md:mt-[30px] border-t border-white/10 pt-[20px]">
<p className="text-[13px] md:text-[15px] text-white/40">© {new Date().getFullYear()} Pulsewave Co. All rights reserved</p>
</div>
</footer>
)}