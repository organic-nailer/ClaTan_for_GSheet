function createFirestore() {
    const data = getQAdata();

    if (data.length < 2){
        Browser.msgBox("データが少なすぎます。", Browser.Buttons.OK);
        return;
    }

    const dataArray = firestoreData();

    const firestore = FirestoreApp.getFirestore(dataArray.email, dataArray.key, dataArray.projectId);

    firestore.createDocument("QACollection/QAdata", data);

    firestore.updateDocument("QAHeaders/QAdata", getHeader());
}

function updateFirestore() {
    const data = getQAdata();
    Logger.log(data);

    if (data.length < 2){
        Browser.msgBox("データが少なすぎます。", Browser.Buttons.OK);
        return;
    }

    const dataArray = firestoreData();
    const firestore = FirestoreApp.getFirestore(dataArray.email, dataArray.key, dataArray.projectId);

    firestore.updateDocument("QACollection/QAdata", data);
}

function syncFirestore() {
    const data = getQAdata();
    const headerData = getHeader();

    if (data.length < 2) {
        Browser.msgBox("データが少なすぎます。", Browser.Buttons.OK);
        return;
    }

    const dataArray = firestoreData();
    const firestore = FirestoreApp.getFirestore(dataArray.email, dataArray.key, dataArray.projectId);

    const id = getId();

    try {
        const oldData: QAHeader = firestore.getDocument("QAHeaders/" + id).fields;

        if(oldData != null && oldData.createdAt != null) {
            headerData.createdAt = oldData.createdAt;
        }

        firestore.updateDocument("QACollection/" + id, data);
        firestore.updateDocument("QAHeaders/" + id, headerData);
    } catch (e) {
        firestore.createDocument("QACollection/" + id, data);

        firestore.createDocument("QAHeaders/" + id, headerData);
    }
}

function deleteQA() {
    const dataArray = firestoreData();
    const firestore = FirestoreApp.getFirestore(dataArray.email, dataArray.key, dataArray.projectId);

    const id = getId();

    try {
        firestore.deleteDocument("QACollection/" + id);
        firestore.deleteDocument("QAHeaders/" + id);

        deleteQR();

        Browser.msgBox("削除しました", Browser.Buttons.OK);
    } catch (e) { 
        Browser.msgBox("削除できませんでした", Browser.Buttons.OK);
    }
}
