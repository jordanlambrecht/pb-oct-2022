import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
gsap.registerPlugin(ScrollTrigger)

function Navbar() {
  const [hamToggle, setHamToggle] = useState(false)
  const ref = useRef(null)
  const hamRef = useRef(null)
  const logo = useRef(null)
  const box1 = useRef(null)
  const box2 = useRef(null)
  const box3 = useRef(null)
  const fullscreen = useRef(null)

  const q = gsap.utils.selector(ref)

  useEffect(() => {
    gsap.set(q('.navItem'), { y: -64 })
    gsap.to(q('.navItem'), 1.2, {
      stagger: {
        amount: 0.33,
      },
      ease: 'back.out',
      delay: 0.8,
      y: 0,
      autoAlpha: 1,
    })
  })

  useEffect(() => {
    gsap.to([box1.current, box2.current, box3.current], {
      scrollTrigger: {
        trigger: 'body',
        pinReparent: true,
        start: 'top',
        end: () => innerHeight / 2 + 'top',
        // toggleActions: 'play pause resume reset',
        toggleActions: 'play none reverse none',
        markers: true,
      },
      stagger: {
        amount: 0.25,
      },
      ease: 'back.out',
      y: -50,
      autoAlpha: 0,
    })
  }, [box1, box2, box3])

  // useEffect(() => {
  //   gsap.to(q('.navItem'), {
  //     scrollTrigger: {
  //       trigger: 'body',
  //       scrub: true,
  //       // start: 'top top',
  //       end: () => innerHeight / 2 + 'top',
  //       toggleActions: 'play pause resume reset',
  //       markers: true,
  //     },
  //     stagger: {
  //       amount: 0.25,
  //     },
  //     ease: 'back.out',
  //     y: 50,
  //   })
  // }, [])
  // function HandleHamToggle() {
  //   setHamToggle(!hamToggle)
  // }stagger: {
  //       amount: 0.25,
  //     },

  // useEffect(() => {
  //   const element = ref.current
  //   gsap.to(element.querySelectorAll('.navItem'), {
  // stagger: {
  //   amount: 0.25,
  // },
  // scrollTrigger: {
  //   trigger: 'body',
  //   scrub: true,
  //   start: 'top top',
  //   end: () => innerHeight / 2 + 'top',
  //   markers: true,
  // },
  //     scale: 0,
  //     autoAlpha: 0,
  //     ease: 'none',
  //   })
  // }, [])

  // Scroll Downwards
  // useEffect(() => {
  //   gsap.to([box1, box2], {
  //     delay: 0.8,
  //     y: -64,
  //     scrollTrigger: {
  //       trigger: 'body', // technically not neccessary - when you don't pin anything, the body will be the default
  //       start: 0,
  //       end: () => innerHeight / 2 + ' top',
  //       scrub: true,
  //       markers: true,
  //     },
  //   })
  // }, [box1, box2])

  useEffect(() => {
    if (!hamToggle) {
      document.body.classList.remove('overflow-y-hidden')
      gsap.to(fullscreen.current, {
        autoAlpha: 0,
      })
      gsap.to(hamRef.current, {
        rotate: 0,
      })
    } else {
      gsap.to(fullscreen.current, {
        autoAlpha: 1,
      })
      gsap.to(hamRef.current, {
        rotate: 180,
      })
      document.body.classList.add('overflow-y-hidden')
    }
  }, [hamToggle])

  return (
    <div>
      <div ref={ref}>
        <div
          ref={logo}
          className='navItem origin-top-left ml-8 mt-8 fixed top-0 left-0 w-32 h-32 bg-peach z-50 opacity-0 '
        >
          <p>logo here</p>
        </div>

        <div className='mt-8 mr-8 fixed top-0 right-0 z-50 flex justify-end gap-x-6'>
          <div ref={box1} className='  bg-peach z-50   opacity-0 navItem'>
            <p>what we make</p>
          </div>
          <div ref={box2} className=' bg-peach z-50  opacity-0 navItem'>
            <p>who we are</p>
          </div>
          <div ref={box3} className='  bg-peach z-50  opacity-0 navItem'>
            <p>start a project</p>
          </div>
          <div
            ref={hamRef}
            onClick={() => setHamToggle(!hamToggle)}
            className='  w-16 h-16 bg-peach z-50 opacity-0 cursor-pointer navItem'
          >
            <p>{hamToggle.toString()}</p>
          </div>
        </div>
      </div>
      <div
        ref={fullscreen}
        className='fixed overflow-hidden top-0 left-0 w-screen h-screen bg-blue z-40 opacity-0'
      ></div>
    </div>
  )
}
export default Navbar
