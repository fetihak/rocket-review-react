import React from 'react'
import { ToastContainer } from 'react-toastify';
function ToastContainerConfig() {
    return (
        <ToastContainer position="top-right"
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" />
    )
}

export default ToastContainerConfig