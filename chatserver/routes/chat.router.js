const { createQuery ,getAllQuery ,resolveQuery ,getFarmerChatById ,ExpertsAnswerOfQuery ,getFullConvoById ,getQuestionById } = require("../controllers/chat.controller");
const router = require("express").Router();

router.post("/",createQuery);
router.post("/resolve",resolveQuery);
router.post("/expertAnswer",ExpertsAnswerOfQuery);
router.post("/getFarmerChat",getFarmerChatById);
router.post("/getConvobyId",getFullConvoById);
router.post("/getQuestionById",getQuestionById);
router.get("/all",getAllQuery);

module.exports = router;