// FirestoreApp MX2_NUfxVpaA1XPcZ_N-3wWb_Hp7BVbw3

function onOpen(e) {

    const menu = SpreadsheetApp.getUi().createAddonMenu();

    const M = SpreadsheetApp.getUi().createMenu("hello");

    M.addItem("hello", "createNewSheet")
    .addItem("world", "pigmentSheet")
    .addItem("保護", "setProtect")
    .addToUi();

    try{
        if (
            (e && e.authMode === "NONE")
            || PropertiesService.getDocumentProperties().getProperty("isAuthed") != "true"
        ) {
            menu.addItem("Start", "initialize")
                .addToUi();
        } else {

            menu.addItem("現在のシートを同期", "syncFirestore")
                .addItem("シートのアップロードを削除", "deleteQA")
                .addToUi();
        }
    } catch (e) {
        menu.addItem("Start", "initialize")
            .addToUi();
    }
}

function initialize() {
    const menu = SpreadsheetApp.getUi().createAddonMenu();
    menu.addItem("現在のシートを同期", "syncFirestore")
        .addItem("シートのアップロードを削除", "deleteQA")
        .addToUi();

    PropertiesService.getDocumentProperties().setProperty("isAuthed", "true");
}

function deleteSheet(){

}

function getUUID(){
    return Utilities.getUuid();
}
