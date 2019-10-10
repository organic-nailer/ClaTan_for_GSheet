function getQAdata(): object[] {
    const sheet = SpreadsheetApp.getActiveSheet();
    const header = sheet.getRange(1, 1, 1, 2);
    const titleColumn = header.getValues()[0];

    const lastRow = sheet.getLastRow();
    const rowValues: string[][] = [];
    for (let rowIndex = 2; rowIndex <= lastRow; rowIndex++) {
        const colStartIndex = 1;
        const rowNum = 1;
        const range = sheet.getRange(rowIndex, colStartIndex, rowNum, 2);
        const values = range.getValues();

        if (values[0][0] != "") {
            rowValues.push(values[0]);
        }
    }

    const jsonArray: object[] = [];
    for (const line of rowValues) {
        const json = new Object();
        for (let j = 0; j < 2; j++) {
            json['"' + titleColumn[j] + '"'] = '"' + line[j] + '"';
        }
        jsonArray.push(json);
    }

    return jsonArray;
}

function getHeader(): object {
    const sheet = SpreadsheetApp.getActiveSheet();
    const header = sheet.getRange(1, 1, 1, 2);
    const titleColumn = header.getValues()[0];

    const json = Object();

    json.index = titleColumn;
    json.title = sheet.getName();
    json.type = sheet.getRange("D19").getValue();
    json.author = sheet.getRange("D21").getValue();
    json.description = sheet.getRange("D23").getValue();
    json.version = sheet.getRange("D25").getValue();
    json.manageid = sheet.getRange("D27").getValue();

    return json;
}

// TODO: nullだったときに新しくuuidを生成して返す
function getId(): string {
    let currentId: string = SpreadsheetApp.getActiveSheet().getRange(8, 4).getValue();
    if (currentId === "") {
        currentId = getUUID();
    }
    updateQR(currentId);

    return currentId;
}
