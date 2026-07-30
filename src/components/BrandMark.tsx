import Image from 'next/image'

export function BrandMark() {
  return (
    <Image
      src="/assets/logo-icon-transparent.png"
      alt="Signature logo"
      width={40}
      height={40}
      className="brand-mark"
      priority
    />
  )
}
