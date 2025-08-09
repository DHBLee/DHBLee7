import React, { useState } from 'react'
import errorIcon  from '../../assets/images/icon-error.svg'
import successIcon from '../../assets/images/icon-success.svg'
const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // If user starts typing after a failed submission, reset validation
    if (hasAttemptedSubmit) {
      setIsValid(true);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    // Final validation
    const emailIsValid = validateEmail(email);
    setIsValid(emailIsValid);
    
    if (!emailIsValid) {
      setError('Please enter a valid email address')
      return
    }
    
    try {
      setIsSubmitting(true)
      // Here you would typically make an API call to your backend
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to subscribe. Please try again later.')
      console.error('Subscription error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className='py-6 flex flex-col gap-6'>
      <h1 className='H2 dark:text-Neutral0'>Newsletter</h1>
      <p className='H7 text-Neutral600 dark:text-Neutral400'>
        Want to stay updated on my latest articles, coding tutorials, and personal adventures? 
        Sign up for my newsletter! It's a simple way to keep track of new posts and occasional 
        coding tips I discover.
      </p>
      
      <h2 className='H5 dark:text-Neutral0'>I'd love to have you along for the ride, and also hear about your own journey!</h2>
      
      <form onSubmit={handleSubmit} className='w-full max-w-md flex flex-col gap-4'>
        <div className='flex flex-col gap-1 w-full'>
          <label htmlFor="email" className='H7 dark:text-Neutral0'>
            Email Address
            <span className='text-Red600 ml-1'>*</span>
          </label>
          <input 
            type="email" 
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder='email@example.com' 
            className={`H7 dark:text-Neutral0 p-3 rounded-xl border-2 transition-colors ${
              hasAttemptedSubmit && !isValid 
                ? 'border-Red600 bg-Red100 dark:bg-Neutral800' 
                : 'border-Neutral300 dark:border-Neutral700 bg-Neutral0 dark:bg-Neutral800'
            }`}
            aria-invalid={hasAttemptedSubmit && !isValid}
            aria-describedby={hasAttemptedSubmit && !isValid ? 'email-error' : undefined}
            required
          />
          {hasAttemptedSubmit && !isValid ? (
            <p id="email-error" className="flex items-center gap-2 H8 text-Red600 mt-1">
              <img src={errorIcon} alt="error" className="w-4 h-4" /> 
              {error || 'Please enter a valid email address'}
            </p>
          ) : isSubmitted ? (
            <p id="email-success" className="flex items-center gap-2 H8 text-Green500 mt-1">
              <img src={successIcon} alt="success" className="w-4 h-4" /> 
              {"You're subscribed! Check your inbox for updates."}
            </p>
          ) : null}
        </div>
        
        <button 
          type='submit' 
          disabled={isSubmitting}
          className={`w-max H6 rounded-lg px-6 py-3 transition-colors ${
            isSubmitting 
              ? 'bg-Neutral300 dark:bg-Neutral600 cursor-not-allowed' 
              : 'bg-Blue500 hover:bg-Blue700 text-Neutral0'
          }`}
        >
          {isSubmitting ? 'Subscribing...' : 'Stay updated'}
        </button>
      </form>
      
      <p className='H8 text-Neutral600 dark:text-Neutral400'>
        Unsubscribe anytime. No spam, I promise 🙂
      </p>
    </section>
  )
}

export default Newsletter