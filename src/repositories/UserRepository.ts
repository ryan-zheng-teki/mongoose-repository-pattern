import { User, UserDocumentSchemaDefinition } from "../models/User.js"
import { BaseRepository } from "./BaseRepository.js"

export class UserRepository extends BaseRepository<User> {

    constructor() {
        super(UserDocumentSchemaDefinition.name)
    }
}


export default new UserRepository()
