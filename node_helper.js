"use strict";

/* Magic Mirror
 * Module: MMM-Todoist
 *
 * By Chris Brooker
 *
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const fs = require("node:fs");
const path = require("node:path");
const request = require("request");
const showdown = require("showdown");

const markdown = new showdown.Converter();

module.exports = NodeHelper.create({
	start: function() {
		console.log("Starting node helper for: " + this.name);
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === "INIT") {
			console.debug("Initializing node helper for: MMM-Todoist");
			this.config = payload;

			// If accessToken is not set, load it from tokenFile
			if (this.config.accessToken === undefined) {
				const tokenPath = path.resolve(__dirname, this.config.tokenFile);
				this.config.accessToken = fs.readFileSync(tokenPath, { encoding: "utf8" }).trim();
			}

			// Send the config back to client process
			this.sendSocketNotification("POST_INIT", this.config);
		} else if (notification === "FETCH_TODOIST") {
			this.config = payload;
			this.fetchTodos();
		}
	},

	fetchTodos : function() {
		var self = this;

		request({
			url: self.config.apiBase + "/" + self.config.apiVersion + "/" + self.config.todoistEndpoint + "/",
			method: "POST",
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"cache-control": "no-cache",
				"Authorization": "Bearer " + self.config.accessToken
			},
			form: {
				sync_token: "*",
				resource_types: self.config.todoistResourceType
			}
		},
		function(error, response, body) {
			if (error) {
				self.sendSocketNotification("FETCH_ERROR", {
					error: error
				});
				return console.error(" ERROR - MMM-Todoist: " + error);
			}
			if (response.statusCode === 200) {
				var taskJson = JSON.parse(body);
				taskJson.items.forEach((item)=>{
					item.contentHtml = markdown.makeHtml(item.content);
				});

				taskJson.accessToken = self.config.accessToken;
				self.sendSocketNotification("TASKS", taskJson);
			}
			else{
				console.warn("Todoist API request status=" + response.statusCode);
			}
		});
	}
});
