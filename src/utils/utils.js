
const { toast } = require('react-toastify');
const Swal = require('sweetalert2');
const INVALID_TYPE_LONG = "Long type operations cannot have negative shares"
const INVALID_TYPE_SHORT = "Short type operations cannot have positive shares"
const ROUND = {
    price: 3,
    shares: 2,
    percent: 1,
    relationRiskReward: 1
}


module.exports = {
    roundPrice(num) {
        return num.toFixed(ROUND.price)
    },
    roundShares(num) {
        return num.toFixed(ROUND.shares)
    },
    roundPercent(num) {
        return num.toFixed(ROUND.percent)
    },
    roundRR(num) {
        return num.toFixed(ROUND.relationRiskReward)
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
                confirmFunctions.forEach(fn => fn());
                Swal.fire(
                    deletedTitle,
                    deletedText,
                    'success'
                )
            }
        })
    },
    validationsCheckExecutions(type, executions, share) {
        console.log({ type })
        console.log({ executions })
        console.log({ share })
        let totalShares = 0;
        executions.forEach(exe => totalShares += exe.shares);
        if (type) {
            if (totalShares + share >= 0) return true;
            this.warn(INVALID_TYPE_LONG)
            return false;
        } else {
            if (totalShares + share <= 0) return true;
            this.warn(INVALID_TYPE_SHORT)
            return false;

        }
    }


}
// todo: validationsCheckAllExecutions -> we need to check if the execution that we are trying to change is logical for the execution type and if the oreder make sence, not having positive shares in short or negative ammount of share in long in any moment of the execution