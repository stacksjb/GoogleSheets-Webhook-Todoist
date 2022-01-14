
//this is a function that fires when the webapp receives a GET request
function doGet(e) {
  return HtmlService.createHtmlOutput("request received");
}

//this is a function that fires when the webapp receives a POST request
function doPost(e) {
//  var params = JSON.stringify(e.postData.parameters);
  var data = JSON.parse(e.postData.contents);
  var event_data = data.event_data
  var event_name = data.event_name
  var task_id = event_data.id
  var user_id = event_data.user_id
  var project_id = event_data.project_id
  var content = event_data.content
  var description = event_data.description
  var priority = event_data.priority
  var date_added = event_data.date_added
  var due = event_data.due
  var is_recurring = due.is_recurring
  var due_string = due.string
  var due_date = due.date
  var url = event_data.url
  var initiator = data.initiator
  var initiator_name = initiator.full_name
  var initiator_email = initiator.email
  var initiator_id = initiator.id
 
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = Math.max(sheet.getLastRow(),1);
  sheet.insertRowAfter(lastRow);
  var timestamp = new Date();
  sheet.getRange(lastRow + 1, 1).setValue(timestamp);
  sheet.getRange(lastRow + 1, 2).setValue(event_name);
  sheet.getRange(lastRow + 1, 3).setValue(task_id);
  sheet.getRange(lastRow + 1, 4).setValue(project_id);
  sheet.getRange(lastRow + 1, 5).setValue(user_id);
  sheet.getRange(lastRow + 1, 6).setValue(priority);
  sheet.getRange(lastRow + 1, 7).setValue(content);
  sheet.getRange(lastRow + 1, 8).setValue(description);
  sheet.getRange(lastRow + 1, 9).setValue(date_added);
  sheet.getRange(lastRow + 1, 10).setValue(is_recurring);
  sheet.getRange(lastRow + 1, 11).setValue(due_string);
  sheet.getRange(lastRow + 1, 12).setValue(due_date);
  sheet.getRange(lastRow + 1, 13).setValue(initiator_name);
  sheet.getRange(lastRow + 1, 14).setValue(initiator_email);
  sheet.getRange(lastRow + 1, 15).setValue(initiator_id);
  sheet.getRange(lastRow + 1, 16).setValue(url);

  SpreadsheetApp.flush();
  return HtmlService.createHtmlOutput("post request received");

}
