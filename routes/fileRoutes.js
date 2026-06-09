const express = require("express");
const multer = require("multer");
const CryptoJS = require("crypto-js");
const authMiddleware =
    require("../middleware/authMiddleware");

const FileModel = require("../models/FileModel");

const router = express.Router();


// MULTER STORAGE

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage
});


// UPLOAD FILE API
router.post(
    "/upload",
    authMiddleware,
    upload.single("file"),
    async (req, res) => {

        try {

            if (!req.file) {

                return res.status(400).json({
                    message: "No file uploaded"
                });

            }

            const fileData =
                req.file.buffer.toString("base64");

            const encryptedData =
                CryptoJS.AES.encrypt(
                    fileData,
                    process.env.AES_SECRET_KEY
                ).toString();

           const newfile = new FileModel({

    userId: req.user,

   originalName:
    req.file.originalname,

    encryptedData:
        encryptedData

});

            await newfile.save();

            res.status(200).json({

                message:
                    "File uploaded and encrypted successfully"

            });

        }

        catch (error) {

            console.log("UPLOAD ERROR:", error);

            res.status(500).json({

                message: "Upload Failed"

            });

        }

    }
);


// GET ALL FILES API

router.get(

    "/",

    authMiddleware,

    async (req, res) => {

        try {

            const files = await FileModel.find({

                userId: req.user

            });

            res.status(200).json(files);

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                message: "Failed to fetch files"

            });

        }

    }

);
// DOWNLOAD & DECRYPT FILE

router.get(

    "/download/:id",

    authMiddleware,

    async (req, res) => {

    try {

        const file = await FileModel.findOne({

    _id: req.params.id,

    userId: req.user

});

        if (!file) {

            return res.status(404).json({
                message: "File not found"
            });

        }

        const bytes =
            CryptoJS.AES.decrypt(
                file.encryptedData,
                process.env.AES_SECRET_KEY
            );

        const decryptedData =
            bytes.toString(CryptoJS.enc.Utf8);

        const fileBuffer =
            Buffer.from(decryptedData, "base64");

        res.set({

            "Content-Type":
                "application/octet-stream",

            "Content-Disposition":
                `attachment; filename="${file.originalName}"`

        });

        res.send(fileBuffer);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                "Download Failed"

        });

    }

});
router.delete(
    "/delete/:id",

    async (req, res) => {

        try {

            await FileModel.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({

                message:
                    "File deleted successfully"

            });

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    "Delete Failed"

            });

        }

    }
);
module.exports = router;