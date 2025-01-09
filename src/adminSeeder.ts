import User from "./database/models/User";
import bcrypt from 'bcrypt'

const adminSeeder = async():Promise<void> => {
  const [data] = await User.findAll({
    where: {
      email : 'vmsadmin@gmail.com'
    }
  })
  if(!data){
    await User.create({
      email: "vmsadmin@gmail.com",
      password: bcrypt.hashSync("vmsadmin", 8),
      name: "admin",
      role: "admin",
      address: "Lalitpur",
      phone: "9813234356",
      
    })
    console.log("admin credentials seeded successfully.")
  }else{
    console.log("admin credentials already seeded.")
  }
}

export default adminSeeder