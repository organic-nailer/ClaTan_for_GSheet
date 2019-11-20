interface QAHeader {
    author: string,
    description: string,
    index: string[],
    manageid: string,
    title: string,
    type: number,
    version: string,
    public: boolean,
    disclosure: boolean,
    createdAt: Date,
    updatedAt: Date
}

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

function getHeader(): QAHeader {
    const sheet = SpreadsheetApp.getActiveSheet();
    const header = sheet.getRange(1, 1, 1, 2);
    const titleColumn = header.getValues()[0];

    var headData: QAHeader = {
        author: sheet.getRange("D21").getValue(),
        description: sheet.getRange("D23").getValue(),
        index: titleColumn,
        manageid: sheet.getRange("D27").getValue(),
        title: sheet.getName(),
        type: sheet.getRange("D19").getValue(),
        version: sheet.getRange("D25").getValue(),
        public: sheet.getRange("D29").getValue() == "1",
        disclosure: sheet.getRange("D31").getValue() == "1",
        createdAt: null,
        updatedAt: null
    }

    return headData;
}

// TODO: nullだったときに新しくuuidを生成して返す
function getId(): string {
    let currentId: string = SpreadsheetApp.getActiveSheet().getRange("D2").getValue();
    if (currentId === "") {
        currentId = getUUID();
    }
    updateQR(currentId);

    return currentId;
}
