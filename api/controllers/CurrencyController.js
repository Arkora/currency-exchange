import Currency from '../models/CurrencySchema.js'
import mongoose from 'mongoose'

/** POST / create currency */
export const createCurrency = async (req,res) =>{
    const {name,currency,symbol} = req.body
    const errors = {name:'',currency:'',symbol:''}   
    // Check for empty values on request
    if(!name){
        errors.name = 'Name is required'
    }
    if(!currency){
        errors.currency = 'Currency is required'
    }
    if(!symbol){
        errors.symbol = 'Symbol is required'
    }

    if(errors.name || errors.currency || errors.symbol)return res.status(400).send(errors)


    try {    
        
        
        const fiatCurrency = new Currency({name,currency,symbol})
        await fiatCurrency.save()

        res.status(201).send({message:"Currency Created Successfull"})
        
    } catch (error) {
        if(error.code) return res.status(409).send({message:"This currency exists can't duplicate value"})
        res.status(400).send({message:error.message}) 
    }
}

/** GET/ return currencies of db */
export const getAllCurrencies = async (req,res) =>{
    try {
        const currencies = await Currency.aggregate().project({id:1,name:1,currency:1,symbol:1}).sort({name:1})        
        res.status(200).send(currencies)
    } catch (error) {
        res.status(409).send({message:error.message})
    }
}

/**GET :query/ return currencies filtered by :query value  */ 
export const findCurrency = async (req,res) =>{
    let {query} = req.params
    try {
        query = new RegExp(query, "i");
        const currencies = await Currency.aggregate().match({ $or: [ { name:query }, { currency:  query},{symbol:query} ]}).project({id:1,name:1,currency:1,symbol:1}).sort({name:1})
        res.status(200).send(currencies)
    } catch (error) {
        res.status(404).send({message:error.message})
    }
}

/** GET :id/ return currency by :id */
export const getCurrency = async (req,res) =>{
    const {id} = req.params
    try {   
        const {_id,name,currency,symbol} = await Currency.findById(id)
        res.status(200).send({_id,name,currency,symbol})
    } catch (error) {
        res.status(404).send({message:error.message})
    }
}

/** PATCH :id/ return updated currency specified by :id */
export const updateCurrency = async (req,res) =>{
    const {id} = req.params
    const updated = req.body
    const errors = {name:'',currency:'',symbol:''}   
    // Check for empty values on request
    if(!updated.name){
        errors.name = 'Name is required'
    }
    if(!updated.currency){
        errors.currency = 'Currency is required'
    }
    if(!updated.symbol){
        errors.symbol = 'Symbol is required'
    }

    if(errors.name || errors.currency || errors.symbol)return res.status(400).send(errors)

    try {
        // validate :id
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({message:`Invalid ID: ${id}`})
        
        await Currency.findByIdAndUpdate(id,updated) 
        const {_id,name,currency,symbol} = Currency.findById(id)
        res.status(200).send({message:`${updated.name} Updated Successfully`,updated:{_id,name,currency,symbol}})
    } catch (error) {
        res.status(404).send({message:error.message})
    }
}
/** DELETE :id / delete currency by :id */
export const deleteCurrency = async (req,res) =>{
    const {id} = req.params

    try {
        // validate :id
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({message:`Invalid ID: ${id}`})

        // check if currnecy exists
        const exist = await Currency.findById(id)
        if(!exist) return res.status(404).send({message:`Currency dosen't exists`})

        await Currency.findByIdAndDelete(id)        
        res.status(200).send({message:`Deleted Successfully`})
    } catch (error) {
        res.status(404).send({message:error.message})
    }
}