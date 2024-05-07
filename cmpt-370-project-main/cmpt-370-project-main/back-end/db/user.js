import db from "./db_config.js";
const prisma = db.prisma;

// Define the schema, types and resolvers for user queries and mutations
const typeDefs = `
    type UserRole {
        id: String!
        name: String!
        permissions: String
        user: [User]
    }

    type User {
        id: ID!
        name: String!
        email: String
        phone_number: String
        photo: String
        created: String
        active: Boolean
        user_role: UserRole 
    }
            
    type Query {
        user(id: ID!): User
        users: [User]

        userEmail(email: String!): User

        userRole(id: ID!): UserRole
        userRoles: [UserRole]
    }

    type Mutation {
        createUser(name: String!, email: String, phone_number: String, photo: String, active: Boolean, userRole: ID): User!
        createUserRole(name: String!, permissions: String): UserRole

        updateUser(id: ID!, name: String, email: String, phone_number: String, photo: String, active: Boolean, userRole: ID): User!
        updateUserRole(id: ID!, name: String, permissions: String): UserRole

        deleteUser(id: ID!): User
        deleteUserRole(id: ID!): UserRole
    }`;

const resolvers = {
    Query: {
        user: async (parent, args, context, info) => {
            const result = await prisma.user.findUnique({
                where: {
                    id: parseInt(args.id),
                },
                include: {
                    user_role: true,
                },
            });
            return result;
        },
        users: async (parent, args, context, info) => {
            const result = await prisma.user.findMany({
                where: {
                    active: true,
                },
                include: {
                    user_role: true,
                },
            });
            return result;
        },
        userEmail: async (parent, args, context, info) => {
            const result = await prisma.user.findMany({
                where: {
                    email: args.email,
                },
                include: {
                    user_role: true,
                },
            });
            return result[0];
        },
        userRole: async (parent, args, context, info) => {
            const result = await prisma.user_Role.findUnique({
                where: {
                    id: parseInt(args.id),
                },
                include: {
                    user: true,
                },
            });
            return result;
        },
        userRoles: async (parent, args, context, info) => {
            const result = await prisma.user_Role.findMany();
            return result;
        },
    },

    Mutation: {
        createUser: async (parent, args, context, info) => {
            const user = await prisma.user.create({
                data: {
                    name: args.name,
                    email: args.email,
                    phone_number: args.phone_number,
                    photo: args.photo,
                    active: args.active,
                },
            });
            if (args.userRole) {
                const user_w_role = await prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        user_role: {
                            connect: {
                                id: parseInt(args.userRole),
                            },
                        },
                    },
                    include: {
                        user_role: true,
                    },
                });
                return user_w_role;
            }
            return user;
        },
        createUserRole: async (parent, args, context, info) => {
            const result = await prisma.user_Role.create({
                data: {
                    name: args.name,
                    permissions: args.permissions,
                },
            });
            return result;
        },
        updateUser: async (parent, args, context, info) => {
            const user = await prisma.user.update({
                where: {
                    id: parseInt(args.id),
                },
                data: {
                    name: args.name == "null" ? "" : args.name,
                    email: args.email == "null" ? "" : args.email,
                    phone_number:
                        args.phone_number == "null" ? "" : args.phone_number,
                    photo: args.photo == "null" ? "" : args.photo,
                    active: args.active == "null" ? "" : args.active,
                },
            });

            if (
                args.userRole &&
                args.userRole != "null" &&
                args.userRole != "undefined" &&
                args.userRole != ""
            ) {
                const user_w_role = await prisma.user.update({
                    where: {
                        id: parseInt(user.id),
                    },
                    data: {
                        user_role: {
                            connect: {
                                id: parseInt(args.userRole),
                            },
                        },
                    },
                    include: {
                        user_role: true,
                    },
                });
            } else if (args.userRole == "") {
                const user_r_role = await prisma.user.update({
                    where: {
                        id: parseInt(user.id),
                    },
                    data: {
                        user_role: {
                            disconnect: true,
                        },
                    },
                });
            }
            return user;
        },
        updateUserRole: async (parent, args, context, info) => {
            const result = await prisma.user_Role.update({
                where: {
                    id: parseInt(args.id),
                },
                data: {
                    name: args.name,
                    permissions: args.permissions,
                },
            });
            return result;
        },
        deleteUser: async (parent, args, context, info) => {
            const result = await prisma.user.update({
                where: {
                    id: parseInt(args.id),
                },
                data: {
                    active: false,
                },
            });

            if (result.user_roleId) {
                const user_w_role = await prisma.user.update({
                    where: {
                        id: parseInt(result.id),
                    },
                    data: {
                        user_role: {
                            disconnect: true,
                        },
                    },
                });
            }
            return result;
        },
        deleteUserRole: async (parent, args, context, info) => {
            const result = await prisma.user_Role.delete({
                where: {
                    id: parseInt(args.id),
                },
                include: {
                    user: true,
                },
            });

            if (result.user) {
                result.user.forEach(async (user) => {
                    const user_w_role = await prisma.user.update({
                        where: {
                            id: parseInt(user.id),
                        },
                        data: {
                            user_role: {
                                disconnect: true,
                            },
                        },
                    });
                });
            }
            return result;
        },
    },
};

export default { typeDefs, resolvers };
