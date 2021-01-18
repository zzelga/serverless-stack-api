import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  // request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      // the attributes of the item to be created
      userId: event.requestContext.identity.cognitoIdentityId, // The id of the author
      noteId: uuid.v1(), // a unique uuid
      content: data.content, // parsed from request body
      attachment: data.attachment, // parse from request body
      createdAt: Date.now(), // current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
