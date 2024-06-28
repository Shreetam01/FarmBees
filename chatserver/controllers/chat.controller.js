const { create ,getAll ,resolve ,getFarmerChat ,ExpertsAnswer ,fullConvo ,getQuestion } =require("../services/chat.services");


module.exports = {
    createQuery: (req,res)=>{
        const body = req.body;
        const user = req.user.id; // Get user from middleware
        const data = { ...body, user };
        create(data, (err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    msg:"DB CONNECTION ERROR"
                })
            }
            return res.status(200).json({
                success:1,
                data: results
            })
        })
    },
    resolveQuery: (req,res)=>{
        const body = req.body;
        const user = req.user.id; // Get user from middleware
        const data = { ...body, user };
        resolve(data, (err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    msg:"DB CONNECTION ERROR"
                })
            }
            return res.status(200).json({
                success:1,
                data: results
            })
        })
    },
    ExpertsAnswerOfQuery: (req,res)=>{
        const body = req.body;
        const user = req.user.id; // Get user from middleware
        const data = { ...body, user };
        ExpertsAnswer(data, (err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    msg:"DB CONNECTION ERROR"
                })
            }
            return res.status(200).json({
                success:1,
                data: results
            })
        })
    },
    getFarmerChatById : (req,res)=>{
        const body = req.body;
        const user = req.user.id; // Get user from middleware
        const data = { ...body, user };
        getFarmerChat(data, (err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data: results
            })
        })
    },
    getFullConvoById : (req,res)=>{
        const body = req.body;
        const user = req.user.id; // Get user from middleware
        const data = { ...body, user };
        fullConvo(data, (err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data: results
            })
        })
    },
    getQuestionById: (req,res)=>{
        const body = req.body;
        const user = req.user.id; // Get user from middleware
        const data = { ...body, user };
        getQuestion(data, (err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    msg:"DB CONNECTION ERROR"
                })
            }
            return res.status(200).json({
                success:1,
                data: results
            })
        })
    },
    getAllQuery : (req,res)=>{
                getAll((err,results)=>{
                    if(err){
                        console.log(err);
                        return;
                    }
                    return res.json({
                        success:1,
                        data: results
                    })
                })
    },
    // logInUser: (req,res)=>{
    //     const body = req.body;
    //     logIn(body, (err,results)=>{
    //         if(err){
    //             console.log(err);
    //             return res.status(500).json({
    //                 success:0,
    //                 msg:"DB CONNECTION ERROR"
    //             })
    //         }
    //         else{
    //             if(results.length != 0){
    //                 const user = results[0];
    //                 bcrypt.compare(body.password, user.password, (bcryptErr, passwordMatch) => {
    //                     if (bcryptErr) {
    //                     console.error('Bcrypt error:', bcryptErr);
    //                     return res.status(500).send('Internal server error');
    //                     }

    //                     if (passwordMatch) {
    //                         const usr ={ id: user.id};
    //                         const token = jwt.sign({usr}, 'my_secret_key');
    //                         res.cookie("jwtoken", token, { httpOnly: true });
    //                         res.json({
    //                             user: user.id,
    //                             token :token
    //                         })
    //                     } 
    //                     else {
    //                         res.status(401).send('Invalid username or password');
    //                     }
    //                 });
    //             }
    //             else{
    //                 return res.status(401).send('Invalid email or password');
    //             }
    //         }
    //     })
    // },
    // decodeJwt: (req, res) => {
    //     // const secret ="my_secret_key";
    //     const body = req.body;
    //     // const token = body.token;
    //     // const userId  = jwt.decode(token).usr.id
    //     // console.log(userId );
    //     getUserInfo(userId , (err,results) => {
    //         if(err){
    //             console.log(err);
    //             // res.cookie('user', 'John Doe', { maxAge: 900000, httpOnly: true });
    //             return res.status(500).json({
    //                 success:0,
    //                 msg:"DB CONNECTION ERROR"
    //             })
    //         }
    //         return res.status(200).json({
    //             success:1,
    //             data: results
    //         })
    //     })
    // }
}