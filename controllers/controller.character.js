require('mongoose');
const Pj = require('../models/model.character');

const addCharacter = async (user_id, upper, lower, shoes) => {
    const pj = new Pj(
        {   
            user_id: user_id,
            upper: upper,
            lower: lower,
            shoes:shoes,
        }
    );
    let character = await pj.save(); 
    console.log("Personaje nuevo");
    console.log(character);
    return { character }; 
}   

const getUserCharacters = async(charactersByUser) => {
    const character = await Pj.find({ "user_id": charactersByUser});
    return character;
}

const getAllCharacters = async (limit) => {
    const charact = await Pj.find({}).sort({ "updatedAt": -1 }).limit(limit);
    return charact;
}

const editCharacter = async(character) => {
    const result = await Pj.findByIdAndUpdate(character._id,character,{new:true});
    return result;
}

const deleteCharacter = async(id) => {
    const result = await Pj.findByIdAndDelete(id);
    return result;
}

module.exports = { addCharacter, getUserCharacters, getAllCharacters, editCharacter, deleteCharacter }