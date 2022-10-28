import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import cn from 'classnames'
import * as Yup from 'yup'
import { InputForm, Button } from 'components'
import { changeUser } from 'redux/reducers/authSlice'
import { SAVE_STATE } from 'redux/actions'
import { getUser } from 'redux/selectors'
import Timezone from 'components/Form/Timezone/Timezone'

import authStyles from 'components/Auth/Auth.module.scss'
import styles from './Profile.module.scss'

const validationSchema = () => {
    return Yup.object({
        email: Yup.string()
            .email('Invalid email'),
        name: Yup.string()
            .min(3, 'Too Short!'),
    })
}

type submitValues = {
    readonly name: string
    readonly file: any
}

export const Profile = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(getUser)

    const [file, setFile] = useState<any>()

    const onSubmit = async (values: submitValues) => {
        try {
            const data: any = {}
            const entries = Object.entries(values)
            entries.forEach( ([key, val]) => {
                if (val) {
                    data[key] = val
                }
            });

            if (file) {
                data.file = file
            }

            if (Object.keys(data).length === 0) {
                return
            }

            dispatch(changeUser({ ...data }))
            dispatch({ type: SAVE_STATE })
            history.push('/')
        } catch(e) {
            toast.error(e)
        }
    }

    return (
        <div className={cn(authStyles.wrap, styles.wrap)} data-testid="profile">
            <Formik
                initialValues={{
                    email: user.email,
                    name: user.name,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    file: '',
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isValid, dirty, handleSubmit }) => {
                    return (
                        <Form className={authStyles.form}>
                            <InputForm
                                name={'email'}
                                type={'email'}
                                placeholder={'Edit your email'}
                            />
                            <InputForm
                                name={'name'}
                                type={'name'}
                                placeholder={'Edit your new name'}
                            />
                            <Timezone
                                name={'timezone'}
                            />
                            <InputForm
                                name={'file'}
                                type={'file'}
                                onFileChange={setFile}
                            />

                            <Button
                                onClick={handleSubmit}
                                type={'submit'}
                            >
                                Change Info
                            </Button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
