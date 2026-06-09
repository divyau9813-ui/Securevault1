const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({

    userId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User"

    },

    originalName: {

        type: String

    },

    encryptedData: {

        type: String

    }

});

module.exports = mongoose.model(
    "File",
    fileSchema
);