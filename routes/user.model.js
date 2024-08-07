const router = require("express").Router();
const {  createEmployee, createCompany, logout, login } = require("../controllers/auth");

router.route("/signup/").get((req, res)=>{
    res.send("Choose to sign up as an employer or an employee.")
}).post((req, res)=>{
    res.send("Choose to sign up as an employer or an employee.")
})

// employee
router.route("/signup/employee").post(createEmployee)


// Company
router.route("/signup/company").post(createCompany)


// general
router.route("/logout").post(logout)
router.route("/login").post(login)

