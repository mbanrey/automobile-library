const mongooseBaseName = 'automobile-library'


// if this is a dev env the db name will be dev
// if this is a test env the db name will be test

const database = {
    development:`mongodb://localhost/${mongooseBaseName}-development`,
    test:`mongodb://localhost/${mongooseBaseName}-test`
}


const localDb = process.env.TESTENV ? database.test : database.development

const currentDb = process.env.DB_URI || localDb


module.exports = currentDb