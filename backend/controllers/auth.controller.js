import UserDetails from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";

const User = UserDetails;

  /* L O G I N    D E     U S U A R I O S */
// Ruta para registrar un usuario
export const register = async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;
    console.log(req.body);

    const userFound = await User.findOne({ email: email });

    if (userFound)
      return res.status(400).json({
        message: ["El correo ya está en uso"],
      });

    const passwordHash = await bcrypt.hash(password, 5);

    try {
      await User.create({
        username: username,
        email: email,
        password: passwordHash,
        userType: userType,
      });
      res.status(201).json({
        message: ["Usuario creado"],
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ruta para iniciar sesión
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const userFound = await User.findOne({ email: email });

    if (!userFound)
      return res.status(400).json({
        message: ["El usuario no existe"],
      });

    if (await bcrypt.compare(password, userFound.password)) {
      // Si las contraseñas coinciden, se genera un token
      const token = jwt.sign({ email: userFound.email, userType: userFound.userType }, TOKEN_SECRET);
      console.log(token);
      res.status(201).send({
        status: "ok",
        data: token,
        username: userFound.username,
        email: userFound.email,
        password: userFound.password,
        userType: userFound.userType,
      });
    } else {
      return res.status(400).json({
        error: "Contraseña incorrecta",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}


export const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido" });
      }
      console.log("El token es:", token);
      res.status(200).json({ message: "Token válido" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(400).json({ error: "Token no proporcionado" });
    }

    const decoded = jwt.verify(token, TOKEN_SECRET);

    if (decoded) {
      return res.status(200).json({ message: "Sesión cerrada exitosamente" });
    } else {
      return res.status(401).json({ error: "Token inválido" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};




                  /* C R U D    D E     U S U A R I O S */
// Ruta para actualizar los datos de un usuario
export const update = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, userType } = req.body;

  console.log("ID del usuario:", id);

  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      username: username,
      email: email,
      password: password,
      userType: userType
    }, { new: true });

    console.log("Usuario actualizado:", updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario actualizado", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

  export const getall = async (req, res) => {
    try {
      const data = await User.find({});
      res.status(200).json({ data: data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getone = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  export const deleteone = async (req, res) => { 
    const { id } = req.params;
    try {
      await User.deleteOne({ _id: id });
      res.status(200).json({
        message: "Usuario eliminado",
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

