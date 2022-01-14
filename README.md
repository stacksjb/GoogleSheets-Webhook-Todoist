# GoogleSheets-Webhook-Todoist
A Google Sheets script I created to import Todoist completed tasks via a Webhook (https://developer.todoist.com/sync/v8/#webhooks)  to a Google Sheet

This is specifically customized for task:completed so I can do some google data studio dashboard work against my completed tasks, so it doesn't include variables I dont' care about. 

h/t:
Thanks for inspiration from these useful links, including:
https://blog.runscope.com/posts/tutorial-capturing-webhooks-with-google-sheets and https://github.com/samaybar/googlewebhookreceiver/blob/master/Code.gs


# Troubleshooting / Q&A / Helpful notes

Q: Why we call all the variables up top - couldn't you just set the sheet value to the JSON value (i.e. data.event_data) directly?
A: You're right, calling it directly would work - normally. However, not all values come across in all responses (for example, due_date isn't always set). Calling the values directly from the JSON will cause the script to fail if the values aren't present, but by setting the variables (and then calling those), you simply get a blank (null) value for the variable, instead of erroring out because the value isn't defined.

Q: How do I configure Todoist to send the webhooks?

A: Configure a service at https://developer.todoist.com/appconsole.html . Add the Google Scripts URL to the webhook URL and submit.

Q: I'm completing tasks but they aren't showing up instantly in the Google Sheet

A: Be slow and methodical in testing - if you complete too many too quickly (or if the sheets API gets hit with more than one at once) it will choke.

Q: How can I see the full values being received?

A: Simply setValue of the cell to the full PostData Contents (var data in this script)
