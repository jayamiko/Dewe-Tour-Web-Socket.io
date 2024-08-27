const { trip, country } = require("../../models");

const fs = require("fs");
const Joi = require("joi");
const path = require("path");

function deleteFiles(filenames) {
  filenames.forEach((filename) => {
    const filePath = path.join(__dirname, "../../uploads", filename);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(`File not found: ${filePath}`);
        return;
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(
            `Failed to delete file: ${filePath} [Error: ${err.message}]`
          );
        } else {
          console.log(`File successfully deleted: ${filePath}`);
        }
      });
    });
  });
}
exports.addTrip = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(5).required(),
    country: Joi.string().required(),
    accomodation: Joi.string().required(),
    transportation: Joi.string().required(),
    eat: Joi.string().required(),
    day: Joi.number().required(),
    night: Joi.number().required(),
    dateTrip: Joi.date().required(),
    price: Joi.number().required(),
    quota: Joi.number().required(),
    maxQuota: Joi.number().required(),
    description: Joi.string().min(10).max(1000).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    console.log(error);
    if (req.files && req.files.image) {
      const arrayFilename = req.files.image.map((item) => item.filename);
      deleteFiles(arrayFilename);
    }
    return res.status(400).send({
      status: "failed",
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    let arrayFilename = [];
    if (req.files && req.files.image) {
      arrayFilename = req.files.image.map((item) => item.filename);
    }

    const newTrip = await trip.create({
      ...req.body,
      image: JSON.stringify(arrayFilename),
    });

    let tripData = await trip.findOne({
      where: {
        id: newTrip.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "country"],
      },
    });

    tripData = JSON.parse(JSON.stringify(tripData));

    const newData = {
      ...tripData,
      image: JSON.parse(tripData.image).map((image, index) => ({
        id: index + 1,
        url: "http://localhost:8080/uploads/" + image,
      })),
    };

    res.send({
      status: "success",
      message: "Trip successfully added",
      data: newData,
    });
  } catch (error) {
    console.log(error);
    // Hapus gambar yang diupload jika terjadi error server
    if (req.files && req.files.image) {
      const arrayFilename = req.files.image.map((item) => item.filename);
      deleteFiles(arrayFilename);
    }
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.getTrips = async (req, res) => {
  try {
    let data = await trip.findAll({
      include: {
        model: country,
        as: "country",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "country",
          "accomodation",
          "transportation",
          "eat",
          "day",
          "night",
          "dateTrip",
          "description",
        ],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    const newData = data.map((item) => ({
      id: item.id,
      title: item.title,
      country: item.country,
      price: item.price,
      quota: item.quota,
      maxQuota: item.maxQuota,
      image: JSON.parse(item.image).map((image, index) => ({
        id: index + 1,
        url: "http://localhost:8080/uploads/" + image,
      })),
    }));

    res.send({
      status: "success",
      data: newData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.getTrip = async (req, res) => {
  const { id } = req.params;

  try {
    let data = await trip.findOne({
      where: {
        id,
      },
      include: {
        model: country,
        as: "country",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "country"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    const newData = {
      ...data,
      image: JSON.parse(data.image).map((image, index) => ({
        id: index + 1,
        url: "http://localhost:8080/uploads/" + image,
      })),
    };

    res.send({
      status: "success",
      data: newData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.updateTrip = async (req, res) => {
  const { id } = req.params;

  try {
    await trip.update(req.body, {
      where: {
        id,
      },
    });

    const updatedData = await trip.findOne({
      where: {
        id,
      },
      include: {
        model: country,
        as: "country",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "country"],
      },
    });

    res.send({
      status: "success",
      updatedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.deleteTrip = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await trip.findOne({
      where: {
        id,
      },
    });

    const imageStringToArray = JSON.parse(data.image);

    for (const item of imageStringToArray) {
      fs.unlink("uploads/trips/" + item, (err) => {
        if (err) throw err;
      });
    }

    await trip.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: "delete trip success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};
