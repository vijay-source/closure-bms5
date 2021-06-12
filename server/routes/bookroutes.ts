import express from "express";

import { addNewBook, deleteBook, getAllAuthors, getAllBooks, getBookById, searchByAuthor, searchByPrice, searchByRating, searchByTitle } from "../controllers/bookcontroller";
import { auth } from "../controllers/usercontroller";


let bookroute = express.Router(); //create a router object we use this to serve all our requests
bookroute.use(express.json());


bookroute.route("/books")
 .get(getAllBooks)
 .post(auth,addNewBook)
bookroute.route("/books/allAuthors")
     .get(getAllAuthors) 
bookroute.route("/books/:id")
     .get(getBookById)
     bookroute.route("/books/:id")
     .delete(auth,deleteBook)
bookroute.route("/books/by/author/:author")
     .get(searchByAuthor)
bookroute.route("/books/by/title/:title")  
     .get(searchByTitle)
bookroute.route("/books/by/rating/:rating")  
     .get(searchByRating)
     bookroute.route("/priced/:min/:max")
     .get(searchByPrice) 
     

// route.route("/registration")
//      .post(registration)
// route.route("/login")
//      .post(login)

export default bookroute;




// route.get("/books", (req, res) => {
//   Book.find()
//     .then((result: any) => {
//       res.send(result);
//     })
//     .catch((error: Error) => console.log(error));
// });



// route.post("/books", (req, res) => {
//   console.log("cb");
//   let book = new Book(req.body);
//   console.log("bookpost", book);
//   // book.save();
//   Book.create(book);
//   res.send(book);
// });



// route.get("/books/:id", (req, res) => {
//   const id = req.params.id;
//   //Book.findById('60768abb5d8c4f437c22a18b')
//   Book.findById(id)
//     .then((result: any) => {
//       res.send(result);
//     })
//     .catch((error: Error) => console.log(error));
// });


// route.delete("/books/:id", (req, res) => {
//   const id = req.params.id;
//   Book.deleteOne({ _id: id })
//     .then(() => {
//       res.status(200).json({
//         message: "Books deleted",
//       });
//     })
//     .catch((error: Error) => console.log(error));
// });


// route.post("/books", (req, res) => {
//   console.log("cb");
//   let book = new Book(req.body);
//   console.log("bookpost", book);
//   // book.save();
//   Book.create(book);
//   res.send(book);
// });




// search by authir
// route.get("/books/by/:author", async (req, res) => {
//   try {
//     let author = new RegExp(req.params.author, "i");
//     let books = await Book.find({ author: author });
//     console.log(books);
//     res.send(books);
//   } catch (e) {
//     console.log(e);
//   }
// });

// route.get("/books/by/title/:title", async (req, res) => {
//   try {
//     const title = new RegExp(req.params.title, "i");
//     let books = await Book.find({ title });
//     console.log(books);
//     res.send(books);
//   } catch (e) {
//     console.log(e);
//   }
// });

// route.get("/books/by/rating/:rating", async (req, res) => {
//   try {
//     let books = await Book.find({ rating: { $gte: req.params.rating } });
//     console.log(JSON.stringify(books));
//     res.send(books);
//   } catch (e) {
//     console.log(e);
//   }
// });

// route.get("/priced/:min/:max", async (req, res) => {
//   try {
//     console.log(req.params.min);
//     let books = await Book.find({
//       $and: [
//         { cost: { $gte: req.params.min } },

//         { cost: { $lte: req.params.max } },
//       ],
//     });
//     console.log(JSON.stringify(books));
//     res.send(books);
//   } catch (e) {
//     console.log(e);
//   }
// });



// route.post("/registration", async (req, res) => {
//   let { name, email, password } = req.body;
//   console.log("recieved data for registration");
//   // validation
//   if (!name || !email || !password) {
//     return res.status(400).json({ msg: "please enter all fields" });
//   }
//   let newUser: any;
//   User.findOne({ email }).then((user: any) => {
//     if (user) {
//       console.log(user);
//       return res.status(400).json({ msg: "user already exists" });
//     }
//     newUser = new User({
//       name,
//       email,
//       password,
//     });
//     //create salt and hash
//     console.log(newUser);
//     bcrypt.genSalt(10, (err: any, salt: any) => {
//       bcrypt.hash(newUser.password, salt, (err: any, hash: any) => {
//         if (err) throw err;
//         newUser.password = hash;
//         newUser.save().then((user: any) => {
//           console.log("sending user resposne",user)
//           res.send(user);
//         });
//       });
//     });
//   });
// });

//for login
// route.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   console.log("user email", email);
//   console.log("user password", password);

//   if (!email || !password) {
//     return res.status(400).json({ msg: "credential missing" });
//   }
//   User.findOne({ email }).then((user: any) => {
//     if (!user) return res.status(400).json({ msg: "user doesnot exists" });
//     //validate password
//     bcrypt.compare(password, user.password).then((isMatch: any) => {
//       if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });
//       jwt.sign(
//         { id: user._id },
//         `${process.env.jwtSecret}`,
//         { expiresIn: 10000 },
//         (err: any, token: any) => {
//           if (err) throw err;
//           console.log("level token",token)
//           res.json({token:token});
//         }
//       );
//     });
//   });
// });

// function auth(req: any, res: any, next: Function) {
//   console.log("auth");
//   const authHeader = req.headers.authorization;
//   console.log("header", req.headers);
//   const token = authHeader && authHeader.split(" ")[1];
//   console.log(token);
//   //check for token
//   if (!token) return res.status(401).json({ msg: "no token supplied" });
//   jwt.verify(token, `${process.env.jwtSecret}`, (err: any, user: any) => {
//     if (err) return res.status(403).send("something went wrong");
//     req.user = user;
//     next();
//   });
// }











// route.put("/updatebook/:id",async (req, res) => {
//  console.log(req.params.id)
//  const book= await Book.findById(req.params.id)
//   const updatedbook = new Book({
//     _id: book.id,
//     title: book.title,
//     author: book.author,
//     price: book.price,
//     rating: req.body.rating,
//   });
//   Book.update({ _id: req.params.id }, updatedbook)
//     .then(() => {
//       res.status(201).json({
//         message: "Book updated successfully",
//       });
//     })
//     .catch((error: Error) => console.log(error));
// });