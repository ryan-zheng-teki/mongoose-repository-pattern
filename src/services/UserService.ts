import { User } from "../models/User.js"
import userRepository, { UserRepository } from "../repositories/UserRepository.js"

export class UserService {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = userRepository
    }

    async queryUserDetail(userId: string): Promise<User> {
        return this.userRepository.findById(userId)
    }
}