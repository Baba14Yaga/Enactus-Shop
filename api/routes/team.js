const router = require("express").Router();
const Team = require("../models/Team");
const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin} =require("./verifyToken")
//CREATE
router.post("/",verifyTokenAndAdmin,async(req,res)=>{
    const newTeam = new Team(req.body)
    try{
        const savedTeam = await newTeam.save()
        res.status(200).json(savedTeam)
    }catch(err){
            res.status(500).json(err)
    }
})
//UPDATE
router.put("/:id",verifyTokenAndAdmin,async (req,res)=>{

    try{
        const updatedTeam = await Team.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true})
        res.status(200).json(updatedTeam) 
    }catch(err){
        res.status(500).json(err);
    }
})

//Delete
router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        await Team.findByIdAndDelete(req.params.id)
        res.status(200).json("Team has been deleted...")

    }catch(err){
        res.status(500).json(err)
    }
})
//GET
router.get("/find/:id",async(req,res)=>{
    try{
        const product = await Team.findById(req.params.id)
        const {password, ...others} =product._doc
        res.status(200).json ({...others});
    }catch(err){
        res.status(500).json(err)
    }
})
//GET ALL
router.get("/",async(req,res)=>{
    const qNew =req.query.new
    const qCategory=req.query.category
    try{

        let products
        if(qNew){
            products= await Team.find().sort({createdAt:-1}).limit(5)
        }else if(qCategory){
            products=await Team.find(
                {
                    categories:{
                        $in:[qCategory],
                    },
                }
            )
        }else{
            products =await Team.find()
        }
        res.status(200).json (products);
    }catch(err){
        res.status(500).json(err)
    }
})
//GET STATS
router.get("/stats",verifyTokenAndAdmin, async (req,res)=>{
    const date = new Date();
    const lastYear =new Date(date.setFullYear(date.getFullYear()-1))
    try{
        const data= await Team.aggregate([ //revise this
            {$match:{createdAt:{$gte:lastYear}}},
            {$project:
                {
                    month:{$month:"$createdAt"}
                }
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:1}
                }
            }
        ])
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json(err);
    }
})
module.exports = router