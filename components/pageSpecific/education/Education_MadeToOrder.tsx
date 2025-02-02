import H2 from '@typography/H2'

import InnerWrapper from '@parts/InnerWrapper'
import PageSection from '@parts/PageSection'
import Lead from '@typography/Lead'

function Education_MadeToOrder() {
  return (
    <PageSection className='bg-white'>
      <InnerWrapper>
        <H2 id={'made-to-order'} color='blue'>
          Made To Order
        </H2>

        <Lead className='max-w-md text-xl text-blue-dark leading-none my-6'>
          One-off tutorials on specific somethings.
        </Lead>
        <p className='font-extrabold text-wine-100 italic text-4xl '>coming soon...</p>
      </InnerWrapper>
    </PageSection>
  )
}

export default Education_MadeToOrder
