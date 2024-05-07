import db from "./db_config.js";
const prisma = db.prisma;

import JSZip from "jszip";
import fs from "fs";

const zip = new JSZip();

import createPDF from "../invoice/pdf.js";

// Define the schema, types and resolvers for project related queries and mutations
const typeDefs = `
    type Project {
        id: ID!
        address: String!
        created: String
        due_date: String
        completed_date: String
        status: String
        notes: String
        photographer: ProjectPhotographer
        editor: ProjectEditor
        project_type: ProjectType
        invoice: Invoice
        client: Client
        sales_person: User
    }

    type Invoice{
        id: ID!
        pdf: String
        created: String
        amount: Float
        status: String
        project: Project
    }

    type ProjectType {
        id: ID!
        name: String!
        cost: Float
        notes: String
    }

    type ProjectEditor {
        id: ID!
        due_date: String
        completed_date: String
        assigned: User
    }

    type ProjectPhotographer {
        id: ID!
        due_date: String
        completed_date: String
        assigned: User
    }
    
    type Query {
        projects: [Project]
        project(id: ID!): Project

        projectTypes: [ProjectType]
        projectType(id: ID!): ProjectType

        projectEditors: [ProjectEditor]
        projectEditor(id: ID!): ProjectEditor

        projectPhotographers: [ProjectPhotographer]
        projectPhotographer(id: ID!): ProjectPhotographer

        invoices: [Invoice]
        invoice(id: ID!): Invoice
        
    }

    type Mutation {
        createProject(address: String!, client: ID, project_type: ID, notes: String, due_date: String, completed_date: String, photographer: ID, editor: ID, photo_due: String, edit_due: String, salesperson: ID): Project!
        createProjectType(name: String!, cost: String, notes: String): ProjectType!

        createProjectPhotographer(name: String, due_date: String, assigned: ID): ProjectPhotographer!
        createProjectEditor(name: String, due_date: String, assigned: ID): ProjectEditor!

        createInvoice(amount: String, status: String, project: ID): Invoice!
        invoices_dates(start_date: String, end_date: String): String
        
        updateProject(id: ID!, client: ID, address: String, status: String, project_type: ID, notes: String, due_date: String, completed_date: String, photographer: ID, editor: ID, photo_due: String, edit_due: String, salesperson: ID, photo_complete: String, edit_complete: String): Project!
        updateProjectType(id: ID!, name: String, cost: String): ProjectType!

        updateProjectPhotographer(id: ID!, name: String, due_date: String, assigned: ID): ProjectPhotographer!
        updateProjectEditor(id: ID!, name: String, due_date: String, assigned: ID): ProjectEditor!

        updateInvoice(id: ID!, amount: String, status: String, project: ID): Invoice!

        deleteProject(id: ID!): String
    }`;

