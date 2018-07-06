# Post AWS SQS Messages to Discord using Serverless Lambdas

Extended from [examples/aws-js-sqs-slack](https://github.com/pulumi/examples/tree/master/aws-js-sqs-slack)

This example wires up a serverless AWS Lambda to an AWS SQS queue and demonstrates posting a
message to Discord.  This program provisions resources using Pulumi's deployment system, but lets
you write serverless code as ordinary JavaScript functions.

## Prerequisites

This program requires the Pulumi CLI.  If you don't have it installed already,
[get it here](https://pulumi.io/install) or simply run `curl -fsSL https://get.pulumi.com | sh`.

After that, you'll need to [configure your AWS credentials](https://pulumi.io/install/aws.html) so that Pulumi can
deploy into your account.  If your AWS CLI is already configured, everything should just work.

Since this example uses Discord webhooks, you'll also need
[an discord webhook url](https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

## Running the Program

After installing the CLI and cloning the repo, `cd` into the directory, and run these commands:

1. Install NPM modules using `npm install` (or `yarn install` if you prefer Yarn).

2. Create a new stack:

    ```
    $ pulumi stack init pulumi-aws-js-sqs-discord
    ```

3. Configure the required variables:

    ```
    # Set the AWS region to deploy into:
    $ pulumi config set aws:region eu-west-1
    # Configure the Webhook channel and url to use:
    $ pulumi config set webhookName "Webhook Name"
    $ pulumi config set webhookUrl https://discordapp.com/api/webhooks/443201234567895850/re9gpFAKEFAKEPvKe2p-kxwmCxFAKEFAKEbMoMAy1 --secret
    ```

4. Deploy your program to AWS using the `pulumi update` command:

   ```
   $ pulumi update
   ```

   This command  will show you the changes before it makes them.  As soon as you select `yes`, it will begin
   provisioning resources, uploading your lambda, etc.  After it completes, your program is live!

5. To test this out, push a message into your SQS queue using the AWS CLI:

    ```
    $ aws sqs send-message --queue-url $(pulumi stack output queueURL) --message-body "Pulumi+AWS rocks :boom:"
    ```

    If you've done everything right, you'll see a message posted to your Discord channel!

    Notice we've used the `pulumi stack output` command to read the SQS queue URL that was provisioned.

6. Run the `pulumi logs --follow` command to follow the logs.  After a short while, you should see `console.log`
   output that your message was posted to Discord.

7. If you'd like to make some edits, try changing the `index.js` file, and then just run `pulumi update` again.
   Pulumi will detect the minimal set of edits needed to deploy your code.

8. After you're done playing around, you can destroy your program and stack by simply running two commands:

    ```
    $ pulumi destroy --yes
    $ pulumi stack rm --yes
    ```

## Learning More

To learn more about Pulumi, try checking out the [Tutorials](https://pulumi.io/quickstart) and
[Tour](https://pulumi.io/tour) sections of [pulumi.io](https://pulumi.io).