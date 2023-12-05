// require mongoose and setup the Schema
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// connect to Your MongoDB Atlas Database
mongoose.connect('mongodb+srv://1dhwanimanglani:Ssdn$1008@cluster0.fffnv30.mongodb.net/1dhwanimanglani?retryWrites=true&w=majority');

// define the company schema
let companySchema = new Schema({
  companyName: String,
  address: String,
  phone: String,
  employeeCount: {
    type: Number,
    default: 0,
  },
  country: String,
});
// register the Company model using the companySchema
// use the companies collection in the db to store documents
let Company = mongoose.model('companies', companySchema);

// create a new company
let kwikEMart = new Company({
  companyName: 'The Kwik-E-Mart',
  address: 'Springfield',
  phone: '212-842-4923',
  employeeCount: 3,
  country: 'U.S.A',
});

// save the company
kwikEMart
  .save()
  .then(() => {
    console.log('The Kwik-E-Mart company was saved to the companies collection');
    process.exit();
  })
  .catch((err) => {
    console.log('There was an error saving the Kwik-E-Mart company');
    process.exit();
  });

        db.on('error', (err) => {
            reject(err);
        });

        db.once('open', () => {
            User = db.model("users", userSchema);
            resolve();
        });

module.exports.registerUser = (userData) =>
{
    return new Promise((resolve,reject)=>
    {
        if(userData.password !== userData.password2)
        {
            reject("Passwords do not match");
        }
        bcrypt.hash(userData.password, 10).then(hash =>{ // Hash the password using a Salt that was generated using 10 rounds
          
          
            userData.password = hash;
       
            userData.password2 = hash;



            let newUser = new User(userData);
        

            newUser.save().then(() => {
                // everything good
                console.log(newUser);
                resolve();
    
              }).catch(err => {
                if (err) {
                    if (err.code === 11000) {
                        reject("User Name already taken");
                    } else {
                        reject("There was an error creating the user: " + err);
                    }
                }
              });
        }) .catch(err=>{
           
            console.log(err); // Show any errors that occurred during the process
            reject(err);
        });
      
       
    })
}
// module.exports.checkUser = function(userData) {
//     return new Promise(function(resolve, reject) {


//         User.find({userName: userData.userName}).then((User)=>
//         {
           
         
//             bcrypt.compare(userData.password, User[0].password).then(function(result) {
//                 if (result) {

//                 //     User[0].loginHistory.push({
//                 //         dateTime: (new Date()).toString(),
//                 //         userAgent: userData.userAgent
//                 //     });
//                 //     console.log(User[0].loginHistory);
//                 //     // User.updateOne({ userName: User[0].userName }, { $set: { loginHistory: User[0].loginHistory }}, function(err) {
//                 //     //     if (err) {
//                 //     //         reject("There was an error verifying the user: " + err);
//                 //     //     } else {
//                 //     //         resolve(User[0]);
//                 //     //     }
//                 //     // });
                    
//                 //     // User.updateOne(
//                 //     //     {
//                 //     //         userName: User[0].userName 
//                 //     //     },
//                 //     //     {
//                 //     //         $set: { loginHistory: User[0].loginHistory }
//                 //     //     }
//                 //     // ).exec().then(()=>
//                 //     // {
//                 //     //     console.log("login success");
//                 //     //     resolve(User[0]);
//                 //     // });

//                 //     console.log("login success");
//                 //  resolve(User[0]);



//                 Users[0].loginHistory.push({dateTime: (new Date()).toString(), userAgent:userData.userAgent});
//                     User.update(
//                         { userName: users[0].userName },
//                         { $set: {loginHistory: users[0].loginHistory} },
//                         { multi: false }
//                     )
//                     .exec()
//                     .then(() => {resolve(users[0])})
//                     .catch(err => {reject("There was an error verifying the user: " + err)})
                   
//                 } else {
//                     reject("Incorrect Password for user: " + userData.userName);
//                 }
//         }).catch(err =>
//             {
//                 if (err) {
//                     reject("Unable to find user : " );
//                 } else if (User[0].length === 0) {
//                     reject("Unable to find user : " + userData.userName);
//                 }
//                 else{
//                     reject("There was an error verifying the user: " + err);
//                 }
//             })

        
        
//         });
//     });
// };


module.exports.checkUser = (userData) => {
    return new Promise((resolve, reject) => {
        User.find({userName: userData.userName})
        .exec()
        .then(users => {
            bcrypt.compare(userData.password, users[0].password).then(res => {
                if(res === true) {   
                    users[0].loginHistory.push({dateTime: (new Date()).toString(), userAgent:userData.userAgent});
                    User.updateOne(
                        { userName: users[0].userName },
                        { $set: {loginHistory: users[0].loginHistory} },
                        { multi: false }
                    )
                    .exec()
                    .then(() => {resolve(users[0])})
                    .catch(err => {reject("There was an error verifying the user: " + err)})
                }
                else {
                    reject("Incorrect Password for user: " + userData.userName); 
                }
            })
        })
        .catch(() => { 
            reject("Unable to find user: " + userData.userName); 
        }) 
    })
};
