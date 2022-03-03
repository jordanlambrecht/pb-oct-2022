console.clear()

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import style from '@styles/HamburgerMenu.module.css'
import cn from 'classnames'

gsap.registerPlugin(ScrollTrigger)
function Navigation() {
  const [hamToggle, setHamToggle] = useState(false)
  const hamRef = useRef(null)
  const logo = useRef(null)
  const box1 = useRef(null)
  const box2 = useRef(null)
  const box3 = useRef(null)
  const fullscreen = useRef(null)

  const el = useRef()
  const q = gsap.utils.selector(el)

  // useEffect(() => {
  //   gsap.set(q('.navItem:not(.box)'), { opacity: 1 })
  // }, [])

  useEffect(() => {
    gsap.set(hamRef.current, {
      y: -120,
    })
    gsap.to(hamRef.current, {
      delay: 1,
      ease: 'back.out',
      y: 0,
      opacity: 1,
      stagger: {
        amount: 0.25,
      },
    })
  }, [])

  useEffect(() => {
    let boxes = [box1.current, box2.current, box3.current]
    gsap.set(boxes, {
      y: -120,
    })
    gsap.set(logo.current, {
      y: -120,
    })
    let tl = gsap.timeline({ duration: 1, delay: 1, ease: 'sine.out' })
    tl.to(boxes, {
      y: 0,
      opacity: 1,
      stagger: {
        amount: 0.25,
      },
    })
    tl.to(logo.current, {
      y: 0,
      opacity: 1,
    })

    ScrollTrigger.create({
      start: `${window.innerHeight / 2} top`,
      end: 'max',
      invalidateOnRefresh: true,
      markers: true,
      onToggle(self) {
        // prevent toggling when at the bottom of page
        if (self.progress === 1) return
        if (self.isActive) {
          tl.reverse()
        } else {
          tl.play()
        }
      },
    })
  }, [])

  //responsible for enabling and disabling the fullscreen menu
  useEffect(() => {
    let boxes = [box1.current, box2.current, box3.current]

    if (!hamToggle) {
      document.body.classList.remove('overflow-y-hidden')
      gsap.to(boxes, {
        invalidateOnRefresh: true,
        opacity: 1,
      })
      gsap.to(fullscreen.current, {
        autoAlpha: 0,
      })
      // gsap.to(hamRef.current, {
      //   rotate: 0,
      // })
    } else {
      gsap.to(boxes, {
        opacity: 0,
      })
      gsap.to(fullscreen.current, {
        autoAlpha: 1,
      })
      // gsap.to(hamRef.current, {
      //   rotate: 180,
      // })
      document.body.classList.add('overflow-y-hidden')
    }
  }, [hamToggle])

  return (
    <div className=''>
      <div ref={el} className={'z-40'}>
        <div
          ref={logo}
          className='navItem origin-top-left ml-8 mt-8 fixed top-0 left-0 w-32 h-32 bg-peach z-40  opacity-0 '
        >
          <p>logo here</p>
        </div>
        <div className='mt-8 mr-8 fixed top-0 right-0 z-50 flex justify-end gap-x-6'>
          <div ref={box1} className='bg-peach z-0 opacity-0 navItem box'>
            <p>what we make</p>
          </div>
          <div ref={box2} className='bg-peach z-0 opacity-0 navItem box'>
            <p>who we are</p>
          </div>
          <div ref={box3} className='bg-peach -z-10 opacity-0 navItem box'>
            <p>start a project</p>
          </div>
          <div
            ref={hamRef}
            onClick={() => setHamToggle(!hamToggle)}
            className='  w-16 h-16 bg-peach z-50 opacity-0 cursor-pointer navItem'
          >
            <div
              className='group inline-block bg-cream rounded-lg transform transition-all duration-600 ease-in-out scale-100 opacity-100
  hover:opacity-90 hover:scale-95 active:scale-97'
            >
              <div className={cn(style.hamWrapper)}>
                <svg
                  className={cn(style.ham, style.hamRotate, { [style.active]: !hamToggle })}
                  viewBox='0 0 100 100'
                >
                  <path
                    className={cn(style.line, style.top)}
                    d='m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20'
                  />
                  <path className={cn(style.line, style.middle)} d='m 30,50 h 40' />
                  <path
                    className={cn(style.line, style.bottom)}
                    d='m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={fullscreen}
        className='fixed overflow-hidden top-0 left-0 w-screen h-screen bg-pink z-40 opacity-0'
      ></div>
    </div>
  )
}

export default Navigation
