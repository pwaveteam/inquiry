'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

const menus = [
{ name: '서비스 소개', href: '/service' },
{ name: '포트폴리오', href: '/portfolio' }
]


export default function Header() {
const pathname = usePathname()
const isActive = useCallback((href: string) => pathname === href, [pathname])
const [isScrolled, setIsScrolled] = useState(false)

useEffect(() => {
const handleScroll = () => setIsScrolled(window.scrollY > 10)
window.addEventListener('scroll', handleScroll)
return () => window.removeEventListener('scroll', handleScroll)
}, [])

return (
<header
className={`fixed top-0 left-0 z-[9999] w-full transition-all duration-500 ${
isScrolled
? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-b border-gray-200/70'
: 'bg-white border-b border-transparent'
}`}
>
<div className="container-default">
<div className="flex h-[80px] items-center justify-between">
<Link href="/" className="flex items-center" aria-label="홈으로 이동">
<Image
src="/logo.svg"
alt="펄스웨이브 로고"
width={120}
height={36}
priority
/>
</Link>
<nav className="flex items-center gap-[30px]">
{menus.map(menu => (
<Link
key={menu.href}
href={menu.href}
className={`text-base font-medium transition-all duration-250 focus:outline-none ${
isActive(menu.href)
? 'text-[#003090]'
: 'text-gray-700 hover:text-[#003090]'
}`}
>
{menu.name}
</Link>
))}
<div className="pl-[8px] flex items-center">
<Button
asChild
variant="primary"
className="px-[23px] py-[11px] text-[15px]"
>
<Link href="/contact">견적 상담</Link>
</Button>
</div>
</nav>
</div>
</div>
</header>
)
}