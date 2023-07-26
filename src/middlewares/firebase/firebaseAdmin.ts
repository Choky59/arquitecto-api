import admin from "firebase-admin";

class firebaseAdmin {
  private admin: admin.app.App;
  constructor() {
    const serviceAccount = process.env.SERVICE_ACCOUNT;
    if (!serviceAccount) throw "SERVICE_ACCOUNT not defined";
    this.admin = admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccount)),
      storageBucket: "arquitecto-legm.appspot.com", // Replace 'your-app-id' with your Firebase project ID
    });
  }
  get Bucket() {
    return this.admin.storage().bucket();
  }
  get Storage() {
    return this.admin.storage() as any;
  }
}

export default new firebaseAdmin();
