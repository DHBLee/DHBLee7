import React, { useActionState } from 'react'
import { isEmail, isNotEmpty } from '../util/validation';
import AnimatedSection from './UI/AnimatedSection';

function sendAction(prevFormState, formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    let errors = [];

    if (!isEmail(email)) {
        errors.push("Invalid email address.");
    }
    if (!isNotEmpty(name) || !isNotEmpty(message || !isNotEmpty(email))) {
        errors.push("You must fill in this blank");
    }

    if (errors.length > 0) {
        return {
            errors,
            enteredValues: {
                name,
                email,
                message
            }
        }
    }

    return { errors: null };
}

const Section5 = ({padding}) => {
  const [formState, formAction] = useActionState(sendAction, {errors: null,});

  return (
    <section id='contact' className={`${padding} pt-[64px] pb-[96px] bg-Slate500`}>
        <AnimatedSection>
            <div className='max-w-[580px] mx-auto flex flex-col gap-7 items-center text-center'>
                <div className='text-Slate100'>
                    <div className='grid'>
                        <span className='Small'>WHAT'S NEXT</span>
                        <h2 className='HeadingM'>Get In Touch</h2>
                    </div>
                    <p className="Body1">If you ever feel like building something together—whether it’s for fun, work, or just because—feel free to hit me up!</p>
                </div>
                <form action={formAction} className='text-left flex flex-col w-full gap-4'>
                    <fieldset className='grid gap-2'>
                        <label htmlFor="name" className='text-Slate100 uppercase text-[14px]'>name</label>
                        <input required type="text" name='name' id='name' defaultValue={formState.enteredValues?.name} className='p-2 pl-3 text-Slate500 bg-white rounded-3xl w-full'/>
                    
                    </fieldset>
                    <fieldset className='grid gap-2'>
                        <label htmlFor="email" className='text-Slate100 uppercase text-[14px]'>email</label>
                        <input required type="email" id='email' name='email' defaultValue={formState.enteredValues?.email} className='p-2 pl-3 text-Slate500  bg-white rounded-3xl w-full'/>
                        
                    </fieldset>
                    <fieldset className='grid gap-2'>
                        <label htmlFor="message" className='text-Slate100 uppercase text-[14px]'>message</label>
                        <textarea required name="message" id="message" defaultValue={formState.enteredValues?.message} className='p-2 pl-3 text-Slate500 bg-white rounded-2xl w-full resize-none min-h-[220px] max-w-[600px]'></textarea>
                    
                    </fieldset>
                    {formState.errors && (
                        <ul>
                            {formState.errors.map((error) => (
                                <li key={error} className='text-red-400 Small'>{error}</li>
                            ))}
                        </ul>
                    )}
                    <button type='submit' className='w-max mx-auto md:mx-0 md:ml-auto bg-Slate600 rounded-2xl text-Slate100 text-[14px] font-semibold py-2 px-9'>SUBMIT</button>
                </form>
            </div>
        </AnimatedSection>
    </section>
  )
}

export default Section5