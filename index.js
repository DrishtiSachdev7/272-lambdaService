const { DynamoDBClient, GetItemCommand, PutItemCommand, UpdateItemCommand, DeleteItemCommand } = require('@aws-sdk/client-dynamodb');

// Initialize the DynamoDB client
const dynamoDB = new DynamoDBClient({ region: 'us-east-1' }); // Update region if needed
const dynamoDBTable = 'StudentRecords';
const healthPath = '/health';
const studentPath = '/students';

exports.handler = async function(event) {
    console.log('Request event: ', JSON.stringify(event, null, 2)); // Log the full event

    let response;
    try {
        switch (true) {
            case event.httpMethod === 'GET' && event.path === healthPath:
                response = sendResponse(200);
                break;
            case event.httpMethod === 'GET' && event.path === studentPath:
                response = await getStudent(JSON.parse(event.body).student_id);
                break;
            case event.httpMethod === 'POST' && event.path === studentPath:
                response = await createStudent(JSON.parse(event.body));
                break;
            case event.httpMethod === 'DELETE' && event.path === studentPath:
                response = await deleteStudent(JSON.parse(event.body).student_id);
                break;
            case event.httpMethod === 'PATCH' && event.path === studentPath:
                response = await modifyStudent(JSON.parse(event.body));
                break;
            default:
                response = sendResponse(404, '404 not found');
        }
    } catch (error) {
        response = sendResponse(500, `Internal Server Error: ${error.message}`);
    }
    return response;
}

function sendResponse(statusCode, body) {
    console.log('STATUS CODE,', statusCode, 'BODY,', body);
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}

async function getStudent(studentId) {
    const params = {
        TableName: dynamoDBTable,
        Key: {
            'student_id': { S: studentId }
        }
    };
    try {
        const data = await dynamoDB.send(new GetItemCommand(params));
        return sendResponse(200, data.Item);
    } catch (error) {
        return sendResponse(500, `Some error occurred: ${error.message}`);
    }
}

async function createStudent(body) {
    const params = {
        TableName: dynamoDBTable,
        Item: {
            'student_id': { S: body.student_id },
            'student_name': { S: body.student_name },
            'student_course': { S: body.student_course },
            'student_location': { S: body.student_location }
        }
    };
    try {
        await dynamoDB.send(new PutItemCommand(params));
        const responseBody = {
            Operation: 'SAVE',
            message: 'Success',
            Item: body
        };
        return sendResponse(200, responseBody);
    } catch (error) {
        return sendResponse(500, `Some error occurred: ${error.message}`);
    }
}

async function modifyStudent(body) {
    const params = {
        TableName: dynamoDBTable,
        Key: {
            'student_id': { S: body.student_id }
        },
        UpdateExpression: `SET ${body.updateKey} = :value`,
        ExpressionAttributeValues: {
            ':value': { S: body.updateValue }
        },
        ReturnValues: 'UPDATED_NEW'
    };
    try {
        const data = await dynamoDB.send(new UpdateItemCommand(params));
        const responseBody = {
            Operation: 'UPDATE',
            message: 'Success',
            Item: data.Attributes
        };
        return sendResponse(200, responseBody);
    } catch (error) {
        return sendResponse(500, `Some error occurred: ${error.message}`);
    }
}

async function deleteStudent(studentId) {
    const params = {
        TableName: dynamoDBTable,
        Key: {
            'student_id': { S: studentId }
        },
        ReturnValues: 'ALL_OLD'
    };
    try {
        const data = await dynamoDB.send(new DeleteItemCommand(params));
        const responseBody = {
            Operation: 'DELETE',
            message: 'Success',
            Item: data.Attributes
        };
        return sendResponse(200, responseBody);
    } catch (error) {
        return sendResponse(500, `Some error occurred: ${error.message}`);
    }
}
