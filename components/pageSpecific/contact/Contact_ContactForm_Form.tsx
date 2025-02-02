import { useForm } from 'react-hook-form'

import { useState } from 'react'
import Lead from '@typography/Lead'
import { SendToMonday_ContactForm } from '@lib/api_sendToMonday'
import PhoneInput from 'react-phone-number-input/react-hook-form-input'

function Contact_ContactForm_Form() {
  const [checked, setChecked] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const handleCheck = () => {
    setChecked(!checked)
  }
  ////////////
  // MAILCHIMP
  ////////////
  async function SendToMailchimp(data) {
    data.tag = 'Contact Form'
    if (checked) {
      await fetch('/api/mailchimp', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } else {
      return
    }
  }
  ///////////
  // SENDGRID
  ///////////
  async function SendToSendgrid(data) {
    await fetch('/api/sendContact', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((res) => res.json())
  }

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm()

  // Handle the submit
  const onSubmit = (data) => {
    SendToSendgrid(data)
    SendToMonday_ContactForm(data)
    SendToMailchimp(data)

    setSubmitted(true)
    reset()
  }
  const [value, setValue] = useState()

  return (
    <div>
      {submitted ? (
        <Lead>Thanks for your message 😉  We&apos;ll get back to you asap. </Lead>
      ) : (
        <form
          className='mx-auto max-w-2xl  grid grid-cols-2 gap-4'
          onSubmit={handleSubmit(onSubmit)}
          data-netlify='true'
        >
          <input
            className='col-span-2 border-2 border-blue bg-transparent rounded-xl w-full font-semibold py-4  px-8 text-xl text-wine cursor-text focus:ring-1 focus:border-blue-dark  focus:ring-blue-dark'
            type='text'
            placeholder='name'
            {...register('name', {
              required: { message: 'Please enter your name, stranger', value: true },
              minLength: { message: "c'mon that's not your name", value: 4 },
            })}
          />
          <input
            className='col-span-2 border-2 border-blue bg-transparent rounded-xl w-full font-semibold py-4  px-8 text-xl text-wine cursor-text focus:ring-1 focus:border-blue-dark  focus:ring-blue-dark'
            type='email'
            placeholder='email'
            {...register('email', {
              required: { message: 'Please enter your email.', value: true },
              minLength: { message: "c'mon that's not your email", value: 4 },
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid email address',
              },
            })}
          />

          <PhoneInput
            placeholder='phone (optional)'
            className='col-span-2 lg:col-span-1 border-2 border-blue bg-transparent rounded-xl w-half font-semibold py-4  px-8 text-xl text-wine cursor-text focus:ring-1 focus:border-blue-dark  focus:ring-blue-dark'
            country='US'
            name='phone'
            control={control}
            value={value}
            onChange={setValue}
          />
          {/* 
            <input
              className='form-border-b flex-grow'
              type='tel'
              placeholder='phone (optional)'
              {...register('phone', {})}
            /> */}
          <input
            className='col-span-2 lg:col-span-1 border-2 border-blue bg-transparent rounded-xl w-half font-semibold py-4  px-8 text-xl text-wine cursor-text focus:ring-1 focus:border-blue-dark  focus:ring-blue-dark'
            type='text'
            placeholder='company / entity'
            {...register('entity', {})}
          />

          <input
            className='col-span-2 border-2 border-blue bg-transparent rounded-xl w-half font-semibold py-4  px-8 text-xl text-wine cursor-text focus:ring-1 focus:border-blue-dark  focus:ring-blue-dark'
            type='text'
            placeholder="what's this all about?"
            {...register('subject', {
              required: { message: 'Please enter a subject line', value: true },
              minLength: { message: "That's a pretty short subject line", value: 6 },
            })}
          />
          <textarea
            className='col-span-2 border-2 border-blue bg-transparent rounded-xl w-half font-semibold py-4  px-8 text-xl text-wine cursor-text focus:ring-1 focus:border-blue-dark  focus:ring-blue-dark'
            placeholder='sup?'
            rows={5}
            {...register('message', {
              required: { message: 'Please enter a message, you goose.', value: true },
              minLength: { message: 'Please write something a bit more... in-depth', value: 15 },
            })}
          />
          {/* newsletter */}
          <div className='col-span-2 flex my-4'>
            <input
              className={
                'rounded-lg bg-cream border-2 border-blue-dark p-3 my-0 text-blue-dark cursor-pointer shadow-2xl drop-shadow-lg hover:scale-97 duration-300'
              }
              type='checkbox'
              checked={checked}
              onClick={handleCheck}
              {...register('check')}
            />
            <label
              className={
                'self-center cursor-pointer ml-4 text-blue-dark  font-semibold leading-none my-0 py-0 '
              }
              htmlFor='check'
              onClick={handleCheck}
            >
              Also sign up for the newsletter that we always forget to send out
            </label>
          </div>
          <div>
            <input
              className='bg-blue text-lg font-bold text-cream rounded-md px-8 py-3  cursor-pointer hover:scale-98 duration-300 disabled:hover:scale-100 disabled:bg-opacity-30'
              type='submit'
            />
          </div>
          <div className='w-full text-peach'>
            {errors.name && <div className='block '>{errors.name.message}</div>}
            {errors.email && <div className='block '>{errors.email.message}</div>}
            {errors.subject && <div className='error'>{errors.subject.message}</div>}
            {errors.message && <div className='error'>{errors.message.message}</div>}
            {errors.phone && <div className='error'>{errors.message.message}</div>}
          </div>
        </form>
      )}
    </div>
  )
}
export default Contact_ContactForm_Form
