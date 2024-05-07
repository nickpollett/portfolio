// package imports
import express from "express";
import "dotenv/config";
import axios from "axios";
import queryString from "query-string";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import fs from "fs";
import https from "https";
import { exec } from "child_process";

import { createHandler } from "graphql-http/lib/use/express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import pkg from "lodash";
const { merge } = pkg;

import client from "./db/client.js";
import user from "./db/user.js";
import project from "./db/projects.js";

import db from "./db/db_config.js";
const prisma = db.prisma;

const app = express();
import cors from "cors";

import { csvLoader, upload } from "./import/csvimport.js";
import { time } from "console";

// config options
const config = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    redirectUrl: process.env.REDIRECT_URL,
    clientUrl: process.env.CLIENT_URL,
    tokenSecret: process.env.TOKEN_SECRET,
    tokenExpiration: 36000,
};

// Get all parameters needed to hit authorization server
const authParams = queryString.stringify({
    client_id: config.clientId,
    redirect_uri: config.redirectUrl,
    response_type: "code",
    scope: "openid profile email",
    access_type: "offline",
    state: "standard_oauth",
    prompt: "consent",
});

// Get all parameters needed to hit authorization server
const getTokenParams = (code) =>
    queryString.stringify({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: config.redirectUrl,
    });


// cors options
app.use(
    cors({
        origin: [config.clientUrl],
        credentials: true,
    }),
);

// express options
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files
// api_docs is the folder where the spectaql documentation is located
app.use("/api_docs", express.static("./db/public"));
// invoice_pdf is the folder where the invoices are located
app.use("/invoice_pdf", express.static("./invoice_pdf"));

// file upload endpoint
app.post("/api/v1/file", upload.single("file"), function (req, res) {
    csvLoader(req);
    res.json({});
});

// auth middleware, check if user is logged in, before accessing protected routes
const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });
        jwt.verify(token, config.tokenSecret);
        return next();
    } catch (err) {
        console.error("Error: ", err);
        res.status(401).json({ message: "Unauthorized" });
    }
};

// get auth url
app.get("/auth/url", (_, res) => {
    res.json({
        url: `${config.authUrl}?${authParams}`,
    });
});

// get token from authorization code
app.get("/auth/token", async (req, res) => {
    const { code } = req.query;
    if (!code)
        return res
            .status(400)
            .json({ message: "Authorization code must be provided" });
    try {
        // Get all parameters needed to hit authorization server
        const tokenParam = getTokenParams(code);
        // Exchange authorization code for access token (id token is returned here too)
        const {
            data: { id_token },
        } = await axios.post(`${config.tokenUrl}?${tokenParam}`);

        if (!id_token) return res.status(400).json({ message: "Auth error" });
        // Get user info from id token
        const { email, name, picture } = jwt.decode(id_token);
        const user = { name, email, picture };

        // Sign a new token
        const token = jwt.sign({ user }, config.tokenSecret, {
            expiresIn: config.tokenExpiration,
        });

        // Set cookies for user
        res.cookie("token", token, {
            maxAge: config.tokenExpiration,
            httpOnly: false,
            secure: false,
        });

        res.json({
            user,
        });
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ message: err.message || "Server error" });
    }
});

// check if user is logged in
app.get("/auth/logged_in", (req, res) => {
    try {
        // Get token from cookie
        const token = req.cookies.token;
        if (!token) return res.json({ loggedIn: false });
        const { user } = jwt.verify(token, config.tokenSecret);
        const newToken = jwt.sign({ user }, config.tokenSecret, {
            expiresIn: config.tokenExpiration,
        });
        // Reset token in cookie
        res.cookie("token", newToken, {
            maxAge: config.tokenExpiration,
            httpOnly: true,
        });
        res.json({ loggedIn: true, user });
    } catch (err) {
        res.json({ loggedIn: false });
    }
});

// logout endpoint
app.post("/auth/logout", auth, (req, res) => {
    // clear cookie
    res.clearCookie("token").json({ message: "Logged out" });
});

// test endpoint
app.get("/", auth, (req, res) => {
    res.send("{data: 'hello'}");
});

// combine all the schemas and resolvers for graphql
const schema = makeExecutableSchema({
    typeDefs: [client.typeDefs, user.typeDefs, project.typeDefs],
    resolvers: merge(client.resolvers, user.resolvers, project.resolvers),
});

// graphql endpoint
app.all(
    "/api/v1",
    createHandler({
        schema: schema,
    }),
);

// setup initial admin user, handle zero start issue
// if no users are found, push the db schema and create the admin user
// set default admin email in .env file, or dockerfile
async function setupIntialAdminUser() {

    const adminUserRole = { "name": "Admin" }
    const adminUser = { "name": "Admin", "email": process.env.DEFAULT_ADMIN_EMAIL }

    let result;

    try {
        result = await prisma.user.findMany({
            where: {
                active: true,
            },
            include: {
                user_role: true,
            },
        });
        if(result.length == 0) throw "No users found";

    } catch (err) {

        console.log("push db schema");
        // push the db schema, shell command
        exec("npx prisma db push", async (err, stdout, stderr) => {
            if (err) {
                console.log(err);
            }
            console.log(stdout);
            
            result = await prisma.user.findMany({
                where: {
                    active: true,
                },
                include: {
                    user_role: true,
                },
            });

            if (result.length == 0){
                const adminRole = await prisma.user_Role.create({
                    data: adminUserRole,
                });

                const admin = await prisma.user.create({
                    data: {
                        name: adminUser.name,
                        email: adminUser.email,
                        user_role: {
                            connect: {
                                id: adminRole.id,
                            },
                        },
                    },
                });
                console.log("Admin user created");
            }
        });
    }
}

// ssl options, key file locations
let sslOptions = {
    key: fs.readFileSync("./key.key"),
    cert: fs.readFileSync("./cert.cert"),
};

// start the ssl server
https.createServer(sslOptions, app).listen(80, () => {

    if (process.env.NODE_ENV == "DEV") {
        setupIntialAdminUser();
    }
    console.log(`Server running successfully on 80`);
});

