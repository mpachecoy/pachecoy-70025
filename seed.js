import mongoose from "mongoose";
import { config } from "./src/config/config.js";

let productos = [
    {
        _id: {
        $oid: "66959dbcd7e332d0eaa89684",
        },
        title: "Producto 3",
        description: "Descripción del producto 3",
        code: "ABC127",
        stock: 10,
        status: true,
        category: "Comestible",
        price: 500,
        thumbnail: [
        "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-128.png",
        ],
        __v: 0,
    },
    {
        _id: {
        $oid: "66959e48d7e332d0eaa8968e",
        },
        title: "Producto 2",
        description: "Descripción del producto 3",
        code: "ABC123",
        stock: 10,
        status: true,
        category: "Comestible",
        price: 500,
        thumbnail: [
        "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-128.png",
        ],
        __v: 0,
    },
    {
        _id: {
        $oid: "669676f393e37d254a05945d",
        },
        title: "Producto 2",
        description: "Descripción del producto 2",
        code: "ABC121",
        stock: 10,
        status: true,
        category: "Comestible",
        price: 500,
        thumbnail: [
        "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-128.png",
        ],
        __v: 0,
    },
    {
        _id: {
        $oid: "66a027ec55d713bf357ffb0a",
        },
        title: "Producto 4",
        description: "Descripción del producto 3",
        code: "ABC128",
        stock: 10,
        status: true,
        category: "Comestible",
        price: 500,
        thumbnail: [
        "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-128.png",
        ],
        __v: 0,
    },
    {
        _id: {
        $oid: "66a027fe55d713bf357ffb0c",
        },
        title: "Producto 5",
        description: "Descripción del producto 3",
        code: "ABC129",
        stock: 10,
        status: true,
        category: "Comestible",
        price: 500,
        thumbnail: [
        "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-128.png",
        ],
        __v: 0,
    },
    {
        _id: {
        $oid: "66a10120351f20381e7be97f",
        },
        title: "Producto 5",
        description: "Descripción del producto 3",
        code: "ABC130",
        stock: 10,
        status: true,
        category: "Bebida",
        price: 1500,
        thumbnail: [
        "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-128.png",
        ],
        __v: 0,
    },
    {
        _id: {
        $oid: "66a1012c351f20381e7be981",
        },
        title: "Producto 6",
        description: "Descripción del producto 3",
        code: "ABC131",
        stock: 10,
        status: true,
        category: "Bebida",
        price: 15200,
        thumbnail: [
        "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-128.png",
        ],
        __v: 0,
    },
];
let usuarios = [
    {
        _id: {
        $oid: "66959dbcd7e332d0eaa89684",
        },
        title: "Producto 3",
        description: "Descripción del producto 3",
        code: "ABC127",
        stock: 10,
        status: true,
        category: "Comestible",
        price: 500,
        thumbnail: [
        "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-128.png",
        ],
        __v: 0,
    },

];


const connDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URL, {
      dbName: config.DB_NAME,
    });
    console.log("DB conectada...!!!");
    creaData();
  } catch (error) {
    console.log(`Error al conectar a DB: ${error}`);
  }
};

const creaData = async () => {
  let resultado = await mongoose.connection.collection("productos").drop();
  console.log(resultado);
  resultado = await mongoose.connection.collection("productos").insertMany(productos);
  console.log(resultado);
};

connDB();
