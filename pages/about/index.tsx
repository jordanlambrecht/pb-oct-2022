import PageHeader_VariableHeight from '@pageHeaders/PageHeader_VarH'

import About_Team from '@about/About_Team'
import About_Values from '@about/About_Values'

import About_Twitch from '@about/About_Twitch'
import About_Faq from '@about/About_Faq'
import { getAllPeople } from '@lib/api_person'
import Person from 'types/person'
import Main from '@parts/Main'
import About_Awards from '@about/About_Awards'
import About_Spotify from '@about/About_Spotify'
import { NextSeo } from 'next-seo'
type Props = {
  allPeople: Person[]
}
function About({ allPeople }: Props) {
  return (
    <Main>
      <NextSeo
        title='Pixel Bakery | About'
        description={
          'Pixel Bakery is a multi-disciplinary production studio focused on animation, motion design, and commercial film production.'
        }
        openGraph={{
          url: `https://pixelbakery.com/about`,
          title: 'Pixel Bakery | About',
          description:
            'Pixel Bakery is a multi-disciplinary production studio focused on animation, motion design, and commercial film production.',
        }}
      />
      <PageHeader_VariableHeight header='About' subheader='Just add flour.' />
      <About_Team people={allPeople} />
      <About_Values />

      <About_Spotify />
      {/* <About_Commitment /> */}

      <About_Twitch />
      <About_Awards />
      <About_Faq />
    </Main>
  )
}

export default About
export const getStaticProps = async () => {
  const allPeople = getAllPeople([
    'slug',
    'socials',
    'details',
    'name',
    'active',
    'title',
    'photos',
  ])

  return {
    props: { allPeople },
  }
}
