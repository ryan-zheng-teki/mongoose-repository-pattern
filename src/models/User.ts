import { DocumentSchemaDefinitionType } from "./BaseTypes.js"

export const UserDocumentSchemaDefinition: DocumentSchemaDefinitionType = 
{
    name: "User",
    tableName: 'user',
    schemaDefinition: {
        email: {
            type: String,
            required: true 
        },
        name: String,
        nickName: String,
        firstName: String,
        lastName: String,
        gender: String,
    }
}

export class User {
    _id: String
    email: String
    name: String
    nickName: String
    firstName: String
    lastName: String
    gender: String
}