import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function setToaster({ message }) {

    const toaster = toast(message, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    return {
        toaster
    };
}

export default setToaster