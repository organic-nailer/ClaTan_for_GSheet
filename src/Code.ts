// FirestoreApp MX2_NUfxVpaA1XPcZ_N-3wWb_Hp7BVbw3

function onOpen(e){

    var menu = SpreadsheetApp.getUi().createAddonMenu();

    if(e && e.authMode == 'NONE'){
        menu.addItem("Start", "initialize")
            .addToUi();
    } else {
        var ui = SpreadsheetApp.getUi();

        menu.addItem("現在のシートを同期", "syncFirestore")
            .addItem("シートのアップロードを削除", "deleteQA")
            .addToUi();
    }
    /*
    var ui = SpreadsheetApp.getUi();
    
    ui.createMenu("ProjectQA")
        .addSubMenu(
            ui.createMenu("新規シートを追加")
                .addItem("2カラム", "showDialog")
        )
        .addSeparator()
        .addItem("現在のシートを同期", "syncFirestore")
        .addItem("全体を同期", "showDialog")
        .addItem("新規", "createFirestore")
        .addItem("シートのアップロードを削除","showDialog")
        .addToUi();
    ui.createMenu("ProjectQA")
        .addItem("現在のシートを同期", "syncFirestore")
        .addItem("シートのアップロードを削除", "deleteQA")
        .addToUi();*/
}

function initialize() {
    var ui = SpreadsheetApp.getUi();
    var menu = SpreadsheetApp.getUi().createAddonMenu();
    menu.addItem("現在のシートを同期", "syncFirestore")
        .addItem("シートのアップロードを削除", "deleteQA")
        .addToUi();
}

function test(){
    Logger.log(getQAdata());
}


function deleteSheet(){

}

function getUUID(){
    //Logger.log(Session.getActiveUser().getEmail());
    return Utilities.getUuid();
}

function showDialog(){
    var url: string = "https://docs.google.com/spreadsheets/d/1oNdWtjA9O3AkhXRsZfIyV8KEC8Cg10wlkga_OmHVk2k/";
    var ss = SpreadsheetApp.openByUrl(url);
    var sheet = ss.getSheets()[0];

    var id = getUUID();

    
}

function updateQR(id: String){
    var sheet = SpreadsheetApp.getActiveSheet();

    sheet.insertImage("https://chart.apis.google.com/chart?chs=450x450&cht=qr&chl=" + id, 4, 9)
        .setWidth(225)
        .setHeight(225);

    sheet.getRange(8, 4).setValue(id);
}