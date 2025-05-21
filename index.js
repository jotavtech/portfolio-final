// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  projects;
  currentId;
  currentProjectId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.projects = /* @__PURE__ */ new Map();
    this.currentId = 1;
    this.currentProjectId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  getAllProjects() {
    return Array.from(this.projects.values());
  }
  getProjectById(id) {
    return this.projects.get(id);
  }
  addProject(project) {
    this.projects.set(project.id, project);
    this.currentProjectId = Math.max(this.currentProjectId, project.id + 1);
  }
  clearProjects() {
    this.projects.clear();
    this.currentProjectId = 1;
  }
};
var storage = new MemStorage();

// server/routes.ts
import fs from "fs";
import path from "path";

// shared/schema.ts
import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});
var projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  category: z.enum(["web", "design", "app", "data", "ui", "audio"]),
  technologies: z.array(z.string()),
  link: z.string()
});

// server/routes.ts
import { ZodError } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/projects", (req, res) => {
    const projects = storage.getAllProjects();
    res.json(projects);
  });
  app2.get("/api/projects/:id", (req, res) => {
    const projectId = parseInt(req.params.id);
    const project = storage.getProjectById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });
  app2.post("/api/contact", (req, res) => {
    try {
      const contactData = contactSchema.parse(req.body);
      res.status(200).json({ success: true, message: "Message received!" });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Invalid form data",
          errors: error.errors
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/download-cv", (req, res) => {
    const cvPath = path.join(process.cwd(), "attached_assets", "Beige Bold Graphic Designer CV Resume.pdf (1).pdf");
    if (!fs.existsSync(cvPath)) {
      console.error(`CV file not found at path: ${cvPath}`);
      return res.status(404).json({ message: "CV file not found" });
    }
    res.download(cvPath, "joao-vitor-cv.pdf");
  });
  app2.get("/Clinica.png", (req, res) => {
    const imagePath = path.join(process.cwd(), "attached_assets", "Clinica.png");
    res.sendFile(imagePath);
  });
  app2.get("/templify.png", (req, res) => {
    const imagePath = path.join(process.cwd(), "attached_assets", "templify.png");
    res.sendFile(imagePath);
  });
  app2.get("/folheando.png", (req, res) => {
    const imagePath = path.join(process.cwd(), "attached_assets", "folheando.png");
    res.sendFile(imagePath);
  });
  app2.get("/porsche.png", (req, res) => {
    const imagePath = path.join(process.cwd(), "attached_assets", "porsche.png");
    res.sendFile(imagePath);
  });
  app2.get("/rodaporsche.webp", (req, res) => {
    const imagePath = path.join(process.cwd(), "attached_assets", "rodaporsche.webp");
    res.sendFile(imagePath);
  });
  initializeProjectsData();
  const httpServer = createServer(app2);
  return httpServer;
}
function initializeProjectsData() {
  storage.clearProjects();
  const projects = [
    {
      id: 1,
      title: "Cl\xEDnica Executivas",
      description: "Sistema de gerenciamento para cl\xEDnicas de massagem terap\xEAutica com agendamento de consultas, prontu\xE1rios eletr\xF4nicos e \xE1rea administrativa.",
      image: "/Clinica.png",
      category: "web",
      technologies: ["TypeScript", "React", "Tailwind CSS", "PostgreSQL"],
      link: "https://exemplo.com/clinica"
    },
    {
      id: 2,
      title: "Templify",
      description: "Plataforma de templates premium para pequenas empresas, com solu\xE7\xF5es r\xE1pidas e personaliz\xE1veis para sites profissionais.",
      image: "/templify.png",
      category: "web",
      technologies: ["TypeScript", "React", "Tailwind CSS", "PostgreSQL"],
      link: "https://exemplo.com/templify"
    },
    {
      id: 3,
      title: "Folheando",
      description: "Aplicativo de gerenciamento e recomenda\xE7\xE3o de livros, com integra\xE7\xE3o para avalia\xE7\xF5es e comunidade de leitores.",
      image: "/folheando.png",
      category: "app",
      technologies: ["TypeScript", "React", "Tailwind CSS", "PostgreSQL"],
      link: "https://exemplo.com/folheando"
    }
  ];
  projects.forEach((project) => {
    storage.addProject(project);
  });
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
