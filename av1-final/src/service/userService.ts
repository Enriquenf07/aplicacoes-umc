import { hash } from "bcryptjs";
import { compare } from "bcryptjs";
import { getManager } from 'typeorm'
import { sign } from "jsonwebtoken";
import { IAuthenticateRequest, IUserDelete, IUserRequest } from "../interfaces/usuarioInterfaces";
import { User } from "../entity/User";



class UserService {

    async authenticate({ email, password }: IAuthenticateRequest) {
        const user = await getManager().findOne(User, {
            email: email
        })
        const passwordHash = user.password;
        const passwordMatch = await compare(password, passwordHash);
        if (!passwordMatch) {
            throw new Error("Password incorrect");
        }
        const token = sign(
            { email: email, },
            "12345",
            {
                subject: "Admin", expiresIn: "1d",
            }
        );
        return token;


    }

    async get() {
        const users = await getManager().find(User)
        return users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
        }))
    }

    async delete({ id }: IUserDelete) {
        const user = await getManager().findOne(User, id)
        if (!user) {
            throw new Error('usuario não encontrado')
        }
        getManager().delete(User, id)

        return 'usuario deletado com sucesso';
    }

    async save(user: IUserRequest) {
        const passwordHash = await hash(user.password, 8);
        const newUser = new User()
        newUser.name = user.name
        newUser.admin = user.admin
        newUser.email = user.email
        newUser.id = user.id
        newUser.password = passwordHash
        getManager().save(User, newUser)
        return ''
    }
}
export { UserService };