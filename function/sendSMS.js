const bulk = require("node-bulk-sms");

exports.sendSMSNotification = (message, destinaire) => {
    bulk.setUsername("jawill");
    bulk.setPassword("wj.s9shp#GQcz.@");
    bulk.sendMessage(message, `+237${destinaire}`, function (result) {
        console.log(result);
    });
};
