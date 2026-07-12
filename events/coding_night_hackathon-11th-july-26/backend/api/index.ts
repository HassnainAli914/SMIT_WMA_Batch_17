let app: any;
let initError: any;

// Force Vercel to bundle Express internals that it sometimes drops by accident
require('express/lib/router');
require('express/lib/middleware/init');
require('express/lib/middleware/query');


try {
  app = require('../src/server').default;
} catch (error) {
  initError = error;
  console.error("Initialization Error:", error);
}

// Export for Vercel Serverless Function
export default function (req: any, res: any) {
  if (initError) {
    return res.status(500).json({
      success: false,
      message: 'Vercel Initialization Error',
      error: initError.message,
      stack: initError.stack
    });
  }
  return app(req, res);
};
