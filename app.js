
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')

app.use(express.json())

app.use('/uploadPhotos' , express.static(__dirname + '/uploads'))


main().catch(err => console.log(err));


async function main() {
  await mongoose.connect(process.env.mongoDB);
};

app.get("/",(req,res)=>{
  res.send("Hello I am up!")
})

const userSchema = new mongoose.Schema({

  _id : String,
  fullname: String,
  Email: String,
  textarea: String
  

});


const influencerSchema = new mongoose.Schema({
    _id:String,
    name: String,
    email: String,
    phoneNumber: String,
    productCategory: String,
    platform: String,
    username: String,
    followers: Number,
    averageLikes: Number,
    averageComments: Number,
    averageShares: Number,
    audienceSatisfaction: Number,
    audienceAge: Number,
    audienceType: String,
    audienceGender: String,
    pastCampaignSuccess: Number,
    expectedBudget: Number,
    engagementRate: Number,
    followersGrowthRate: Number,
    achievements: String,
    bio: String,
    photo: String
  });


const User = mongoose.model('User', userSchema);

const influencer = mongoose.model('Influencers' , influencerSchema );

userSchema.plugin(findOrCreate);


// app.use(cors(
//     {
      
//     origin:"https://frontend-portfolio-aryan.vercel.app",
//     methods :"GET,POST,PUT,DELETE",
//     credentials : true
// }));

// const Login = mongoose.model("Login", loginSchema);

function saveUser(profile){
  
    let user = new User();

    user._id = `${Date.now()}_${profile.email}`
    user.fullname = profile.fullname;
    user.Email = profile.Email;
    user.textarea = profile.textarea;

    const doc = user.save();

    console.log(doc);
  
}

//array pushed data from Photo

var arr = [];

// for parsing MongoDB data to react 
// app.get("/ProductData" , (req,res)=>{
//   influencer.find()
//   .then(Prod => { 
//     res.json(Prod);
//   }).catch(err => {
//     res.json(err);
//   })
// })


function SaveInfluencer (Pdata){
  
    if(Pdata.name == null || Pdata.username == null){
    
    } else {
      let influencerProfile = new influencer();
      
      influencerProfile._id = `${Date.now()}_${Pdata.name}`
      influencerProfile.name = Pdata.name;
      influencerProfile.email = Pdata.email ;
      influencerProfile.phoneNumber = Pdata.phoneNumber ;
      influencerProfile.productCategory = Pdata.productCategory ;
      influencerProfile.platform = Pdata.platform ;
      influencerProfile.username = Pdata.username ;
      influencerProfile.followers = Pdata.followers ;
      influencerProfile.averageLikes = Pdata.averageLikes ;
      influencerProfile.averageComments = Pdata.averageComments ;
      influencerProfile.averageShares = Pdata.averageShares ;
      influencerProfile.audienceSatisfaction = Pdata.audienceSatisfaction ;
      influencerProfile.audienceAge = Pdata.audienceAge ;
      influencerProfile.audienceType = Pdata.audienceType ;
      influencerProfile.audienceGender = Pdata.audienceGender ;
      influencerProfile.pastCampaignSuccess = Pdata.pastCampaignSuccess ;
      influencerProfile.expectedBudget = Pdata.expectedBudget ;
      influencerProfile.engagementRate = Pdata.engagementRate ;
      influencerProfile.followersGrowthRate = Pdata.followersGrowthRate ;
      influencerProfile.achievements = Pdata.achievements ;
      influencerProfile.bio = Pdata.bio ;
      influencerProfile.photo = Pdata.photo;
      
      const influData = influencerProfile.save();
  
      console.log(influData);
  
    }
   
  
}



//userSchema.plugin(findOrCreate);


//saving image file using multer.

app.post('/saveUser', (req,res)=>{
    saveUser(req.body);
})

app.post('/dataUpload', (req,res)=>{
  SaveInfluencer(req.body);  
})

app.listen(process.env.PORT , ()=>{
    console.log("Server Running at port 5000");
})