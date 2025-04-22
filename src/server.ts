import express from 'express';
import  colors from 'colors';
import cors, {CorsOptions} from 'cors';
import morgan from 'morgan'
import swaggerUi  from 'swagger-ui-express';
import swaggerSpec, {swaggerUiOptions} from './config/swagger';
import router from './router';
import db from './config/db';


// Conectar a base de datos
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.blue.bold('Conexión a la base de datos exitosa'));
    
  } catch (error) {
    // console.log(error)
    console.log(colors.red.bold('Error al conectar a la base de datos'))
    
  }
}

connectDB();

// Instancia de express
const server = express(); 

// Permitir conexiones desde el front end
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Permitir solicitudes sin 'origin' (como Postman o móviles)
    if (!origin) return callback(null, true);
    
    // Lista de orígenes permitidos
    const allowedOrigins = [
      process.env.FRONTEND_URL
    ];
    
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

server.use(cors(corsOptions));
server.use(cors(corsOptions));

// Leer datos de formularios
server.use(express.json());

server.use(morgan('dev'))
server.use('/api/products', router);

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions) )

export default server;