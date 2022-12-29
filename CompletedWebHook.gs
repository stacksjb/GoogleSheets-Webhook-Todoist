//this is a function that fires when the webapp receives a GET request
function doGet(e) {
  return HtmlService.createHtmlOutput("request received");
}

//this is a function that fires when the webapp receives a POST request
function doPost(e) {
//  var params = JSON.stringify(e.postData.parameters);
  var m = "1"
  var date_added_parsed = "2"
  var is_recurring = "FALSE"
  var data = JSON.parse(e.postData.contents)
  var event_data = data.event_data
  var completed_at = event_data.completed_at
  var date_added = event_data.added_at
  var event_name = data.event_name
  var url = event_data.url
  var task_id = event_data.id
  var user_id = event_data.user_id
  var project_id = event_data.project_id
  var content = event_data.content
  var description = event_data.description
  var priority = event_data.priority
  var url = event_data.url
  var initiator = data.initiator
  var initiator_name = initiator.full_name
  var initiator_email = initiator.email
  var initiator_id = initiator.id
  var labels = JSON.stringify(event_data.labels)
  var sheet = SpreadsheetApp.getActiveSheet()
  var lastRow = Math.max(sheet.getLastRow(),1)
  sheet.insertRowAfter(lastRow)
  var timestamp = new Date()
  
  try {
    date_added_parsed = date_added.slice(0, -1); //A method to remove the trailing Z
    m = Moment.moment(date_added).format('MM/d/YY, h:mm:ss a') //A method if you want to use MomentJS
    var due = event_data.due
    if (due) {
    is_recurring = due.is_recurring
    var due_string = due.string
    var due_date = due.date
    var due_datetime = due.datetime
    sheet.getRange(lastRow + 1, 13).setValue(due_date)
    sheet.getRange(lastRow + 1, 14).setValue(due_datetime)
    sheet.getRange(lastRow + 1, 15).setValue(due_string)
     }
    if (is_recurring != "FALSE")
      completed_at = timestamp //Hack for recurring tasks that come through without completed_at timestamp to replace with webhook timestamp
    }

    
  finally{
    sheet.getRange(lastRow + 1, 1).setValue(timestamp)
    sheet.getRange(lastRow + 1, 2).setValue(event_name)
    sheet.getRange(lastRow + 1, 3).setValue(completed_at)
    sheet.getRange(lastRow + 1, 4).setValue(task_id)
    sheet.getRange(lastRow + 1, 5).setValue(url)
    sheet.getRange(lastRow + 1, 6).setValue(project_id)
    sheet.getRange(lastRow + 1, 7).setValue(user_id)
    sheet.getRange(lastRow + 1, 8).setValue(priority)
    sheet.getRange(lastRow + 1, 9).setValue(content)
    sheet.getRange(lastRow + 1, 10).setValue(description)
    sheet.getRange(lastRow + 1, 11).setValue(date_added_parsed)
    sheet.getRange(lastRow + 1, 12).setValue(is_recurring)
    sheet.getRange(lastRow + 1, 16).setValue(initiator_name)
    sheet.getRange(lastRow + 1, 17).setValue(initiator_email)
    sheet.getRange(lastRow + 1, 18).setValue(initiator_id)
    sheet.getRange(lastRow + 1, 19).setValue(labels)
   // sheet.getRange(lastRow + 1, 20).setValue(data) //Test line to dump full JSON blob for troubleshooting or tuning
    sheet.getRange(lastRow + 1, 21).setValue(date_added)
    sheet.getRange(lastRow + 1, 22).setValue(date_added_parsed)
    sheet.getRange(lastRow + 1, 23).setValue(m)
    Logger.log("Webhook Received")
    SpreadsheetApp.flush()
    return HtmlService.createHtmlOutput("post request received")
    }
