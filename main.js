const { IvyClient } = require('./output/service_ivy_grpc_web_pb');
const { Message } = require('google-protobuf')
const { StreamMessageCompanyRequest } = require('./output/ivy_message_pb');

function main() {
    const client = new IvyClient('https://dev-gapi.hyrd.ai');
    const request = new StreamMessageCompanyRequest();
    request.setTcId("all");
    request.setEmployeeMode(false);
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNjk3NDIiLCJzY3AiOiJ1c2VyIiwiYXVkIjpudWxsLCJpYXQiOjE3MjU1NTAyNDYsImV4cCI6MTcyODE0MjI0NiwianRpIjoiYWNjYmI0MmItNjFkNy00N2I3LTgxNzAtYjFkMjE0ZmE1ZTJiIn0.kH3_I_0n0mc4OOxLuYQvjU38X8er4q5YU-LfeOSOR2w"
    const stream = client.streamMessagePerCompany(request, {
        Authorization: `Bearer ${token}`, // Set any headers here
    });

    stream.on('data', (response) => {
        console.log('Data received:', response.toObject());
        document.getElementById('response').innerText += 'Data received: ' + JSON.stringify(response.toObject()) + '\n';
    });

    stream.on('status', (status) => {
        console.log('Status:', status);
        document.getElementById('response').innerText += 'Status: ' + JSON.stringify(status) + '\n';
    });

    stream.on('error', (err) => {
        console.error('Error:', err.message);
        document.getElementById('response').innerText += 'Error: ' + err.message + '\n';
    });

    stream.on('end', () => {
        console.log('Stream ended');
        document.getElementById('response').innerText += 'Stream ended\n';
    });
}

main()