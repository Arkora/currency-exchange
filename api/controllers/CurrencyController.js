import Currency from '../models/CurrencySchema.js'
import mongoose from 'mongoose'
export const createCurrency = async (req,res) =>{
    const {name,currency,symbol} = req.body
    const errors = {name:'',currency:'',symbol:''}   
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
        res.status(409).send({message:error.message}) 
    }
}

export const getAllCurrencies = async (req,res) =>{
    try {
        const currencies = await Currency.aggregate().project({id:1,name:1,currency:1,symbol:1})        
        res.status(200).send(currencies)
    } catch (error) {
        res.status(409).send({message:error.message})
    }
}

export const findCurrency = async (req,res) =>{
    let {query} = req.params
    try {
        query = new RegExp(query, "i");
        const currencies = await Currency.aggregate().match({ $or: [ { query }, { currency:  query},{symbol:query} ]}).project({id:1,name:1,currency:1,symbol:1})
        res.status(200).send(currencies)
    } catch (error) {
        res.status(404).send({message:error.message})
    }
}

export const getCurrency = async (req,res) =>{
    const {id} = req.params
    try {   
        const currency = await Currency.findById(id)
        res.status(200).send({_id:currency._id,name:currency.name,currency:currency.currency,symbol:currency.symbol})
    } catch (error) {
        res.status(404).send({message:error.message})
    }
}

export const updateCurrency = async (req,res) =>{
    const {id} = req.params
    const updatedCurrency = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({message:`Invalid ID: ${id}`})
    try {
        await Currency.findByIdAndUpdate(id,updatedCurrency)        
        res.status(200).send({message:`${updatedCurrency.name} Updated Successfully`})
    } catch (error) {
        res.status(404).send({message:error.message})
    }
}

export const deleteCurrency = async (req,res) =>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({message:`Invalid ID: ${id}`})
    try {
        const exist = await Currency.findById(id)
        if(!exist) return res.status(404).send({message:`Currency dosen't exists`})
        await Currency.findByIdAndDelete(id)        
        res.status(200).send({message:`Deleted Successfully`})
    } catch (error) {
        res.status(404).send({message:error.message})
    }
}