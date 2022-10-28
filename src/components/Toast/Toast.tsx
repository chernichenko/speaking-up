import { ToastContainer } from 'react-toastify'

export const Toast = () => {
   return (
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        date-testid="toast"
      />
   )
}
