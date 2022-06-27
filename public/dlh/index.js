function sendMail() {
    event.preventDefault()
    let name = document.getElementById("nameInput").value
    let email = document.getElementById("emailInput").value
    let number = document.getElementById("numberInput").value
    let address = document.getElementById("addressInput").value

    if (name && email && number && address) {
        if (number.toString().length < 11) {
            document.getElementById("toastErr").innerHTML = "Mobile Number is not valid"
            document.getElementById("toastErr").style.visibility = "visible"
        } else {
            document.getElementById("orderButton").innerHTML = "Sending your order please wait"
            document.getElementById("orderButton").ariaDisabled = true
            let data = new FormData()

            data.append("name", name)
            data.append("city", email)
            data.append("number", number)
            data.append("address", address)
            data.append("date", `${new Date()}`)
            data.append("read", "0")
            axios({
                method: 'post',
                url: "https://backend.shifaenabvi.com/submitform4",
                data: data
            }).then((response) => {
                if (response.data === "1 record inserted") {
                    document.getElementById("nameInput").value = ""
                    document.getElementById("emailInput").value = ""
                    document.getElementById("numberInput").value = ""
                    document.getElementById("addressInput").value = ""
                    document.getElementById("toastErr").style.visibility = "hidden"
                    document.getElementById("toastSuccess").classList.add("show")
                    document.getElementById("orderButton").innerHTML = "Yes, Book My Order"
                    document.getElementById("orderButton").ariaDisabled = false
                    setTimeout(() => {
                        document.getElementById("toastSuccess").classList.remove("show")
                    }, 3000)
                    window.location.href = "https://attirefits.com/dlh/thankyou/"
                }
            });;
        }

    } else {
        document.getElementById("toastErr").innerHTML = "All fields are required"
        document.getElementById("toastErr").style.visibility = "visible"
    }
}

function validateNumber(e) {
    const pattern = /^[0-9]$/;
    if (e.target.value.toString().length < 11 && pattern.test(e.key)) {
        return true
    } else {
        return false
    }
}