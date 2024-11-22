const verifyEmailTemplate = ({ name, url }) => {
    return `
    <p>Dear ${name}</p>
    <p>Thank you for registering Binkeyit.</p>
    <a href=${url} style="color:white; background : royalblue; margin-top: 10px;">Verify Email</a>
    `
}

export default verifyEmailTemplate