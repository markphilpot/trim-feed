import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import fetch from "node-fetch";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const feed = event.queryStringParameters?.feed;

  if (feed) {
    const response = await fetch(feed);
    const statusCode = response.status;
    const content = await response.text();

    return {
      statusCode,
      body: content.trim().replaceAll('"//', '"https://'),
    };
  } else {
    return {
      statusCode: 400,
      body: "Missing feed parameter",
    };
  }
};

export { handler };
