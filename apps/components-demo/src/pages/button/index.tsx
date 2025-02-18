import BaseLayout from '@source-cooperative/components/components/BaseLayout.js'
import Button from '@source-cooperative/components/components/Button.js'
import CodeBlock, { InlineCode } from '@source-cooperative/components/components/CodeBlock.js'
import { sideNavLinks } from '../../utils/constants'

export default function ButtonPage() {
  return (
    <BaseLayout sideNavLinks={sideNavLinks}>
      <div sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <section>
          <Button>Hello World</Button>
          <CodeBlock>{'<Button>Hello World</Button>'}</CodeBlock>
        </section>
        <section>
          <Button sx={{ backgroundColor: 'red' }} >sx</Button>
          <CodeBlock>{'<Button sx={{ backgroundColor: \'red\' }} >sx</Button>'}</CodeBlock>
          <InlineCode>sx</InlineCode> uses the theme (red is lighter than the browser default).
        </section>
        <section>
          <Button css='background-color: red'>css</Button>
          <CodeBlock>{'<Button css=\'background-color: red\'>css</Button>'}</CodeBlock>
          <InlineCode>css</InlineCode> sets raw CSS properties.
        </section>
        <section>
          <Button className='red'>classname</Button>
          <CodeBlock>{'<Button className=\'red\'>classname</Button>'}</CodeBlock>
          <InlineCode>className</InlineCode> prepends a class name. But it can be overriden by the theme since Emotion appends a custom classname at the end. Use with care.
        </section>
        <section>
          <Button className='red-important'>classname</Button>
          <CodeBlock>{'<Button className=\'red-important\'>classname</Button>'}</CodeBlock>
          Example where we set <InlineCode>!important</InlineCode> in the CSS property. It&apos;s a hack.
        </section>
      </div>
    </BaseLayout>
  )
}
