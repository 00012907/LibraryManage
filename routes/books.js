let fs = require('fs')

let express = require('express')
let router = express.Router()
let uniqid = require('uniqid')
const { join } = require('path');
const { title } = require('process');
const { body, validationResult } = require('express-validator');



router.get('/', (req, res) => {
    res.render('books', { books: getAll('books')})
})

router.route('/create')
    .get((req, res) => {
        res.render('create-book', { modules: getAll('modules')})
    })
    .post(
        //validation
        body('title')
            .not().trim().isEmpty()
            .withMessage('Book title should not be empty'),
        body('author')
            .not().trim().isEmpty()
            .withMessage('Author should not be empty'),
        body('year').custom((value,{req})=>{
            if(value>2023){
                throw new Error('Year should be less than 2023');
            }else if(value==''||value==0){
                throw new Error ('Year can not be blank')
            }
            else{
                return true;
            }
        }),
          (req,res)=>{
            console.log(req.body);
            let errors=validationResult(req)
            if(!errors.isEmpty()){
                return res.json({status:400,errors:errors.array()})
            }
            let books = getAll('books')
            
                    books.push({
                            id: uniqid(),
                            title: req.body.title,
                            author:req.body.author,
                            year: req.body.year,
                            module: req.body.module
                        })
                        saveAll('books', books)
                        res.json({status: 200})
                    
                        //res.redirect('/books')
            
          }
          )

  


router.delete('/delete', (req, res) => {
    
    let books = getAll('books')

    let filteredBooks = books.filter(book => book.id != req.body.id)

    saveAll('books', filteredBooks)

    res.json({ deleted: true })
})

router.route('/update/:id')
    .get((req, res) => {
        let id = req.params.id
        let book = getAll('books').find(book => book.id == id)
        res.render('create-book', { book: book, modules: getAll('modules') })
    })
    .put((req, res) => {
        let id = req.params.id

        let books = getAll('books')

        let book = books.find(book => book.id == id)

        let idx = books.indexOf(book)
       
        books[idx].title = req.body.data.title
        books[idx].author = req.body.data.author
        books[idx].year = req.body.data.year
        books[idx].module = req.body.data.module

        saveAll('books', books)

        res.json({ updated: true })
        res.redirect('/books')


        })

 



module.exports = router



function  getAll(collection) {
    return JSON.parse(fs.readFileSync(`./data/${collection}.json`))
}

function saveAll(collection, data) {
    fs.writeFileSync(`./data/${collection}.json`, JSON.stringify(data))
}

