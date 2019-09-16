//FirestoreApp MX2_NUfxVpaA1XPcZ_N-3wWb_Hp7BVbw3

function getQAdata(){
    //var url: string = "https://docs.google.com/spreadsheets/d/1DoYL6xmh-eMdhxvECWTDS08c0hhaZOD7MKH26TPbiv0/";
    var url: string = "https://docs.google.com/spreadsheets/d/1oNdWtjA9O3AkhXRsZfIyV8KEC8Cg10wlkga_OmHVk2k/";
    var ss = SpreadsheetApp.openByUrl(url);
    var sheet = ss.getSheets()[0];
    var header = sheet.getRange(1,1,1,2);
    var titleColumn = header.getValues()[0];

    var lastRow = sheet.getLastRow();
    var rowValues : string[][] = [];
    for(var rowIndex = 2; rowIndex <= lastRow; rowIndex++){
        var colStartIndex = 1;
        var rowNum = 1;
        var range = sheet.getRange(rowIndex, colStartIndex, rowNum, 2);
        var values = range.getValues();

        rowValues.push(values[0]);
    }

    var jsonArray : Object[] = [];
    for(var i = 0; i < rowValues.length; i++){
        var line = rowValues[i];
        var json = new Object();
        for(var j = 0; j < 2; j++){
            json['"' + titleColumn[j] + '"'] = '"' + line[j] + '"';
        }
        jsonArray.push(json);
    }

    return jsonArray;
}

function getHeader(){
    var url: string = "https://docs.google.com/spreadsheets/d/1oNdWtjA9O3AkhXRsZfIyV8KEC8Cg10wlkga_OmHVk2k/";
    var ss = SpreadsheetApp.openByUrl(url);
    var sheet = ss.getSheets()[0];
    var header = sheet.getRange(1, 1, 1, 2);
    var titleColumn = header.getValues()[0];

    var json = Object();
    for(var i = 0; i < titleColumn.length; i++){
        json['"' + i + '"'] = '"' + titleColumn[i] + '"';
    }

    return json;
}

function test(){
    Logger.log(getQAdata());
}

function firestoreData(): { [index: string]: string; }{
    var dataArray : { [index: string]: string; } = {
        "email" : PropertiesService.getScriptProperties().getProperty("ClientEmail"),
        //"key" : PropertiesService.getScriptProperties().getProperty("PrivateKey"),
        "key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD4B4dll+M04tC8\ntivOrYTsPJA6WibakKJj9Z69Q2MobYdbV0icpx+wsL03aNG/a5VfwO1H802Xan8V\nCr/4axnxkcGls2WUTvGcePn2WCkgFakH1uQqXUUBMmDTGQKofzOEGcoRLzyINzZZ\ngnvIhxBbI3dKiAGXdcc6/vfSopF2HniZ2uSusV/770SnrxRkTJme8y/bbX0dTGyp\nqmoEVNNqCBZtmMs1fjPK40WZQ9hpAjI+YK1eFUOx1MxA6QB2CiW+5LaZpE3v/yQy\nreEEomNHeI86N/dBN8fgbu5Lc4tmrzV5tqLjyvxR5yok46Se0TIwb6/fb+N0r6Iv\n+JHSSUO/AgMBAAECggEAAWP0nVwwBbB6OeSawEQQXIBGarbtd6I1I6XrDhj3nSPO\nc3OjNsWbehKzk0DyLay9UwkY2D0D8IpdstEZnGhO5lMwqIYl8DvoQz4Zk9XD46f1\nB6DSLKHTOWhLF913B1mXNCSU3mqX+a3qW+KAYSWb5BCB1bG6siesRnQxdxI6o7sR\nkx3Te38pSSKDzXeKIn+y00qT3BiMFElEbeyW4Q5nhFON+cStYPzvMyOnIdfTbDC5\nUnHFO/YbzA1cLKRb3HrrAwBbdmMTd5OJ+Yltoi58eGwGSeaWrbBELF/vE3qk6/4A\nAzvcppHs5qhibiR4ViUsC0naVILmnEQxjcKNYY2NmQKBgQD+HNTB4OwlWCR6lche\n4Z2suQt/EI5YSXgT9DZutWKFZglx318fIkmOyWiK+YCp9dBVh3GmwSyAaSchHXCt\nSbhxVye8WOquZOqScEGlN9i4FpeEFXz5vm5+/qcUO2staXJA5ghT9i4pLBz+BJo+\neHeTB1cYEY2fG2K+4/9OBAX0KwKBgQD53yGXFPOlvSelJx+0ghpImjtW2whFjaFm\ngtpoQReILQ4uBBXBNj6v0wlhpaUIz+elRbX5SDg5w+aCBs8Sn5UW/LutyMfweT0E\nZeMgVvJ22z9Pwm3wouCDqYt5eo61D/dpnRryyl8t4ZWSvobwqSGbfrvEkCB5mza3\nSsjy56wAvQKBgQC4VsXol3f3Z0efPcULP3QYdmxmkuYQGcvn/cL28NI1n12+o6Hn\nfgIKeQVDu9egc9fcE9NYes4DoURne2nf65jHb8g9k+s6865O6OxWJHssoAbuJIBy\n07hom+csgCYx3Uqq1bS44998sqmdhE04gD+OA0clCKbKAx3RCKiOOdDv3QKBgQDt\n25wsJ8Ov+BovOskRme/PQRJPof2DyEjmPpYOPDhcZxdicn0LCcousWPy0i4B73eB\nepS5kigDxRo+mKCyB7tywG8gBUte/Oo6r4rAFESHJDpmgJ0LPuEeNF0S7LnAXkyU\n+vrWOBLWqDEsGbZ2jWnyjXfMq65eVISHguc7Y5H2uQKBgAsXjgDQvOMJ75+Hy14B\n13oOpCk3IAGbUI1RorKOGX6mHHUr7Nt0n3TZCDBE3Tw4dw+RtqH6he2XnM0HY1Gp\ngB/9D8wdYN0PcQvZ6F4YWSj9f/SvclS67l/tFGnPZx6hRvrQrBCK064EvDvKaSbB\nLsFimGIKIRGETfu1CZvsiN+b\n-----END PRIVATE KEY-----\n",
        "projectId" : PropertiesService.getScriptProperties().getProperty("FirebaseProjectId")
    };

    return dataArray;
}

function createFirestore(){
    var data = getQAdata();
    var dataArray = firestoreData();
    Logger.log("\n email:")
    Logger.log(dataArray.email);
    Logger.log("\n key:")
    Logger.log(dataArray.key);
    Logger.log("\n projectId:")
    Logger.log(dataArray.projectId);
    var firestore = FirestoreApp.getFirestore(dataArray.email, dataArray.key , dataArray.projectId);

    firestore.createDocument("QACollection/QAdata", data);

    firestore.updateDocument("QAHeaders/QAdata", getHeader());
}

function updateFirestore() {
    var data = getQAdata();
    Logger.log(data);
    var dataArray = firestoreData();
    var firestore = FirestoreApp.getFirestore(dataArray.email, dataArray.key, dataArray.projectId);

    firestore.updateDocument("QACollection/QAdata", data);
}