
const { toast } = require('react-toastify');
const Swal = require('sweetalert2');


module.exports = {
    printArray(array) {
        array.forEach(element => {
            console.log("elemento a ver", element);
        });
    },
    abs(num) {
        return Math.abs(parseFloat(num));
    },
    warn(message) {
        toast.warn(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
    },
    error(message) {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        })
    },
    swal({ title, text, confirmButtonText, cancelButtonText, deletedText, deletedTitle }, confirmFunctions) {
        Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText
        }).then((result) => {
            if (result.isConfirmed) {
                // setExecuted([]);
                confirmFunctions.forEach(fn => fn());
                Swal.fire(
                    deletedTitle,
                    deletedText,
                    'success'
                )
            }
        })
    }


}
// todo: validationsCheckExecutions -> we need to check if the execution that we are trying to do is logical for the execution type, not having positive shares in short or negative ammount of share in long
// todo: toastAlert -> we need to use some toasr or alerts to show when the input is not valid.
// todo: validationsCheckAllExecutions -> we need to check if the execution that we are trying to change is logical for the execution type and if the oreder make sence, not having positive shares in short or negative ammount of share in long in any moment of the execution 
// todo: confirmationSwal -> creeate the confirmation method that recives an object with the text that we need to display the info and the methods if the confirmation is executed.