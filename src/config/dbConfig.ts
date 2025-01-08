type Database = {
  host : string,
  user : string,
  password : string,
  db : string,
  dialect : 'mysql',
  pool : 
  {
    max : number,
    min : number,
    idle : number,
    acquire : number
  }
}

const dbConfig:Database = {
  host : 'localhost',
  user : 'root',
  password : '',
  db : 'VMS-database',
  dialect: 'mysql',
  pool :
  {
    max : 5,
    min : 0,
    idle : 10000,
    acquire : 10000
  }
}

export default dbConfig;