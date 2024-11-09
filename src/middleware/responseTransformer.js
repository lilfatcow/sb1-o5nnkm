const transformResponse = (req, res, next) => {
  // Store the original send function
  const originalSend = res.send;

  // Override the send function
  res.send = function(body) {
    // Skip transformation for error responses
    if (res.statusCode >= 400) {
      return originalSend.call(this, body);
    }

    // Transform successful responses
    const transformedBody = {
      data: body,
      meta: {
        requestId: req.id,
        timestamp: new Date().toISOString()
      }
    };

    // Add pagination metadata if available
    if (body.next_pagination_token || body.prev_pagination_token) {
      transformedBody.meta.pagination = {
        next: body.next_pagination_token,
        prev: body.prev_pagination_token
      };
      // Remove pagination tokens from data
      delete transformedBody.data.next_pagination_token;
      delete transformedBody.data.prev_pagination_token;
    }

    // Call the original send with transformed body
    return originalSend.call(this, JSON.stringify(transformedBody));
  };

  next();
};

module.exports = transformResponse;