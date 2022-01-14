
//this is a function that fires when the webapp receives a GET request
function doGet(e) {
  return HtmlService.createHtmlOutput("request received");
}

//this is a function that fires when the webapp receives a POST request
function doPost(e) {
//  var params = JSON.stringify(e.postData.parameters);
  var data = JSON.parse(e.postData.contents);
  var event_data = data.event_data
  var task_id = event_data.id
  var user_id = event_data.user_id
  var project_id = event_data.project_id
  var content = event_data.content
  var description = event_data.description
  var priority = event_data.priority
  var date_added = event_data.date_added

  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = Math.max(sheet.getLastRow(),1);
  sheet.insertRowAfter(lastRow);
  var timestamp = new Date();
  sheet.getRange(lastRow + 1, 1).setValue(timestamp);
  sheet.getRange(lastRow + 1, 2).setValue(task_id);
  sheet.getRange(lastRow + 1, 3).setValue(project_id);
  sheet.getRange(lastRow + 1, 4).setValue(user_id);
  sheet.getRange(lastRow + 1, 5).setValue(priority);
  sheet.getRange(lastRow + 1, 6).setValue(content);
  sheet.getRange(lastRow + 1, 7).setValue(description);
  sheet.getRange(lastRow + 1, 8).setValue(date_added);
  SpreadsheetApp.flush();
  return HtmlService.createHtmlOutput("post request received");

}
