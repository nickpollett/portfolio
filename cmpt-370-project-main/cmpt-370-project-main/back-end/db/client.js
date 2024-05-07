import db from "./db_config.js";
const prisma = db.prisma;

// Define the schema, types and resolvers for client queries and mutations
const typeDefs = `
    type Location {
        id: ID!
        name: String!
        active: Boolean
        notes: String
        Clients: [Client]
    }

    type Client_Contact{
        id: ID!
        date: String
        type: String
        client: Client
        contactor: User
    }

    type Client {
        id: ID!
        name: String!
        status: String
        email: String
        notes: String
        address: String
        phone_number: String
        contact: String
        projects: [Project]
        sales_person: User
        location: Location
    }
            
    type Query {
        client(id: ID!): Client!
        clients: [Client]
        clientsBySalesPerson(id: ID!): [Client]

        location(id: ID!): Location!
        locationList: [Location]!

        client_contacts(id: ID!): [Client_Contact]!

        client_projects(id: ID!): [Project]
    }

    type Mutation {
        createClient(name: String!, status: String, phone_number: String, address: String, notes: String, sales_person: ID, location: ID, email: String): Client!
        createLocation(name: String, active: Boolean, notes: String): Location!
        createContact(date: String, type: String, client: ID!, user: ID): Client_Contact!

        updateClient(id: ID!, name: String, email: String, status: String, phone_number: String, address: String, notes: String, sales_person: ID, location: ID): Client!
        updateLocation(id: ID!, name: String, active: Boolean, notes: String): Location!
        updateContact(id: ID!, date: String, type: String, client: ID, contactor: ID): Client_Contact!

        deleteClient(id: ID!): Client
        deleteLocation(id: ID!): Location
    }`;

