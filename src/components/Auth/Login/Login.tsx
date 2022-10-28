import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { InputForm, Button } from 'components'
import { changeUser } from 'redux/reducers/authSlice'
import { SAVE_STATE } from 'redux/actions'
import { GoogleLogin } from 'react-google-login'
import { GOOGLE_CLIENT_ID } from '../../../constants'
import useGoogle from 'hooks/useGoogle'

import styles from '../Auth.module.scss'

const validationSchema = () => {
    return Yup.object({
        password: Yup.string()
            .min(6, 'Too Short!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
    })
}

type submitValues = {
    readonly email: string
    readonly password: string
}

export const Login = () => {
    const dispatch = useDispatch()
    const { onGoogleSuccess, onGoogleFailure } = useGoogle()

    const onSubmit = async (values: submitValues) => {
        try {
            dispatch(changeUser({ ...values, id: values.email }))
            dispatch({ type: SAVE_STATE })
        } catch(e) {
            toast.error(e)
        }
    }

    return (
        <div className={styles.wrap} data-testid="login">
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isValid, dirty, handleSubmit }) => {
                    return (
                        <Form className={styles.form}>
                            <InputForm
                                name={'email'}
                                type={'email'}
                                placeholder={'Enter your email'}
                            />
                            <InputForm
                                name={'password'}
                                type={'password'}
                                placeholder={'Enter your password'}
                            />

                            {/* <div className={styles.forgot}>
                                <Link to="/password">Forgot your password?</Link>
                            </div> */}

                            <Button
                                onClick={handleSubmit}
                                disabled={!isValid || !dirty}
                                type={'submit'}
                            >
                                Sign in
                            </Button>

                            <div className={styles.loginWithGoogle}>
                                <div className={styles.or}>OR</div>

                                <div className={styles.googleButtonsWrap}>
                                    <GoogleLogin
                                        clientId={GOOGLE_CLIENT_ID}
                                        onSuccess={onGoogleSuccess}
                                        onFailure={onGoogleFailure}
                                        buttonText="Log in with Google"
                                        cookiePolicy="single_host_origin"
                                        isSignedIn={true}
                                    />
                                </div>
                            </div>

                            <div className={styles.bottom}>
                                <p>Don't have an account?</p>
                                <Link to="/registration">Registration</Link>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
