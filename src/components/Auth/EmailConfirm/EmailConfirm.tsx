import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeUser } from 'redux/reducers/authSlice'
import { SAVE_STATE } from 'redux/actions'
import { useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { InputForm, Button } from 'components'

import styles from '../Auth.module.scss'

export const EmailConfirm = () => {
    const [file, setFile] = useState<any>()
    const [addFileStep, setAddFileStep] = useState<boolean>(false)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        toast('Email confirmed successfully')
        setTimeout(() => {
            setAddFileStep(true)
        }, 1000)
    }, [])

    const onSubmit = async (values: any) => {
        try {
            let formData = new FormData()
            for (let key in values) {
                formData.append(key, values[key])
            }

            formData.append('file', file)

            dispatch(changeUser({ file }))
            dispatch({ type: SAVE_STATE })
            history.push('/')
        } catch (e) {
            toast.error(e)
        }
    }

    if (!addFileStep) {
        return null
    }

    return (
        <div className={styles.wrap} data-testid="registration">
            <Formik
                initialValues={{ file: '' }}
                onSubmit={onSubmit}
            >
                {({ isValid, dirty, handleSubmit }) => {
                    return (
                        <Form className={styles.form}>
                            <InputForm
                                name={'file'}
                                type={'file'}
                                onFileChange={setFile}
                            />
                            <div className={styles.buttonsWrap}>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!isValid || !dirty}
                                >
                                    Add photo
                                </Button>
                                <Button
                                    onClick={() => history.push('/')}
                                    isPrimary={false}
                                >
                                    Skip
                                </Button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
