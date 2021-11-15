const fs = require('fs');

//list all notes
exports.listNotes = function(){
    const notes = loadNotes();
    console.log("Your Notes:");

    notes.forEach( (note,index) =>{
        console.log(index+1+'.',note.title);
    });
}

//read a note
exports.readNote = function(title){
    const notes = loadNotes();
    const note = notes.find( note => {
        return note.title === title;
    })
    if(note){
        console.log('Title:',note.title);
        console.log('Description:',note.description);
    }else{
        console.log('Title not found!');
    }
}

//add notes
exports.addNotes= function(title,description){
    const notes = loadNotes();

    const duplicates = notes.filter(function(note){
        return note.title === title;
    })

    if( duplicates.length !== 0){
        console.log("Title already taken!");
        return;
    }

    notes.push({
        title,
        description,
    })
    saveNotes(notes);
    console.log("New note added!");
    
}

//remove notes
exports.removeNote = function(title){
    const notes = loadNotes();

    const newNotes = notes.filter(function(note){
        return note.title !== title;
    })
    if(notes.length === newNotes.length){
        return console.log('No match title!');
    }
    saveNotes(newNotes);
    console.log('Note removed!')
}

const saveNotes = function(notes){

    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json",dataJSON);

}


const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);

    }catch(e){
        return [];
    }
}