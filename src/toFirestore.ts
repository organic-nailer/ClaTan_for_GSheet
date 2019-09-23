function createFirestore() {
    var data = getQAdata();

    if(data.length < 2){
        Browser.msgBox("データが少なすぎます。", Browser.Buttons.OK);
        return;
    }

    var dataArray = firestoreData();

    Logger.log("\n email:")
    Logger.log(dataArray.email);
    Logger.log("\n key:")
    Logger.log(dataArray.key);
    Logger.log("\n projectId:")
    Logger.log(dataArray.projectId);
    var firestore = FirestoreApp.getFirestore(dataArray.email, dataArray.key, dataArray.projectId);

    firestore.createDocument("QACollection/QAdata", data);

    firestore.updateDocument("QAHeaders/QAdata", getHeader());
}

function updateFirestore() {
    var data = getQAdata();
    Logger.log(data);

    if(data.length < 2){
        Browser.msgBox("データが少なすぎます。", Browser.Buttons.OK);
        return;
    }

    var dataArray = firestoreData();
    var firestore = FirestoreApp.getFirestore(dataArray.email, dataArray.key, dataArray.projectId);

    firestore.updateDocument("QACollection/QAdata", data);
}

function syncFirestore() {
    var data = getQAdata();
    var headerData = getHeader();

    if (data.length < 2) {
        Browser.msgBox("データが少なすぎます。", Browser.Buttons.OK);
        return;
    }

    var dataArray = firestoreData();
    var firestore = FirestoreApp.getFirestore(dataArray.email, dataArray.key, dataArray.projectId);

    var id = getId();

    try{
        firestore.getDocument("QACollection/" + id);

        firestore.updateDocument("QACollection/"+ id, data);
        firestore.updateDocument("QAHeaders/"+ id, headerData);
    }
    catch(e){
        firestore.createDocument("QACollection/" + id, data);

        firestore.createDocument("QAHeaders/" + id, headerData);
    }
}

function deleteQA() {
    var dataArray = firestoreData();
    var firestore = FirestoreApp.getFirestore(dataArray.email, dataArray.key, dataArray.projectId);

    var id = getId();

    try{
        firestore.deleteDocument("QACollection/" + id);
        firestore.deleteDocument("QAHeaders/" + id);
    } catch(e) {  }
}