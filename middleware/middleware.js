import { GrowthBook } from "@growthbook/growthbook";
import dotenv from 'dotenv';

dotenv.config();
function growthbookMiddleware(req, res, next) {
    // Create a GrowthBook Context
    req.growthbook = new GrowthBook({
      apiHost: process.env.APIHOST,
      clientKey: process.env.CLIENTKEY,
      trackingCallback: (experiment, result) => {
        // TODO: Use your real analytics tracking system
        console.log("Viewed Experiment", {
          experimentId: experiment.key,
          variationId: result.key
        });
      },
      
    });
    const userAttributes = {
      id: req.headers['user-id'] || req.query.userId || req.cookies['user-id'] || 'anonymous',
      country: req.headers['user-country'] || req.query.country || req.cookies['user-country'] || 'unknown',
      admin: (req.headers['admin'] || req.query.admin||req.cookies['admin']|| 'false')=== 'true',
    };
    console.log(userAttributes);
  
    // Set user attributes in GrowthBook
    req.growthbook.setAttributes(userAttributes);
  
    // Clean up at the end of the request
    res.on('close', () => req.growthbook.destroy());
  
    // Wait for features to load (will be cached in-memory for future requests)
    req.growthbook.init({ timeout: 1000 })
      .then(() => next())
  }

  export default growthbookMiddleware;