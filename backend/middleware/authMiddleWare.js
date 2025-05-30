
  const ensureAuth = function (req, res, next) {
 const apiKey = req.get('x-api-key')       // common convention
               || req.get('API_KEY')        // if you really named it this way

  console.log('Incoming API key:', apiKey);
    if (!apiKey || apiKey !== process.env.SCRAPE_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: invalid API key' });
  }
    next();

    // if (req.session.authenticated) {
    //   return next();
    // } else {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Authentication required. Please log in to access this resource.",
    //     code: "UNAUTHORIZED_ACCESS"
    //   });
    // }
  }
export { ensureAuth };
