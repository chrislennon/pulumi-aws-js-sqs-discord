let aws = require("@pulumi/aws");
let serverless = require("@pulumi/aws-serverless");
let config = require("./config");

let queue = new aws.sqs.Queue("myDiscordQueue", { visibilityTimeoutSeconds: 180 });

serverless.queue.subscribe("myDiscordPoster", queue, async (e) => {
    let snekfetch = require("snekfetch");
    let webhookUrl = config.webhookUrl+'/slack'

    for (let rec of e.Records) {

        let payload = {
            "attachments": [
                {
                    "author_name": config.webhookName,
                    "title": rec.messageId,
                    "text": rec.body
                }
            ]
        };
        
        return new Promise((resolve, reject) => {
            snekfetch.post(webhookUrl)
                .send(payload)
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });

    }
}, { batchSize: 1 });

module.exports = {
    queueURL: queue.id,
};
