const yahooCredentials = false;
module.exports = {
    printArray(array) {
        array.forEach(element => {
            console.log("elemento a ver", element);
        });
    }
}
// todo: validationsCheckExecutions -> we need to check if the execution that we are trying to do is logical for the execution type, not having positive shares in short or negative ammount of share in long
// todo: toastAlert -> we need to use some toasr or alerts to show when the input is not valid.
// todo: validationsCheckAllExecutions -> we need to check if the execution that we are trying to change is logical for the execution type and if the oreder make sence, not having positive shares in short or negative ammount of share in long in any moment of the execution 
// todo: confirmationSwal -> creeate the confirmation method that recives an object with the text that we need to display the info and the methods if the confirmation is executed.