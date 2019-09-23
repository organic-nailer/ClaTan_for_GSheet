function getQAdata(): Object[] {
    var sheet = SpreadsheetApp.getActiveSheet();
    var header = sheet.getRange(1, 1, 1, 2);
    var titleColumn = header.getValues()[0];

    var lastRow = sheet.getLastRow();
    var rowValues: string[][] = [];
    for (var rowIndex = 2; rowIndex <= lastRow; rowIndex++) {
        var colStartIndex = 1;
        var rowNum = 1;
        var range = sheet.getRange(rowIndex, colStartIndex, rowNum, 2);
        var values = range.getValues();

        rowValues.push(values[0]);
    }

    var jsonArray: Object[] = [];
    for (var i = 0; i < rowValues.length; i++) {
        var line = rowValues[i];
        var json = new Object();
        for (var j = 0; j < 2; j++) {
            json['"' + titleColumn[j] + '"'] = '"' + line[j] + '"';
        }
        jsonArray.push(json);
    }

    return jsonArray;
}

function getHeader(): Object {
    var sheet = SpreadsheetApp.getActiveSheet();
    var header = sheet.getRange(1, 1, 1, 2);
    var titleColumn = header.getValues()[0];

    var json = Object();
    for (var i = 0; i < titleColumn.length; i++) {
        json['"' + i + '"'] = '"' + titleColumn[i] + '"';
    }

    json["index"] = titleColumn;
    json["title"] = sheet.getName();

    return json;
}

//TODO: nullだったときに新しくuuidを生成して返す
function getId() : String{
    var currentId : String = SpreadsheetApp.getActiveSheet().getRange(8, 4).getValue();
    if(currentId == ""){
        currentId = getUUID();
    }
    updateQR(currentId);

    return currentId;
}
