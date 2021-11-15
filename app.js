const yargs = require('yargs');
const {addNotes, removeNote, listNotes, readNote} = require('./notes')

yargs.version('1.1.0');

//add a note
yargs.command({
    command : "add",
    describe : "Add a new Note",
    builder : {
        title : {
            describe : 'Note title',
            demandOption : true,
            type : 'string'
        },
        description : {
            describe : 'Note description',
            demandOption : true,
            type : 'string'            
        }
    },
    handler : function(argv){
        addNotes(argv.title,argv.description);
    }
})

//remove a note
yargs.command({
    command : "remove",
    describe : "Remove a Note",
    builder : {
        title : {
            describe : 'remove a note',
            demandOption : true,
            type : 'string',
        }
    },
    handler : (args)=>{
        removeNote(args.title);
    }
})

//list notes
yargs.command({
    command : "list",
    describe : "List all Notes",
    handler : ()=>{
        listNotes();
    }
})

//read a note
yargs.command({
    command : "read",
    describe : "Read a Note",
    builder : {
        title : {
            describe : 'note title',
            demandOption : true,
            type : 'string'
        }
    },
    handler : (args)=>{
        readNote(args.title);
    }
})

yargs.parse()
