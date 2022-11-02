import { useHistory } from 'react-router-dom'

import styles from './Back.module.scss'

const Back = ({ step, setStep }: any) => {
  const history = useHistory()

  const backHandler = async () => {
    if (step === 1) {
        console.log('here 1')
        await history.push(`/`)
        return;
    } else {
        console.log('here 2')
        setStep(1)
    }
}

  return (
    <div className={styles.backWrap}>
        <div className={styles.back} onClick={backHandler}>Back</div>
        <div className={styles.step}>{step}/2 step</div>
    </div>
  )
}

export default Back;
