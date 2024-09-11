// index.js
const proto = require('./output/service_ivy_pb.js');
const grpcWeb = require('./output/service_ivy_grpc_web_pb.js');
const ivyMessage = require('./output/ivy_message_pb.js');

// Setup client to interact with gRPC-Web server
const client = new grpcWeb.IvyClient('https://dev-gapi.hyrd.ai');

// Create a request object
const request = new ivyMessage.StreamMessageCompanyRequest();
request.setTcId("all");
request.setEmployeeMode(false);
const token = "<change with your token>"

// Function to send the request
function sendRequest() {
    const stream = client.streamMessagePerCompany(request, {
        Authorization: `Bearer ${token}`, // Set any headers here
    });

    stream.on('data', (response) => {
        console.log('Response:', response.getMsg());
        // alert('Response received: ' + response.getMsg());
    });

    stream.on('error', (err) => {
        console.error('Error:', err);
        alert('Error occurred: ' + err.message);
    });

    stream.on('end', () => {
        console.log('Stream ended.');
    });
}

// Attach to the button event
document.getElementById('sendRequest').addEventListener('click', sendRequest);
