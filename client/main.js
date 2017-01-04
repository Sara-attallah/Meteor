import { Template } from 'meteor/templating';

import './tpl/mafia.html';

import {mafiaCollection} from '../lib/mafia.js';


Template.mafioso.events
(
    {
        "click #addname": function (event, template) {
            const traitorname = template.find("#traitorname").value;
            if (traitorname !== "") {
                mafiaCollection.insert({victime: traitorname, createdAt:new Date(), killedBy : ""})
            }
        },
        "click #gun": function (){
            mafiaCollection.update(this._id, { $set :{ killedBy : "gun" } })
        },
        "click #natural": function (){
            mafiaCollection.update(this._id, { $set : { killedBy : "nat" } })
        },
        'change #fileupload': function(ev) {
           /* _.each(ev.currentTarget.files, function(file) {
                Meteor.saveFile(file, file.name);
            });*/
        }
    }
);


Template.mafioso.helpers
(
    {
        touslesmorts : function()
        {
            return mafiaCollection.find({}, { sort: { createdAt: -1 } });
        },
        killedByNobody : function()
        {
            return mafiaCollection.findOne( { _id : this._id, killedBy : "" } );
        },
        killedByGun : function()
        {
            return mafiaCollection.findOne( { _id : this._id, killedBy : "gun" } );
        },
        killedByHand : function()
        {
            return mafiaCollection.findOne( { _id : this._id, killedBy : "hand" } );
        }
    }
)

