const MCQ=require('../models/MCQ')

exports.createMCQ=async(req,res)=>{
    const {question,options,correctAnswer,difficulty}=req.body;
    try{
        const mcq=new  MCQ({question,options,correctAnswer,difficulty});
        await mcq.save();
        res.status(201).send('MCQ created')

    }
    catch(err){
        res.status(400).send(err.message);
    }
}
exports.checkAnswer = async (req, res) => {
    const { id } = req.params;
    const { selectedAnswer } = req.body;
    
    try {
        const mcq = await MCQ.findById(id);
        if (!mcq) return res.status(404).send('MCQ not found');

        if (selectedAnswer === mcq.correctAnswer) {
            res.status(200).json({ message: 'Correct!' });
        } else {
            res.status(200).json({ message: 'Incorrect!' });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
};
exports.getMCQs=async(req,res)=>{
    try{
        const mcqs=await MCQ.find();
        res.status(200).json(mcqs);
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

exports.updateMCQ=async(req,res)=>{
    const {id}=req.params;
    const {question,options,correctAnswer,difficulty}=req.body;
    try{
        const mcq=await MCQ.findByIdAndUpdate(id,{question,options,correctAnswer,difficulty},{new:true});
        if(!mcq) return res.status(404).send('MCQ not found');
        res.status(200).json(mcq);
    }
    catch(err)
    {
        res.status(400).send('err.message')
    }
}

exports.deleteMCQ=async(req,res)=>{
    const {id}=req.params;
    try{
        const mcq=await MCQ.findByIdAndDelete(id);
        if(!mcq) return res.status(404).send('MCQ not found');
            res.status(200).send('MCQ deleted');
    }
    catch(err){
        res.status(400).send(err.message)
    }
}