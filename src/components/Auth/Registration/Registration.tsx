import { Link, useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { InputForm, Button } from 'components'
import Timezone from 'components/Form/Timezone/Timezone'
import useGoogle from 'hooks/useGoogle'
import { GoogleLogin } from 'react-google-login'
import { GOOGLE_CLIENT_ID } from '../../../constants'

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
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    })
}

export const Registration = () => {
    const history = useHistory()
    const { onGoogleSuccess, onGoogleFailure } = useGoogle()

    const onSubmit = async (values: any) => {
        try {
            console.log('values', values)
            // await axios.post('/api/auth/register', formData)
            toast('Registration completed successfully')
            history.push(`/`)
        } catch (e) {
            toast.error(e)
        }
    }

    return (
        <div className={styles.wrap} data-testid="registration">
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
                            <div className={styles.back}>
                                <Link to="/">Back</Link>
                            </div>
                            <InputForm
                                name={'email'}
                                type={'email'}
                                placeholder={'Enter your email'}
                            />
                            <InputForm
                                name={'name'}
                                placeholder={'Enter your discord username'}
                            />
                            <Timezone
                                name={'timezone'}
                            />
                            <InputForm
                                name={'password'}
                                type={'password'}
                                placeholder={'Enter your password'}
                            />
                            <InputForm
                                name={'confirmPassword'}
                                type={'password'}
                                placeholder={'Repeat your password'}
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
                                        onSuccess={onGoogleSuccess}
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
    )
}