const resolvers = {
    Query: {
        project: async (parent, args, context, info) => {
            const result = await prisma.project.findUnique({
                where: {
                    id: parseInt(args.id),
                },
                include: {
                    project_type: true,
                    editor: {
                        include: {
                            assigned: true,
                        },
                    },
                    photographer: {
                        include: {
                            assigned: true,
                        },
                    },
                    invoice: true,
                    sales_person: true,
                    client: true,
                },
            });
            return result;
        },
        projects: async (parent, args, context, info) => {
            const result = await prisma.project.findMany({
                include: {
                    project_type: true,
                    editor: {
                        include: {
                            assigned: true,
                        },
                    },
                    photographer: {
                        include: {
                            assigned: true,
                        },
                    },
                    invoice: true,
                    client: true,
                    sales_person: true,
                },
            });
            return result;
        },
        projectType: async (parent, args, context, info) => {
            const result = await prisma.project_Type.findUnique({
                where: {
                    id: parseInt(args.id),
                },
            });
            return result;
        },
        projectTypes: async (parent, args, context, info) => {
            const result = await prisma.project_Type.findMany();
            return result;
        },
        projectPhotographers: async (parent, args, context, info) => {
            const result = await prisma.project_Phototgrapher.findMany();
            return result;
        },
        projectPhotographer: async (parent, args, context, info) => {
            const result = await prisma.project_Phototgrapher.findUnique({
                where: {
                    id: parseInt(args.id),
                },
            });
            return result;
        },
        projectEditor: async (parent, args, context, info) => {
            const result = await prisma.project_Editor.findUnique({
                where: {
                    id: parseInt(args.id),
                },
            });
            return result;
        },
        projectEditors: async (parent, args, context, info) => {
            const result = await prisma.project_Editor.findMany();
            return result;
        },
        invoice: async (parent, args, context, info) => {
            const result = await prisma.invoice.findUnique({
                where: {
                    id: parseInt(args.id),
                },
            });
            return result;
        },
        invoices: async (parent, args, context, info) => {
            const result = await prisma.invoice.findMany({
                include: {
                    project: true,
                },
            });
            return result;
        },
    },

    Mutation: {
        createProject: async (parent, args, context, info) => {
            const project = await prisma.project.create({
                data: {
                    address: args.address,
                    status: "Created",
                },
            });

            await prisma.project_Editor.create({
                data: {
                    project: {
                        connect: {
                            id: project.id,
                        },
                    },
                },
            });

            await prisma.project_Photographer.create({
                data: {
                    project: {
                        connect: {
                            id: project.id,
                        },
                    },
                },
            });

            return await prisma.project.findUnique({
                where: {
                    id: project.id,
                },
            });
        },
        createProjectType: async (parent, args, context, info) => {
            const result = await prisma.project_Type.create({
                data: {
                    name: args.name,
                    cost: args.cost == "null" ? "" : parseFloat(args.cost),
                    notes: args.notes == "null" ? "" : args.notes,
                },
            });
            return result;
        },
        createProjectPhotographer: async (parent, args, context, info) => {
            const result = await prisma.project_Photographer.create({
                data: {
                    assigned: {
                        connect: {
                            id: parseInt(args.photographer),
                        },
                    },
                },
            });
            return result;
        },
        createProjectEditor: async (parent, args, context, info) => {
            const result = await prisma.project_Editor.create({
                data: {
                    assigned: {
                        connect: {
                            id: parseInt(args.photographer),
                        },
                    },
                },
            });
            return result;
        },
        createInvoice: async (parent, args, context, info) => {
            const project = await prisma.project.findUnique({
                where: {
                    id: parseInt(args.project),
                },
                include: {
                    project_type: true,
                    client: true,
                },
            });

            const save = createPDF({ project: project, amount: args.amount == "undefined" ? project.project_type.cost : args.amount });

            const result = await prisma.invoice.create({
                data: {
                    pdf: save,
                    amount:
                        args.amount == "undefined"
                            ? project.project_type.cost
                            : parseFloat(args.amount),
                    status: "Created",
                    project: {
                        connect: {
                            id: parseInt(args.project),
                        },
                    },
                },
            });
            
            return result;
        },
        invoices_dates: async (parent, args, context, info) => {
            const result = await prisma.invoice.findMany({
                where: {
                    created: {
                        gte: new Date(args.start_date).toISOString(),
                        lte: new Date(args.end_date).toISOString(),
                    },
                },
            });

            result.forEach((element) => {
                const file = fs.readFileSync(element.pdf);
                zip.file(element.id + ".pdf", file);
            });

            const zipFile = Date.now().toString() + "invoices.zip";

            zip.generateNodeStream({ type: "nodebuffer", streamFiles: true })
                .pipe(fs.createWriteStream("./invoice_pdf/" + zipFile))
                .on("finish", function () {
                    console.log(zipFile + " written.");
                });

            return zipFile;
        },

        updateProject: async (parent, args, context, info) => {
            const project = await prisma.project.update({
                where: {
                    id: parseInt(args.id),
                },
                data: {
                    address:
                        args.address == "undefined" || null ? "" : args.address,
                    notes: args.notes == "undefined" || null ? "" : args.notes,
                    due_date:
                        args.due_date == "undefined" || null
                            ? null
                            : args.due_date,
                    status:
                        args.status == "undefined" || null ? "" : args.status,
                    completed_date:
                        args.completed_date == "undefined" || null
                            ? null
                            : args.completed_date,
                    editor: {
                        update: {
                            due_date:
                                args.edit_due == "undefined"
                                    ? null
                                    : args.edit_due,
                            completed_date:
                                args.edit_complete == "true"
                                    ? new Date().toISOString()
                                    : null,
                        },
                    },
                    photographer: {
                        update: {
                            due_date:
                                args.edit_due == "undefined"
                                    ? null
                                    : args.edit_due,
                            completed_date:
                                args.photo_complete == "true"
                                    ? new Date().toISOString()
                                    : null,
                        },
                    },
                },
            });

            if (
                args.project_type &&
                args.project_type != "null" &&
                args.project_type != "undefined"
            ) {
                const project_w_type = await prisma.project.update({
                    where: {
                        id: project.id,
                    },
                    data: {
                        project_type: {
                            connect: {
                                id: parseInt(args.project_type),
                            },
                        },
                    },
                });
            }

            if (
                args.photographer &&
                args.photographer != "null" &&
                args.photographer != "undefined"
            ) {
                const editor_up = await prisma.project_Photographer.update({
                    where: {
                        id: parseInt(project.photographerId),
                    },
                    data: {
                        assigned: {
                            connect: {
                                id: parseInt(args.photographer),
                            },
                        },
                    },
                });
            }

            if (
                args.editor &&
                args.editor != "null" &&
                args.editor != "undefined"
            ) {
                const editor_up = await prisma.project_Editor.update({
                    where: {
                        id: parseInt(project.editorId),
                    },
                    data: {
                        assigned: {
                            connect: {
                                id: parseInt(args.editor),
                            },
                        },
                    },
                });
            }

            if (
                args.salesperson &&
                args.salesperson != "null" &&
                args.salesperson != "undefined"
            ) {
                const project_w_editor = await prisma.project.update({
                    where: {
                        id: project.id,
                    },
                    data: {
                        sales_person: {
                            connect: {
                                id: parseInt(args.salesperson),
                            },
                        },
                    },
                });
            }

            if (
                args.client &&
                args.client != "null" &&
                args.client != "undefined"
            ) {
                const project_w_client = await prisma.project.update({
                    where: {
                        id: project.id,
                    },
                    data: {
                        client: {
                            connect: {
                                id: parseInt(args.client),
                            },
                        },
                    },
                });
            }

            return await prisma.project.findUnique({
                where: {
                    id: parseInt(args.id),
                },
            });

        },
        updateProjectType: async (parent, args, context, info) => {
            const result = await prisma.project_Type.update({
                where: {
                    id: parseInt(args.id),
                },
                data: {
                    name: args.name,
                    cost: args.cost == "null" ? "" : parseFloat(args.cost),
                    notes: args.notes == "null" ? "" : args.notes,
                },
            });
            return result;
        },
        updateProjectPhotographer: async (parent, args, context, info) => {
            const result = await prisma.project_Photographer.update({
                where: {
                    id: parseInt(args.id),
                },
                data: {
                    assigned: {
                        connect: {
                            id: parseInt(args.photographer),
                        },
                    },
                },
            });
            return result;
        },
        updateProjectEditor: async (parent, args, context, info) => {
            const result = await prisma.project_Editor.update({
                where: {
                    id: parseInt(args.id),
                },
                data: {
                    assigned: {
                        connect: {
                            id: parseInt(args.photographer),
                        },
                    },
                },
            });
            return result;
        },
        updateInvoice: async (parent, args, context, info) => {
            const project = await prisma.project.findUnique({
                where: {
                    id: parseInt(args.project),
                },
                include: {
                    project_type: true,
                    invoice: true,
                    client: true,
                },
            });

            const invoiceAmount =
                args.amount == 0 ? project.project_type.cost : args.amount;

            const save = createPDF({ project: project, amount: invoiceAmount });

            const result = await prisma.invoice.update({
                where: {
                    id: parseInt(args.id),
                },
                data: {
                    pdf: save,
                    amount: parseInt(args.amount) || 0,
                    status: args.status == "null" ? "" : args.status,
                },
            });
            return result;
        },
        deleteProject: async (parent, args, context, info) => {
            const projectSelect = await prisma.project.findUnique({
                where: {
                    id: parseInt(args.id),
                },
                include: {
                    editor: true,
                    photographer: true,
                    invoice: true,
                },
            });

            if (projectSelect.invoice) {
                await prisma.invoice.delete({
                    where: {
                        id: parseInt(projectSelect.invoice.id),
                    },
                });
            }

            const photographer = prisma.project_Photographer.delete({
                where: {
                    id: parseInt(projectSelect.photographerId),
                },
            });
            const editor = prisma.project_Editor.delete({
                where: {
                    id: parseInt(projectSelect.editorId),
                },
            });

            const project_delete = prisma.project.delete({
                where: {
                    id: parseInt(args.id),
                },
            });

            await prisma.$transaction([project_delete, photographer, editor]);
            return "Project Deleted";
        },
    },
};

export default { typeDefs, resolvers };
