import Exchange from '../models/ExchangeScema.js'
import Currency from '../models/CurrencySchema.js'
import mongoose from 'mongoose'

export const createExchange = async (req,res) =>{
    const {from,to,ratio} = req.body
    const errors = {from:"",to:"",ratio:""}
    // check form values
    if(!from){
        errors.from = "From is required!"
    }
    if(!to){
        errors.to = "To is required!"
    }
    if(!ratio){
        errors.ratio = "Ratio is required!"
    }else if(ratio <= 0){
        errors.ratio = "Ratio can't have negative value or 0"
    }
    if(errors.from || errors.to || errors.ratio) return res.status(400).send(errors)
    try {
        // retrive currencies from db
        const fromCurrency = await Currency.findOne({currency:from})
        const toCurrency = await Currency.findOne({currency:to})

        // check values 
        if(!fromCurrency || !toCurrency) return res.status(404).send({message:"Currency not found"})
        if(fromCurrency.id === toCurrency.id) return res.status(406).send({message:"Currencies can't be same"})

        const name = fromCurrency.currency.toLowerCase()+"to"+toCurrency.currency.toLowerCase()

        const exchange = new Exchange({name,from,to,ratio})
        await exchange.save()
        res.status(201).send({message:"Exchange created Successfuly"})
    } catch (error) {

        // check duplicates
        if(error.code) return res.status(409).send({message:"This conversion exists can't duplicate value"})

        res.status(409).send({message:error.message})
    }
}

export const updateExchange = async (req,res) =>{
    const {id} = req.params
    const updated = req.body
    const errors = {ratio:""}
    if(updated.ratio <= 0){
        errors.ratio = "Ratio can't have negative value or 0"
        return res.status(400).send(errors)
    }
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({message:`Invalid ID: ${id}`})
        // check if exists
        const exists = await Exchange.findById(id)
        if(!exists) return res.status(404).send({message:"Conversion doesn't exist"})
        // update
        await Exchange.findByIdAndUpdate(id,updated)
        const {_id,name,from,to,ratio} = await Exchange.findById(id)
        res.status(200).send({message:`${name} Updated Successfully`,updated:{_id,name,from,to,ratio}})

    } catch (error) {
        res.status(409).send({message:error.message})
    }
}

export const deleteExchange = async (req,res) =>{
    const {id} = req.params
    try {
        const exists = await Exchange.findById(id)
        if(!exists) return res.status(404).send({message:"Conversion doesn't exist"})
        await Exchange.findByIdAndDelete(id)
        res.status(200).send({message:`${exists.name} Deleted Successfully`})
        
    } catch (error) {
        res.status(409).send({message:error.message})
    }
}

export const findExchange = async (req,res) =>{
    let {query} = req.params
    try {
        query = new RegExp(query, "i");
        const exchanges = await Exchange.aggregate().match({ $or: [ { name:query }, { from:  query},{to:query} ]}).project({id:1,name:1,from:1,to:1,ratio:1}).sort({name:1})
        res.status(200).send(exchanges)
    } catch (error) {
        res.status(404).send({message:error.message})
    }
}

export const getAllExchanges = async (req,res) =>{
    try {
        const exchanges = await Exchange.aggregate().project({id:1,name:1,from:1,to:1,ratio:1}).sort({name:1})
        res.status(200).send(exchanges)
    } catch (error) {
        res.status(404).send({message:error.message})
    }
}

// get specific conversion
export const getExchange = async (req,res) =>{
    const {id} = req.params
    try {
        const {_id,name,from,to,ratio} = await Exchange.findById(id)
        res.status(200).send({_id,name,from,to,ratio})
    } catch (error) {
        res.status(404).send({message:error.message})
    }
}


export const calculateConversion = async (req,res) => {
    const {from,to,ammount} = req.query
    if(ammount<0) return res.status(400).send({message:"Ammount can't have negative value or 0"})
    try {
        
        const fromCurrency = await Currency.findOne({currency:from})
        const toCurrency = await Currency.findOne({currency:to})
        if(fromCurrency.currency === toCurrency.currency) return res.status(400).send({message:"Can't convert same currency"})
        if(!fromCurrency || !toCurrency) return res.status(404).send({message:"Currency not found"})
        const name = fromCurrency.currency.toLowerCase()+"to"+toCurrency.currency.toLowerCase()
        const exists = await Exchange.findOne({name:name})
        if(!exists) return res.status(404).send({message:"Conversion not found"})

        const total = (exists.ratio * ammount).toFixed(6)

        res.status(200).send({total:total,fromSymbol:fromCurrency.symbol,ratio:exists.ratio})

    } catch (error) {
        res.status(404).send({message:error.message})
    }
}