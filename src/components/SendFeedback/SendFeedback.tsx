import { useState } from 'react'
import cn from "classnames"
import { Button } from 'components/Form'

import styles from './SendFeedback.module.scss'

const ArrowIcon = () => (
  <svg width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21.5L10.215 30.7764C10.4585 31.0928 10.7704 31.3498 11.1274 31.5283C11.4845 31.7068 11.8773 31.8022 12.2764 31.8071C12.6691 31.8117 13.0579 31.7286 13.4145 31.5641C13.7711 31.3995 14.0865 31.1575 14.3379 30.8557L37.3571 3" stroke="#62D081" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const SendFeedback = () => {
  const [textarea1, setTextarea1] = useState('')
  const [textarea2, setTextarea2] = useState('')
  const [textarea3, setTextarea3] = useState('')
  const [checkboxes, setCheckboxes] = useState({  answer1: false, answer2: false, answer3: false })
  const [input1, setIntpu1] = useState('')
  const [input2, setIntpu2] = useState('')

  const submitHandler = () => {
    console.log('values', textarea1, textarea2, textarea3, checkboxes, input1, input2)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.inputWrap}>
          <div className={styles.title}>What type of people do you think would most benefit from Speaking Up?</div>
          <textarea name="textarea1" value={textarea1} onChange={(e) => setTextarea1(e.target.value)} />
        </div>

        <div className={styles.inputWrap}>
          <div className={styles.title}>What is the main benefit you receive from Speaking Up?</div>
          <textarea name="textarea1" value={textarea2} onChange={(e) => setTextarea2(e.target.value)} />
        </div>

        <div className={styles.inputWrap}>
          <div className={styles.title}>How can we improve Superhuman for you?</div>
          <textarea name="textarea1" value={textarea3} onChange={(e) => setTextarea3(e.target.value)} />
        </div>

        <div className={styles.inputWrap}>
          <div className={styles.title}>How would you feel if you could no longer use Speaking Up?</div>
          <div className={cn(styles.formItem, checkboxes.answer1 && styles.active)} onClick={() => setCheckboxes({ answer1: !checkboxes.answer1, answer2: false, answer3: false })}>
            <div className={styles.icon}>
              {checkboxes.answer1 && <ArrowIcon />}
            </div>
            <div className={styles.text}>Very disappointed</div>
          </div>
          <div className={cn(styles.formItem, checkboxes.answer2 && styles.active)} onClick={() => setCheckboxes({ answer1: false, answer2: !checkboxes.answer2, answer3: false })}>
            <div className={styles.icon}>
              {checkboxes.answer2 && <ArrowIcon />}
            </div>
            <div className={styles.text}>Somewhat disappointed</div>
          </div>
          <div className={cn(styles.formItem, checkboxes.answer3 && styles.active)} onClick={() => setCheckboxes({ answer1: false, answer2: false, answer3: !checkboxes.answer3 })}>
            <div className={styles.icon}>
              {checkboxes.answer3 && <ArrowIcon />}
            </div>
            <div className={styles.text}>Not disappointed</div>
          </div>
        </div>

        <div className={styles.inputWrap}>
          <div className={styles.title}>Your name</div>
          <input name="input1" value={input1} onChange={(e) => setIntpu1(e.target.value)} />
        </div>

        <div className={styles.inputWrap}>
          <div className={styles.title}>Your email</div>
          <input name="input1" value={input2} onChange={(e) => setIntpu2(e.target.value)} />
        </div>

        <div className={styles.buttonWrap}>
          <Button onClick={submitHandler}>Continue</Button>
        </div>
      </div>
    </div>
  )
}