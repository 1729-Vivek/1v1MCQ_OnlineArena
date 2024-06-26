const mongoose =require('mongoose')

const mcqSchema=new mongoose.Schema({
    question:{type:String,required:true},
    options:[{type:String,required:true}],
    correctAnswer:{type:String,required:true},
    difficulty:{type:String ,default:'easy'}

})

const MCQ=mongoose.model('MCQ',mcqSchema)

module.exports=MCQ;