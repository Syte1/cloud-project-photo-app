const express = require("express")
const router = express.Router()

router.get("/:password", async (req, res) =>{
  const verified = req.params.password === process.env.MASTER_PASS
  console.log(verified)

  res.status(200).send({verified})
  })

module.exports = router