import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'components/Form'
import { QUESTIONS } from '../../../constants'
import Back from '../Back/Back'
import cn from "classnames"
import { toast } from 'react-toastify'

import styles from './Questions.module.scss'

const getInitialState = (questions: any) => {
  return questions?.map((question: any) => {
    return {
      type: question.type,
      items: question.answers?.map((answer: any) => {
        return { active: false, touched: false, text: answer }
      })
    }
  })
}

const ArrowIcon = () => (
  <svg width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21.5L10.215 30.7764C10.4585 31.0928 10.7704 31.3498 11.1274 31.5283C11.4845 31.7068 11.8773 31.8022 12.2764 31.8071C12.6691 31.8117 13.0579 31.7286 13.4145 31.5641C13.7711 31.3995 14.0865 31.1575 14.3379 30.8557L37.3571 3" stroke="#62D081" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const WarningIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 30.8574C24.2053 30.8574 30.8571 24.2056 30.8571 16.0002C30.8571 7.79484 24.2053 1.14307 16 1.14307C7.79459 1.14307 1.14282 7.79484 1.14282 16.0002C1.14282 24.2056 7.79459 30.8574 16 30.8574Z" stroke="#D75F5B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 8V14.8571" stroke="#D75F5B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 22.8575C16.6312 22.8575 17.1429 22.3458 17.1429 21.7146C17.1429 21.0835 16.6312 20.5718 16 20.5718C15.3689 20.5718 14.8572 21.0835 14.8572 21.7146C14.8572 22.3458 15.3689 22.8575 16 22.8575Z" stroke="#D75F5B" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const Questions = ({ step, setStep }: any) => {
  const history = useHistory()
  const [answers, setAnswers] = useState<any>(getInitialState(QUESTIONS))
  
  const onChangeHandler = (questionIndex: number, answerIndex: number, newValue: boolean, isRadio: boolean) => {
    const newAnswers = answers.map((answer: any, questionI: number) => {
      if (questionIndex === questionI) {
        const newItems = answers[questionIndex].items.map((item: any, answerI: number) => {
          if (answerIndex === answerI) {
            return { ...item, active: newValue }
          }
          if (isRadio) {
            return { ...item, active: false }
          }
          return item
        })
        return { ...answer, touched: true, items: newItems }
      }
      return answer
    })

    setAnswers(newAnswers)
  }

  const submitHandler = async () => {
    let answeredQuestionsCount = 0
    answers.forEach((answer: any) => {
      if (answer.items.some((item: any) => item.active)) {
        ++answeredQuestionsCount
      }
    })

    if (answeredQuestionsCount === answers.length) {
      console.log('Answers', answers)
      await history.push(`/`)
      toast('Registration completed successfully')
      return;
    }

    setAnswers((prevAnswers: any) => prevAnswers.map((answer: any) => ({ ...answer, touched: true })))
  }

  return (
    <div className={styles.wrap}>
      <Back step={step} setStep={setStep} />
      <div className={styles.questions}>
        {QUESTIONS.map((question: any, questionIndex: number) => {
          const isRadio = question.type === 'radio'
          return (
            <div className={styles.question} key={questionIndex}>
              <div className={styles.title}>{question.question} <span>*</span></div>
              <div className={styles.descriptions}>
                {question.descriptions?.map((desc: any, descIndex: number) => {
                  return (
                    <div key={descIndex}>{desc}</div>
                  )
                })}
              </div>
              <div className={styles.answers}>
                {question.answers?.map((answer: any, answerIndex: number) => {
                  const value = answers[questionIndex].items[answerIndex].active
                  return (
                    <div className={cn(styles.formItem, answer === 'Other...' && styles.other, value && styles.active)} key={answerIndex} onClick={() => onChangeHandler(questionIndex, answerIndex, !value, isRadio)}>
                        <div className={cn(styles.icon, isRadio ? styles.radio : styles.checkbox)}>
                          {value && <ArrowIcon />}
                        </div>
                        <div className={styles.text}>{answer}</div>
                    </div>
                  )
                })}
                {answers[questionIndex].touched && answers[questionIndex].items.every((item: any) => !item.active) && (
                  <div className={styles.warning}>
                    <WarningIcon />
                    <div className={styles.text}>this is a required question</div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.buttonWrap}>
        <Button onClick={submitHandler}>Continue</Button>
      </div>
    </div>
  )
}