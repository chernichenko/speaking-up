
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { changeUser } from 'redux/reducers/authSlice'
import { SAVE_STATE } from 'redux/actions'
import { gapi } from 'gapi-script'
import { GOOGLE_CLIENT_ID } from '../constants'

const useGoogle = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    function start() {
        gapi.client.init({
            clientId: GOOGLE_CLIENT_ID,
            scope: "",
        })
    }

    gapi.load('client:auth2', start)
  }, [])

  const onGoogleSuccess = (res: any) => {
      console.log('res', res)
      const data = {
          id: res.googleId,
          token: res.accessToken,
          name: res.profileObj.name,
          email: res.profileObj.email,
          avatarUrl: res.profileObj.imageUrl,
      }
      try {
          dispatch(changeUser({ ...data }))
          dispatch({ type: SAVE_STATE })
      } catch(e) {
          toast.error(e)
      }
  }

  const onGoogleFailure = (res: any) => {
      console.error('onGoogleFailure', res)
  }

  return { onGoogleSuccess, onGoogleFailure }
}

export default useGoogle