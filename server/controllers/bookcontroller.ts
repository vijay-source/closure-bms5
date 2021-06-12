
const Book =require("../models/book")



export const getAllBooks = async (req: any, res: any) => {
    try {
        let books = await Book.find();
        if (books)
            res.status(200).send(books);
    } catch (err: any) {
        res.status(400).send("ERROR", err.message)
    }
}





export const addNewBook =async (req: any, res: any) => {
    try {
        let book = await new Book(req.body);
        // console.log("bookpost", book);
        // book.save();
        Book.create(book);
        res.status(200).send(book);
    } catch (err: any) {
        res.status(400).send("ERROR", err.message)
    }
}




export const getBookById =async (req: any, res: any) => {
try{
    const id = req.params.id;
    //Book.findById('60768abb5d8c4f437c22a18b')
    let book=await Book.findById(id)
    res.status(200).send(book);
}
catch (err: any) {
    res.status(400).send("Question Not Found");
}
}
 


export const deleteBook =async (req: any, res: any) => {
    try{
       const id = req.params.id;
      let deletebook= await Book.deleteOne({ _id: id })
      res.status(200).send({message:"book was deleted"});
    }
    catch (err: any) {
        res.status(400).send("Question Not Found");
    }
    }



    // searchBYAuthor
    export const searchByAuthor =async (req: any, res: any) => {
      // console.log("request",req)
            try {
              let author = new RegExp(req.params.author, "i");
              // console.log("searched author",author)
              let books = await Book.find({ author: author });
              // console.log("searched books",books)
              // console.log(books);
              res.send(books);
            } catch (e) {
              console.log(e);
            }
          };




            // searchByTitle
          export const searchByTitle =async (req: any, res: any) => {
            console.log("harry")
              try {
                const title = new RegExp(req.params.title, "i");
                let books = await Book.find({ title });
                // console.log(books);
                res.send(books);
              } catch (e) {
                console.log(e);
              }
            };
                


            // searchByRating
            export const searchByRating =async (req: any, res: any) => {
                try {
                  let books = await Book.find({ rating: { $gte: req.params.rating } });
                  // console.log(JSON.stringify(books));
                  res.send(books);
                } catch (e) {
                  console.log(e);
                }
              };



    // searchBYprice
    
    export const searchByPrice =async (req: any, res: any) => {
        try {
          // console.log(req.params.min);
          let books = await Book.find({
            $and: [
              { cost: { $gte: req.params.min } },
      
              { cost: { $lte: req.params.max } },
            ],
          });
          // console.log(JSON.stringify(books));
          res.send(books);
        }
         catch (e) {
          console.log(e);
        }
      };
      

    
    
     
 
      
  export const getAllAuthors  = async (req: any, res: any) => {
    console.log("getallauthorslevel")
        try{
        
          let books = await Book.distinct('author');  
          res.status(200).send(books)
          console.log("my authors list",books)
        }
        catch(err:any)
        {
          res.send(400).send("something went wrong")
          console.log(err,"error")
        }     
  }

         
           
      