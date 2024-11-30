const forgotPassword = ({ name, otp }) => {
    return `
    <div>
         <p> Dear, ${name} </p>
         <p> you are requested a password reset. please use following OTP code to reset your password ${name} </p>
         <div><b>${otp}</b></div>
         <p> this OTP is valid for 60 minutes. Dont share it with anyone </p>
         <br />
         <br />
         <p> Thanks </p>
         <p> Binkeyit</p>
    </div>
    `
}

export default forgotPassword