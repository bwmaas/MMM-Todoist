# Installation

## Setting up the module
1. Navigate into your MagicMirror's `modules` folder.
2. Clone the git repo:
```shell
git clone https://github.com/bwmaas/MMM-Todoist.git
```
3. Move into the new directory:
```shell
cd MMM-Todoist
```
4. Install the node dependencies:
```shell
npm install
```
5. *RECOMMENDED* Create a file named `token.txt` containing your [Todoist API access token](#access-token):
```shell
echo 'YOUR_ACCESS_TOKEN' > token.txt
```
6. Add the module to the `modules` array in the `config/config.js` for your MagicMirror². For example:
```javascript
modules: [
  // ...
	{
		module: 'MMM-Todoist',
		position: 'top_right',	// This can be any of the regions. Best results in left or right regions.
		header: 'Todoist', // This is optional
		config: { // See 'Configuration options' for more information.
			hideWhenEmpty: false,
			maximumEntries: 60,
			updateInterval: 10 * 60 * 1000, // Update every 10 minutes
			fade: false,
			// projects and/or labels is mandatory:
			projects: [ 166564794 ],
			labels: [ "MagicMirror", "Important" ] // Tasks for any projects with these labels will be shown.
      }
	}
]
```

## Obtaining Todoist API info
### Access token
When connecting to the Todoist, the module must pass an "access token" to the API. The access token serves as both credentials and as a way to link to your account.

There are several types of access tokens, but most users will only require what Todoist is currently (July 2024) calling an "API Token". To obtain your
API token, log in to your Todoist account and navigate to the "Developer" section of the "integrations" setting panel. You should be able to link directly to
the settings panel using this link:

[https://app.todoist.com/app/settings/integrations/developer](https://app.todoist.com/app/settings/integrations/developer)

The recommended way to save your token is to create a file named `token.txt` in your `MMM-Todoist` folder. If you want to change the name of the file you
can override it using the `tokenFile` config option.

### Project IDs
1. Go to Todoist (Log in if you aren't)
2. Click on a Project in the left menu
3. Your browser URL will change to something like: `https://todoist.com/app?lang=en&v=818#project%2F166564897`
   Everything after %2F is the Project ID. In this case, `166564897`.

Alternatively, if you add `debug=true` in your config.js the Projects and ProjectsIDs will be displayed on MagicMirror as well as in the Browser console.
