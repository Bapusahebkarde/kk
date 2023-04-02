import express  from 'express';

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".
 */
const router = express.Router();


import Insta from "instamojo-nodejs";



// /api/bid/pay
router.post( '/pay', ( req, res ) => {
	Insta.setKeys('test_2106e0eff299114552722fe897d', 'test_6486ecf9693893a07a7c4245b13');

	const data = new Insta.PaymentData();
	Insta.isSandboxMode(true);

	data.purpose =  'hhh';
	data.amount = '222';
	data.buyer_name =  '';
	
	data.email =  '';
	data.phone =  '';
	data.send_email =  false;
	data.webhook= 'http://www.example.com/webhook/';
	data.send_sms= false;
	data.allow_repeated_payments =  false;

	Insta.createPayment(data, function(error, response) {
		if (error) {
			console.log('why');
		} else {
			// Payment redirection link at response.payment_request.longurl
			const responseData = JSON.parse( response );
			const redirectUrl = responseData.payment_request.longurl;
			console.log( redirectUrl );

			res.status( 200 ).json(  );
		}
	});

} );

/**
 * @route GET api/bid/callback/
 * @desc Call back url for instamojo
 * @access public
 */
router.get( '/callback/', ( req, res ) => {
	let url_parts = url.parse( req.url, true),
		responseData = url_parts.query;

	if ( responseData.payment_id ) {
		let userId = responseData.user_id;

		// Save the info that user has purchased the bid.
		

		User.findOneAndUpdate( { _id: userId }, { $set: bidData }, { new: true } )
			.then( ( user ) => res.json( user ) )
			.catch( ( errors ) => res.json( errors ) );

		// Redirect the user to payment complete page.
		return res.redirect('http://localhost:3000/cart' );
	}

} );

// We export the router so that the server.js file can pick it up
export default router;