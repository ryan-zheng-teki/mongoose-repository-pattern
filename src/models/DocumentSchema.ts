import { DocumentSchemaDefinitionType } from "./BaseTypes.js";
import { UserDocumentSchemaDefinition } from "./User.js";


const AllDocumentSchemaDefinitions: Array<DocumentSchemaDefinitionType> = []
AllDocumentSchemaDefinitions.push(UserDocumentSchemaDefinition)

export { AllDocumentSchemaDefinitions }