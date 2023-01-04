import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../Models/adminModel.js";

export const adminRegister = async (req, res) => {
    try {
        const {
            
            email,
            password,
        
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        const newAdmin = new Admin({
           
            email,
            password: passwordHash,
          
        })
        const savedAdmin = await newAdmin.save()
        res.status(201).json(savedAdmin)

    } catch (err) {
        res.status(500).json({error: err.message})

    }

}

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ email: email });
      console.log(admin);
  
      if (admin) {
        const validity = await bcrypt.compare(password, admin.password);
  
        if (!validity) {
          res.status(400).json("Wrong password");
        } else {
          const token = jwt.sign(
            {
                email: admin.email,
              id: admin._id,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
  
          res.status(200).json({ admin, token });
        }
      } else {
        res.status(404).json("User does not exists");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getFullUsers = async (req, res) => {
 
    try {
       let users = await User.find()
     
      
       const formattedFriends = users.map(
           ({ _id, firstname, lastname,username,Active}) => {
               return { _id, firstname,lastname,username,Active};
           }
       );
       res.status(200).json({message: 'Users', success: true, formattedFriends })
    } catch (error) {
       res.status(500).json({ error: error.message, message: "error while fetching users", success: false })
    }  
   }
  



   export const blockUser = async (req, res, next) => {
    try {
        const userID = req.body.userID
        console.log(userID,'user id at block');
        await User.updateOne({ _id: userID }, {
            $set: {
                Active: false
            }
        })
        res.status(201).json({ blockstatus: true, success: true })
    } catch (error) {
        console.log(error)
    }
}

export const unBlockUser = async (req, res, next) => {
    try {
        const userID = req.body.userID
        await User.updateOne({ _id: userID }, {
            $set: {
                Active: true
            }
        })
        res.status(201).json({ unblockstatus: true, success: true })
    } catch (error) {
        console.log(error)
    }
}
