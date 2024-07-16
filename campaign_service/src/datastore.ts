import { Datastore } from "@google-cloud/datastore"

const datastore = new Datastore({
    projectId: process.env.GOOGLE_DATASTORE_PROJECT_ID
})

export default datastore;