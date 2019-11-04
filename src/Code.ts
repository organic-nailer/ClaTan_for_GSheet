// FirestoreApp MX2_NUfxVpaA1XPcZ_N-3wWb_Hp7BVbw3

function onOpen(e) {

    const menu = SpreadsheetApp.getUi().createAddonMenu();

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
                .addItem("新しいシートを作成", "createNewSheet")
                .addItem("現在のシートをフォーマット(データは消えます)", "pigmentSheet")
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
        .addItem("新しいシートを作成", "createNewSheet")
        .addItem("現在のシートをフォーマット(データは消えます)", "pigmentSheet")
        .addToUi();

    PropertiesService.getDocumentProperties().setProperty("isAuthed", "true");
}

function deleteSheet(){

}

function getUUID(){
    return Utilities.getUuid();
}
