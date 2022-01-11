
const { toast } = require('react-toastify');
const { confirmAlert } = require('react-confirm-alert');
const { Trans } = require('react-i18next');
const INVALID_TYPE_LONG = "Long type operations cannot have negative shares"
const INVALID_TYPE_SHORT = "Short type operations cannot have positive shares"
const ROUND = {
    price: 2,
    shares: 2,
    percent: 1,
    relationRiskReward: 1
}
const PRINT_VALIDATIONS = false;



module.exports = {
    roundBy(num, round) {
        return num.toFixed(round)
    },
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
    checkIfHaveValidPositiveNumber(number) {
        if (!this.checkIfHaveValidNumber(number)) return false
        if (number < 0) {
            if (PRINT_VALIDATIONS) console.log("Invalid-checkIfHaveValidRuleNumber(3) ", number);
            return false
        };
        return true
    },
    checkIfHaveValidNumber(number) {
        if (isNaN(number)) {
            if (PRINT_VALIDATIONS) console.log("Invalid-checkIfHaveValidRuleNumber(1) ", number); return false
        };
        if (number === 0) {
            if (PRINT_VALIDATIONS) console.log("Invalid-checkIfHaveValidRuleNumber(2) ", number);
            return false
        };
        return true
    },
    validateInputs(funct, arrValues) {
        arrValues.forEach(element => {
            const value = element.value;
            const name = element.name;
            const type = element.type;
            if (type == 1) {
                if (!this.checkIfHaveValidNumber(value)) {
                    if (PRINT_VALIDATIONS) console.log(`%c ${funct}: validation not passed by ${name}, value ${value}`, "color: yellow")
                    return false;
                }
            }
            if (type == 2) {
                if (!this.checkIfHaveValidPositiveNumber(value)) {
                    if (PRINT_VALIDATIONS) console.log(`%c ${funct}: validation not passed by ${name}, value ${value}`, "color: orange")
                    return false;
                }
            }
        });
        return true;


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
    }, confirmationsModal({ title, text, confirmButtonText, cancelButtonText, deletedText, deletedTitle }, confirmFunctions) {
        confirmAlert({
            title: title,
            message: text,
            buttons: [
                {
                    label: confirmButtonText,
                    onClick: () => this.executeConfirmations(confirmFunctions)
                },
                {
                    label: cancelButtonText,
                    onClick: () => console.log('Process canceled')
                }
            ]
        });
    },
    executeConfirmations(confirmFunctions) {
        confirmFunctions.forEach(fn => fn());
    },
    validationsCheckAllExecutions(executions, id, shares, isLong) {
        let tempShareAmmount = 0;
        let response = true;
        executions.forEach(element => {
            if (response === false) return false
            let thisShare = element.shares;
            if (element.id === id) thisShare = shares
            tempShareAmmount += thisShare;
            if (isLong && (tempShareAmmount < 0)) {
                this.error(INVALID_TYPE_LONG)
                response = false;
                return;
            }
            if (!isLong && (tempShareAmmount > 0)) {
                this.error(INVALID_TYPE_SHORT)
                response = false;
                return;
            }
        });
        return response;
    },
    arrayWithDiferentIdThan(executions, id) {

        let response = [];
        executions.forEach(element => {
            if (element.id !== id) {
                response.push(element)
            }
        });
        return response;
    }



}
