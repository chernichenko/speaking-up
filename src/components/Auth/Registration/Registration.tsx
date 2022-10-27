import { Link, useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
// import axios from 'axios'
import { toast } from 'react-toastify'
import { InputForm, Button } from 'components'

import styles from '../Auth.module.scss'
import Timezone from 'components/Form/Timezone/Timezone'

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
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