const resolvers = {
    Query: {
        client: async (parent, args, context, info) => {
            const result = await prisma.client.findUnique({
                where: {
                    id: parseInt(args.id),
                },
                include: {
                    location: true,
                    contact: {
                        orderBy: {
                            date: "desc",
                        },
                        include: {
                            contactor: true,
                        },
                    },
                    sales_person: true,
                },
            });
            result.contact = result.contact[0]?.date;
            return result;
        },
        clients: async (parent, args, context, info) => {
            const result = await prisma.client.findMany({
                where: {
                    active: true,
                },
                include: {
                    location: true,
                    contact: {
                        orderBy: {
                            date: "desc",
                        },
                        take: 1,
                    },
                },
            });
            result.forEach((client) => {
                if (client.contact.length > 0) {
                    client.contact = client.contact[0]?.date;
                } else {
                    client.contact = null;
                }
            });
            return result;
        },
        clientsBySalesPerson: async (parent, args, context, info) => {
            const result = await prisma.client.findMany({
                where: {
                    sales_person: {
                        id: parseInt(args.id),
                    },
                    active: true,
                },
                include: {
                    contact: {
                        orderBy: {
                            date: "desc",
                        },
                        take: 1,
                    },
                },
            });
            result.forEach((client) => {
                if (client.contact.length > 0) {
                    client.contact = client.contact[0]?.date;
                } else {
                    client.contact = null;
                }
            });
            result.sort((a, b) => {
                return a.contact - b.contact;
            });
            return result;
        },
        location: async (parent, args, context, info) => {
            const location = await prisma.location.findUnique({
                where: {
                    id: parseInt(args.id),
                },
                include: {
                    Clients: true,
                },
            });
            return location;
        },
        locationList: async (parent, args, context, info) => {
            const locationList = await prisma.location.findMany({
                include: {
                    Clients: true,
                },
            });
            return locationList;
        },
        client_contacts: async (parent, args, context, info) => {
            const result = await prisma.client_Contact.findMany({
                where: {
                    client: {
                        id: parseInt(args.id),
                    },
                },
                include: {
                    client: true,
                    contactor: true,
                },
            });

            return result;
        },
        client_projects: async (parent, args, context, info) => {
            const result = await prisma.project.findMany({
                where: {
                    clientId: parseInt(args.id),
                },
            });

            return result;
        },
    },

    Mutation: {
        createClient: async (parent, args, context, info) => {
            const client = await prisma.client.create({
                data: {
                    name: args.name,
                    email: args.email,
                    phone_number: args.phone_number,
                    address: args.address,
                    notes: args.notes,
                    status: args.status,
                },
            });

            if (args.sales_person) {
                const client_W_sales = await prisma.client.update({
                    where: {
                        id: client.id,
                    },
                    data: {
                        sales_person: {
                            connect: {
                                id: parseInt(args.sales_person),
                            },
                        },
                    },
                });
            }

            if (args.location) {
                const client_W_location = await prisma.client.update({
                    where: {
                        id: client.id,
                    },
                    data: {
                        location: {
                            connect: {
                                id: parseInt(args.location),
                            },
                        },
                    },
                });
            }

            return await prisma.client.findUnique({
                where: {
                    id: client.id,
                },
                include: {
                    location: true,
                    sales_person: true,
                },
            });
        },
        createLocation: async (parent, args, context, info) => {
            const result = await prisma.location.create({
                data: {
                    name: args.name,
                    active: args.active,
                    notes: args.notes,
                },
            });

            return result;
        },
        createContact: async (parent, args, context, info) => {
            const result = await prisma.client_Contact.create({
                data: {
                    date: args.date == "null" ? "" : args.date,
                    type: args.type,
                    client: {
                        connect: {
                            id: parseInt(args.client),
                        },
                    },
                    contactor: {
                        connect: {
                            id: parseInt(args.user),
                        },
                    },
                },
            });
            return result;
        },
        updateClient: async (parent, args, context, info) => {
            const client = await prisma.client.update({
                where: {
                    id: parseInt(args.id),
                },
                data: {
                    name: args.name,
                    email: args.email == "null" ? "" : args.email,
                    phone_number:
                        args.phone_number == "null" ? "" : args.phone_number,
                    address: args.address == "null" ? "" : args.address,
                    notes: args.notes == "null" ? "" : args.notes,
                    status: args.status == "null" ? "" : args.status,
                },
            });

            if (
                args.sales_person != null &&
                args.sales_person != "undefined" &&
                args.sales_person != ""
            ) {
                const client_W_sales = await prisma.client.update({
                    where: {
                        id: parseInt(client.id),
                    },
                    data: {
                        sales_person: {
                            connect: {
                                id: parseInt(args.sales_person),
                            },
                        },
                    },
                });
            }

            if (
                args.location != null &&
                args.location != "undefined" &&
                args.location != "null" &&
                args.location != ""
            ) {
                const client_W_location = await prisma.client.update({
                    where: {
                        id: client.id,
                    },
                    data: {
                        location: {
                            connect: {
                                id: parseInt(args.location),
                            },
                        },
                    },
                });
            }

            return await prisma.client.findUnique({
                where: {
                    id: client.id,
                },
                include: {
                    location: true,
                    sales_person: true,
                },
            });
        },
        updateLocation: async (parent, args, context, info) => {
            const result = await prisma.location.update({
                where: {
                    id: parseInt(args.id),
                },
                data: {
                    name: args.name == "null" ? "" : args.name,
                    active: args.active == "null" ? "" : args.active,
                    notes: args.notes == "null" ? "" : args.notes,
                },
            });
            return result;
        },
        updateContact: async (parent, args, context, info) => {
            const result = await prisma.client_Contact.update({
                where: {
                    id: parseInt(args.id),
                },
                data: {
                    date_time: args.date_time == "null" ? "" : args.date_time,
                    type: args.type == "null" ? "" : args.type,
                    client: {
                        connect: {
                            id: parseInt(args.client),
                        },
                    },
                },
            });
            return result;
        },
        deleteClient: async (parent, args, context, info) => {
            const result = await prisma.client.update({
                where: {
                    id: parseInt(args.id),
                },
                data: {
                    active: false,
                },
            });
            return result;
        },
        deleteLocation: async (parent, args, context, info) => {
            const result = await prisma.location.delete({
                where: {
                    id: parseInt(args.id),
                },
                include: {
                    Clients: true,
                },
            });

            if (result.Clients) {
                result.Clients.forEach(async (client) => {
                    await prisma.client.update({
                        where: {
                            id: client.id,
                        },
                        data: {
                            location: {
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
