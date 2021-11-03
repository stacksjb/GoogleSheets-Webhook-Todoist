
//this is a function that fires when the webapp receives a GET request
function doGet(e) {
  return HtmlService.createHtmlOutput("request received");
}

//this is a function that fires when the webapp receives a POST request
function doPost(e) {
//  var params = JSON.stringify(e.postData.parameters);
  var data = JSON.parse(e.postData.contents);
  var event_data = data.event_data
  var data_content = event_data.content
  var date_added = event_data.date_added
  var priority = event_data.priority
  var task_id = event_data.id
  var project_id = event_data.project_id

  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = Math.max(sheet.getLastRow(),1);
  sheet.insertRowAfter(lastRow);
  var timestamp = new Date();
  sheet.getRange(lastRow + 1, 1).setValue(timestamp);
  sheet.getRange(lastRow + 1, 2).setValue(data_content);
  sheet.getRange(lastRow + 1, 3).setValue(date_added);
  sheet.getRange(lastRow + 1, 4).setValue(priority);
  sheet.getRange(lastRow + 1, 5).setValue(task_id);
  sheet.getRange(lastRow + 1, 6).setValue(project_id);
  SpreadsheetApp.flush();
  return HtmlService.createHtmlOutput("post request received");

}
