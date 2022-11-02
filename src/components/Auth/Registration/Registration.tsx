import { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { InputForm, Button } from 'components'
import Timezone from 'components/Form/Timezone/Timezone'
import useGoogle from 'hooks/useGoogle'
import { GoogleLogin } from 'react-google-login'
import { GOOGLE_CLIENT_ID } from '../../../constants'
import { Questions } from '../Questions/Questions'
import Back from '../Back/Back'

import styles from '../Auth.module.scss'

const validationSchema = () => {
    return Yup.object({
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        name: Yup.string()
            .min(3, 'Too Short!')
            .required('Required'),
        password: Yup.string()
            .min(6, 'Too Short!')
            .required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
    })
}

export const Registration = () => {
    const { onGoogleFailure } = useGoogle()
    const [step, setStep] = useState<number>(2)

    const onSubmit = async (values: any) => {
        try {
            console.log('values', values)
            setStep(2)
        } catch (e) {
            toast.error(e)
        }
    }

    return (
        <div className={styles.wrap} data-testid="registration">
            {step === 1 ? (
                <div className={styles.formWrap}>
<Formik
                    initialValues={
                        {
                            email: '',
                            name: '',
                            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                            password: '',
                            confirmPassword: '',
                        }
                    }
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isValid, dirty, handleSubmit }) => {
                        return (
                            <Form className={styles.form}>
                                <Back step={step} setStep={setStep} />
                                <InputForm
                                    name={'email'}
                                    type={'email'}
                                    placeholder={'Email *'}
                                />
                                <InputForm
                                    name={'name'}
                                    placeholder={'Discord username'}
                                />
                                <Timezone
                                    name={'timezone'}
                                />
                                <InputForm
                                    name={'password'}
                                    type={'password'}
                                    placeholder={'Password *'}
                                />
                                <InputForm
                                    name={'confirmPassword'}
                                    type={'password'}
                                    placeholder={'Repeat password *'}
                                />
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!isValid || !dirty}
                                >
                                    Sign up
                                </Button>

                                <div className={styles.loginWithGoogle}>
                                    <div className={styles.or}>OR</div>

                                    <div className={styles.googleButtonsWrap}>
                                        <GoogleLogin
                                            clientId={GOOGLE_CLIENT_ID}
                                            onSuccess={() => { }}
                                            onFailure={onGoogleFailure}
                                            buttonText="Sign up with Google"
                                            cookiePolicy="single_host_origin"
                                            isSignedIn={true}
                                        />
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                    </Formik>
                </div>
            ) : (
                <Questions step={step} setStep={setStep} />
            )}
        </div>
    )
}
