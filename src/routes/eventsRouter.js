const express = require('express');
// const getData = require('../functions/getData');
const eventDivision = require('../functions/subFunctions/eventDivision');
const cachedata = require('../cache/cacheData');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const homeResponse = cachedata('events');
		if (homeResponse.Error) {
			res.status(500).json({
				status: 'Fail',
				message: 'Server Error!'
			});
		} else {
			const eventArray = await eventDivision(homeResponse, 2);
			res.render('events', {
				title: 'EVENTS | IEEE SIESGST',
				eventArray: eventArray
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 'Fail',
			message: 'Server Error!'
		});
	}
});

module.exports = router;
