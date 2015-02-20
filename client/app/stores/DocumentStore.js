'use strict';

var $ = require('jquery');
var EventEmitter = require("events").EventEmitter;
var DocumentConstants = require("../constants/DocumentConstants.js");
var AppDispatcher = require("../dispatcher/AppDispatcher.js");
var objectAssign = require("object-assign");

var CHANGE_EVENT = "CHANGE";
var DocumentStore = objectAssign({} , EventEmitter.prototype, {
  _docs: {},
  _sections: [],

  getAllDocs: function () {
    return this._sections;
  },

  getSingleDoc: function (section, doc) {
    if (doc) {
      return this._docs[section][doc];
    }
    else {
      return this._docs[section];
    }
  },

   getAll: function () {
     //Request all doc section names
    $.ajax({
      url: 'https://api.github.com/repos/TuxedoJS/TuxedoJS/contents/docs/ApiMenu.json?client_id=' + process.env.GITHUB_CLIENT_ID + 'client_secret=' + process.env.GITHUB_SECRET_ID,
      withCredentials: false,
      success: function (body) {
        var input = body.content.replace(/\s/g, '');
        this._sections = JSON.parse(window.atob(input)).data;
        this.emitChange();
      }.bind(this)
    });
   },

  getDoc: function (section, doc) {
    if (doc) {
      doc = '/'+doc;
    } else {
      doc = '';
    }

    if (section === 'README') {
      $.ajax({
        url: 'https://api.github.com/repos/TuxedoJS/TuxedoJS/contents/' + section +'.md?client_id=' + process.env.GITHUB_CLIENT_ID + 'client_secret=' + process.env.GITHUB_SECRET_ID,
        withCredentials: false,
        success: function (body) {
          //Return content of the selected do
          var input = body.content.replace(/\s/g, '');
          this._docs[section] = window.atob(input);
          this.emitChange();
        }.bind(this)
      });
    } else {
      $.ajax({
        url: 'https://api.github.com/repos/TuxedoJS/TuxedoJS/contents/docs/' + section + doc +'.md?client_id=' + process.env.GITHUB_CLIENT_ID + 'client_secret=' + process.env.GITHUB_SECRET_ID,
        withCredentials: false,
        success: function (body) {
          //Return content of the selected doc
          if (doc) {
            var input = body.content.replace(/\s/g, '');
            this._docs[section][doc] = window.atob(input);
          } else {
            var input = body.content.replace(/\s/g, '');
            var content = window.atob(input);
            if (body.name === 'TuxxAnimations.md') {
              content = content.replace(/\!\[Easings\]\(http\:\/\/\i\.imgur\.com\/2XAGQgq\.png \"Easings\"\)/, '<img src="http://i.imgur.com/2XAGQgq.png" class="easings" alt="TuxedoJS easing diagrams" />');
            }

            this._docs[section] = content;
          }
          this.emitChange();
        }.bind(this)
      });
    }
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function (payload) {
  var action = payload.action;
  var body = action.body;

  switch (action.actionType) {
    case DocumentConstants.DOCUMENT_GET:
      DocumentStore.getAll();
      break;
    case DocumentConstants.DOCUMENT_GET_DOC:
      DocumentStore.getDoc(body.section, body.doc);
      break;
    default:
      return true;
  }
});

module.exports = DocumentStore;
