import { Router } from "express";
import { UserController } from "./controller/userController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticate";
import { CategoryController } from "./controller/categoryController";
import { ClientController } from "./controller/clientController";
import { VendaController } from "./controller/vendaController";
import { ProductController } from "./controller/productController";

const userController  = new UserController();
const categoryController = new CategoryController()
const clientController = new ClientController()
const vendaController = new VendaController()
const productController = new ProductController()

const router = Router();

router.post("/users", userController.save);
router.post("/login", userController.authenticate);


router.get("/users", userController.get);
router.delete("/users/:id", userController.delete);

router.post("/categories", categoryController.save);
router.get("/categories", categoryController.get);
router.delete("/categories/:id", categoryController.delete);

router.post("/clients", clientController.save);
router.get("/clients", clientController.get);
router.delete("/clients/:id", clientController.delete);

router.post("/vendas", vendaController.save);
router.get("/vendas", vendaController.get);
router.delete("/vendas/:id", vendaController.delete);

router.post("/products", productController.save);
router.get("/products", productController.get);
router.delete("/products/:id", productController.delete);
router.use(ensureAuthenticated);


export {router}