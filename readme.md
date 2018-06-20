# NoFlo Test



#### Test Locally

`sam local invoke -e ./tests/requests/helloWorld.json HelloWorldFunction`

### Debug Locally

Run in terminal;

`sam local invoke -e ./tests/requests/helloWorld.json HelloWorldFunction -d 5858`

Wait for process to complete then launch debugger profile in VSCode `Attach to SAM local`.


### Permissions

#### Local Dev
Set the AWS Access Key variables up as local environment variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. This account is unique to this client so you may need to temporarily change these. The keys belong to the IAM account `banjodev`, key and secret are in 1pw.

#### Lamba
When running in the lambda environment the access keys are not required, instead access is controlled by the execution role. The role name is `lambda_chatbot_role` and contains access to the DynamoDB tables.