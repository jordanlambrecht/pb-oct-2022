import { NextPage } from 'next'
import Footer_Nav from 'components/footer/Footer_Nav'
import Footer_Nav_SubNav from 'components/footer/Footer_Nav_SubNav'
import Footer_HappyCard from 'components/footer/Footer_HappyCard'
import Logo_Type from '@parts/Logo_Type'
import Button_Filled from '@parts/Button_Filled'
import Footer_SocialLinks from '@nav/Nav_SocialLinks'
import Footer_Croissant from 'components/footer/Footer_Croissant'
import nav_main from '@data/nav_main'
import nav_footer_sub from '@data/nav_footer_sub'
import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { InstagramGallery } from '@parts/Instagram'
import H3 from '@typography/H3'

export const Footer: NextPage = () => {
  const [testModalOpen, setTestModal] = useState(false)
  // const [selectedStar, setSelectedStar] = useState()

  const updateModal = () => {
    setTestModal(!testModalOpen)
  }

  // GSAP FOR MODAL
  useEffect(() => {
    if (!testModalOpen) gsap.to('#croissantModal', 0.3, { autoAlpha: 0 })
    else if (testModalOpen) gsap.to('#croissantModal', 0.3, { autoAlpha: 1 })
    return () => {}
  })

  const year = new Date().getFullYear()
  return (
    <div>
      <footer
        className='relative bg-peach px-6 lg:px-12 py-12 xl:py-24 xl:max-h-screen mb-4'
        id='footer'
      >
        <section
          id='croissantModal'
          className='transform-gpu will-change-transform absolute w-full h-full top-0 left-0 bg-peach z-30'
        >
          <Footer_Croissant onModalUpdate={updateModal} />
        </section>

        <div className='mx-auto max-w-6xl'>
          <div className='grid grid-cols-1 lg:grid-cols-3 lg:mb-12 gap-8 h-full'>
            <div className='h-full flex flex-col justify-between'>
              <div className='flex justify-center lg:justify-start'>
                <Logo_Type />
              </div>

              <nav className='hidden sm:block pt-5 mt-3'>
                <ul className='grid grid-cols-1 lg:grid-cols-1  text-left text-xl md:text-2xl xl:text-4xl font-semibold gap-x-2 xl:gap-y-2 lg:font-black mb-0'>
                  {nav_main.map((navitem) => (
                    <Footer_Nav navitem={navitem} key={navitem.text} />
                  ))}
                </ul>
              </nav>
            </div>

            <div className='hidden sm:flex flex-col justify-start h-full md:pr-6'>
              <div className='self-center w-full hidden lg:block'>
                <div className='mx-auto border-b-4 border-cream text-bold max-w-xs  md:pr-4  md:mr-4'>
                  <H3 className='text-center md:text-left font-extrabold text-3xl text-cream'>
                    studio
                  </H3>
                </div>
                <div>
                  <ul className='mt-3 text-center md:text-left'>
                    <li>
                      <a
                        className='text-cream text-xl'
                        target='_blank'
                        href='https://g.page/pixelbakery?share'
                      >
                        2124 y st ste 208
                        <br />
                        lincoln, ne 68503
                      </a>
                    </li>
                    <li className='mt-3 text-xl text-cream'>
                      <a href='tel:4024138366' target='_blank' rel='noreferrer'>
                        402 413 8366
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='xl:pt-4 md:pr-4'>
                <div className='hidden lg:block mx-auto lg:mt-4 border-b-4 border-cream mb-4 max-w-xs md:pr-4'>
                  <H3 className='text-center md:text-left font-extrabold text-3xl  leading-none mt-0 text-cream'>
                    more stuff
                  </H3>
                </div>
                <nav className=''>
                  <ul className='mt-3 mb-0 grid grid-cols-1 lg:grid-cols-1 w-fit align-center gap-y-2 gap-x-3'>
                    {nav_footer_sub.map((navitem) => (
                      <Footer_Nav_SubNav navitem={navitem} key={navitem.text} />
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
            {/* Mobile Nav */}
            <div className='md:hidden grid grid-cols-2 gap-y-0 gap-x-6'>
              <ul className='flex flex-col gap-y-3'>
                {nav_main.map((navitem, index) => (
                  <div key={index} className={'font-extrabold text-xl leading-none'}>
                    <Footer_Nav navitem={navitem} key={navitem.text} />
                  </div>
                ))}
              </ul>
              <ul className=' mb-0 flex flex-col gap-y-3'>
                {nav_footer_sub.map((navitem, index) => (
                  <div key={index}>
                    <Footer_Nav_SubNav navitem={navitem} key={navitem.text} />
                  </div>
                ))}
              </ul>
            </div>
            {/* End Mobile Nav */}
            <div className='flex flex-col justify-between h-full'>
              <div className='text-center xl:mb-4'>
                <Footer_HappyCard />
              </div>
              <div className='w-full lg:py-4 xl:my-3'>
                <div className='w-full' id='footer-social'>
                  <Footer_SocialLinks color={'cream'} textSize={'text-2xl md:text-3xl'} />
                </div>
                {/* <div className='w-full flex justify-center'>
                  <span className='text-cream italic font-bold text-center text-lg'>
                    fresh puns and nice buns
                  </span>
                </div> */}
              </div>
              <div className='hidden lg:flex justify-center w-full my-3'>
                <Button_Filled
                  center={true}
                  text={'Start something wonderful'}
                  link={'/onboarding'}
                  bgColor={'blue-dark'}
                  textColor={'cream'}
                  chevronDirection='right'
                />
              </div>
              <div className='hidden lg:block text-center lg:mt-3'>
                <a
                  className='text-cream  text-2xl font-extrabold mb-0 pb-0 leading-none'
                  href='mailto:hello@pixelbakery.com'
                  target='_blank'
                  rel='noreferrer'
                >
                  hello@pixelbakery.com
                </a>
              </div>
            </div>
          </div>
          <div className='flex flex-col md:flex-row justify-center md:justify-between'>
            <button
              onClick={updateModal}
              className='self-center max-w-xs group text-2xl ease-in-out bg-cream px-3 rounded-md py-2 duration-300 hover:scale-98 drop-shadow-md hover:drop-shadow-sm '
            >
              <i className='block duration-300 ease-in-out group-hover:rotate-360'> 🥐</i>
            </button>
            <span className='self-center text-center mt-4 md:mt-0 italic text-sm  text-cream'>
              © {year} Pixel Bakery Design Studio
              <br />
              Made with lust and flour in Lincoln, Nebraska & NW Arkansas
            </span>
            <div className='hidden md:block' />
          </div>
        </div>
      </footer>
      <div className='my-4'>
        <InstagramGallery count={14} />
      </div>
    </div>
  )
}

export default Footer
