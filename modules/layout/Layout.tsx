import { Content } from "./Content"
import { HeaderResponsive } from "./Header"
import { LINKS } from "./settings"

interface LayoutProps {
  children?: React.ReactNode
}

export function Layout(props: LayoutProps) {
  const { children } = props
  return (
    <>
      <HeaderResponsive links={LINKS} />
      <Content>
        {children}
      </Content>
    </>
  )
}