const customerModel = require("../model/customerModel")
const jwt = require("jsonwebtoken")

const isValid = function (value) {
    if (typeof value == "undefined" || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}


const createCustomer  = async (req, res) => {
    try {
        let data = req.body;
        if (Object.keys(data) == 0) { return res.status(400).send({ status: false, msg: "Bad request, No data provided." }) };

        let { name, phone, password } = data

        if (!isValid(name)) { return res.status(400).send({ status: false, msg: "name is required" }) }

        // Phone number Validation :
        if (!isValid(phone)) { return res.status(400).send({ status: false, msg: "phone is required" }) }
        if (!(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(phone))) { return res.status(400).send({ status: false, msg: "please provide a valid moblie Number" }) }
        let duplicateNumber = await customerModel.findOne({ phone: phone })
        if (duplicateNumber) return res.status(400).send({ status: false, msg: 'Phone number is already exist' })

        // Password Validation :
        if (!isValid(password)) { return res.status(400).send({ status: false, msg: "password is required" }) }

        let userCreated = await customerModel.create(data);
        res.status(201).send({ status: true, message: "Customer created successfully", data: userCreated })
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}



const login = async function (req, res) {
    try {
        // Getting data from user :
        const data = req.body
        const {phone, password} = data

        // Input Validation :
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "Bad Request, No data provided" })

        // phone Validation :
        if (!isValid(phone)) { return res.status(400).send({ status: false, msg: "phone is required" }) }
        if (!(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(phone))) { return res.status(400).send({ status: false, msg: "Please enter a valid phone." }) };

        // Password Validation :
        if (!isValid(password)) { return res.status(400).send({ status: false, msg: "Password is required" }) };
        if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(data.password))) { return res.status(400).send({ status: false, msg: "phone or Password is incorrect" }) }

        // Searching provided phone in database :
        let user = await customerModel.findOne({ phone: phone })
        if (!user) { return res.status(400).send({ status: false, msg: "phone or Password is incorrect" }) }

        // Token generate using JWT :
        const token = jwt.sign({
            userId: user._id,
        }, "secret-key", { expiresIn: "120m" })
        return res.status(200).send({ status: true, msg: "You are successfully logged in", userId: user._id, token })
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}




module.exports = {
    createCustomer,
    login
}