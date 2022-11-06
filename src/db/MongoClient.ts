import mongoose from 'mongoose'
import util  from 'util'
import { DocumentSchemaDefinitionType } from '../models/BaseTypes.js'
import { AllDocumentSchemaDefinitions as allDocumentSchemaDefinitions } from '../models/DocumentSchema.js'

/**
 * Mongoose is based on Mongodb nodejs driver 
 * https://mongodb.github.io/node-mongodb-native/api-generated/collection.html
 * 
 * The major API used by user is 
 * db.createCollection() => creates collection(simiar to create database in mysql)
 * https://www.mongodb.com/docs/manual/reference/method/db.createCollection/ * collection.insertDocument() => insert a json object(insert record in mysql)
 * 
 * create collection offers validation options by providing a second argument. These validation
 * rules are created from our schema definition. This is why we provide a schema.
 * 
 * 
 * collection.insertDocument => insert document (similar to create table in mysql)
 * https://www.mongodb.com/docs/manual/tutorial/insert-documents/
 * 
 */

export class MongoClient {
    static instance: MongoClient
    /**
     * the registry contains all the schema, models
     */
    private documentModelsRegistry: { [name: string]: any} 

    constructor() {
        this.documentModelsRegistry = {}
        MongoClient.instance = this
    }


    init() {
        this.connectMongoServer()
        this.initializeDocumentSchemaModels()
    }

    /**
     * get the docuemnt model by the schema name
     * 
     * @param schemaName 
     * @returns 
     */
    getDocumentModel(schemaName: string): any {
        return this.documentModelsRegistry[schemaName]
    }

    /**
     * connect to mongo db server. How to report error? Exception should be thrown in case of error
     */
    private connectMongoServer() {
        const host = process.env.MONGO_HOST
        const port = process.env.MONGO_PORT
        const db = process.env.MONGO_DATABASE
        const connectAddress = util.format("mongodb://%s:%s/%s", host, port, db)
        const options = {
            serverSelectionTimeoutMS: 6000,
            connectTimeoutMS: 6000
        };

        mongoose.connect(connectAddress, options).then(
            () => { console.log("Mongodb connected %s successfully", connectAddress) },
            errors => {
                console.log("Mongodb connected %s failed!", connectAddress)
                throw new Error(errors)
            }
        )

    }

    private initializeDocumentSchemaModels() {
        let self = this //we need to use lamda capture in order to access parent object
        allDocumentSchemaDefinitions.forEach(function(schemaDefinition: DocumentSchemaDefinitionType){  
            self.registerDocumentSchema(schemaDefinition)  
          }
        )
    }

    /**
     *  this function will register document schema, and return the document model
     *  
     * @param documentSchemaDefinition
     * @returns DocumentModel
     */
    private registerDocumentSchema(documentSchemaDefinition: DocumentSchemaDefinitionType): any {
        var documentSchema = new mongoose.Schema(documentSchemaDefinition.schemaDefinition, { timestamps:true })
        var documentModel = mongoose.model(documentSchemaDefinition.name, documentSchema, documentSchemaDefinition.tableName)
        this.documentModelsRegistry[documentSchemaDefinition.name] = documentModel
    }
}