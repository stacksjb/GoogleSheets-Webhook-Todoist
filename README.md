# GoogleSheets-Webhook-Todoist
A Google Sheets script I created to import Todoist completed tasks via a Webhook (https://developer.todoist.com/sync/v9#webhooks)  to a Google Sheet

This is specifically customized for task:completed so I can do some google data studio dashboard work against my completed tasks, so it doesn't include variables I dont' care about. Feel free to modify as needed.

h/t:
Thanks for inspiration from these useful links, including:
https://blog.runscope.com/posts/tutorial-capturing-webhooks-with-google-sheets and https://github.com/samaybar/


# Troubleshooting / Q&A / Helpful notes

Q: Why we call all the variables up top - couldn't you just set the sheet value to the JSON value (i.e. data.event_data) directly?  
A: You're right, calling it directly would work. That was done for convenience.

Q: How do I configure Todoist to send the webhooks?  
A: Configure a service at https://developer.todoist.com/appconsole.html . Add the Google Scripts URL to the webhook URL, select which actions, and submit.

Q: I'm completing tasks but they aren't showing up instantly in the Google Sheet.  
A: Be slow and methodical in testing - if you complete too many too quickly (or if the sheets API gets hit with more than one at once) it will choke.

Q: How can I see the full values being received?  
A: Simply setValue of the cell to the full PostData Contents (var data in this script). This is very helpful for troubleshooting.

Q: I made some changes and a value but it isn't showing up in my sheet.  
A: Did you remember to change the cell ID (increase by 1)?  
A: Did you remember to re-deploy your Google Script?  
A: Did you deploy it to the same URL or a new one?  

Q: How do I handle timestamps?
A: Unfortunately, timestamps come through in ISO8601/RFC3339 format with date/time/millisecond/Z, and are no longer recognized by Google Sheets or Data Studio as Date/Time fields (which can make comparisons tough). There are a few methods you can use to parse them. The easiest is to set your timesheet to UTC time (Under File -> Settings) and then simply remove the Z with ' date_added_parsed = date_added.slice(0, -1); ' . Another option is to use the Moment.JS Library to format an output. Both examples are in the code, you only need one.
