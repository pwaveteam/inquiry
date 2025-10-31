'use client'
import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function FooterWrapper() {
  const pathname = usePathname()
  const hideFooter = pathname.startsWith('/service')
  return !hideFooter ? <Footer /> : null
}
