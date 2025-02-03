async function userLogout(req,res){
    try{
        res.clearCookie("token")

        res.json({
            message : "logged out succesfully",
            error : false,
            success : true,
            data : []
        })
    }catch(err){
        console.error(err); // Mostramos el error en la consola para fines de depuración
        res.status(500).json({ message: 'Error en el servidor' }); // Respuesta de error del servidor
    }
}

module.exports = userLogout