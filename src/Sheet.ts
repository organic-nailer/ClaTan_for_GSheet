
function pigmentSheet() {
    const sheet = SpreadsheetApp.getActiveSheet();

    sheet.clear();

    const primary = "#FFC107";
    const primaryLight = "#FFE082";
    const primaryAir = "#FFECB3";
    const accent = "#009688";
    const accentLight = "#80CBC4";

    var rangeHeader = sheet.getRange("A1:B1");
    rangeHeader.setBackground(accentLight);
    rangeHeader.setBorder(
        true, true, true, true, true, true, "#000000",
        SpreadsheetApp.BorderStyle.SOLID);

    var rangeQA = sheet.getRange("A2:B101");
    rangeQA.setBackground(primaryAir);
    rangeQA.setBorder(
        true, true, true, true, true, true, "#121212",
        SpreadsheetApp.BorderStyle.SOLID
    );

    var rangeInfoHeader = sheet.getRange("D1:L31");
    rangeInfoHeader.setBackground(accentLight);

    for(var i = 2; i <= 4; i += 2){
        var rangeInfo = sheet.getRange("D" + i + ":L" + i);
        rangeInfo.setBackground(primaryAir);
    }

    for(var i = 19; i <= 31; i += 2){
        var rangeInfo = sheet.getRange("D" + i + ":L" + i);
        rangeInfo.setBackground(primaryAir);
    }

    var rangeInfoBorder = sheet.getRange("D1:D4");
    rangeInfoBorder.setBorder(
        true, true, true, true, true, true, "#000000",
        SpreadsheetApp.BorderStyle.SOLID
    );

    sheet.getRange("D18:D31")
        .setBorder(
            true, true, true, true, true, true, "#000000",
            SpreadsheetApp.BorderStyle.SOLID
        );

    setLabelsSheet();
}

function setLabelsSheet() {
    const sheet = SpreadsheetApp.getActiveSheet();

    sheet.getRange("D1:E3").setValues(
        [
            ["id", "問題固有のIDです"],
            ["",""],
            ["共有URL", "問題共有用のURLとQRです"]
        ]);

    sheet.getRange("D18:E30").setValues(
        [
            ["問題タイプ",""],
            ["1",""],
            ["作者","(省略可)"],
            ["",""],
            ["詳細", "問題の情報を入力します(省略可)"],
            ["",""],
            ["バージョン", ""],
            ["",""],
            ["管理キー", "問題の管理に使用する任意の文字列です。空白だと誰でも削除できるようになります"],
            ["",""],
            ["公開/限定公開","1だと公開(IDを知らない人でもアクセスできる)、他だと限定公開(IDを知っている人のみ)"],
            ["",""],
            ["問題の開示","1だと開示(解答前に答えが見られる)、他だと非開示(答えが見られない)"]
        ]
    );
}

function setProtect() {
    const sheet = SpreadsheetApp.getActiveSheet();
    const protection = sheet
        .protect()
        .setDescription("hoge")
        .setWarningOnly(true)
        .setUnprotectedRanges([
            sheet.getRange("A1:B101"),
            sheet.getRange("D21"),
            sheet.getRange("D23"),
            sheet.getRange("D25"),
            sheet.getRange("D27"),
            sheet.getRange("D29"),
            sheet.getRange("D31")
        ]);
}

function createNewSheet() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    ss.insertSheet();
    pigmentSheet();
    setProtect();
}

function updateQR(id: string) {
    const sheet = SpreadsheetApp.getActiveSheet();
    const url = "https://clatan.fastriver.dev/#/?id=" + id;

    deleteAllImage();


    sheet.insertImage("https://chart.apis.google.com/chart?chs=450x450&cht=qr&chl=" + encodeURIComponent(url), 4, 5,5,5)
        .setWidth(225)
        .setHeight(225);

    sheet.getRange("D4").setValue(url);
    sheet.getRange("D2").setValue(id);
}

function deleteQR() {
    const sheet = SpreadsheetApp.getActiveSheet();
    
    sheet.getRange("D4").setValue("");
    sheet.getRange("D2").setValue("");

    deleteAllImage();
}

function deleteAllImage() {
    const sheet = SpreadsheetApp.getActiveSheet();
    const imgs = sheet.getImages();

    for (var i = 0; i < imgs.length; i++) {
        imgs[i].remove();
    }
}