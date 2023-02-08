import app from "../index.js"
import supertest from 'supertest'





  test('GET all currencies ', async () => {
    const result = [{"_id":"63de75d6cbe9d40465f08b94","name":"Dollar","currency":"USD","symbol":"$"},{"_id":"63de88a4c46d053b502c9335","name":"Dollar Canada","currency":"CAD","symbol":"$"},{"_id":"63de73ab37cb46c37283ce59","name":"Euro","currency":"EUR","symbol":"€"},{"_id":"63de95cafaf1372f4cc74255","name":"Japanese Yen","currency":"YEN","symbol":"¥"}]
  const response =   await supertest(app).get("/api/v1/currency/")
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual(result)

    
  })
  
  

  test('GET currency by id ', async () => {
    const result = {"_id":"63de75d6cbe9d40465f08b94","name":"Dollar","currency":"USD","symbol":"$"}
  const response =   await supertest(app).get("/api/v1/currency/63de75d6cbe9d40465f08b94")
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual(result)

    
  })

  test('it should return not found ', async () => {
  const response =   await supertest(app).get("/api/v1/currency/63de75d6cbe9d40465f08b97")
    expect(response.status).toBe(404)    
  })

  test('it should return unauthorized error ', async () => {
  const response =  await supertest(app).post("/api/v1/currency/create").send({name:'Dollar',currency:'USD',symbol:'$'})
    expect(response.status).toBe(403)
  })
 
  test('it should return unauthorized error ', async () => {
  const response =  await supertest(app).post("/api/v1/exchange/create")
    expect(response.status).toBe(403)
  })