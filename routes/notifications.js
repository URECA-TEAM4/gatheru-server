const express = require("express");
const router = express.Router();
const { Notification } = require("../models/Notification");

router.get("/get", (req, res) => {
  Notification.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.json(err));
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { read } = req.body;

  try {
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating notification", error });
  }
});

router.post("/add", (req, res) => {
  const notification = new Notification(req.body);

  notification.save((err, notification) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

module.exports = router;
