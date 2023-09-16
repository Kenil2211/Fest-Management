const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const particpants = require('../eventmodel/participationmodel');


const sendSuccessEmail = async (email) => {
 
 const transporter = nodemailer.createTransport({
  
   service: 'Gmail',
   auth: {
     user: 'mandalnikhil.20.cs@iite.indusuni.ac.in',
     pass: 'oogxrvhqapoajzet',
   },
 });

 // Prepare the email options
 const mailOptions = {
   from: 'mandalnikhil.20.cs@iite.indusuni.ac.in',
   to: email,
   subject: 'Registration Successful',
   text: 'you are sucessfully registred to the fest',
 };

 // Send the email
  transporter.sendMail(mailOptions,(error,info )=>{
    if(error){
     console.log("Error",error)
    }else{
     console.log("Email sent"+info.response)
     res.status(201).json({status:201,info})
    }
 });
};

router.post('/register', async (req, res) => {
  const { name, iuno, semester, email,phone,departement } = req.body;
  const newUser = new particpants({ name, iuno, semester, email,phone ,departement});

  try {
    await newUser.save();
    // Send success email to the user
    await sendSuccessEmail(email);

    res.status(200).json({
      success: true,
      message: 'Registered Successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

module.exports=router