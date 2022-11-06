/**
 * DocumentSchemaDefinitionType
 * If tableName is not specified, Mongoose will append a character 's' to the name as the table name.
 */
 export type DocumentSchemaDefinitionType = {
    name: string
    schemaDefinition: any
    tableName: string
}