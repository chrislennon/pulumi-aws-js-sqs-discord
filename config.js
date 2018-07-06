let pulumi = require("@pulumi/pulumi");
let config = new pulumi.Config(pulumi.getProject());
module.exports = {
    webhookName: config.get("webhookName") || "Webhook Name",
    webhookUrl: config.require("webhookUrl"),
};
