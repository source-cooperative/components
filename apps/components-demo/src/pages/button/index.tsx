import { BaseLayout, Button } from '@source-cooperative/components'
import { sideNavLinks } from '../../utils/constants'

export default function ButtonPage() {
  return (
    <BaseLayout sideNavLinks={sideNavLinks}>
      <Button>Hello World</Button>
    </BaseLayout>
  )
}
