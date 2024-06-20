const jwt = require("jsonwebtoken")//import jsonwebtoken
const secret = "CourseBookingAPI" //secret can be any word

//JWT is like a gift wrapping service using secrets as "seals"
//Only the person who knows the secret can open the gift without tampering with the seal
//If the seal has been tampered with, JWT recognizes this and will disregard the gift

//Create an access token
module.exports.createAccessToken = (user) => {
	//user parameter comes from logging in
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	return jwt.sign(data, secret, {}) //sign is like packing the gift and signing with the secret
}

//Verify the access token
module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization
	//we put the JWT in the headers of the request

	if(typeof token !== "undefined"){
	token = token.slice(7, token.length)
	//slice cuts the string starting from the first value
	//the first 7 characters of the token are not relevant to the actual data we need

	return jwt.verify(token, secret, (err,data) => {
		//jwt.verify verifies the token with the secret and fails if the token's secret doesn't match our given phrase

		return (err) ? res.send({auth: "failed"}) : next()
		})
	}
}

//Decode the token
module.exports.decode = (token) => {
	if(typeof token !== "undefined"){ //if token exists
		token = token.slice(7, token.length)

		return jwt.verify(token, secret, (err, data) => {
			return (err) ? null : jwt.decode(token, {complete:true}).payload
			//jwt decode decodes the token and gets the payload, which contains the data form createAccessToken
		})
	}else{
		return null
	}
}