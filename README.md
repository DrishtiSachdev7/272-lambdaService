Serverless Application using AWS LAmbda and DynamoDB

Objective:

A simple serverless web application using AWS Lambda and Amazon DynamoDB as the database service. It performs the basic CRUD operations.

Lambda function, 

POST API CALL,
![image_description](https://github.com/user-attachments/assets/843fad9b-f65d-4a7a-af19-4bd5289fadff)

DB record,
![image_description](https://github.com/user-attachments/assets/dceddef6-1fff-43ce-90ee-d9f9e6456e39)


GET API CALL,
![image_description](https://github.com/user-attachments/assets/79958e3e-c707-4b73-8bcb-251052593d4b)

UPDATE API CALL,
![image_description](https://github.com/user-attachments/assets/ba0cb4a5-fb54-431f-a11b-5a9aec0559bb)

Update db record,
![image_description](https://github.com/user-attachments/assets/1d9b5a47-d967-4eeb-8175-dea83ccbeb04)

DELETE API CALL,
![image_description](https://github.com/user-attachments/assets/e0fe64d3-3950-44b6-b4db-80f8a266a21e)

Update db record,
![image_description](https://github.com/user-attachments/assets/1a879e77-dc68-458c-a1f0-904c354375ef)


Challenges Faced :-

While integrating AWS Lambda with DynamoDB, I encountered several challenges, primarily due to AWS SDK v2 being in maintenance mode in the Node.js environment.

1.AWS SDK v2 in Maintenance Mode

I initially wrote the Lambda function using AWS SDK v2, only to find that it was in maintenance mode and no longer fully supported for newer Node.js environments. This caused issues with my function, requiring me to rewrite it using AWS SDK v3. Transitioning to the new version took time as I had to adjust to its modular structure and update my code accordingly.

2.Troubleshooting with CloudWatch

After migrating to AWS SDK v3, I encountered errors that were difficult to diagnose through CloudWatch logs. To resolve this, I added extensive logging to the Lambda function and redeployed it multiple times to identify the exact issue. This helped me track down the errors and fix them.

3.Node Library Compatibility Issues

Another challenge arose when a Node.js library I was using was not compatible with the architecture in the AWS Lambda console. To address this, I had to install the dependencies locally, zip the files along with my Lambda function, and manually upload them to the AWS Lambda console.

4.DynamoDB Configuration for Local Testing

For testing DynamoDB operations locally, specifically with my studentRecords table, I had to configure AWS on my local machine. This involved creating a new IAM user, assigning the necessary roles and permissions, and ensuring the AWS CLI was correctly set up to interact with DynamoDB.


Learning and Outcome :-

Getting my hands on the serverless way of working using AWS Lambda was enriching. Using a combination of AWS services like API Gateway, Lambda functions, and DynamoDB allows the creation of a complete application without the need for any infrastructure on the local machine. This approach leverages the scalability and flexibility of AWS, where services automatically scale based on demand, ensuring smooth operation without manual intervention.

With the security features provided by AWS, such as IAM (Identity and Access Management), we can ensure that the right people have access to specific resources, making the entire application more secure. Fine-grained access control allows you to assign roles and permissions to users and services, ensuring they only access the data or operations they are authorized to use.

Using CloudWatch for tracking API calls provides great visibility into the system. The detailed logs allow you to monitor function invocations, check for errors, and pinpoint the root cause of issues. The built-in metrics and graphs offer a comprehensive view of system health, helping to identify performance bottlenecks or other problems early on. This ability to react quickly to issues helps maintain the reliability of the application.

In addition to these points, AWS Lambda integrates seamlessly with other AWS services, allowing for event-driven architectures. For example, Lambda functions can be triggered automatically by changes in DynamoDB, S3, or even SNS (Simple Notification Service), enabling efficient workflows without the need for manual intervention.

Moreover, AWS Lambda operates on a pay-as-you-go model, ensuring that you are only billed for the compute time used, which helps optimize costs. This serverless architecture, combined with DynamoDB's on-demand capacity mode, allows you to scale without worrying about over-provisioning or underutilization.

Overall, using AWS Lambda with DynamoDB not only simplifies the development process but also enhances the security, scalability, and cost-effectiveness of the application. The serverless approach shifts the focus from managing infrastructure to developing business logic, making it an efficient and streamlined way to build modern applications.

