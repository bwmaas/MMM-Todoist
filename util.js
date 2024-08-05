"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listProjects = listProjects;
var _TodoistApiFactory = require("./class/TodoistApiFactory");
const apiFactory = new _TodoistApiFactory.TodoistApiFactory();
function listProjects() {
  apiFactory.api().getProjects().then(projects => projects.forEach(project => {
    console.info(`${project.id}: ${project.name}`);
  })).catch(error => console.error(error));
}